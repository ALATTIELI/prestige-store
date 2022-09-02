import { Modal } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Login from "../../pages/Login/Login";

const Search = ({ CartItem }) => {
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <section className="search">
        <div className="modalContainer">
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="login-modal"
          >
            {/* <div> */}
              {/* <div className="modalBackdrop" onClick={handleClose}></div> */}
              <Login />
            {/* </div> */}
          </Modal>
        </div>
        <div className="container c_flex">
          <div className="logo_width">
            <h1>Prestige Store</h1>
          </div>

          <div className="search-box_container">
            <div className="search-box f_flex">
              <i className="fa fa-search"></i>
              <input type="text" placeholder="Search and hit enter..." />
              <Link to="/categories">
                <span>All Category</span>
              </Link>
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
                </li>{" "}
                <li className="sugg_listItem">
                  <span>Samsung</span>
                </li>
                <li className="sugg_listItem">
                  <span>???</span>
                </li>
                <li className="sugg_listItem">
                  <span>Iphone</span>
                </li>{" "}
                <li className="sugg_listItem">
                  <span>Samsung</span>
                </li>
                <li className="sugg_listItem">
                  <span>???</span>
                </li>
                <li className="sugg_listItem">
                  <span>Iphone</span>
                </li>{" "}
                <li className="sugg_listItem">
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

          <div className="header_icons">
            <i className="fa fa-user icon-circle" onClick={handleOpen}></i>
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
