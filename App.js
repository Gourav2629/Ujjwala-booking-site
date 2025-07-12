import React, { useState, useEffect } from 'react';

function BookingManager() {
  const [initialized, setInitialized] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings([{ date: '2024-12-10', slot: 'Day' }]);
    setInitialized(true);
  }, []);

  return (
    <div>
      <h1>Ujjwala Booking System</h1>
      {bookings.map((b, i) => <div key={i}>{b.date} - {b.slot}</div>)}
    </div>
  );
}

export default BookingManager;