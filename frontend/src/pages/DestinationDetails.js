import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DestinationDetails.css';

const DestinationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state;

  if (!destination) {
    return <h2>Error: No destination found</h2>;
  }

  return (
    <div className="details-container">
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      
      <div className="details-content">
        <h1 className="destination-title">{destination.name}</h1>
        <div className="destination-card">
          <div className="description-section">
            <h2>About this destination</h2>
            <p>{destination.details}</p>
          </div>
          
          <div className="items-section">
            <h2>Don't Forget These Items!</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;