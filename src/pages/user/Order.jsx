import React from "react";
import { useTranslation } from "react-i18next";
import User from "./User";

const productsList = [
  {
    id: 1,
    name: "Apple Airpods",
    img: "https://m.media-amazon.com/images/I/71zny7BTRlL._AC_UY218_.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Apple Watch",
    img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MKUW3_VW_34FR+watch-45-alum-blue-cell-7s_VW_34FR_WF_CO?wid=1400&hei=1400&trim=1,0&fmt=p-jpg&qlt=95&.v=1632171100000,1631661588000",
    quantity: 1,
  },
  {
    id: 3,
    name: "Apple iPhone 12 Pro",
    img: "https://m.media-amazon.com/images/I/71MHTD3uL4L._AC_UY218_.jpg",
    quantity: 1,
  },
  {
    id: 4,
    name: "Apple MacBook Pro",
    img: "https://m.media-amazon.com/images/I/71L2iBSyyOL._AC_UY218_.jpg",
    quantity: 1,
  },
];

export default function Order() {
  const { t, i18n } = useTranslation();
  return (
    <div className="UserOrderDetailes">
      <div className="user-container">
        <User />
        <div className="user-right">
          <div className="order-products-container">
            <div className="top-row">
              <div className="order-id">
                <span className="order-id-title">{t("user.order_id")}</span>
                <span className="order-id-value">123456789</span>
              </div>
              <div className="order-date">
                <span className="order-date-title">{t("user.date")}</span>
                <span className="order-date-value">12/12/2020</span>
              </div>
            </div>
            <div className="products-list">
              {productsList.map((product) => (
                <div className="products-list-item">
                  <div className="product-img">
                    <img src={product.img} alt="" />
                  </div>
                  <div className="product-info">
                    <div className="product-name">
                      <span className="product-name">{product.name}</span>
                    </div>
                    <div className="product-quantity">
                      <span className="product-info-title">{t("user.quantity")}: </span>
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
              <span className="order-price-detailes-title">Total Amount Paid:</span>
              <span className="order-price-detailes-value">1100 AED</span>
            </div>
            <div className="order-price-detailes-item">
              <span className="order-price-detailes-title">Paid by:</span>
              <span className="order-price-detailes-value">
                Debit/Credit card
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
