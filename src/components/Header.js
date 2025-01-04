import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../assests/images/LX_Learning_logo.png";
import "./Header.css";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path); // Navigate to the selected path
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" className="header-appbar">
        <Toolbar className="header-toolbar">
          <Typography variant="h6" component="div" className="header-logo">
            <img src={logo} alt="LX Learning Logo" className="logo-image" />
          </Typography>

          <div className="header-nav">
            <Button color="inherit" href="/" className="nav-button">
              Home
            </Button>

            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ position: "relative" }}
            >
              <Button
                color="inherit"
                className="nav-button"
                aria-controls="solutions-menu"
                aria-haspopup="true"
              >
                Solutions
              </Button>
              <Menu
                id="solutions-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                className="dropdown-menu"
                MenuListProps={{
                  onMouseEnter: () => setAnchorEl(anchorEl),
                  onMouseLeave: handleMouseLeave,
                }}
              >
                <MenuItem onClick={() => handleMenuItemClick("/human-capital-solutions")}>
                  Human Capital Solutions
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/instructor-led-trainings")}>
                  Instructor-Led Trainings
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/on-demand-virtual-labs")}>
                  On-Demand Virtual Labs
                </MenuItem>
              </Menu>
            </div>

            <Button color="inherit" href="/gen-ai-courses" className="nav-button">
              GenAI Courses
            </Button>
            <Button color="inherit" href="/about" className="nav-button">
              About Us
            </Button>
          </div>

          <div className="header-search">
            <div className="search-icon-wrapper">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search courses"
              inputProps={{ "aria-label": "search" }}
              className="search-input"
            />
            <IconButton color="inherit" aria-label="mic">
              <MicNoneIcon className="mic-button" />
            </IconButton>
          </div>

          <Button variant="contained" color="secondary" className="cta-button">
            Get in touch
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
