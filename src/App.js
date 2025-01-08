import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import GetInTouch from "./components/GetInTouch";
import Footer from "./components/Footer";
import HumanCapitalSolutions from "./components/HumanCapitalSolutions";
import InstructorLedTrainings from "./components/InstructorLedTrainings";
import OnDemandVirtualLabs from "./components/OnDemandVirtualLabs";
import GenAICourses from "./components/GenAiCourses"; // Import the new component
import ScrollToTop from "./components/scrollreset"; // Import the ScrollToTop component
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
  },
});



function App() {
  const contactRef = useRef(null); // Create a ref for the GetInTouch component

  return (
    // <ThemeProvider theme={theme}>
    <Router>
            <ScrollToTop /> {/* Add this here */}
      <Header contactRef={contactRef} /> {/* Pass the ref to the Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/human-capital-solutions" element={<HumanCapitalSolutions />} />
        <Route path="/instructor-led-trainings" element={<InstructorLedTrainings />} />
        <Route path="/on-demand-virtual-labs" element={<OnDemandVirtualLabs />} />
        <Route path="/gen-ai-courses" element={<GenAICourses />} /> {/* Add new route */}
      </Routes>
      <GetInTouch ref={contactRef} /> {/* Attach the ref */}
      <Footer />
    </Router>
    // </ThemeProvider>
  );
}

export default App;
