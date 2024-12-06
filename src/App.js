import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";  // Correct import path
import Home from "./pages/Home";  // Correct import path
import Upload from "./pages/Upload";  // Correct import path
import Login from "./pages/Login";  // Correct import path
import Signup from "./pages/Signup";  // Correct import path

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Renders the Navbar component */}
      <Routes>
        <Route path="/" element={<Home />} />  {/* Default Home Page */}
        <Route path="/upload" element={<Upload />} />  {/* Upload page */}
        <Route path="/login" element={<Login />} />  {/* Login page */}
        <Route path="/signup" element={<Signup />} />  {/* Signup page */}
      </Routes>
    </Router>
  );
};

export default App;
