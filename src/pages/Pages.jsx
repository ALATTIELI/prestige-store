import React from "react";
import Home from "../components/MainPage/Home";
import FlashDeals from "../components/flashDeals/FlashDeals";
import NewArrivals from "../components/newarrivals/NewArrivals";
import Discount from "../components/discount/Discount";
import Shop from "../components/shops/Shop";
import Wrapper from "../components/wrapper/Wrapper";

import "../i18n";

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
        <Home CartItem={CartItem} />
        <FlashDeals productItems={productItems} addToCart={addToCart} />
        <NewArrivals />
        <Discount />
        <Shop shopItems={shopItems} addToCart={addToCart} />
        <Wrapper />
    </>
  );
};

export default Pages;
