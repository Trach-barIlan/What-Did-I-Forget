import React from 'react';
import { Link } from 'react-router-dom';
import './DestinationCard.css';

const DestinationCard = ({ destination }) => {
  return (
    <Link to={`/destination/${destination.id}`} style={{ textDecoration: 'none' }}>
      <div className="destination-card">
        <h3>{destination.name}</h3>
        <p>Click to view more details about {destination.name}.</p>
      </div>
    </Link>
  );
};

export default DestinationCard;
