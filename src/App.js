import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ContactUs from "./components/contactUs";
import Footer from "./components/Footer";
import HumanCapitalSolutions from "./components/HumanCapitalSolutions";
import InstructorLedTrainings from "./components/InstructorLedTrainings";
import OnDemandVirtualLabs from "./components/OnDemandVirtualLabs";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/human-capital-solutions" element={<HumanCapitalSolutions />} />
        <Route path="/instructor-led-trainings" element={<InstructorLedTrainings />} />
        <Route path="/on-demand-virtual-labs" element={<OnDemandVirtualLabs />} />
      </Routes>
      <ContactUs />
      <Footer />
    </Router>
  );
}

export default App;
