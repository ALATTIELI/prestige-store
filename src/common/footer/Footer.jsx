import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className=" footer-container">
          <div className="container footer-left">
            <div className="footer-box">
              <h2>About Us</h2>
              <ul>
                <Link to="/aboutus">
                <li>About US</li>
                </Link>
                <Link to="/termsandConditions">
                <li>Terms & Conditions</li>
                </Link>
                <Link to="/privacyPolicy">
                <li>Privacy Policy</li>
                </Link>
                <Link to="/returnsRefunds">
                <li>Returns & Refunds </li>
                </Link>
              </ul>
            </div>
            <div className="footer-box">
              <h2>Contact Us</h2>
              <ul>
                <Link to="/contactUs">
                  <li>Our Stores</li>
                </Link>
                <li>
                  Ghuwayfah St - Al Nahyan - Abu Dhabi - United Arab Emirates
                </li>
                <li>Email: info@prestigestore.ae</li>
                <li>Phone: +971529744450</li>
              </ul>
            </div>
          </div>
          <div className="footer-right">
            <div className="box footer-logo">
              <img src="/images/pslogo.png" alt="footer-logo" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
