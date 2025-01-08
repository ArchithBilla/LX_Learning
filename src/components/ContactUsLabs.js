import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./ContactUsLabs.css";

const ContactFormModal = ({ isOpen, onClose, selectedCard }) => {
  const initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    country: "",
    skillOrCompetency: "",
    duration: "",
    numberOfUsers: "",
    message: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validation for specific fields
    if (["firstName", "lastName"].includes(name)) {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFormValues({ ...formValues, [name]: value });
        setErrors({ ...errors, [name]: "" });
      } else {
        setErrors({ ...errors, [name]: "Only alphabets are allowed" });
      }
    } else if (name === "email") {
      setFormValues({ ...formValues, [name]: value });
      if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value) &&
        value !== ""
      ) {
        setErrors({ ...errors, email: "Invalid email format" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    } else if (name === "phoneNumber") {
      if (/^[0-9]*$/.test(value)) {
        setFormValues({ ...formValues, [name]: value });
        if (value.length !== 10 && value.length > 0) {
          setErrors({
            ...errors,
            phoneNumber: "Phone number must be 10 digits",
          });
        } else {
          setErrors({ ...errors, phoneNumber: "" });
        }
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
      if (!value.trim()) {
        setErrors({ ...errors, [name]: "This field is required" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key].trim() && key !== "message") {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted:", formValues);
      alert("Form submitted successfully!");
      setFormValues(initialFormValues); // Reset form values
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="modal-container">
        <Box className="modal-header">
          <Typography variant="h6" className="modal-title">
            Contact Us
          </Typography>
          <IconButton onClick={onClose} className="close-button">
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography className="modal-description">
          Please help us by filling the following details to provide you more
          information.
        </Typography>

        <Box component="form" className="form-container" onSubmit={handleSubmit}>
          {/* Prepopulated Field */}
          <TextField
            value={selectedCard || ""}
            variant="outlined"
            fullWidth
            className="form-input"
            disabled
          />

          {/* First and Last Name */}
          <Box className="name-fields">
            <TextField
              label="First name"
              name="firstName"
              variant="outlined"
              fullWidth
              className="form-input"
              value={formValues.firstName}
              onChange={handleInputChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
            <TextField
              label="Last name"
              name="lastName"
              variant="outlined"
              fullWidth
              className="form-input"
              value={formValues.lastName}
              onChange={handleInputChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </Box>

          {/* Work Email */}
          <TextField
            label="Work Email"
            name="email"
            variant="outlined"
            fullWidth
            className="form-input"
            value={formValues.email}
            onChange={handleInputChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />

          {/* Company Name */}
          <TextField
            label="Company name"
            name="companyName"
            variant="outlined"
            fullWidth
            className="form-input"
            value={formValues.companyName}
            onChange={handleInputChange}
            error={Boolean(errors.companyName)}
            helperText={errors.companyName}
          />

          {/* Country */}
          <TextField
            label="Country"
            name="country"
            variant="outlined"
            select
            fullWidth
            className="form-input"
            value={formValues.country}
            onChange={handleInputChange}
            error={Boolean(errors.country)}
            helperText={errors.country}
          >
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
          </TextField>

          {/* Phone Number */}
          <TextField
            label="Phone number"
            name="phoneNumber"
            variant="outlined"
            fullWidth
            className="form-input"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber}
          />

          {/* Skill or Competencies */}
          <TextField
            label="Skill or competencies you are looking for..."
            name="skillOrCompetency"
            variant="outlined"
            select
            fullWidth
            className="form-input"
            value={formValues.skillOrCompetency}
            onChange={handleInputChange}
            error={Boolean(errors.skillOrCompetency)}
            helperText={errors.skillOrCompetency}
          >
            <MenuItem value="Skill 1">Skill 1</MenuItem>
            <MenuItem value="Skill 2">Skill 2</MenuItem>
            <MenuItem value="Skill 3">Skill 3</MenuItem>
          </TextField>

          {/* Duration */}
          <TextField
            label="Select duration..."
            name="duration"
            variant="outlined"
            select
            fullWidth
            className="form-input"
            value={formValues.duration}
            onChange={handleInputChange}
            error={Boolean(errors.duration)}
            helperText={errors.duration}
          >
            <MenuItem value="1 month">1 month</MenuItem>
            <MenuItem value="3 months">3 months</MenuItem>
            <MenuItem value="6 months">6 months</MenuItem>
          </TextField>

          {/* Number of Users */}
          <TextField
            label="Number of users..."
            name="numberOfUsers"
            variant="outlined"
            select
            fullWidth
            className="form-input"
            value={formValues.numberOfUsers}
            onChange={handleInputChange}
            error={Boolean(errors.numberOfUsers)}
            helperText={errors.numberOfUsers}
          >
            <MenuItem value="1-10">1-10</MenuItem>
            <MenuItem value="11-50">11-50</MenuItem>
            <MenuItem value="51-100">51-100</MenuItem>
          </TextField>

          {/* Message */}
          <TextField
            label="Message"
            name="message"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={formValues.message}
            onChange={handleInputChange}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#0DAFFC", marginTop: "1rem" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ContactFormModal;
