import React from "react";
import ProductsPage from "../productsPage/ProductsPage";
import "./categoryPage.css";

export default function CategoryPage() {
  // get the category name from the url
  const categoryName = window.location.pathname.split("/").pop();

  return (
    <div className="CategoryPage">
      <div className="container">
        <div className="categoryPageHeader">
          <h1>{categoryName}</h1>
        </div>
        <div className="categoryPageBody">
          <ProductsPage />
        </div>
      </div>
    </div>
  );
}
