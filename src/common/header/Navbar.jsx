import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Categories from "../../components/MainPage/Categories";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Navbar = () => {
  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(false);
  const [Dropdown, setDropdown] = useState(false);
  const { t, i18n } = useTranslation();

  console.log(i18n.resolvedLanguage);
  if (i18n.resolvedLanguage === "ar") {
    const body = document.getElementsByTagName("body")[0];
    body.style = "font-family: 'tajawal-regular';";
  } else {
    const body = document.getElementsByTagName("body")[0];
    body.style = "font-family: 'Roboto', sans-serif;";
  }

  window.addEventListener("scroll", function () {
    const dropdown_c = document.querySelector(".categories_menu");
    dropdown_c.classList.toggle("categories_menu_closed", window.scrollY > 100);
    if (window.scrollY <= 100 && Dropdown) {
      dropdown_c.classList.toggle("categories_menu_open");
    } else if (window.scrollY <= 100 && !Dropdown) {
      dropdown_c.classList.toggle("categories_menu_closed");
    }
  });

  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className="header_catgrories d_flex">
            <div className="categories_nav">
              {Dropdown ? (
                <h4 onClick={() => setDropdown(!Dropdown)}>
                  <span class="header_catgrories_icon fa-solid fa-border-all"></span>

                  <span>{t("navbar.categories")}</span>
                  <KeyboardArrowUpIcon className="arrow-icon" />
                </h4>
              ) : (
                <h4 onClick={() => setDropdown(!Dropdown)}>
                  <span class="header_catgrories_icon fa-solid fa-border-all"></span>

                  <span>{t("navbar.categories")}</span>
                  <KeyboardArrowDownIcon className="arrow-icon" />
                </h4>
              )}

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
              <div
                className={
                  Dropdown
                    ? "categories_menu categories_menu_open"
                    : "categories_menu categories_menu_closed"
                }
              >
                <Categories />
              </div>
            </div>
          </div>

          <div
            className="navlink"
            // className={
            //   MobileMenu ? "navlink" : "navlink"
            // }
          >
            <ul
              className={
                MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
              }
              onClick={() => setMobileMenu(false)}
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
