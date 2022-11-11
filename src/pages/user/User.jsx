import React, { useEffect } from "react";
import "./user.css";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/apiCalls";

const User = () => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    document.title = "User";
  }, []);

  useEffect(() => {
    if (!user || user === null) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLogout = (e) => {
    e.preventDefault();
    userLogout(dispatch);
  };

  return (
    <div className="user-left">
      <div className="user-left-top">
        <span className="title">{t("user.my_account")}</span>
        <div className="user-logout">
          <button className="logout-btn" onClick={handleLogout}>
            {t("user.logout")}
          </button>
        </div>
      </div>
      <ul className="list">
        <Link to="/user/profile" className="link">
          <li className="list-item">
            <PersonIcon className="icon" />
            <span className="list-item-title">{t("user.my_profile")}</span>
          </li>
        </Link>
        <Link to="/user/orders" className="link">
          <li className="list-item">
            <ShoppingBagIcon className="icon" />
            <span className="list-item-title">{t("user.my_orders")}</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default User;
