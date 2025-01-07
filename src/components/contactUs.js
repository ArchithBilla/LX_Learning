import React, { useState, forwardRef } from "react";
import { TextField, Button, MenuItem, Box, Stack } from "@mui/material";
import "./contactUs.css";

// Wrap the ContactUs component with React.forwardRef
const ContactUs = forwardRef((props, ref) => {
  const initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    companyName: "",
    companySize: "",
    jobTitle: "",
    jobLevel: "",
    solutionNeeded: "",
    otherSpecificNeeds: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    companyName: "",
    companySize: "",
    jobTitle: "",
    jobLevel: "",
    solutionNeeded: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (["firstName", "lastName", "location", "jobTitle"].includes(name)) {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFormValues({ ...formValues, [name]: value });
        setErrors({ ...errors, [name]: "" });
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
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key].trim() && key !== "otherSpecificNeeds") {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Data:", formValues);
      alert(JSON.stringify(formValues, null, 2));
      setFormValues(initialFormValues);
    }
  };

  return (
    <div ref={ref}>
      <h1 className="form-heading">Get in touch</h1>
      <div className="contact-us-container">
        <div className="contact-us-text">
          <h4>Partner with LX Learning to empower your workforce with:</h4>
          <ul>
            <li>
              <strong>Strategic Learning:</strong> Align training programs with
              your organizational goals to drive results.
            </li>
            <li>
              <strong>Future-Ready Teams:</strong> Equip your workforce to lead
              with confidence in a dynamic, evolving world.
            </li>
            <li>
              <strong>Tailored Training:</strong> Access 5,000+ curated courses
              to upskill and reskill your team.
            </li>
            <li>
              <strong>Certification Excellence:</strong> Prepare employees for
              100+ industry-recognized certifications with expert guidance.
            </li>
            <li>
              <strong>Virtual Labs:</strong> Build technical expertise through
              hands-on, risk-free practice.
            </li>
            <li>
              <strong>Immersive Onboarding:</strong> Seamlessly integrate new
              talent with project-ready training solutions.
            </li>
          </ul>
        </div>

        <div className="contact-us-form">
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  className="textfield"
                  label="First name"
                  fullWidth
                  required
                  variant="outlined"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                />
                <TextField
                  className="textfield"
                  label="Last name"
                  fullWidth
                  required
                  variant="outlined"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                />
              </Stack>
              <TextField
                className="textfield"
                label="Email"
                fullWidth
                required
                variant="outlined"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                className="textfield"
                label="Phone number"
                fullWidth
                required
                variant="outlined"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
              />
              <TextField
                className="textfield"
                label="Location"
                fullWidth
                required
                variant="outlined"
                name="location"
                value={formValues.location}
                onChange={handleInputChange}
                error={Boolean(errors.location)}
                helperText={errors.location}
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  className="textfield"
                  label="Company name"
                  fullWidth
                  required
                  variant="outlined"
                  name="companyName"
                  value={formValues.companyName}
                  onChange={handleInputChange}
                  error={Boolean(errors.companyName)}
                  helperText={errors.companyName}
                />
                <TextField
                  className="textfield"
                  label="Company size"
                  fullWidth
                  required
                  select
                  variant="outlined"
                  name="companySize"
                  value={formValues.companySize}
                  onChange={handleInputChange}
                  error={Boolean(errors.companySize)}
                  helperText={errors.companySize}
                >
                  <MenuItem value="Micro (1–10 employees)">
                    Micro (1–10 employees)
                  </MenuItem>
                  <MenuItem value="Small (11–50 employees)">
                    Small (11–50 employees)
                  </MenuItem>
                  <MenuItem value="Medium (51–250 employees)">
                    Medium (51–250 employees)
                  </MenuItem>
                  <MenuItem value="Large (251–1000 employees)">
                    Large (251–1000 employees)
                  </MenuItem>
                  <MenuItem value="Enterprise (1001+ employees)">
                    Enterprise (1001+ employees)
                  </MenuItem>
                </TextField>
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  className="textfield"
                  label="Job title"
                  fullWidth
                  required
                  variant="outlined"
                  name="jobTitle"
                  value={formValues.jobTitle}
                  onChange={handleInputChange}
                  error={Boolean(errors.jobTitle)}
                  helperText={errors.jobTitle}
                />
                <TextField
                  className="textfield"
                  label="Job level"
                  fullWidth
                  required
                  select
                  variant="outlined"
                  name="jobLevel"
                  value={formValues.jobLevel}
                  onChange={handleInputChange}
                  error={Boolean(errors.jobLevel)}
                  helperText={errors.jobLevel}
                >
                  <MenuItem value="Junior">Junior</MenuItem>
                  <MenuItem value="Mid">Mid</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                </TextField>
              </Stack>
              <TextField
                className="textfield"
                label="Solution needed"
                fullWidth
                required
                variant="outlined"
                name="solutionNeeded"
                value={formValues.solutionNeeded}
                onChange={handleInputChange}
                error={Boolean(errors.solutionNeeded)}
                helperText={errors.solutionNeeded}
              />

              <TextField
                label="Other specific needs"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                name="otherSpecificNeeds"
                value={formValues.otherSpecificNeeds}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#0DAFFC",
                  "&:hover": {
                    backgroundColor: "#008DCB",
                  },
                }}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </div>
      </div>
    </div>
  );
});

export default ContactUs;
