import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assests/images/LX_Learning_logo.png";
import "./Header.css";

function Header({ contactRef }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setAnchorEl(null);
  };

  const isActive = (path) => location.pathname === path;

  const scrollToGetInTouch = () => {
    if (contactRef?.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppBar position="fixed" className="header-appbar">
      <Toolbar className="header-toolbar">
        <Typography variant="h6" component="div" className="header-logo">
          <a href="/" style={{ textDecoration: "none" }}>
            <img src={logo} alt="LX Learning Logo" className="logo-image" />
          </a>
        </Typography>

        <div className={`header-nav`}>
          <div
            className={`nav-section ${isActive("/") ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            <Button color="inherit" className="nav-button">
              Home
            </Button>
          </div>

          <div
            className={`nav-section ${
              [
                "/human-capital-solutions",
                "/instructor-led-trainings",
                "/on-demand-virtual-labs",
              ].some((path) => location.pathname.startsWith(path))
                ? "active"
                : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: "relative" }}
          >
            <Button color="inherit" className="nav-button">
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
              <MenuItem
                onClick={() => handleMenuItemClick("/human-capital-solutions")}
              >
                Human Capital Solutions
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick("/instructor-led-trainings")}
              >
                Instructor-Led Trainings
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick("/on-demand-virtual-labs")}
              >
                On-Demand Virtual Labs
              </MenuItem>
            </Menu>
          </div>

          <div
            className={`nav-section ${
              isActive("/gen-ai-courses") ? "active" : ""
            }`}
            onClick={() => navigate("/gen-ai-courses")}
          >
            <Button color="inherit" className="nav-button">
              GenAI Courses
            </Button>
          </div>
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
        </div>

        <Button
          variant="contained"
          onClick={scrollToGetInTouch}
          sx={{
            backgroundColor: "#0056C3",
            color: "#ffffff",
            fontSize: "16px",
            padding: "8px 20px",
            borderRadius: "5px",
            textTransform: "none",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              backgroundColor: "#0352a1",
            },
          }}
        >
          Get in touch
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
