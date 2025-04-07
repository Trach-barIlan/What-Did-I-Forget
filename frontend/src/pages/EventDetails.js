import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EventDetails.css';
import Navbar from '../components/Navbar';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        console.log('Fetching event details for ID:', id);
        const eventResponse = await axios.get(`http://localhost:8000/api/events/${id}`);
        setEvent(eventResponse.data);
        // Since the event response includes the populated destinationId, use it directly
        setDestination(eventResponse.data.destinationId);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Failed to load event details');
        setLoading(false);
      }
    };
  
    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="event-details-container">
        <Navbar />
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="event-details-container">
        <Navbar />
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/calendar')} className="back-button">
          Back to Calendar
        </button>
      </div>
    );
  }

  if (!event || !destination) {
    return (
      <div className="event-details-container">
        <Navbar />
        <div className="error-message">Event not found</div>
        <button onClick={() => navigate('/calendar')} className="back-button">
          Back to Calendar
        </button>
      </div>
    );
  }

  return (
    <div className="event-details-container">
      <Navbar />
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      
      <div className="event-content">
        <h1>{event.title}</h1>
        
        <div className="event-info">
          <div className="info-section">
            <h2>Trip Details</h2>
            <p><strong>Start Date:</strong> {new Date(event.start).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(event.end).toLocaleDateString()}</p>
          </div>

          <div className="destination-section">
            <h2>Destination Information</h2>
            <h3>{destination.name}</h3>
            <p>{destination.details}</p>
            
            <div className="packing-list">
              <h3>Packing List</h3>
              {destination.items.map((item, index) => (
                <div key={index} className="packing-item">
                  <input type="checkbox" id={`item-${index}`} />
                  <label htmlFor={`item-${index}`}>{item}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;