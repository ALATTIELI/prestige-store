import React from "react";
import { useTranslation } from "react-i18next";
import Cart from "./Cart";
import "./style.css";

const NewArrivals = () => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  return (
    <>
      <section className="NewArrivals_background">
        <div className="NewArrivals_container">
          <div className="heading d_flex">
            <div className="heading-left f_flex">
              <img
                src="https://img.icons8.com/ios-filled/100/00a9e0/new.png"
                alt="img"
              />
              <h2>{t("new_arrivals.new_arrivals")}</h2>
            </div>
          </div>

          <Cart />
        </div>
      </section>
    </>
  );
};

export default NewArrivals;
