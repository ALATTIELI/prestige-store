import React from "react";
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
                <li>About US</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
                <li>Returns & Refunds </li>
              </ul>
            </div>
            <div className="footer-box">
              <h2>Contact Us</h2>
              <ul>
                <li>Our Stores</li>
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
              <img src="./images/pslogo.png" alt="footer-logo" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
