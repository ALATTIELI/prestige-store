import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getBrandById,
  getDiscountById,
  getProductsByBrand,
} from "../../redux/apiCalls";
import { addToCart } from "../../redux/cartRedux";
import "./brandPage.css";

export default function BrandPage() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  // get the brand id from the url
  const brandId = window.location.pathname.split("/").pop();
  const [brand, setBrand] = useState({});
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // change the title of the page to the brand name
  useEffect(() => {
    document.title = `${i18n.language === "en" ? brand.name : brand.name}`;
  }, [brand, i18n.language]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getBrandById(brandId);
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
  }, [brandId]);

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

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    const data = {
      ...product,
      quantity: 1,
    };
    dispatch(addToCart(data));

    // start an animation to show the product is added to the cart
    const button = e.currentTarget;

    console.log(button);

    // replace the text with a rotating icon
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;

    // after 1 second, replace the icon with a checkmark
    setTimeout(() => {
      button.innerHTML = `<i class="fas fa-check"></i>`;
      // after 2 seconds, replace the checkmark with the original text
      setTimeout(() => {
        button.innerHTML = `<i class="fa fa-plus"></i>`;
      }, 2000);
    }, 1000);
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
                      <img src={product.images[0].url} alt="" />
                    </div>
                    <div className="brandPageProductDetails">
                      <div className="product-name">
                        <h3>
                          {i18n.language === "en"
                            ? product.name_en
                            : product.name_ar}
                        </h3>
                      </div>
                      <div
                        className="price"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h4>AED {product.TotalPrice} </h4>
                        <button onClick={(e) => handleAddToCart(e, product)}>
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
