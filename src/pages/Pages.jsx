import React from "react";
import Home from "../components/MainPage/Home";
import Discounts from "../components/discounts/Discounts";
import NewArrivals from "../components/newarrivals/NewArrivals";
import Shop from "../components/shops/Shop";
import Wrapper from "../components/wrapper/Wrapper";

import "../i18n";
import { useTranslation } from "react-i18next";

const Pages = () => {
  const { i18n } = useTranslation();

  // change the title of the page
  document.title = `${
    i18n.language === "en"
      ? "Home | Prestige Store"
      : "الصفحة الرئيسية | Prestige Store"
  }`;
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
