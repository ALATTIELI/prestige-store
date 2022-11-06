import React, { useEffect } from "react";
import "./user.css";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import UserProfile from "./UserProfile";
import { Link, Route, Router, Switch, useNavigate } from "react-router-dom";
import UserOrders from "./UserOrders";
import { useSelector } from "react-redux";

const User = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    document.title = "User";
  }, []);

  useEffect(() => {
    if (!user || user === null) {
      navigate("/");
    }
  }, [user]);
  
  return (
    <div className="user-left">
      <div className="user-left-top">
        <span className="title">{t("user.my_account")}</span>
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
