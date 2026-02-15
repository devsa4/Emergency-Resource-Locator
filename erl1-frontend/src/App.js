import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmergencyDashboard from './EmergencyDashboard';
import AboutPage from './AboutPage';
import FAQPage from './FAQPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* This sets the Dashboard as the home page */}
        <Route path="/" element={<EmergencyDashboard />} />
        {/* This sets the route for the About page */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </Router>
  );
}

export default App;