import { Modal } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../components/Login/Login";
import { searchProducts } from "../../redux/apiCalls";
import { useSelector } from "react-redux";

const Search = () => {
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);
  const user = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  const [loadingSearch, setLoadingSearch] = React.useState(true);
  const [search_results, setSearchResults] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleUser = () => {
    if (user) {
      navigate("/user/");
    } else {
      handleOpen();
    }
  };

  useEffect(() => {
    async function handleSearch(value) {
      // if value is empty, trigger the useEffect to get all products
      const sr = document.querySelector(".search_results");
      if (value === "") {
        setSearchResults([]);
        setLoadingSearch(false);
        sr.classList.remove("active");
      } else {
        const res = await searchProducts(value);
        if (res !== null) {
          if (res.length > 0) {
            setSearchResults(res);
            setLoadingSearch(false);
            sr.classList.add("active");
          }
        } else {
          setLoadingSearch(true);
        }
      }
    }
    handleSearch(search);
  }, [search]);

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
            <Link to="/">
              <h1>Prestige Store</h1>
            </Link>
          </div>

          <div className="search-box_container">
            <div className="search-box f_flex">
              <i className="fa fa-search"></i>
              <input
                type="text"
                placeholder={t("navbar.search_and_hit_enter")}
                onChange={(e) => handleChange(e)}
              />
              <Link to="/categories">
                <span>{t("navbar.all_categories")}</span>
              </Link>
            </div>
            <div className="search_results">
              <ul>
                {loadingSearch ? (
                  <li>Loading...</li>
                ) : (
                  search_results &&
                  search_results.map((item) => (
                    <Link to={`/product/${item._id}`}>
                      <li
                        key={item._id}
                        className="search_results_item"
                        onClick={() => setSearch("")}
                      >
                        <img src={item.images[0].url} alt="" />
                        <span>{item.name_en}</span>
                      </li>
                    </Link>
                  ))
                )}
              </ul>
            </div>
          </div>

          <div className="header_icons">
            <i className="fa fa-user icon-circle" onClick={handleUser}></i>
            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                {cartQuantity > 0 && (
                  <span className="cart_count">{cartQuantity}</span>
                )}
                {/* <span>{CartItem.length === 0 ? "" : CartItem.length}</span> */}
              </Link>
            </div>
            <i className="icon-circle">
              <a
                href="https://wa.me/971529744450"
                target="_blank"
                rel="noreferrer"
              >
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
