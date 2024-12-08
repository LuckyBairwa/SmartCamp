import { useState } from 'react'
import HeroSection from './component/HeroSection'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeaveApplication from "./pages/LeaveApplication";
import ParkingSlots from "./pages/ParkingSlots";
import SmartCanteen from "./pages/SmartCanteen";
import Navbar from './component/Navbar';
import StudentList from './pages/StudentList';
import BookedSlots from './pages/BookedSlots';
import Footer from './component/Footer';


function App() {
  const [students, setStudents] = useState([]);
  return (
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/leave-application" element={<LeaveApplication setStudents={setStudents} />} />
      <Route path="/students" element={<StudentList students={students} />} />
        <Route path="/parking-slots" element={<ParkingSlots />} />
        <Route path="/booked-slots" element={<BookedSlots />} />
        <Route path="/smart-canteen" element={<SmartCanteen />} />
      </Routes> 
      <Footer/>
    </Router>
  )
}

export default App
