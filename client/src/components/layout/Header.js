import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Inline CSS Styling */}
      <style>{`
        .header {
          background-color: #007bff; /* Bootstrap primary blue */
          color: white;
          padding: 20px 0;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 1.8rem;
        }
        .menu {
          list-style: none;
          padding: 0;
          margin: 20px 0;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        }
        .menu li {
          display: inline-block;
          margin: 5px 0;
        }
        .menu li a {
          text-decoration: none;
          color: #007bff; /* Link color */
          padding: 10px 15px;
          font-size: 1rem;
          transition: color 0.3s ease;
        }
        .menu li a:hover {
          color: #0056b3; /* Darker blue on hover */
        }
        .dropdown-menu {
          display: none; /* Hide the dropdown by default */
          flex-direction: column;
          text-align: center;
        }
        .dropdown-menu li {
          margin: 10px 0;
        }
        .dropdown-menu li a {
          color: #007bff;
        }
        .menu-toggle {
          display: none; /* Hide the toggle button by default */
          cursor: pointer;
          background-color: #007bff;
          border: none;
          color: white;
          padding: 10px 15px;
          font-size: 1rem;
          border-radius: 5px;
        }
        .menu-toggle:focus {
          outline: none;
        }

        @media (max-width: 768px) {
          .menu {
            display: none; /* Hide the main menu on small screens */
          }
          .menu-toggle {
            display: block; /* Show the toggle button on small screens */
          }
          .dropdown-menu {
            display: ${menuOpen ? "flex" : "none"}; /* Show/hide dropdown menu based on state */
          }
        }

        @media (max-width: 576px) {
          .header h1 {
            font-size: 1.4rem;
          }
          .menu li a {
            font-size: 0.9rem;
            padding: 8px 12px;
          }
        }
      `}</style>

      <Container fluid className="container-fluid header">
        <h1 className="text-center text-uppercase">
          React Application with Go Fiber Backend
        </h1>
      </Container>
      <Container>
        <div>
          {/* Toggle button for small screens */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close Menu" : "Open Menu"}
          </button>

          {/* Main menu for large screens */}
          <ul className="menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Diary</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Dropdown menu for small screens */}
          <ul className="dropdown-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Diary</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Header;
