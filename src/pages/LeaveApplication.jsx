import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeaveApplication({ setStudents }) {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    reason: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch existing students from localStorage
    const existingStudents = JSON.parse(localStorage.getItem("students")) || [];

    // Add new student to the list
    const updatedStudents = [...existingStudents, formData];
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    // Update state in the app
    setStudents(updatedStudents);

    // Navigate to the list page
    navigate("/students");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Leave Application Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-600 mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="rollNumber" className="block text-gray-600 mb-2">
              Roll Number:
            </label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-gray-600 mb-2">
              Reason for Leave:
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="flex justify-between gap-4">
            <div>
              <label htmlFor="startDate" className="block text-gray-600 mb-2">
                Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="border-b border-gray-400 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-gray-600 mb-2">
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="border-b border-gray-400 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
