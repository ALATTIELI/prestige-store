import React, { useEffect, useState } from "react";
import User from "./User";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getOrders } from "../../redux/apiCalls";

// const orders = [
//   {
//     id: "63078d31880075b2408bbab6",
//     status: "Pending",
//     createdAt: "3/9/2022",
//     amount: "299.99",
//   },
//   {
//     id: 2,
//     status: "Declined",
//     createdAt: "1/9/2022",
//     amount: "1009.99",
//   },
// ];

export default function UserOrders() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "User Orders";
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getOrders();
        if (res !== null && res !== false) {
          setOrders(res);
          // console.log(res);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(true);
      }
    };
    getUser();
  }, [user]);

  useEffect(() => {
    if (!user || user === null) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="UserOrders">
      <div className="user-container">
        <User />
        <div className="user-right">
          <div className="user-right-top">
            <span className="title">{t("user.my_orders")}</span>
          </div>
          <div className="user-right-bottom">
            <div className="order-header">
              <div className="order-header-item id">
                <span className="order-header-item-title">
                  {t("user.order_id")}
                </span>
              </div>
              <div className="order-header-item">
                <span className="order-header-item-title">
                  {t("user.status")}
                </span>
              </div>
              <div className="order-header-item">
                <span className="order-header-item-title">
                  {t("user.date")}
                </span>
              </div>
              <div className="order-header-item">
                <span className="order-header-item-title">
                  {t("user.amount")}
                </span>
              </div>
              <div className="order-header-item view">
                <span className="order-header-item-title">
                  {t("user.view")}
                </span>
              </div>
            </div>
            {loading ? (
              <div className="loading">
                <span className="loading-text">{t("user.loading")}</span>
              </div>
            ) : orders === null || orders.length === 0 ? (
              <div className="no-orders">
                <span className="no-orders-text">{t("user.no_orders")}</span>
              </div>
            ) : (
              orders.map((order) => (
                <div className="order" key={order._id}>
                  <div className="order-item id">
                    <span className="order-item-id">{order._id}</span>
                  </div>
                  <div className="order-item">
                    <span className="order-item-status">{order.status}</span>
                  </div>
                  <div className="order-item">
                    <span className="order-item-date">
                      {new Date(order.createdAt).toLocaleDateString("en-AE", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="order-item">
                    <span className="order-item-amount">
                      AED: {order.amount}
                    </span>
                  </div>
                  <div className="order-item view">
                    <Link to={`/user/order/${order._id}`} className="link">
                      <span className="order-item-view">
                        <ArrowRightAltIcon className="icon" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
