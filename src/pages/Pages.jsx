import React from "react";
import Home from "../components/MainPage/Home";
import Discounts from "../components/discounts/Discounts";
import NewArrivals from "../components/newarrivals/NewArrivals";
import Shop from "../components/shops/Shop";
import Wrapper from "../components/wrapper/Wrapper";

import "../i18n";

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
        <Home CartItem={CartItem} />
        <Discounts productItems={productItems} addToCart={addToCart} />
        <NewArrivals />
        <Shop shopItems={shopItems} addToCart={addToCart} />
        <Wrapper />
    </>
  );
};

export default Pages;
