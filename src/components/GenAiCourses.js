import React, { useState } from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import GenAiCourses_1 from "../assests/images/GenAiCourses_1.png";
import "./GenAiCourses.css";
import GenAIIcon from "../assests/images/GenAiIcon.png"
import ContactUs from "./contactUs";



function GenAICourses() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");


  const handleModalOpen = (title) => {
    setSelectedCard(title);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCard("");
  };


  const trainingModules = [
    {
      title: "Introduction to GenAI",
      details: [
        "History of AI/ML and GenAI",
        "GenAI fundamentals",
        "Introduction to LLMs, SLMs",
        "How is Generative AI different than traditional AI",
        "Basics of prompt engineering",
        "Overview of RAG"
      ],
    },
    {
      title: "Strategy and Board Imperative",
      details: [
        "GenAI/AI principles",
        "Responsible AI toolbox",
        "Enterprise use cases",
        "Where GenAI should not be used"
      ],
    },
    {
      title: "Learn by Doing",
      details: [
        "Learn ChatGPT, NotebookLM",
        "to do your day-to-day jobs"
      ],
    },
  ];

  const trainingModulesLeaders = [
    {
      title: "GenAI for HR and L&D functional leaders",
      details: [
        "Workforce planning and creating custom learning path for every associates in the organization",
        "Custom chatbots for HR related jobs, making it self service for employees",
        "Copilot for office365 (fundamentals)"
      ],
    },
    {
      title: "GenAI for Talent Acquisition leaders",
      details: [
        "Shortlisting right candidates relevant to the JD",
        "Auto generation of candidate's profiles summary",
        "Auto generation of interview assessment"
      ],
    },
    {
      title: "GenAI for Technical project managers",
      details: [
        "Managing end to end projects lifecycle from Planning to Closure",
        "Project planning",
        "Risk management",
        "Documentation",
        "Project monitoring",
        "Critical client communication such as scope, cost, effort, CRs etc"
      ],
    }
  ];

  const trainingModulesEngineers = [
    {
      title: "Fundamentals",
      details: [
        "History of AI/ML and GenAI",
        "GenAI fundamentals",
        "Introduction to LLMs, SLMs",
        "How is Generative AI different than traditional AI",
        "Basics of prompt engineering",
        "Overview of RAG",
        "Introduction of LLMs focused for software engineers",
        "Responsible AI in software development",
        "Introduction to GitHub Copilot",
        "Prompt engineering from engineers and developer view",
        "Understand features of GitHub Copilot",
        "SDLC impact of GenAI"
      ],
    },
    {
      title: "Advanced - GenAI application to improve engineering practices",
      details: [
        "Architectural considerations",
        "Code generation",
        "Code refactoring",
        "TDD and Unit test generation",
        "Fixing code issues",
        "Improved code performance",
        "Design patterns",
        "GitHub Copilot in real development environments and customization for team needs"
      ],
    },
    {
      title: "Learn by Doing - GitHub Copilot",
      details: [
        "Build apps leveraging GitHub Copilot",
        "Build your own playbook"
      ],
    }
  ];


  return (
    
    <Box className="gen-ai-container">
      {/* Section 1: Introduction */}
      <Box className="gen-ai-section intro-section">
        <img
          src={GenAiCourses_1}
          alt="Gen AI Courses"
          className="full-width-image"
        />
      </Box>

      {/* Section 2: Key Benefits */}

      <Box className="gen-ai-fatigue-section">
        <Typography variant="body1" className="gen-ai-fatigue-content">
          While “GenAI fatigue” may be setting in, organizations and employees
          need to stay vigilant and continually work to build their skills as
          these tools evolve. The difference between superficial use and
          contextual integrated use of GenAI capabilities is essential.
        </Typography>
      </Box>

      {/* Section 3: Course Categories */}
      <Typography variant="body1" className="GenAI-title">
        Our GenAI instructor led trainings
      </Typography>
      <Box className="root">
        <Typography variant="body1" className="GenAI-section-title">
          Gen AI Skills for all employees and leaders
        </Typography>
        <Box className="cards-container">  {/* Wrapper for cards to align them in a row */}
          {trainingModules.map(module => (
            <Card className="card">
              <CardContent>
                <Box> <img src={GenAIIcon} alt="Gen AI Icon" className="icon" /></Box>
                <Typography variant="h5" className="title">
                  {module.title}
                </Typography>
                <ul className="details-list">
                  {module.details.map(detail => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <Button
                  variant="contained"
                  className="contactButton"
                  onClick={() => handleModalOpen(module.title)}
                >
                  Contact us
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Section 4 */}
      <Box className="root-section-4">
        <Typography variant="body1" className="GenAI-section-title">
          Gen AI Skills for all functional leaders and managers
        </Typography>
        <Box className="cards-container">  {/* Wrapper for cards to align them in a row */}
          {trainingModulesLeaders.map(module => (
            <Card className="card-seaction-4">
              <CardContent>
                <Box> <img src={GenAIIcon} alt="Gen AI Icon" className="icon" /></Box>
                <Typography variant="h5" className="title">
                  {module.title}
                </Typography>
                <ul className="details-list">
                  {module.details.map(detail => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <Button
                  variant="contained"
                  className="contactButton"
                  onClick={() => handleModalOpen(module.title)}
                >
                  Contact us
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Section 5: Call to Action */}
      <Box className="root">
        <Typography variant="body1" className="GenAI-section-title">
          Gen AI Skills for engineers
        </Typography>
        <Box className="cards-container">  {/* Wrapper for cards to align them in a row */}
          {trainingModulesEngineers.map(module => (
            <Card className="card">
              <CardContent>
                <Box> <img src={GenAIIcon} alt="Gen AI Icon" className="icon" /></Box>
                <Typography variant="h5" className="title-engineers">
                  {module.title}
                </Typography>
                <ul className="details-list-engineers">
                  {module.details.map(detail => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <Button
                  variant="contained"
                  className="contactButton"
                  onClick={() => handleModalOpen(module.title)}
                >
                  Contact us
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <ContactUs
  isOpen={isModalOpen}
  onClose={handleModalClose}
  selectedCard={selectedCard}
/>

    </Box>
  );
}

export default GenAICourses;
