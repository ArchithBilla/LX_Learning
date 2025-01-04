import React from "react";
import { Box, Typography, Button } from "@mui/material";
import "./OnDemandVirtualLabs.css";
import OnDemandVirtualLabs_1 from "../assests/images/OnDemandVirtualLabs_1.png";
import icon from "../assests/images/sandbox_icon.png"

function OnDemandVirtualLabs() {

  const data = [
    {
      title: "Sandboxes paired for instructor led learning & content",
      description: "Sandboxes for pairing with Instructor learning and content from various partners.",
    },
    {
      title: "Experimentation with new technologies",
      description: "Seamlessly test-drive and integrate cutting-edge tech in secure sandbox environments helping roll out of cutting-edge features and meet customer requirements.",
    },
    {
      title: "Simulation of customer environments",
      description: "Identify and resolve bugs in simulated customer environments, ensuring flawless deployments.",
    },
    {
      title: "Hackathons & POCs",
      description: "Scalable sandbox environments with tools and APIs for collaborative innovation and transformative solutions during hackathons.",
    },
    {
      title: "Customer enablement and certification",
      description: "Structured sandbox for guided learning and assessments, empowering customers with essential skills and certifications.",
    },
    {
      title: "Dive in-depth to track learning progress",
      description: "Challenge employees with real-world scenarios, tracking and fostering measurable skills development.",
    },
  ];

  
  return (
    <Box className="virtual-labs-container">
      {/* Section 1 */}
      <Box className="virtual-labs-section">
        <img
          src={OnDemandVirtualLabs_1}
          alt="On-Demand Virtual Labs"
          className="section-image"
        />
      </Box>

      {/* Section 2 */}
      <Box className="virtual-labs-section benefits-section">
        <Typography variant="body1" className="benefits-intro">
          Our on-demand virtual labs provide flexible, hands-on learning
          experiences accessible anytime, anywhere. Designed to fit within your
          schedule and budget, these labs offer safe practical training
          environments that enhance skill development and knowledge application.
        </Typography>
        <Box className="benefits-list">
          <Box className="benefits-column">
            <ul>
              <li>Hands-On Experience</li>
              <li>Accessibility</li>
              <li>Cost-Effective Learning</li>
              <li>Enhanced Engagement</li>
            </ul>
          </Box>
          <Box className="benefits-column">
            <ul>
              <li>Safe Learning Environment</li>
              <li>Collaboration and Sharing</li>
              <li>Customized Learning Experiences</li>
              <li>Integration with Educational Content</li>
            </ul>
          </Box>
        </Box>
      </Box>

      {/* Section 3 */}
<Box className="virtual-labs-sandbox-section">
      <Typography variant="h4" className="section-title">
        Sandboxes for your custom needs
      </Typography>
      <Box className="grid-container">
        {data.map((item, index) => (
          <Box key={index} className="grid-item">
            <img
              src={icon} // Replace this with your cube icon path
              alt="Sandbox Icon"
              className="icon"
            />
            <Typography variant="h6" className="grid-title">
              {item.title}
            </Typography>
            <Typography variant="body2" className="grid-description">
              {item.description}
            </Typography>
            <Button variant="contained" className="contact-button">
              Contact us
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
    </Box>
  );
}

export default OnDemandVirtualLabs;
