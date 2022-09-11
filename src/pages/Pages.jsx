import React from "react";
import Home from "../components/MainPage/Home";
import Discounts from "../components/discounts/Discounts";
import NewArrivals from "../components/newarrivals/NewArrivals";
import Shop from "../components/shops/Shop";
import Wrapper from "../components/wrapper/Wrapper";

import "../i18n";

const Pages = () => {
  return (
    <>
      <Home />
      <Discounts />
      <NewArrivals />
      <Shop />
      <Wrapper />
    </>
  );
};

export default Pages;
