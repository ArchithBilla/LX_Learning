import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    Card,
    CardContent,
    CardActions,
} from "@mui/material";
import InstructorLedTraining from "../assests/images/industryLedTraining.png";

import "./InstructorLedTrainings.css";

function InstructorLedTrainings() {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedPartners, setSelectedPartners] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [availablePartners, setAvailablePartners] = useState([]);
    const [showCertifications, setShowCertifications] = useState(true);
    const [showTrainings, setShowTrainings] = useState(false);

    useEffect(() => {
        fetch("/courses.json") // Assuming your JSON data is in the public directory
            .then((response) => response.json())
            .then((data) => {
                const uniqueCategories = new Set();
                data.forEach((course) => {
                    uniqueCategories.add(course["Main - Category"]);
                });
                const categoryArray = Array.from(uniqueCategories);
                setCategories(categoryArray);
                setCourses(data);

                // Default select the first category
                if (categoryArray.length > 0) {
                    handleCategoryClick(categoryArray[0], data);
                }
            })
            .catch((error) => console.error("Error fetching courses data:", error));
    }, []);

    const handleCategoryClick = (category, data = courses) => {
        if (selectedCategories.includes(category)) {
            // Remove category if already selected
            const updatedCategories = selectedCategories.filter((c) => c !== category);
            setSelectedCategories(updatedCategories);

            // Update filtered courses and available partners
            const filtered = data.filter((course) =>
                updatedCategories.includes(course["Main - Category"])
            );
            setFilteredCourses(filtered);
            setAvailablePartners(
                Array.from(new Set(filtered.map((course) => course.Partner)))
            );
        } else {
            // Add category to selection
            const updatedCategories = [...selectedCategories, category];
            setSelectedCategories(updatedCategories);

            // Update filtered courses and available partners
            const filtered = data.filter((course) =>
                updatedCategories.includes(course["Main - Category"])
            );
            setFilteredCourses(filtered);
            setAvailablePartners(
                Array.from(new Set(filtered.map((course) => course.Partner)))
            );
        }
    };

    const handleFilterChange = (partner) => {
        if (selectedPartners.includes(partner)) {
            setSelectedPartners(selectedPartners.filter((p) => p !== partner));
        } else {
            setSelectedPartners([...selectedPartners, partner]);
        }
    };

    const handleCheckboxChange = (type) => {
        if (type === "Certifications") {
            setShowCertifications(!showCertifications);
        } else if (type === "Trainings") {
            setShowTrainings(!showTrainings);
        }
    };

    // Filter the displayed courses based on selected partners, categories, and checkboxes
    const displayedCourses = filteredCourses.filter((course) => {
        if (selectedPartners.length > 0 && !selectedPartners.includes(course.Partner)) {
            return false;
        }
        console.log(!showCertifications && course.Type === "Certification")
        if (!showCertifications && course.Objective === "Certification") {
            return false;
        }
        if (!showTrainings && course.Objective !== "Certification") {
            return false;
        }
        return true;
    });

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            {/* Image Section */}
            <Box>
                <img
                    src={InstructorLedTraining}
                    alt="Instructor Led Training"
                    style={{ width: "100%", height: "auto" }}
                />
            </Box>

            <Box className="Browse-Section">
                {/* Title Section */}
                <Typography variant="h4" className="title">
                    Browse through our trending courses
                </Typography>

                {/* Categories Section */}
                <Box className="search-section">
                    {categories.map((category, index) => (
                        <Button
                            key={index}
                            className={`category-button ${
                                selectedCategories.includes(category) ? "active" : ""
                            }`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </Box>
            </Box>

            {/* Filter Section */}
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
                            background: "#fff",
                        },
                        "& .MuiOutlinedInput-root:hover": {
                            borderColor: "#007FFF",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ccc",
                        },
                    }}
                />
                <Box className="checkbox-section">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showCertifications}
                                onChange={() => handleCheckboxChange("Certifications")}
                            />
                        }
                        label="Certifications"
                        className="filter-checkbox"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showTrainings}
                                onChange={() => handleCheckboxChange("Trainings")}
                            />
                        }
                        label="Trainings"
                        className="filter-checkbox"
                    />
                </Box>
            </Box>

            {/* Left and Right Sections */}
            <Box sx={{ display: "flex", width: "100%", p: 2 }}>
                {/* Left Section: Filters */}
                <Box sx={{ width: "25%", pr: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Filters
                        <Button
                            onClick={() => {
                                setSelectedPartners([]); // Clear only the selected checkboxes
                            }}
                            variant="text"
                            sx={{
                                mt: 2,
                                textTransform: "none",
                                color: "#0DAFFC",
                                marginLeft: "50%",
                                marginBottom: "8%",
                            }}
                        >
                            Clear all
                        </Button>
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                        Brands
                    </Typography>

                    {availablePartners.map((partner, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    checked={selectedPartners.includes(partner)}
                                    onChange={() => handleFilterChange(partner)}
                                />
                            }
                            label={partner}
                        />
                    ))}
                </Box>

                {/* Right Section: Cards */}
                <Box className="courses-section">
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {displayedCourses.length} Results found
                    </Typography>
                    <Box className="courses-grid">
                        {displayedCourses.map((course, index) => (
                            <Card key={index} className="course-card">
                                <CardContent>
                                    {/* Partner Logo */}
                                    <Typography variant="body2" color="text.secondary">
                                        {course.Partner || "Partner"}
                                    </Typography>
                                    {/* Course Title */}
                                    <Typography variant="h6" component="div">
                                        {course["Course Name"]}
                                    </Typography>
                                    {/* Category */}
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            background: "#f0f0f0",
                                            display: "inline-block",
                                            borderRadius: "15px",
                                            padding: "2px 8px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {course["Main - Category"]}
                                    </Typography>
                                    {/* Description */}
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            fontFamily: "'Nunito Sans', sans-serif",
                                            fontWeight: 400,
                                            lineHeight: 1.5,
                                            color: "#333333",
                                            letterSpacing: "0.015em",
                                        }}
                                    >
                                        {course["Course Description"] ||
                                            "Short description about the course appears here."}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#0056C3",
                                            height: "42px",
                                            width: "100px",
                                            fontSize: "15px",
                                            color: "#EEFAFF",
                                            fontFamily: "'Nunito', sans-serif",
                                        }}
                                    >
                                        Contact us
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default InstructorLedTrainings;
