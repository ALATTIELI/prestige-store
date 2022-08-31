import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Categories from "../../components/MainPage/Categories";

const Navbar = () => {
  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(false);
  const { t, i18n } = useTranslation();

  console.log(i18n.resolvedLanguage);
  if (i18n.resolvedLanguage === "ar") {
    const body = document.getElementsByTagName("body")[0];
    body.style = "font-family: 'tajawal-regular';";
  } else {
    const body = document.getElementsByTagName("body")[0];
    body.style = "font-family: 'Roboto', sans-serif;";
  }

  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className="catgrories d_flex">
            <span class="fa-solid fa-border-all"></span>
            <h4>
            {t("navbar.categories")}
              {/* <button
                className="toggle"
                onClick={() => setMobileMenu(!MobileMenu)}
              >
                {MobileMenu ? (
                  <i className="">{t("navbar.categories")}</i>
                ) : (
                  <i className="">{t("navbar.categories")}</i>
                )}
              </button> */}
            </h4>
          </div>

          <div className="navlink"
            // className={
            //   MobileMenu ? "navlink" : "navlink"
            // }
          >
            <ul
              className={
                MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
              }
              onClick={() => setMobileMenu(true)}
            >
              {/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
              {/* <Categories /> */}
              <li>
                <Link to="/">{t("navbar.home")}</Link>
              </li>
              <li>
                <Link to="/contactUs">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
