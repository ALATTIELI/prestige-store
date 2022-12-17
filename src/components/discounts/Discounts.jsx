import React from "react";
import DiscountCard from "./DiscountCard";
import "./style.css";
import DiscountIcon from "@mui/icons-material/Discount";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Discount = ({ productItems, addToCart }) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <section className="discount_section">
        <div className="container">
          <div className="discount_section_heading f_flex">
            {/* <i className='fa fa-bolt'></i> */}
            <div className="heading-left f_flex">
              <DiscountIcon className="discountPage-icon" />
              <h1>{t("discounts.discounts")}</h1>
            </div>

            <Link to="/discounts">
              <div className="heading-right">
                <span>{t("discounts.view_all")}</span>
                <i className="fa-solid fa-caret-right"></i>
              </div>
            </Link>
          </div>
          <DiscountCard productItems={productItems} addToCart={addToCart} />
        </div>
      </section>
    </>
  );
};

export default Discount;
