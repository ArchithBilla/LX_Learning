import React, { useState, useEffect, useMemo } from "react";
import "./coursesCertificationsPage.css";
import { Link } from "react-router-dom";

const CoursesCertificationsPage = () => {
  const [courses, setCourses] = useState([]);
  const [expandedSection, setExpandedSection] = useState({});
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState([]);
  const [selectedObjective, setSelectedObjective] = useState([]);

  // Fetch JSON Data
  useEffect(() => {
    fetch("/courses.json") // Replace with the path to your JSON file
      .then((response) => response.json())
      .then((data) => {
        const formattedCourses = data.map((course, index) => ({
          id: index + 1,
          name: course["Main - Category"] || "",
          subcategory: course["Sub Category"] || "",
          title: course["Course Name"] || "",
          description: course["Course Description"] || "",
          provider: course["Partner"] || "",
          objective: course["Objective"] || "",
        }));
        setCourses(formattedCourses);
      })
      .catch((error) => console.error("Error fetching JSON data:", error));
  }, []);

  // Handle checkbox toggle
  const toggleSelection = (value, selectedValues, setSelectedValues) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value) // Remove if already selected
        : [...prev, value] // Add if not selected
    );
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory([]);
    setSelectedSubcategory([]);
    setSelectedProvider([]);
    setSelectedObjective([]);
    setSearchTerm("");
  };

  // Filter courses dynamically
  const filteredCourses = useMemo(() => {
    let result = courses;

    if (searchTerm) {
      return courses.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm) ||
          course.title.toLowerCase().includes(searchTerm) ||
          course.provider.toLowerCase().includes(searchTerm) ||
          course.objective.toLowerCase().includes(searchTerm)
      );
    }

    if (selectedCategory.length > 0) {
      result = result.filter((course) => selectedCategory.includes(course.name));
    }

    if (selectedSubcategory.length > 0) {
      result = result.filter((course) => selectedSubcategory.includes(course.subcategory));
    }

    if (selectedProvider.length > 0) {
      result = result.filter((course) => selectedProvider.includes(course.provider));
    }

    if (selectedObjective.length > 0) {
      result = result.filter((course) => selectedObjective.includes(course.objective));
    }

    return result;
  }, [
    searchTerm,
    selectedCategory,
    selectedSubcategory,
    selectedProvider,
    selectedObjective,
    courses,
  ]);

  // Toggle card collapse
  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="courses-page">
      {/* Categories Section */}
      <div className="categories-container">
        <div
          className={`category-tab ${selectedCategory.length === 0 ? "active" : ""}`}
          onClick={() => setSelectedCategory([])} // Clear all selected categories
        >
          All Courses
        </div>
        {[...new Set(courses.map((c) => c.name))].map((category, index) => (
          <div
            key={index}
            className={`category-tab ${
              selectedCategory.includes(category) ? "active" : ""
            }`}
            onClick={() => toggleSelection(category, selectedCategory, setSelectedCategory)}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Search Bar */}
     

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <div className="sidebar">
    
  
  {/* Subcategories */}
  <div className="sidebar-section">
    <h3 onClick={() => setExpandedSection((prev) => ({ ...prev, subcategory: !prev.subcategory }))}>
      Specifications {expandedSection["subcategory"] ? "▲" : "▼"}
    </h3>
    {expandedSection["subcategory"] && (
      <div className="scrollable-section">
        <ul>
          {[...new Set(courses.map((c) => c.subcategory))].map((subcategory, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedSubcategory.includes(subcategory)}
                  onChange={() => toggleSelection(subcategory, selectedSubcategory, setSelectedSubcategory)}
                />
                {subcategory} ({courses.filter((course) => course.subcategory === subcategory).length})
              </label>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  {/* Providers */}
  <div className="sidebar-section">
    <h3 onClick={() => setExpandedSection((prev) => ({ ...prev, provider: !prev.provider }))}>
      Partners {expandedSection["provider"] ? "▲" : "▼"}
    </h3>
    {expandedSection["provider"] && (
      <div className="scrollable-section">
        <ul>
          {[...new Set(courses.map((c) => c.provider))].map((provider, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedProvider.includes(provider)}
                  onChange={() => toggleSelection(provider, selectedProvider, setSelectedProvider)}
                />
                {provider} ({courses.filter((course) => course.provider === provider).length})
              </label>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  {/* Objectives */}
  <div className="sidebar-section">
    <h3 onClick={() => setExpandedSection((prev) => ({ ...prev, objective: !prev.objective }))}>
      Objectives {expandedSection["objective"] ? "▲" : "▼"}
    </h3>
    {expandedSection["objective"] && (
      <div className="scrollable-section">
        <ul>
          {[...new Set(courses.map((c) => c.objective))].map((objective, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedObjective.includes(objective)}
                  onChange={() => toggleSelection(objective, selectedObjective, setSelectedObjective)}
                />
                {objective} ({courses.filter((course) => course.objective === objective).length})
              </label>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  {/* Reset Filters Button */}
  <button className="reset-filters-button" onClick={resetFilters}>
    Reset Filters
  </button>

  
</div>


        {/* Courses Section */}
        <div className="courses">
        <div className="search-bar">
        <input
          type="text"
          placeholder="Search a course..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
          <p className="results-count">
            {filteredCourses.length > 0
              ? `Your search resulted in ${filteredCourses.length} ${filteredCourses.length === 1 ? "result" : "results"}`
              : "No courses match your search criteria."}
          </p>
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`course-card ${expandedCard === course.id ? "expanded" : ""}`}
              onClick={() => toggleCard(course.id)}
            >
              <div className="course-header">
                <h2>{course.title}</h2>
                <span className="toggle-icon">
                  {expandedCard === course.id ? "▲" : "▼"}
                </span>
              </div>
              {expandedCard === course.id && (
                <div className="course-details">
                  <p>
                    <strong>Description:</strong> {course.description || "N/A"}
                  </p>
                  <Link to={`/course/${course.id}`} className="know-more">
                    Know More
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesCertificationsPage;
