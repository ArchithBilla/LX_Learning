import React, { useRef,useEffect, useState } from "react";
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


function App() {
  const contactRef = useRef(null); // Create a ref for the GetInTouch component
  const [data, setData] = useState([])
  const [searchedData, setSearchedData] = useState([]);

   useEffect(() => {
          fetch("/courses.json") // Assuming your JSON data is in the public directory
              .then((response) => response.json())
              .then((data) => {
                  setData(data)
              })
              .catch((error) => console.error("Error fetching courses data:", error));
      }, []);


      const filterBySearch =(searchTerm)=>{
        if (!searchTerm) return data; // Return all data if no search term is provided

        const lowercasedTerm = searchTerm.toLowerCase();
      let resultData = data.filter((item) => {
          // Check if any key contains the search term
          return Object.values(item).some((value) =>
            String(value).toLowerCase().includes(lowercasedTerm)
          );
        });

        setSearchedData(resultData)

        return 
      }
  return (
    <Router>
            <ScrollToTop /> {/* Add this here */}
      <Header contactRef={contactRef} filterBySearch = {filterBySearch} searchedData= {searchedData} /> {/* Pass the ref to the Header */}
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
