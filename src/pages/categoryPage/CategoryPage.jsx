import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  getCategoryById,
  getDiscountById,
  getImageById,
  getProductsByCategory,
} from "../../redux/apiCalls";
import "./categoryPage.css";

export default function CategoryPage() {
  const { t, i18n } = useTranslation();
  // get the category name from the url
  const categoryId = window.location.pathname.split("/").pop();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCategoryById(categoryId);
        console.log(res);
        if (res !== null) {
          setCategory(res);
        } else {
          setCategory(null);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [categoryId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getProductsByCategory(categoryId);
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

  useEffect(() => {
    products.map(async (item) => {
      if (item.discountID) {
        const discount = await getDiscountById(item.discountID);
        const discount_percentage = discount.discount_percentage;
        setDiscount((prev) => {
          return {
            ...prev,
            [item._id]: discount_percentage,
          };
        });
      }
    });
  }, [products]);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

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
              <h1>
                {i18n.language === "en" ? category.name_en : category.name_ar}
              </h1>
            </div>
            <div className="categoryPageBody">
              {products &&
                products.map((product) => (
                  <div
                    className="product categoryPageProduct"
                    key={product._id}
                    onClick={() => handleClick(product._id)}
                  >
                    <div className="categoryPageProductImage">
                      {discount[product._id] ? (
                        <span className="top_left_popup">
                          {discount[product._id]}%
                        </span>
                      ) : null}
                      <img src={getImageById(product.images[0])} alt="" />
                    </div>
                    <div className="categoryPageProductDetails">
                      <div className="product-name">
                        <h3>
                          {i18n.language === "en"
                            ? product.name_en
                            : product.name_ar}
                        </h3>
                      </div>
                      <div className="price">
                        <h4>AED {product.TotalPrice} </h4>
                        <button
                        // onClick={() => addToCart(shopItems)}
                        >
                          <i className="fa fa-plus"></i>
                        </button>
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
