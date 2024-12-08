import React, { useState, useEffect } from 'react';
import samosaImg from '../assets/samosa.jpg';
import pattiesImg from '../assets/patties.jpg';
import burgerImg from '../assets/burger.jpg';
import pizzaImg from '../assets/pizza.jpg';
import sandwichImg from '../assets/sandwich.jpg';
import chaiImg from '../assets/chai.jpg';
import waterBottle from '../assets/waterbottles.jpg';
import coldDrink from '../assets/colddrinks.jpg';
// import dokhla from '../assets/dokhla.jpg'

export default function SmartCanteen() {
  const [menu, setMenu] = useState(() => {
    const savedMenu = localStorage.getItem('menuData');
    return savedMenu
      ? JSON.parse(savedMenu)
      : [
          { id: 1, name: 'Samosa', price: 20, pic: samosaImg, availableQuantity: 150, bookedQuantity: 0 },
          { id: 2, name: 'Patties', price: 30, pic: pattiesImg, availableQuantity: 150, bookedQuantity: 0 },
          { id: 3, name: 'Burger', price: 50, pic: burgerImg, availableQuantity: 150, bookedQuantity: 0 },
          { id: 4, name: 'Pizza', price: 150, pic: pizzaImg, availableQuantity: 150, bookedQuantity: 0 },
          { id: 5, name: 'Sandwich', price: 40, pic: sandwichImg, availableQuantity: 150, bookedQuantity: 0 },
          { id: 6, name: 'Chai', price: 10, pic: chaiImg, availableQuantity: 150, bookedQuantity: 0 },
          { id: 7, name: 'Water Bottle', price: 20, pic: waterBottle, availableQuantity: 150, bookedQuantity: 0 },
          { id: 8, name: 'Cold Drink', price: 25, pic: coldDrink, availableQuantity: 150, bookedQuantity: 0 },
        ];
  });

  // Modal state for success message
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Save menu data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('menuData', JSON.stringify(menu));
  }, [menu]);

  // Update the booked quantity for items
  const handleQuantityChange = (id, quantity) => {
    setMenu(prevMenu =>
      prevMenu.map(item =>
        item.id === id ? { ...item, bookedQuantity: quantity } : item
      )
    );
  };

  // Handle "Book Items" button click
  const handleBookItems = () => {
    setMenu(prevMenu =>
      prevMenu.map(item => {
        if (item.bookedQuantity > 0) {
          return {
            ...item,
            availableQuantity: item.availableQuantity - item.bookedQuantity,
            bookedQuantity: 0, // Reset booked quantity to 0 after booking
          };
        }
        return item;
      })
    );

    // Open the modal with success message
    setIsModalOpen(true);
  };

  // Calculate total price of selected items
  const calculateTotal = () => {
    return menu.reduce((total, item) => total + item.price * item.bookedQuantity, 0);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Smart Canteen Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 md:w-3/4">
        {menu.map(item => (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center">
            <img
              src={item.pic}
              alt={item.name}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-2">₹{item.price}</p>
            <p className="text-gray-500 mb-4">Available Quantity: {item.availableQuantity}</p>

            {/* Quantity Input */}
            {item.availableQuantity > 0 ? (
              <div className="mb-4">
                <label className="block text-sm text-gray-600">Enter Quantity:</label>
                <input
                  type="number"
                  min="0"
                  max={item.availableQuantity}
                  className="border border-gray-300 rounded-lg py-1 px-2 w-full"
                  value={item.bookedQuantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                />
              </div>
            ) : (
              <p className="text-red-500">Out of Stock</p>
            )}
          </div>
        ))}
      </div>

      {/* Selected Items and Total */}
      <div className="w-full md:w-3/4 mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Selected Items</h2>
        <ul className="space-y-4">
          {menu
            .filter(item => item.bookedQuantity > 0)
            .map(item => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.bookedQuantity}
                </span>
                <span>₹{item.price * item.bookedQuantity}</span>
              </li>
            ))}
        </ul>
        <div className="mt-4 text-lg font-semibold">
          Total Price: ₹{calculateTotal()}
        </div>
      </div>

      {/* Book Items Button */}
      <button
        onClick={handleBookItems}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-600 transition"
        disabled={menu.every(item => item.bookedQuantity === 0)} // Disable if no items selected
      >
        Book Items
      </button>

      {/* Modal (Popup) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Order Confirmation</h2>
            <p>Your order has been successfully booked!</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
