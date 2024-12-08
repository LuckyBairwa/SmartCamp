// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'; // Import icons from react-icons

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} Smart Canteen. All rights reserved.
        </p>
        <p className="text-sm mb-4">Follow us on social media:</p>
        <div className="flex justify-center space-x-6 mt-2">
          <a
            href="https://www.facebook.com/profile.php?id=100088888142992"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600 transition duration-300"
            aria-label="Facebook"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/lucky-bairwa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-700 transition duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://www.instagram.com/lucky.shairwal?igsh=MWIxNTFleTl4NzVsdw=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-600 transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://x.com/JAANI__G"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600 transition duration-300"
            aria-label="Instagram"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://wa.me/message/374W3LURETPSI1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-600 transition duration-300"
            aria-label="Instagram"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
