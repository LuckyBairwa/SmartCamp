import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ParkingSlots() {
  const navigate = useNavigate();
  
  // Initialize 30 slots
  const initialSlots = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    number: `Slot-${index + 1}`,
    status: 'Available', // All slots are available initially
  }));

  // State for slots and form inputs
  const [slots, setSlots] = useState(initialSlots);
  const [facultyName, setFacultyName] = useState('');
  const [subject, setSubject] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('Car');
  const [selectedSlot, setSelectedSlot] = useState('');

  // Update slots from localStorage when the component mounts
  useEffect(() => {
    const storedSlots = JSON.parse(localStorage.getItem('slots'));
    if (storedSlots) {
      setSlots(storedSlots);
    } else {
      localStorage.setItem('slots', JSON.stringify(initialSlots));
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the vehicle number is already parked
    const existingBooking = JSON.parse(localStorage.getItem('bookings')) || [];
    const isVehicleBooked = existingBooking.some(
      (booking) => booking.vehicleNumber === vehicleNumber && booking.endTime === '--'
    );

    if (isVehicleBooked) {
      alert('This vehicle is already parked. Please free the slot before booking again.');
      return;
    }

    if (selectedSlot) {
      // Check if the selected slot is available
      const selectedSlotObj = slots.find((slot) => slot.number === selectedSlot);
      if (selectedSlotObj && selectedSlotObj.status === "Occupied") {
        alert("This slot is already occupied. Please select another slot.");
        return;
      }

      // Create a new booking entry with automatic current time as start time
      const currentTime = new Date().toLocaleTimeString();
      const newBooking = {
        facultyName,
        subject,
        vehicleNumber,
        vehicleType,
        startTime: currentTime,
        endTime: '--',
        slot: selectedSlot,
      };

      // Save to localStorage
      let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      bookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      // Update slot status to "Occupied"
      const updatedSlots = slots.map((slot) =>
        slot.number === selectedSlot ? { ...slot, status: "Occupied" } : slot
      );
      setSlots(updatedSlots);
      localStorage.setItem('slots', JSON.stringify(updatedSlots));

      // Redirect to the "Booked Slots" page
      navigate('/booked-slots');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Parking Slot Booking</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4">
        <h2 className="text-xl font-semibold mb-4">Pre-Book Parking Slot</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="facultyName" className="block text-gray-600 mb-2">Faculty Name:</label>
            <input
              type="text"
              id="facultyName"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-gray-600 mb-2">Subject:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="vehicleNumber" className="block text-gray-600 mb-2">Vehicle Number:</label>
            <input
              type="text"
              id="vehicleNumber"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="vehicleType" className="block text-gray-600 mb-2">Vehicle Type:</label>
            <select
              id="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Scooty">Scooty</option>
            </select>
          </div>
          <div>
            <label htmlFor="parkingSlot" className="block text-gray-600 mb-2">Select Parking Slot:</label>
            <select
              id="parkingSlot"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">--Select Slot--</option>
              {slots.filter(slot => slot.status === "Available").map((slot) => (
                <option key={slot.id} value={slot.number}>
                  {slot.number}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
          >
            Book Slot
          </button>
        </form>
      </div>
    </div>
  );
}
