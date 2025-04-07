import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DestinationDetails.css';

const DestinationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(location.state);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingItems, setIsEditingItems] = useState(false);
  const [editedDetails, setEditedDetails] = useState(destination.details);
  const [editedItems, setEditedItems] = useState(destination.items.join(', '));
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(destination.name);

  if (!destination) {
    return <h2>Error: No destination found</h2>;
  }

  const handleSaveDetails = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/destinations/${destination.intId}`, {
        ...destination,
        details: editedDetails
      });
      setDestination(response.data);
      setIsEditingDetails(false);
    } catch (error) {
      console.error('Error updating details:', error);
    }
  };

  const handleSaveItems = async () => {
    try {
      const itemsArray = editedItems.split(',').map(item => item.trim());
      const response = await axios.put(`http://localhost:8000/api/destinations/${destination.intId}`, {
        ...destination,
        items: itemsArray
      });
      setDestination(response.data);
      setIsEditingItems(false);
    } catch (error) {
      console.error('Error updating items:', error);
    }
  };

  const handleSaveName = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/destinations/${destination.intId}`, {
        ...destination,
        name: editedName
      });
      setDestination(response.data);
      setIsEditingName(false);
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  return (
    <div className="details-container">
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      
      <div className="details-content">
        <div className="title-section">
          {isEditingName ? (
            <div className="edit-section">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="name-input"
              />
              <button onClick={handleSaveName} className="save-button">
                Save Name
              </button>
              <button 
                onClick={() => setIsEditingName(false)} 
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="title-header">
              <h1 className="destination-title">{destination.name}</h1>
              <button 
                className="edit-button"
                onClick={() => setIsEditingName(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <div className="destination-card">
          <div className="description-section">
            <div className="section-header">
              <h2>About this destination</h2>
              <button 
                className="edit-button"
                onClick={() => setIsEditingDetails(!isEditingDetails)}
              >
                {isEditingDetails ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {isEditingDetails ? (
              <div className="edit-section">
                <textarea
                  value={editedDetails}
                  onChange={(e) => setEditedDetails(e.target.value)}
                  rows="4"
                />
                <button onClick={handleSaveDetails} className="save-button">
                  Save Changes
                </button>
              </div>
            ) : (
              <p>{destination.details}</p>
            )}
          </div>
          
          <div className="items-section">
            <div className="section-header">
              <h2>Don't Forget These Items!</h2>
              <button 
                className="edit-button"
                onClick={() => setIsEditingItems(!isEditingItems)}
              >
                {isEditingItems ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {isEditingItems ? (
              <div className="edit-section">
                <textarea
                  value={editedItems}
                  onChange={(e) => setEditedItems(e.target.value)}
                  placeholder="Item 1, Item 2, Item 3"
                  rows="4"
                />
                <button onClick={handleSaveItems} className="save-button">
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="items-grid">
                {destination.items.map((item, index) => (
                  <div key={index} className="item-card">
                    <span className="item-text">{item}</span>
                    <div className="checkbox">
                      <input type="checkbox" id={`item-${index}`} />
                      <label htmlFor={`item-${index}`}></label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;