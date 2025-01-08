import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    MenuItem,
    TextField,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./contactUs.css";

const ContactUsModal = ({ isOpen, onClose, selectedCard = false }) => {
    const initialFormValues = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        country: "",
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

    const handleClose = () => {
        setFormValues(initialFormValues); // Reset form values
        setErrors({}); // Reset errors
        onClose(); // Close the modal
    };

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box className="modal__container">
                <Box className="modal-header">
                    <Typography variant="h6" className="modal-title">
                        Contact Us
                    </Typography>
                    <IconButton onClick={handleClose} className="close-button">
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Typography className="modal-description">
                    Please help us by filling the following details to provide you more
                    information.
                </Typography>

                <Box component="form" className="form-container" onSubmit={handleSubmit}>
                    {/* Prepopulated Field */}
                    
                  {selectedCard == null ? null : ( <TextField
                        value={selectedCard || ""}
                        variant="outlined"
                        fullWidth
                        className="form-input"
                        disabled
                    />)} 

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

export default ContactUsModal;
