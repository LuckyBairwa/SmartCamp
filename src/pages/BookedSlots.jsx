import React, { useState, useEffect } from 'react';

export default function BookedSlots() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Get the bookings from localStorage when the component loads
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(savedBookings);
  }, []);

  const handleFreeSlot = (index) => {
    const updatedBookings = [...bookings];
    const endTime = new Date(); // Get the current time for end time
    updatedBookings[index].endTime = endTime.toLocaleTimeString(); // Update end time
  
    // Ensure the startTime is valid
    const startTimeString = updatedBookings[index].startTime;
  
    // Convert 12-hour format (e.g., "12:13:55 PM") to 24-hour format
    const timeParts = startTimeString.match(/(\d+):(\d+):(\d+)\s(AM|PM)/);
  
    if (!timeParts) {
      console.error("Invalid start time format:", startTimeString);
      return;
    }
  
    let [_, hours, minutes, seconds, period] = timeParts;
    hours = parseInt(hours);
    if (period === 'PM' && hours !== 12) {
      hours += 12; // Convert PM to 24-hour format
    }
    if (period === 'AM' && hours === 12) {
      hours = 0; // Convert 12 AM to 00:00 in 24-hour format
    }
  
    // Create a valid Date object
    const startTime = new Date();
    startTime.setHours(hours, minutes, seconds); // Set the hours, minutes, and seconds
  
    // Calculate the total time in minutes
    const totalTime = Math.floor((endTime - startTime) / 60000); // Time in minutes
    updatedBookings[index].totalTime = totalTime > 0 ? `${totalTime} minutes` : '--';
  
    setBookings(updatedBookings);
  
    // Update localStorage with the new endTime and totalTime
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  
    // Update slot status to "Available"
    const slotNumber = updatedBookings[index].slot;
    let slots = JSON.parse(localStorage.getItem('slots')) || [];
    slots = slots.map(slot =>
      slot.number === slotNumber ? { ...slot, status: "Available" } : slot
    );
    localStorage.setItem('slots', JSON.stringify(slots));
  };
  


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Booked Parking Slots</h1>

      <div className="w-11/12 md:w-3/4">
        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings available.</p>
        ) : (
          bookings.map((booking, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-lg mb-6 flex justify-between items-center ${booking.endTime === '--' ? 'bg-red-500' : 'bg-green-500'
                } text-white`}
            >
              {/* Booking Details (Left Side) */}
              <div>
                <h2 className="text-xl font-semibold">{booking.facultyName}</h2>
                <p><strong>Subject:</strong> {booking.subject}</p>
                <p><strong>Vehicle:</strong> {booking.vehicleType} - {booking.vehicleNumber}</p>
                <p><strong>Start Time:</strong> {booking.startTime}</p>
                <p><strong>End Time:</strong> {booking.endTime}</p>
                {booking.endTime === '--' && (
                  <button
                    onClick={() => handleFreeSlot(index)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition mt-4"
                  >
                    Free Slot
                  </button>
                )}
              </div>

              {/* Slot Number and Total Parking Time (Right Side) */}
              <div className="text-right">
                <p><strong>Slot Number:</strong> {booking.slot}</p>
                <p>
                  <strong>Total Parking Time:</strong>{' '}
                  {booking.totalTime ? booking.totalTime : '--'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
