import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Checkbox, FormControlLabel, InputAdornment,IconButton} from '@mui/material';
import InstructorLedTraining from "../assests/images/industryLedTraining.png";
import SearchIcon from "@mui/icons-material/Search";

import './InstructorLedTrainings.css'

function InstructorLedTrainings() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("/courses.json") // Assuming your JSON data is in the public directory
            .then((response) => response.json())
            .then((data) => {
                const uniqueCategories = new Set();
                data.forEach(course => {
                    uniqueCategories.add(course["Main - Category"]);
                });
                setCategories(Array.from(uniqueCategories));
            })
            .catch((error) => console.error("Error fetching courses data:", error));
    }, []);

    return (
        <Box sx={{ width: '100%', p: 2 }}>

           {/* Image Section */}
           <Box  >
                <img
                    src={InstructorLedTraining}
                    alt="Instructor Led Training"
                    style={{ width: '100%', height: 'auto' }}
                />
            </Box>
            <Box className = "Browse-Section">
            {/* Title Section */}
            <Typography variant="h4" className="title">
                Browse through our trending courses
            </Typography>

            {/* Categories Section */}
            <Box className="search-section">
                {categories.map((category, index) => (
                    <Button key={index} variant="contained" className="category-button">
                        {category}
                    </Button>
                ))}
            </Box>

            {/* Search and Filter Section */}
            <Box className="filter-section">
                <TextField
                    variant="outlined"
                    placeholder="Search courses"
                    className="search-bar"
                    sx={{
                      borderRadius: "25px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "25px",
                        padding: "0px 15px",
                        background: "#fff",                      },
                      "& .MuiOutlinedInput-root:hover": {
                        borderColor: "#007FFF",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                />
                <Box className="checkbox-section">
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Certifications"
                        className="filter-checkbox"
                    />
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Trainings"
                        className="filter-checkbox"
                    />
                </Box>
            </Box>
        </Box>


           

            {/* Placeholder for other content */}
            <Typography variant="h4" sx={{ mt: 2 }}>Browse Courses</Typography>
            <Typography variant="body1">Explore our courses to enhance your skills.</Typography>
        </Box>
    );
}

export default InstructorLedTrainings;
