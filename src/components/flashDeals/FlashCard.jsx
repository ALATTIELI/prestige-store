import React, { useState } from "react";

const FlashCard = ({ productItems, addToCart }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const scroll = (direction) => {
    const flash_card = document.getElementById("flash_card_container");
    if (direction === "left") {
      flash_card.scrollBy({ left: -300, behavior: "smooth" });
    }
    if (direction === "right") {
      flash_card.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flash_card">
        {/* add arrows to scroll */}
        <span
          className="prev"
          onClick={() => {
            scroll("left");
          }}
        >
          <i className="fa fa-long-arrow-alt-left"></i>
        </span>
        <div className="flash_card_container" id="flash_card_container">
          {productItems.map((productItems) => {
            return (
              <div className="flash_card_product">
                <div className="flash_card_product_img">
                  <span className="discount">{productItems.discount}% Off</span>
                  <img src={productItems.cover} alt="" />
                </div>
                <div className="flash_card_product_details">
                  <h3>{productItems.name}</h3>
                  <div className="price">
                    <h4>AED {productItems.price}.00 </h4>
                    {/* step : 3  
                      if hami le button ma click garryo bahne 
                     */}
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

export default FlashCard;
