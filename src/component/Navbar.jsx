import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Smart Campus</Link>
        </div>

        {/* Menu Items */}
        <ul className="hidden lg:flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/leave-application"
              className="hover:text-blue-400 transition duration-300"
            >
              Leave Application
            </Link>
          </li>
          <li>
            <Link
              to="/parking-slots"
              className="hover:text-blue-400 transition duration-300"
            >
              Parking Slots
            </Link>
          </li>
          <li>
            <Link
              to="/smart-canteen"
              className="hover:text-blue-400 transition duration-300"
            >
              Smart Canteen
            </Link>
          </li>
          <li>
            <Link
              to="/students"
              className="hover:text-blue-400 transition duration-300"
            >
              Students on Leave
            </Link>
          </li>
          <li>
            <Link
              to="/booked-slots"
              className="hover:text-blue-400 transition duration-300"
            >
              Booked Slots
            </Link>
          </li>
        </ul>

        {/* Team Name */}
        <div className="hidden lg:block text-xl font-semibold text-blue-400">
          Tech Titans
        </div>

        {/* Hamburger Menu for mobile */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="flex flex-col items-center space-y-4 bg-gray-700 p-4 lg:hidden">
          <li>
            <Link
              to="/"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/leave-application"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Leave Application
            </Link>
          </li>
          <li>
            <Link
              to="/parking-slots"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Parking Slots
            </Link>
          </li>
          <li>
            <Link
              to="/smart-canteen"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Smart Canteen
            </Link>
          </li>
          <li>
            <Link
              to="/students"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Students on Leave
            </Link>
          </li>
          <li>
            <Link
              to="/booked-slots"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Booked Slots
            </Link>
          </li>
          {/* Display Team Name */}
          <li className="text-blue-400 text-lg font-semibold">Tech Titans</li>
        </ul>
      )}
    </nav>
  );
}
