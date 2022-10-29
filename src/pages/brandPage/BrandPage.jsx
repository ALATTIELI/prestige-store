import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  getBrandById,
  getDiscountById,
  getImageById,
  getProductsByBrand,
} from "../../redux/apiCalls";
import "./brandPage.css";

export default function BrandPage() {
  const { t, i18n } = useTranslation();
  // get the brand id from the url
  const brandId = window.location.pathname.split("/").pop();
  const [brand, setBrand] = useState({});
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getBrandById(brandId);
        console.log(res);
        if (res !== null) {
          setBrand(res);
        } else {
          setBrand(null);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [brandId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getProductsByBrand(brandId);
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
        <div className="BrandPage">
          <div className="container">
            <div className="brandPageHeader">
              <h1>{i18n.language === "en" ? brand.name : brand.name}</h1>
            </div>
            <div className="brandPageBody">
              {products &&
                products.map((product) => (
                  <div
                    className="product brandPageProduct"
                    key={product._id}
                    onClick={() => handleClick(product._id)}
                  >
                    <div className="brandPageProductImage">
                      {discount[product._id] ? (
                        <span className="top_left_popup">
                          {discount[product._id]}%
                        </span>
                      ) : null}
                      <img src={getImageById(product.images[0])} alt="" />
                    </div>
                    <div className="brandPageProductDetails">
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
