import React from 'react';

// TODO: capture props
function EventCard() {
  return (
    <div className="event-card bg-white text-gray-700 px-4 py-4 rounded-lg text-sm hover:shadow-lg">
      <h6>Event name</h6>
      <hr />
      <p>Date:</p>
      <p>Event description:</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
        dicta.
      </p>
    </div>
  );
}

export default EventCard;
