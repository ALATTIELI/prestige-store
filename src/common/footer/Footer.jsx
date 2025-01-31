import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  return (
    <>
      <footer>
        <div className="footer-container">
          <div className="container footer-left">
            <div className="footer-box">
              <h2>{t("about_us.about_us")}</h2>
              <ul>
                <Link to="/aboutus">
                  <li>{t("about_us.about_us")}</li>
                </Link>
                <Link to="/termsandConditions">
                  <li>{t("about_us.terms_and_conditions")}</li>
                </Link>
                <Link to="/privacyPolicy">
                  <li>{t("about_us.privacy_policy")}</li>
                </Link>
                <Link to="/returnsRefunds">
                  <li>{t("about_us.returns_and_refunds")} </li>
                </Link>
              </ul>
            </div>
            <div className="footer-box">
              <h2>{t("contact_us.contact_us")}</h2>
              <ul>
                <Link to="/contactUs">
                  <li>{t("contact_us.contact_us")}</li>
                </Link>
                <li>
                  Ghuwayfah St - Al Nahyan - Abu Dhabi - United Arab Emirates
                </li>
                <li>{t("contact_us.email")}: info@prestigestore.ae</li>
                <li>{t("contact_us.phone")}: +971529744450</li>
              </ul>
            </div>
            <div className="footer-box">
              <h2>{t("contact_us.follow_us")}</h2>
              <ul className="socials">
                <li>
                  <a
                    href="https://www.instagram.com/prestigegroup_uae/"
                    className="socials"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-right">
            <div className="box footer-logo">
              <img src="/images/pslogo.png" alt="footer-logo" />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Prestige Store. All rights reserved.</p>
          <p>
            Built by&nbsp;
            <a href="https://akkil.tech" target="_blank" rel="noreferrer">
              BILAL AKKIL
            </a>
            &nbsp;&&nbsp;
            <a href="/" target="_blank" rel="noreferrer">
              ADEL AL-ATTIELI
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
