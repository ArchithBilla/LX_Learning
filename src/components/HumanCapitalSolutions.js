import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import "./HumanCapitalSolutions.css";
import AlignAssess_Image from "../assests/images/AlignAssess_Image.png";
import Assess_Image from "../assests/images/Assess_Image.png";

function HumanCapitalSolutions() {
  const [activeButton, setActiveButton] = useState("align");

  return (
    <>
      {/* Fullscreen Image Section */}
      <Box className="fullscreen-image">
        <Box className="floating-text">
          <Typography variant="p" className="floating-title">
            Capability Building to
          </Typography>
          <Typography variant="h2" className="floating-subtitle">
            Empower Organizations
          </Typography>
        </Box>
      </Box>

      {/* Section 2 */}
      <Box className="stats-section">
        <Box className="stats-img"></Box>
      </Box>

      {/* Section 3 */}
      <Box className="button-container">
        <Button
          className={`custom-button ${
            activeButton === "align" ? "active" : ""
          }`}
          onClick={() => setActiveButton("align")}
        >
          Align & Assess
        </Button>
        <Button
          className={`custom-button ${
            activeButton === "empower" ? "active" : ""
          }`}
          onClick={() => setActiveButton("empower")}
        >
          Empower & Develop
        </Button>
      </Box>

      {/* Conditional Rendering for Section 4 */}
      {activeButton === "align" ? (
        <Box className="image-section">
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
        </Box>
      ) : (
        <Box className="placeholder-section">
          <Typography variant="h4" className="section-heading">
            Empower & Develop Section
          </Typography>
          <Typography variant="body1">
            Placeholder content for the Empower & Develop section.
          </Typography>
        </Box>
      )}
      
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

      {/* Section 5 */}
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
            <Button variant="contained" className="cta-button">
              Talk to us
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HumanCapitalSolutions;
