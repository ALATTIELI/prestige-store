import React from "react";
import { Link } from "react-router-dom";

const Search = ({ CartItem }) => {
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width">
            <h1>Prestige Store</h1>
          </div>

          <div className="search-box_container">
            <div className="search-box f_flex">
              <i className="fa fa-search"></i>
              <input type="text" placeholder="Search and hit enter..." />
              <span>All Category</span>
            </div>
            <div className="suggestion">
              <ul>
              <li className="sugg_listItem">
                  <span>Samsung</span>
                </li>
                <li className="sugg_listItem">
                  <span>???</span>
                </li>
                <li className="sugg_listItem">
                  <span>Iphone</span>
                </li>                <li className="sugg_listItem">
                  <span>Samsung</span>
                </li>
                <li className="sugg_listItem">
                  <span>???</span>
                </li>
                <li className="sugg_listItem">
                  <span>Iphone</span>
                </li>                <li className="sugg_listItem">
                  <span>Samsung</span>
                </li>
                <li className="sugg_listItem">
                  <span>???</span>
                </li>
                <li className="sugg_listItem">
                  <span>Iphone</span>
                </li>                <li className="sugg_listItem">
                  <span>Samsung</span>
                </li>
                <li className="sugg_listItem">
                  <span>???</span>
                </li>
                <li className="sugg_listItem">
                  <span>Iphone</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="icon f_flex width">
            <i className="fa fa-user icon-circle"></i>
            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
            <i className="icon-circle">
              <a href="https://wa.me/971529744450">
                <img
                  src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
                  alt="whatsapp-logo"
                />
              </a>
            </i>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
