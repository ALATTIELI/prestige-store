import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getOrderById } from "../../redux/apiCalls";
import User from "./User";

// const productsList = [
//   {
//     id: 1,
//     name: "Apple Airpods",
//     img: "https://m.media-amazon.com/images/I/71zny7BTRlL._AC_UY218_.jpg",
//     quantity: 1,
//   },
//   {
//     id: 2,
//     name: "Apple Watch",
//     img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MKUW3_VW_34FR+watch-45-alum-blue-cell-7s_VW_34FR_WF_CO?wid=1400&hei=1400&trim=1,0&fmt=p-jpg&qlt=95&.v=1632171100000,1631661588000",
//     quantity: 1,
//   },
//   {
//     id: 3,
//     name: "Apple iPhone 12 Pro",
//     img: "https://m.media-amazon.com/images/I/71MHTD3uL4L._AC_UY218_.jpg",
//     quantity: 1,
//   },
//   {
//     id: 4,
//     name: "Apple MacBook Pro",
//     img: "https://m.media-amazon.com/images/I/71L2iBSyyOL._AC_UY218_.jpg",
//     quantity: 1,
//   },
// ];

export default function Order() {
  const { t, i18n } = useTranslation();
  const order_id = window.location.pathname.split("/")[3];
  const [orderDetails, setOrderDetails] = useState({});
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getOrderById(order_id);
        if (res !== null && res !== false) {
          setOrderDetails(res);
          // console.log(res);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(true);
      }
    };
    getUser();
  }, [order_id]);

  useEffect(() => {
    document.title = `${
      i18n.language === "en" ? "Order Details" : "تفاصيل الطلب"
    }`;
  }, [i18n.language]);

  useEffect(() => {
    if (orderDetails && orderDetails !== null) {
      setProductsList(orderDetails.products);
    }
  }, [orderDetails]);

  return (
    <div className="UserOrderDetailes">
      <div className="user-container">
        <User />
        <div className="user-right">
          <div className="order-products-container">
            <div className="top-row">
              <div className="order-id">
                <span className="order-id-title">{t("user.order_id")}: </span>
                <span className="order-id-value">
                  {orderDetails && orderDetails !== null ? (
                    <>{orderDetails._id}</>
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <div className="order-date">
                <span className="order-date-title">{t("user.date")}: </span>
                <span className="order-date-value">
                  {orderDetails && orderDetails !== null ? (
                    <>
                      {new Date(orderDetails.createdAt).toLocaleDateString(
                        "en-AE",
                        {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        }
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </span>
              </div>
            </div>
            <div className="products-list">
              {orderDetails &&
                productsList &&
                productsList.map((product) => (
                  <div className="products-list-item">
                    {/* <div className="product-img">
                      <img src={""} alt="" />
                    </div> */}
                    <div className="product-info">
                      <div className="product-name">
                        <Link to={`/product/${product.product_id}`}>
                          <span className="product-name">
                            {product.name_en}
                          </span>
                        </Link>
                      </div>
                      <div className="product-quantity">
                        <span className="product-info-title">
                          {t("user.quantity")}:{" "}
                        </span>
                        <span className="product-info-value">
                          {product.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="order-price-detailes">
            <div className="order-price-detailes-item">
              <span className="order-price-detailes-title">
                {t("user.total_amount_paid")}:
              </span>
              <span className="order-price-detailes-value">
                {orderDetails && orderDetails !== null ? (
                  <>{orderDetails.amount} AED</>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="order-price-detailes-item">
              <span className="order-price-detailes-title">
                {t("user.paid_by")}:
              </span>
              <span className="order-price-detailes-value">
                {orderDetails && orderDetails !== null ? (
                  orderDetails.paymentOption === "COD" ? (
                    <>Cash on Delivery</>
                  ) : (
                    <>Online Payment</>
                  )
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
