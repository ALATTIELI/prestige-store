import React, { useState } from "react";
import "./productsPage.css";

export default function ProductsPage({ shopItems, addToCart }) {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="ProductsPage">
        <div className="container grid1">
      {shopItems.map((shopItems, index) => {
        return (
          <div className="box">
            <div className="product">
              <div className="img">
                <span className="top_left_popup">
                  {shopItems.discount}% Off
                </span>
                <img src={shopItems.cover} alt="" />
              </div>
              <div className="product-details">
                <h3>{shopItems.name}</h3>
                <div className="price">
                  <h4>AED {shopItems.price}.00 </h4>
                  {/* step : 3  
                       if hami le button ma click garryo bahne 
                      */}
                  <button onClick={() => addToCart(shopItems)}>
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}
