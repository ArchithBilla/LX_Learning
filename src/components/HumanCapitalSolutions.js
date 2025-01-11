import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import "./HumanCapitalSolutions.css";
import AlignAssess_Image from "../assests/images/AlignAssess_Image.png";
import Assess_Image from "../assests/images/Assess_Image.png";
import HumanCapitalSolutionsEmpower from "../assests/images/HumanCapitalSolutionsEmpower.png"
import EmpowerDevelop from "../assests/images/Empower&Devolop.png"
import ContactUs from "./contactUs";


function HumanCapitalSolutions() {
  const [activeButton, setActiveButton] = useState("align");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      {/* Fullscreen Image Section */}
      <Box className="fullscreen-image">
      </Box>

      {/* Section 2 */}
      <Box className="stats-section">
        <Box className="stats-img"></Box>
      </Box>

      {/* Section 3 */}
      <Box className="button-container-humanCapital">
        <Button
          className={`custom-button ${activeButton === "align" ? "active" : ""
            }`}
          onClick={() => setActiveButton("align")}
        >
          Align & Assess
        </Button>
        <Button
          className={`custom-button ${activeButton === "empower" ? "active" : ""
            }`}
          onClick={() => setActiveButton("empower")}
        >
          Empower & Develop
        </Button>
      </Box>

      {/* Conditional Rendering for Section 4 */}
      {activeButton === "align" ? (
        <>
        <Box className="image-section-HumanCapital">
          <Box className="align-assess-img">
            <img
              src={AlignAssess_Image}
              alt="Align & Assess"
              className="section-image"
            />
          </Box>
          <Box className="empower-develop-img">
            <img
              src={Assess_Image}
              alt="Empower & Develop"
              className="section-image"
            />
          </Box>
          <Box className="industries-section">
        <Typography variant="h4" className="industries-heading">
          Industries We Empower:
        </Typography>
        <Box className="industries-tags">
          {[
            "Technology",
            "Government",
            "Finance",
            "Retail",
            "Construction",
            "Manufacturing",
            "Transportation / Logistics",
            "Services",
            "Utilities & Energy",
          ].map((industry, index) => (
            <Box key={index} className="industry-tag">
              {industry}
            </Box>
          ))}
        </Box>
      </Box>
        </Box>
         <Box className="why-choose-us-section">
         <Box className="content-box">
           <Typography variant="h4" className="section-heading">
             Why Choose Us?
           </Typography>
           <ul className="benefits-list">
             <li>Proven results across diverse industries.</li>
             <li>
               Tools designed to integrate seamlessly with your current systems.
             </li>
             <li>Customizable solutions to match your organizational needs.</li>
           </ul>
           <Typography variant="body1" className="cta-text">
             Discover how our tailored OKR and Assessment solutions can elevate
             your team performance.
           </Typography>
           <Box className="cta-button-container">
             <Button variant="contained" className="cta-button" onClick={() => handleModalOpen()}
             >
               Talk to us
             </Button>
           </Box>
         </Box>
         <ContactUs
           isOpen={isModalOpen}
           onClose={handleModalClose}
           selectedCard={null}
 
         />
       </Box>
       </>
        
      ) : (
        <>
        <Box className="Empower-section">
        <img
              src={EmpowerDevelop}
              alt="Align & Assess"
              className="EmpowerDevelop-section-image"
            />
          <img
              src={HumanCapitalSolutionsEmpower}
              alt="Align & Assess"
              className="Empower-section-image"
            />
        </Box>
        <Box className="why-choose-us-section">
        <Box className="content-box">
          <Typography variant="h4" className="section-heading">
            Why Choose Us?
          </Typography>
          <ul className="benefits-list">
            <li>
              <strong>Holistic Development:</strong> Programs designed to empower employees at all levels, from entry-level talent to C-suite executives.
            </li>
            <li>
              <strong>Tailored Approach:</strong> Customized interventions that address unique organizational and individual needs.
            </li>
            <li>
              <strong>Strategic Growth:</strong> Alignment of development goals with business priorities for measurable outcomes.
            </li>
            <li>
              <strong>Comprehensive Offerings:</strong> Leadership coaching, technical skill enhancement, and behavioral training all in one place.
            </li>
            <li>
              <strong>Expert-Driven:</strong> Leverage insights from seasoned mentors and globally recognized certification programs.
            </li>
          </ul>
          <Typography variant="body1" className="cta-text">
            <span style={{ color: "#007FFF", cursor: "pointer" }}>
              Empower your workforce today—start your journey with us!
            </span>
          </Typography>
          <Box className="cta-button-container">
            <Button variant="contained" className="cta-button" onClick={() => handleModalOpen()}>
              Talk to us
            </Button>
          </Box>
        </Box>
        <ContactUs isOpen={isModalOpen} onClose={handleModalClose} selectedCard={null} />
      </Box>
</>      
      )}

     

      {/* Section 5 */}
     
    </>
  );
}

export default HumanCapitalSolutions;
