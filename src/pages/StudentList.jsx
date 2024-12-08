import React, { useEffect, useState } from "react";

export default function StudentsList() {
  const [students, setStudents] = useState([]);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Students Leave Applications
        </h1>
        {students.length === 0 ? (
          <p className="text-gray-500">No applications submitted yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Roll Number</th>
                <th className="border border-gray-300 px-4 py-2">Reason</th>
                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                <th className="border border-gray-300 px-4 py-2">End Date</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.rollNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.reason}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.startDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
