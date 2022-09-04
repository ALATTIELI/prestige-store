import React from "react";
import "./user.css";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import UserProfile from "./UserProfile";
import { Link, Route, Router, Switch } from "react-router-dom";
import UserOrders from "./UserOrders";

const User = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="user-left">
      <div className="user-left-top">
        <span className="title">My Account</span>
      </div>
      <ul className="list">
        <Link to="/user/profile" className="link">
          <li className="list-item">
            <PersonIcon className="icon" />
            <span className="list-item-title">My Profile</span>
          </li>
        </Link>
        <Link to="/user/orders" className="link">
          <li className="list-item">
            <ShoppingBagIcon className="icon" />
            <span className="list-item-title">My Orders</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default User;
