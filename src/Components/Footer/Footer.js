import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer section">
      <div className="logo logo--light">
        <Link to="/" className="link link--light">
          Farmish
        </Link>
      </div>
      <div className="site-map">
        <h3 className="title">Site Map</h3>
        <ul>
          <li>
            <Link to="/" className="link link--light">
              Home
            </Link>
          </li>
        </ul>
      </div>
      <div className="contact">
        <h3 className="title">Contact Information</h3>

        <p>Email:Farmish@gmail.com</p>
        <p>Phone:07045237590</p>
        <p>Address:12 Kunle Jones Street, Maryland, Lagos</p>
      </div>
    </footer>
  );
};

export default Footer;
