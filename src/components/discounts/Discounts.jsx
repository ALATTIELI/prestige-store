import React from "react";
import DiscountCard from "./DiscountCard";
import "./style.css";
import DiscountIcon from "@mui/icons-material/Discount";

const Discount = ({ productItems, addToCart }) => {
  return (
    <>
      <section className="discount_section">
        <div className="container">
          <div className="heading f_flex">
            {/* <i className='fa fa-bolt'></i> */}
            <DiscountIcon className="discountPage-icon" />

            <h1>Discounts</h1>
          </div>
          <DiscountCard productItems={productItems} addToCart={addToCart} />
        </div>
      </section>
    </>
  );
};

export default Discount;
