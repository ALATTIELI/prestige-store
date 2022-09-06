import React from "react";
import { useTranslation } from "react-i18next";
import "./style.css";

const Wrapper = () => {
  const { t, i18n } = useTranslation();
  const data = [
    {
      cover: <i class="fa-solid fa-truck-fast"></i>,
      title: `${t("delivery_across_UAE.delivery_across_UAE")}`,
      decs: `${t("delivery_across_UAE.description")}`,
    },
    {
      cover: <i class="fa-solid fa-id-card"></i>,
      title: `${t("safe_payment.safe_payment")}`,
      decs: `${t("safe_payment.description")}`,
    },
    {
      cover: <i class="fa-solid fa-shield"></i>,
      title: `${t("shop_with_confidence.shop_with_confidence")}`,
      decs: `${t("shop_with_confidence.description")}`,
    },
    {
      cover: <i class="fa-solid fa-headset"></i>,
      title: `${t("24_7_support.24_7_support")}`,
      decs: `${t("24_7_support.description")}`,
    },
  ];
  return (
    <>
      <section className="wrapper background">
        <div className="container">
          {data.map((val, index) => {
            return (
              <div className="product" key={index}>
                <div className="img icon-circle">
                  <i>{val.cover}</i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Wrapper;
