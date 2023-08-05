import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDiscountById,
  getDiscountedProducts,
} from "../../redux/apiCalls";
import { addToCart } from "../../redux/cartRedux";
import "./discountsPage.css";

export default function DiscountsPage() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  // get the category name from the url
  const categoryId = window.location.pathname.split("/").pop();
  //   const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // change the title of the page
  useEffect(() => {
    document.title = `${t("discountsPage.title")}`;
  }, [i18n.language, t]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getDiscountedProducts();
        // console.log(res);
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
  }, [categoryId]);

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
      inStock: product.quantity,
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
        <div className="DiscountsPage">
          <div className="container">
            <div className="discountsPageHeader">
              <h1>{t("discountsPage.title")}</h1>
            </div>
            <div className="discountsPageBody">
              {products &&
                products.map((product) => (
                  <div
                    className="product discountsPageProduct"
                    key={product._id}
                    onClick={() => handleClick(product._id)}
                  >
                    <div className="discountsPageProductImage">
                      {discount[product._id] ? (
                        <span className="top_left_popup">
                          {discount[product._id]}%
                        </span>
                      ) : null}
                      <img src={product.images[0].url} alt="" />
                    </div>
                    <div className="discountsPageProductDetails">
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
