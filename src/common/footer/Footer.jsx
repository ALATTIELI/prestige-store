import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <footer>
        <div className=" footer-container">
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
              <ul className="socials">
                <li>
                  <a
                    href="https://www.facebook.com/prestigestore.ae/"
                    className="socials"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
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
      </footer>
    </>
  );
};

export default Footer;
