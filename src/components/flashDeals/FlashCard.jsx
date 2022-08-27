import React, { useState } from "react";

const FlashCard = ({ productItems, addToCart }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const flash_card = document.querySelector(".flash_card_container");
  function leftScroll() {
    flash_card.scrollBy({ left: -300, behavior: "smooth" });
  }
  function rightScroll() {
    flash_card.scrollBy({ left: 300, top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div className="flash_card">
        {/* add arrows to scroll */}
        <span className="prev" onClick={leftScroll}>
          <i className="fa fa-long-arrow-alt-left"></i>
        </span>
        <div className="flash_card_container">
          {productItems.map((productItems) => {
            return (
                <div className="flash_card_product">
                  <div className="flash_card_product_img">
                    <span className="discount">
                      {productItems.discount}% Off
                    </span>
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
        <span className="next" onClick={rightScroll}>
          <i className="fa fa-long-arrow-alt-right"></i>
        </span>
      </div>
    </>
  );
};

export default FlashCard;
