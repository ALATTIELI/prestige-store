import React from "react";
import DiscountCard from "./DiscountCard";
import "./style.css";
import DiscountIcon from "@mui/icons-material/Discount";
import { useTranslation } from "react-i18next";

const Discount = ({ productItems, addToCart }) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <section className="discount_section">
        <div className="container">
          <div className="discount_section_heading f_flex">
            {/* <i className='fa fa-bolt'></i> */}
            <DiscountIcon className="discountPage-icon" />

            <h1>{t("discounts.discounts")}</h1>
          </div>
          <DiscountCard productItems={productItems} addToCart={addToCart} />
        </div>
      </section>
    </>
  );
};

export default Discount;
