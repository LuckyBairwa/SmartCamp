import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import leaveApp from "../assets/leaveapplication.jpg";
import students from "../assets/studentsList.jpg";
import parking from '../assets/availableParking.jpg';
import bookedparking from '../assets/bookedParking.jpg';
// import canteen from '../assets/canteen.jpg';

export default function HeroSection() {
  const cards = [
    {
      img: leaveApp,
      title: "Leave Application Form",
      description: "Apply for leaves easily using this form.",
      link: "/leave-application",
    },
    {
      img: students,
      title: "Students on Leave",
      description: "See the list of students who are on leave.",
      link: "/students",
    },
    {
      img: parking,
      title: "Parking Slot Availability",
      description: "Check available parking slots on campus.",
      link: "/parking-slots",
    },
    {
      img: bookedparking,
      title: "Booked Slots Availability",
      description: "Check booked parking slots on campus.",
      link: "/booked-slots",
    },
    // {
    //   img: canteen,
    //   title: "Smart Canteen",
    //   description: "Order food and track your meals with ease.",
    //   link: "/smart-canteen",
    // },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-cyan-700 to-blue-600 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Smart Campus</h1>

      <div className="relative w-11/12 md:w-3/4 flex justify-center items-center gap-1">

        <button
          className="transform -translate-y-1/2 text-3xl text-gray-400 font-bold hover:scale-110 transition outline-none"
          onClick={handlePrev}
        >
          <FaChevronCircleLeft />
        </button>
        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${cards.length * 100}%`,
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className={`w-full flex-shrink-0 bg-white text-gray-800 p-6 rounded-lg shadow-lg transition-all duration-500 transform ${index === currentIndex
                    ? "opacity-100 scale-100" // Center card
                    : index === currentIndex - 1 || index === currentIndex + 1
                      ? "opacity-70 scale-90" // Side cards
                      : "opacity-0 scale-75" // Hidden cards
                  }`}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-[24%] h-[500px] object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                <p className="mb-4">{card.description}</p>
                <Link to={card.link}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Visit
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}

        <button
          className="transform -translate-y-1/2 text-3xl text-gray-400 font-bold hover:scale-110 transition outline-none"
          onClick={handleNext}
        >
          <FaChevronCircleRight />
        </button>
      </div>

      <div className="mt-10 text-xl">
        <marquee behavior="scroll" direction="left" className="text-yellow-400">
          Experience the future of campus life with Smart Campus!
        </marquee>
      </div>
    </div>
  );
}
