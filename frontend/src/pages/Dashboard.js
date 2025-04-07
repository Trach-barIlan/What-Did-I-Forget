import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import Axios
import './Dashboard.css';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newDestination, setNewDestination] = useState({
    name: '',
    details: '',
    items: []
  });

  // Fetch destinations from MongoDB
  useEffect(() => {
    axios.get('http://localhost:8000/api/destinations')
      .then((response) => setDestinations(response.data))
      .catch((error) => console.error('There was an error fetching destinations:', error));
  }, []);

  const handleAddDestination = (e) => {
    e.preventDefault();
    if (newDestination.name.trim()) {
      axios.post('http://localhost:8000/api/destinations', {
        name: newDestination.name,
        details: newDestination.details,
        items: newDestination.items
      })
        .then((response) => {
          setDestinations([...destinations, response.data]);
          setNewDestination({ name: '', details: '', items: [] });
          setIsPopupOpen(false);
        })
        .catch((error) => {
          console.error('There was an error adding the destination:', error);
          alert('Failed to add destination. Please try again.');
        });
    }
  };

  const handleItemsChange = (value) => {
    // Split items by comma and trim whitespace
    const itemsArray = value.split(',').map(item => item.trim());
    setNewDestination({ ...newDestination, items: itemsArray });
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      
      <button onClick={() => setIsPopupOpen(true)} className="add-button">
        Add New Destination
      </button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Add New Destination</h3>
            <form onSubmit={handleAddDestination}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={newDestination.name}
                  onChange={(e) => setNewDestination({
                    ...newDestination,
                    name: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Details:</label>
                <textarea
                  value={newDestination.details}
                  onChange={(e) => setNewDestination({
                    ...newDestination,
                    details: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Items (comma-separated):</label>
                <textarea
                  value={newDestination.items.join(', ')}
                  onChange={(e) => handleItemsChange(e.target.value)}
                  placeholder="Item 1, Item 2, Item 3"
                />
              </div>
              <div className="popup-buttons">
                <button type="submit">Add Destination</button>
                <button type="button" onClick={() => setIsPopupOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h2>Your Destinations</h2>

      <div className="destination-list">
        {destinations.map((destination) => (
          <div
            key={destination._id}  // Use MongoDB ID as key
            className="destination-card"
            onClick={() => navigate(`/destination/${destination.intId}`, { state: destination })}
          >
            <h3>{destination.name}</h3>
            <p>{destination.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
