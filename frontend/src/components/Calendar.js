import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Calendar.css';
import Navbar from './Navbar';

const Calendar = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    destinationId: '',
    start: '',
    end: '',
  });
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Fetch destinations for the dropdown
    axios.get('http://localhost:8000/api/destinations')
      .then(response => setDestinations(response.data))
      .catch(error => console.error('Error fetching destinations:', error));

    // Fetch existing events
    axios.get('http://localhost:8000/api/events')
    .then(response => setEvents(response.data))
    .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleDateSelect = (selectInfo) => {
    setNewEvent({
      ...newEvent,
      start: selectInfo.start.toISOString().split('T')[0],
      end: selectInfo.end.toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  const handleEventAdd = async () => {
    try {
      // Get highest intId
      const eventsResponse = await axios.get('http://localhost:8000/api/events');
      const highestIntId = Math.max(...eventsResponse.data.map(e => e.intId || 0), 0);
      
      // Format the dates properly
      const formattedEvent = {
        ...newEvent,
        intId: highestIntId + 1,
        start: new Date(newEvent.start).toISOString(),
        end: new Date(newEvent.end).toISOString()
      };
  
      // Add console.log to debug the request payload
      console.log('Sending event data:', formattedEvent);
      
      const response = await axios.post('http://localhost:8000/api/events', formattedEvent);
      setEvents([...events, response.data]);
      setIsModalOpen(false);
      setNewEvent({ title: '', destinationId: '', start: '', end: '' });
    } catch (error) {
      console.error('Error adding event:', error.response?.data || error.message);
      alert('Failed to add event. Please check all fields are filled correctly.');
    }
  };

  const handleEventClick = (clickInfo) => {
    navigate(`/event/${clickInfo.event.extendedProps.intId}`);
  };

  return (
    <div className="calendar-container">
      <Navbar />
      <div className="calendar-header">
        <h1>Trip Calendar</h1>
      </div>
      
      <FullCalendar
        eventClick={handleEventClick}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
        events={events.map(event => ({
          id: event._id,  // This ensures the MongoDB _id is available
          title: event.title,
          start: event.start,
          end: event.end,
          extendedProps: {
            intId: event.intId
          }
        }))}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek'
        }}
      />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Trip</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleEventAdd(); }}>
              <div className="form-group">
                <label>Trip Title:</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
              <label>Start Date:</label>
              <input
                type="date"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                required
                />
              </div>

              <div className="form-group">
                <label>End Date:</label>
                <input
                  type="date"
                  value={newEvent.end}
                  min={newEvent.start}
                  onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Destination:</label>
                <select
                  value={newEvent.destinationId}
                  onChange={(e) => setNewEvent({ ...newEvent, destinationId: e.target.value })}
                  required
                >
                  <option value="">Select a destination</option>
                  {destinations.map(dest => (
                    <option key={dest._id} value={dest._id}>
                      {dest.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-buttons">
                <button type="submit" className="save-button">Save Trip</button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;