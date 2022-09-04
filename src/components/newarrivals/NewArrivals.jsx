import React from "react";
import Cart from "./Cart";
import "./style.css";

const NewArrivals = () => {
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
              <h2>New Arrivals </h2>
            </div>
          </div>

          <Cart />
        </div>
      </section>
    </>
  );
};

export default NewArrivals;
