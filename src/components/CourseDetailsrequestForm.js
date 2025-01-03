import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetailsrequestForm.css";

const CourseDetailsrequestForm = ({ courses }) => {
  const { id } = useParams();
  const course = courses.find((c) => c["S.NO."] === id);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    companyName: "",
    companySize: "",
    numPeopleToTrain: "",
    additionalNotes: "",
  });

  const [errors, setErrors] = useState({});

  if (!course) {
    return <div>Course not found!</div>;
  }

  // Validation Logic
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone Number must contain only digits.";
    }
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.companyName.trim()) newErrors.companyName = "Company Name is required.";
    if (!formData.companySize) newErrors.companySize = "Company Size is required.";
    if (!formData.numPeopleToTrain) newErrors.numPeopleToTrain = "This field is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form Data:", formData); // Logs all form data to the console
      alert("Form submitted successfully!");
    } else {
      console.log("Form validation failed:", errors); // Logs any validation errors
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, email: null })); // Clear error when empty
      } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prev) => ({ ...prev, email: null })); // Clear error when valid
      } else {
        setErrors((prev) => ({ ...prev, email: "Invalid email format." })); // Set error when invalid
      }
    }

    // Restrict input for names to only letters
    if ((name === "firstName" || name === "lastName") && !/^[a-zA-Z]*$/.test(value)) {
      return;
    }

    // Restrict phone to numbers only
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-container">
      <div className="form-right">
      <h3 className="styled-heading">
  Contact Us to Know More About <span>{course["Course Name"]}</span>
</h3>        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Work Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
          </div>
          <div className="form-group">
            <label>Where are you located? *</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select...
              </option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              <option value="India">India</option>
              <option value="Other">Other</option>
            </select>
            {errors.location && <p className="error">{errors.location}</p>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                required
              />
              {errors.companyName && <p className="error">{errors.companyName}</p>}
            </div>
            <div className="form-group">
              <label>Company Size *</label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select...
                </option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
              {errors.companySize && <p className="error">{errors.companySize}</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Number of People to Train *</label>
              <select
                name="numPeopleToTrain"
                value={formData.numPeopleToTrain}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select...
                </option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
              {errors.numPeopleToTrain && (
                <p className="error">{errors.numPeopleToTrain}</p>
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Additional Notes (Optional)</label>
            <textarea
              rows="2"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Tell us more about your requirements"
            ></textarea>
          </div>
          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseDetailsrequestForm;
