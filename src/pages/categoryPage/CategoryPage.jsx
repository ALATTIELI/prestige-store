import React, { useEffect, useState } from "react";
import { getImageById, getProductsByCategory } from "../../redux/apiCalls";
import "./categoryPage.css";

export default function CategoryPage() {
  // get the category name from the url
  const categoryName = window.location.pathname.split("/").pop();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getProductsByCategory(categoryName);
        console.log(res);
        if (res !== null) {
          setProducts(res);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="CategoryPage">
          <div className="container">
            <div className="categoryPageHeader">
              <h1>{categoryName}</h1>
            </div>
            <div className="categoryPageBody">
              {products &&
                products.map((product) => (
                  <div className="categoryPageProduct">
                    <div className="categoryPageProductImage">
                      <img src={getImageById(product.images[0])} alt="" />
                    </div>
                    <div className="categoryPageProductInfo">
                      <div className="categoryPageProductInfoName">
                        {product.name_en}
                      </div>
                      <div className="categoryPageProductInfoPrice">
                        {product.price}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
