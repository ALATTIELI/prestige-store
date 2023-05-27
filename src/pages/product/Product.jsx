import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  getBrandById,
  getCategoryById,
  getImageById,
  getProductById,
} from "../../redux/apiCalls";
import { addToCart } from "../../redux/cartRedux";
import "./product.css";

export default function Product() {
  const { t, i18n } = useTranslation();
  const [product_data, setProduct_data] = useState([]);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const product_id = window.location.pathname.split("/").pop();
  const dispatch = useDispatch();
  // Show img from the thumbnail to the main img
  function showImg(e) {
    const img = e.target;
    const mainImg = document.getElementById("main-img");
    mainImg.src = img.src;
  }

  // change the title of the page to the product name
  useEffect(() => {
    document.title = `${
      i18n.language === "en" ? product_data.name_en : product_data.name_ar
    }`;
  }, [product_data, i18n.language]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getProductById(product_id);
        // console.log(res);
        if (res !== null && res !== false) {
          setProduct_data(res);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getBrandById(product_data.brand);
        // console.log(res);
        if (res !== null) {
          setBrand(res);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [product_data]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCategoryById(product_data.category);
        // console.log(res);
        if (res !== null) {
          setCategory(res);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [product_data]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    const data = {
      ...product,
      quantity: 1,
    };
    dispatch(addToCart(data));

    // start an animation to show the product is added to the cart
    const button = e.currentTarget;

    // replace the text with a rotating icon
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;

    // after 1 second, replace the icon with a checkmark
    setTimeout(() => {
      button.innerHTML = `<i class="fas fa-check"></i>`;
      // after 2 seconds, replace the checkmark with the original text
      setTimeout(() => {
        button.innerHTML = t("product.add_to_cart");
      }, 2000);
    }, 1000);
  };

  return (
    <div className="Product-Page">
      {loading ? (
        <div className="product-not-found">
          <h1>LOADING...</h1>
        </div>
      ) : (
        <main className="product-container">
          <div className="product-top">
            <div className="product-left-column">
              <div className="product-left-column-img">
                {product_data && (
                  <img
                    id="main-img"
                    data-image="red"
                    className="active"
                    src={getImageById(product_data.images[0])}
                    alt=""
                  />
                )}
              </div>
              <div className="product-thumbnails">
                {product_data &&
                  product_data.images.map((img) => {
                    return (
                      <div>
                        <img
                          onClick={(e) => showImg(e)}
                          data-image="red"
                          className="active"
                          src={getImageById(img)}
                          alt="product"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="product-right-column">
              <div className="product-product-description">
                <div className="product-product-description-top" dir="auto">
                  <span>
                    {i18n.language === "en"
                      ? category.name_en
                      : category.name_ar}
                  </span>
                  <h1>
                    {i18n.language === "en"
                      ? product_data.name_en
                      : product_data.name_ar}
                  </h1>
                  <h2>
                    {i18n.language === "en"
                      ? product_data.short_description_en
                      : product_data.short_description_ar}
                  </h2>
                </div>
                <div className="product-product-description-bottom">
                  <div className="product-product-description-bottom-left">
                    <span>
                      {i18n.language === "en" ? (
                        <>
                          {t("product.brand")}: {brand.name}
                        </>
                      ) : (
                        <>
                          {brand.name} : {t("product.brand")}
                        </>
                      )}
                    </span>
                    <span>
                      {t("product.stock")}: {product_data.quantity}
                    </span>
                  </div>
                  <div className="product-product-description-bottom-right">
                    <span>
                      {i18n.language === "en" ? (
                        <>
                          {t("product.SKU")}: {product_data.sku}
                        </>
                      ) : (
                        <>
                          {product_data.sku} : {t("product.SKU")}
                        </>
                      )}
                    </span>
                    <span>
                      {i18n.language === "en" ? (
                        <>
                          {t("product.code")}: {product_data.code}
                        </>
                      ) : (
                        <>
                          {product_data.code} : {t("product.code")}
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="product-product-configuration">
                <div className="product-product-price">
                  {product_data.discountID ? (
                    <div className="product-product-price-discount">
                      <div className="product-product-price-discount-row">
                        <span
                          className="DiscountOriginalPrice"
                          style={{ textDecoration: "line-through" }}
                        >
                          AED {product_data.price}
                        </span>
                        <span className="DiscountPrice">
                          AED {product_data.TotalPrice}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span>{product_data.TotalPrice} AED</span>
                  )}

                  <a
                    href=" "
                    className="cart-btn"
                    onClick={(e) => handleAddToCart(e, product_data)}
                  >
                    {t("product.add_to_cart")}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              i18n.language === "en" ? "product-bottom en" : "product-bottom ar"
            }
          >
            <div className="product-description">
              <h1>{t("product.description")}</h1>
              <p dir="auto">
                {i18n.language === "en"
                  ? product_data.description_en
                  : product_data.description_ar}
              </p>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
