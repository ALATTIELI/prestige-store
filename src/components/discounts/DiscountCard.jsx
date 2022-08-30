import React, { useState } from "react";

const DiscountCard = ({ productItems, addToCart }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const scroll = (direction) => {
    const discount_card = document.getElementById("discount_card_container");
    if (direction === "left") {
      discount_card.scrollBy({ left: -300, behavior: "smooth" });
    }
    if (direction === "right") {
      discount_card.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="discount_card">
        {/* add arrows to scroll */}
        <span
          className="prev"
          onClick={() => {
            scroll("left");
          }}
        >
          <i className="fa fa-long-arrow-alt-left"></i>
        </span>
        <div className="discount_card_container" id="discount_card_container">
          {productItems.map((productItems) => {
            return (
              <div className="discount_card_product">
                <div className="discount_card_product_img">
                  <span className="top_left_popup">{productItems.discount}% Off</span>
                  <img src={productItems.cover} alt="" />
                </div>
                <div className="discount_card_product_details">
                  <h3>{productItems.name}</h3>
                  <div className="discount_card_product_price">
                    <div className="DiscountPrice">
                      <span className="DiscountDPrice">
                        AED {productItems.price}
                      </span>
                      <span
                        className="DiscountOriginalPrice"
                        style={{ textDecoration: "line-through" }}
                      >
                        AED {productItems.originalprice}
                      </span>
                    </div>
                    <button onClick={() => addToCart(productItems)}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <span
          className="next"
          onClick={() => {
            scroll("right");
          }}
        >
          <i className="fa fa-long-arrow-alt-right"></i>
        </span>
      </div>
    </>
  );
};

export default DiscountCard;
