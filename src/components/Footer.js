import React from "react";
import { Box, Typography } from "@mui/material";
import "./Footer.css";

const Footer = () => {
  return (
    <Box className="footer">
      {/* Image Section */}
      <Box className="footer-image-section">
        <Box className="footer-image"></Box>
      </Box>

      {/* Contact Section */}
      <Box className="footer-contact-section">
        <Typography  className="footer-contact-title">
          <strong>Contact Us:</strong> +91 99899 57511 | Support@lxlearning.com
        </Typography>
      </Box>

      {/* Disclaimer Section */}
      <Box className="footer-disclaimer-section">
        <Typography className="footer-disclaimer-text">
          Disclaimer: The content on the website and/or Platform is for
          informational and educational purposes only. The user of this website
          and/or Platform (User) should not construe any such information as
          legal, investment, tax, financial, or any other advice. Nothing
          contained herein constitutes any representation, solicitation,
          recommendation, promotion, or advertisement on behalf of LX Learning
          and/or its Affiliates (including but not limited to its subsidiaries,
          associates, employees, directors, key managerial personnel,
          consultants, trainers, advisors).
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
