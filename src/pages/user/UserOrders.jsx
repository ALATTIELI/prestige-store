import React from "react";
import User from "./User";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";

const orders = [
  {
    id: "63078d31880075b2408bbab6",
    status: "Pending",
    createdAt: "3/9/2022",
    amount: "299.99",
  },
  {
    id: 2,
    status: "Declined",
    createdAt: "1/9/2022",
    amount: "1009.99",
  },
];

export default function UserOrders() {
  return (
    <div className="UserOrders">
      <div className="user-container">
        <User />
        <div className="user-right">
          <div className="user-right-top">
            <span className="title">My Orders</span>
          </div>
          <div className="user-right-bottom">
            <div className="order-header">
              <div className="order-header-item id">
                <span className="order-header-item-title">Order ID</span>
              </div>
              <div className="order-header-item">
                <span className="order-header-item-title">Status</span>
              </div>
              <div className="order-header-item">
                <span className="order-header-item-title">Date</span>
              </div>
              <div className="order-header-item">
                <span className="order-header-item-title">Amount</span>
              </div>
              <div className="order-header-item view">
                <span className="order-header-item-title">View</span>
              </div>
            </div>
            {orders.map((order) => (
              <div className="order">
                <div className="order-item id">
                  <span className="order-item-id">{order.id}</span>
                </div>
                <div className="order-item">
                  <span className="order-item-status">{order.status}</span>
                </div>
                <div className="order-item">
                  <span className="order-item-date">{order.createdAt}</span>
                </div>
                <div className="order-item">
                  <span className="order-item-amount">AED: {order.amount}</span>
                </div>
                <div className="order-item view">
                  <Link to={`/user/order/${order.id}`} className="link">
                    <span className="order-item-view">
                      <ArrowRightAltIcon className="icon" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
