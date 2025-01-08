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
import { useLocation } from "react-router-dom";
import ContactUsModal from "./contactUs"

import "./InstructorLedTrainings.css";

function InstructorLedTrainings() {
    const [categories, setCategories] = useState([]); // All categories
    const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
    const [selectedCard, setSelectedCard] = useState(""); // To pass the selected course name to the modal

    const [courses, setCourses] = useState([]); // Courses to display
    const [filteredCourses, setFilteredCourses] = useState([]); // Filtered courses
    const [availablePartners, setAvailablePartners] = useState([]); // Partners (brands)
    const [selectedPartners, setSelectedPartners] = useState([]); // Selected filters
    const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories
    const [searchValue, setSearchValue] = useState(""); // Local search bar value
    const [showCertifications, setShowCertifications] = useState(true);
    const [showTrainings, setShowTrainings] = useState(false);
    const [fullCourses, setFullCourses] = useState([])

    const location = useLocation(); // Access global search data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/courses.json");
                const data = await response.json();

                setFullCourses(data)
                // Extract all unique categories
                const uniqueCategories = new Set(
                    data.map((course) => course["Main - Category"])
                );
                const categoryArray = Array.from(uniqueCategories);
                setCategories(categoryArray);

                // If search data exists in location.state, use it
                if (location.state && location.state.searchedData) {
                    const { searchedData, searchTerm } = location.state;

                    setCourses(searchedData); // Populate courses with filtered data
                    setFilteredCourses(searchedData); // Show filtered courses
                    setSearchValue(searchTerm); // Reflect search term in local search bar

                    // Update categories to highlight based on search data
                    const searchedCategories = new Set(
                        searchedData.map((course) => course["Main - Category"])
                    );
                    // setSelectedCategories(Array.from(searchedCategories)); // Highlight relevant categories

                    // Update partners for filtered courses
                    const filteredPartners = Array.from(
                        new Set(searchedData.map((course) => course.Partner))
                    );
                    setAvailablePartners(filteredPartners);
                } else {
                    // Otherwise, set courses to all data
                    setCourses(data);

                    if (categoryArray.length > 0) {
                        // Automatically select the first category
                        const firstCategory = categoryArray[0];
                        setSelectedCategories([firstCategory]); // Set the first category as selected
                        const filtered = data.filter(
                            (course) => course["Main - Category"] === firstCategory
                        );
                        setFilteredCourses(filtered); // Filter the courses for the first category
                        const partners = Array.from(
                            new Set(filtered.map((course) => course.Partner))
                        );
                        setAvailablePartners(partners); // Update available partners
                    } else {
                        setFilteredCourses(data);
                    }
                }
            } catch (error) {
                console.error("Error fetching courses data:", error);
            }
        };

        fetchData();
    }, [location.state]);

    const handleContactUsClick = (courseName) => {
        setSelectedCard(courseName); // Set the selected course name
        setIsModalOpen(true); // Open the modal
    };

    const handleCategoryClick = (category) => {
        setSearchValue(""); // Clear the local search bar when a tag is clicked

        if (selectedCategories.includes(category)) {

            // Remove category if already selected
            const updatedCategories = selectedCategories.filter((c) => c !== category);
            setSelectedCategories(updatedCategories);

            // Update filtered courses and available partners
            const filtered = fullCourses.filter((course) =>
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
            const filtered = fullCourses.filter((course) =>
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

    const handleLocalSearchChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);

        // Filter courses based on search term
        if (!value) {
            setFilteredCourses([]);
        } else {
            const lowercasedValue = value.toLowerCase();
            const filtered = fullCourses.filter((course) =>
                Object.values(course).some((field) =>
                    String(field).toLowerCase().includes(lowercasedValue)
                )
            );

            setFilteredCourses(filtered);

            // Update available partners for the filtered courses
            const filteredPartners = Array.from(
                new Set(filtered.map((course) => course.Partner))
            );
            setAvailablePartners(filteredPartners);
        }
    };

    // Filter the displayed courses based on selected partners, categories, and checkboxes
    const displayedCourses = filteredCourses.filter((course) => {
        if (selectedPartners.length > 0 && !selectedPartners.includes(course.Partner)) return false;
        if (!showCertifications && course.Objective === "Certification") return false;
        if (!showTrainings && course.Objective !== "Certification") return false;
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
                            className={`category-button ${selectedCategories.includes(category) ? "active" : ""
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
                    value={searchValue}
                    onChange={handleLocalSearchChange}
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
                <Box sx={{ width: "35%", pr: 2, borderRight: "1px solid #ccc" }}>
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
                                        onClick={() => handleContactUsClick(course["Course Name"])} // Pass the course name
                                    >
                                        Contact us
                                    </Button>

                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Box>
            <ContactUsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} // Close the modal
                selectedCard={selectedCard} // Pass the selected course name
            />

        </Box>
    );
}

export default InstructorLedTrainings;
