import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css";
import HeroSectionImage from "../assests/images/Home_Section_1.png";
import IndustryLedTrainingImage from "../assests/images/Industry_led_Training.png";
import LearningEnvironmentsImage from "../assests/images/Learning_Environments.png";
import PeopleSolutionsImage from "../assests/images/People_Solutions.png";

const contentMap = {
  "Human Capital Solutions": {
    heading: "Human Capital Solutions",
    image: PeopleSolutionsImage,
    buttonLabel: "View details",
    route: "/human-capital-solutions", // Add route for navigation
  },
  "Instructor Led Training": {
    heading: "",
    points: [
      "Interactive Learning: Encourages active participation through discussions and hands-on activities.",
      "Immediate Feedback: Provides real-time responses to enhance understanding.",
      "Personalized Attention: Adapts content to individual needs and learning styles.",
      "Collaborative Environment: Fosters teamwork and idea exchange among learners.",
    ],
    description:
      "Instructor-Led Training (ILT) involves real-time instruction by an expert, delivered in person (ILT), virtually (VILT), or through a blended (ILT+VILT) approach. This method promotes interactive learning, immediate feedback, personalized instruction, and collaborative discussions.",
    image: IndustryLedTrainingImage,
    buttonLabel: "Explore our wide range of courses",
    route: "/instructor-led-trainings", 
  },
  "Learning Environments": {
    heading: "On-Demand Virtual Labs",
    description:
      "Our on-demand virtual labs provide flexible, hands-on learning experiences accessible anytime, anywhere. Designed to fit within your schedule and budget, these labs offer safe practical training environments that enhance skill development and knowledge application.",
    points: [],
    image: LearningEnvironmentsImage,
    buttonLabel: "View details",
    route: "/on-demand-virtual-labs", 

  },
};

function Home() {
  
  const [activeButton, setActiveButton] = useState("Human Capital Solutions");
  const navigate = useNavigate(); // Use useNavigate for routing

  const buttons = Object.keys(contentMap);

  const handleButtonClick = () => {
    const route = contentMap[activeButton].route;
    if (route) {
      navigate(route); // Navigate to the specified route
    }
  };

  return (
    <div className="Home_Section">
      {/* Hero Section */}
      <Container className="hero-section">
        <img
          src={HeroSectionImage}
          alt="LX Learning Hero Section"
          className="hero-image"
        />
      </Container>

      {/* Buttons Section */}
      <Container className="button-section">
        <Box className="button-container">
          {buttons.map((button) => (
            <Button
              key={button}
              variant={activeButton === button ? "contained" : "outlined"}
              color={activeButton === button ? "primary" : "inherit"}
              onClick={() => setActiveButton(button)}
              className={`button-card ${activeButton === button ? "active" : ""
                }`}
              sx={{ textTransform: "none" }}
            >
              {button}
            </Button>
          ))}
        </Box>
      </Container>

      {/* Content Section */}
      <Container className="content-section">
        {activeButton === "Human Capital Solutions" ? (
          // Single section for "Human Capital Solutions"
          <Box className="single-image-container">
            <Box className="vertical-container">
              <img
                src={contentMap[activeButton].image}
                alt={contentMap[activeButton].heading}
                className="full-width-image"
              />
              <Button
                variant="contained"
                className="centered-button-Human-Capital-Solutions"
                onClick={handleButtonClick} // Call handleButtonClick on click
                sx={{ backgroundColor: "#0DAFFC" }}
              >
                {contentMap[activeButton].buttonLabel}
              </Button>
            </Box>
          </Box>
        ) : activeButton === "Instructor Led Training" ? (
          // Updated section for "Instructor Led Training"
          <Box className="two-column-container">
            {/* Left Section: Text */}
            <Box className="text-section">
              <Typography
                sx={{
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  marginBottom: "12rem",
                }}>
                {contentMap[activeButton].heading}
              </Typography>
              <Typography
                variant="body1"
                className="content-body"
                sx={{
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: "700", // Increase fontWeight here
                  marginBottom: "1rem",
                  fontSize:"18px !important"
                }}
              >
                {contentMap[activeButton].description}
              </Typography>

              <Typography variant="h6" sx={{
                fontFamily: '"Nunito", sans-serif',
                fontWeight: "400",
                fontSize:"18px",
                marginBottom: "-2.5%",
                color:"#343434"
              }}>
                Benefits:
              </Typography>
              <List>
                {contentMap[activeButton].points.map((point, index) => {
                  const [boldText, ...restText] = point.split(":");
                  return (
                    <ListItem
                      key={index}
                      sx={{
                        display: "list-item",
                        listStyleType: "disc",
                        paddingLeft: "5px",
                        paddingBottom: "0px",
                        paddingTop: "0px",
                        marginLeft:"5%",

                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography component="span" sx={{
                            fontFamily: '"Nunito", sans-serif',
                            fontWeight: "300",
                            color:"#343434 !important"
                          }}>
                            <strong >{boldText}:</strong> {restText.join(":")}
                          </Typography>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
              <Typography 
              sx={{
                fontFamily: '"Nunito", sans-serif',
                fontWeight: "400",
                fontSize:"18px",
                color:"#343434",
                marginBottom:"5%"
              }}
              >
                Incorporating ILT/VLT/Blended can enhance employee development and organizational performance.
                </Typography>
              <Button
                variant="contained"
                sx={{  backgroundColor: "#0DAFFC", width:'300px', fontWeight:"400 !important", textTransform:"none", marginBottom:"15%", color:"#EEFAFF !important"}}
                onClick={handleButtonClick} // Call handleButtonClick on click

              >
                {contentMap[activeButton].buttonLabel}
              </Button>
            </Box>

            {/* Right Section: Image */}
            <Box className="image-section">
              <img
                src={contentMap[activeButton].image}
                alt={contentMap[activeButton].heading}
                className="responsive-image"
              />
            </Box>
          </Box>
        ) :activeButton === "Learning Environments" ? (
          // Two sections for "Learning Environments"
          <Box className="two-column-container">
            {/* Left Section: Text */}
            <Box className="text-section">
                <Typography
                variant="body1"
                className="content-body"
                sx={{
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: "700 !important",
                  fontSize: "18px",
                  marginBottom: "1.5rem",
                  lineHeight: "1.6",
                  color: "#333", // Neutral dark text colorss

                }}
              >
                {contentMap[activeButton].description}
              </Typography>
              <Button
                variant="contained"
                onClick={handleButtonClick} // Call handleButtonClick on click
                sx={{
                  backgroundColor: "#0DAFFC", // Button color
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: "400",
                  fontSize: "16px",
                  textTransform: "none",
                  borderRadius: "5px",
                  boxShadow: "none",
                  color:"#EEFAFF"
                }}
              >
                {contentMap[activeButton].buttonLabel}
              </Button>
            </Box>
        
            {/* Right Section: Image */}
            <Box className="image-section-learning-environments">
              <img
                src={contentMap[activeButton].image}
                alt={contentMap[activeButton].heading}
                className="responsive-image"
                style={{
                  maxWidth: "100%",
                  height: "50vh",
                }}
              />
            </Box>
          </Box>
        ) : null}
      </Container>
    </div>
  );
}

export default Home;
