import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImageById, getProductById } from "../../redux/apiCalls";
import {
  clearCart,
  decreaseProductQuantity,
  increaseProductQuantity,
  removeFromCart,
  updateCart,
} from "../../redux/cartRedux";
import "./style.css";

const Cart = () => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.cart);
  const CartItems = Cart.products;
  const [paymentMethod, setPaymentMethod] = useState("card");

  const user = useSelector((state) => state.user.currentUser);

  document.title = "Cart";
  // check if website is open in mobile or not
  // const isMobile = window.innerWidth < 768;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setIsMobile(window.innerWidth < 768);
      } else {
        setIsMobile(false);
      }
    });
  });

  useEffect(() => {
    let productIds = CartItems.map((item) => item._id);
    const fetchProducts = async () => {
      productIds.map(async (id) => {
        const product = await getProductById(id);
        if (product) {
          dispatch(updateCart(product));
        } else {
          dispatch(removeFromCart(id));
        }
      });
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CartItems]);

  const totalPrice = Cart.total;

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleIncrease = (product) => {
    dispatch(increaseProductQuantity(product));
  };

  const handleDecrease = (product) => {
    dispatch(decreaseProductQuantity(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {Cart.cartQuantity !== 0 && (
              <div className="clear-cart">
                <button
                  className="clear-cart-btn"
                  onClick={() => handleClearCart()}
                >
                  Clear Cart <i className="fas fa-trash"></i>
                </button>
              </div>
            )}
            {CartItems.length === 0 && (
              <>
                <h1 className="no-items product">
                  {t("cart.no_items_in_cart")}
                </h1>
              </>
            )}

            {CartItems.map((item) => {
              const productQty = item.TotalPrice * item.quantity;

              // eslint-disable-next-line no-lone-blocks
              return (
                <>
                  {isMobile ? (
                    <>
                      <div className="cart-list" key={item.id}>
                        <div className="cart-left">
                          <div className="img">
                            <img src={getImageById(item.images[0])} alt="" />
                          </div>
                          <div className="cartControl d_flex">
                            <button
                              className="desCart"
                              onClick={() => handleDecrease(item)}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <button
                              className="incCart"
                              onClick={() => handleIncrease(item)}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="cart-right">
                          <div className="cart-details">
                            <h3>
                              {i18n.language === "en"
                                ? item.name_en
                                : item.name_ar}
                            </h3>
                            <h4>
                              <span className="price-qt">
                                {" "}
                                AED {item.TotalPrice} * {item.quantity}{" "}
                              </span>
                              <span className="final-price">
                                AED {productQty}
                              </span>
                            </h4>
                          </div>
                          <div className="cart-items-function">
                            <div className="removeCart">
                              <button
                                className="removeCartBtn"
                                onClick={() => handleRemove(item)}
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="cart-item-price"></div>
                      </div>
                    </>
                  ) : (
                    <div className="cart-list" key={item.id}>
                      <div className="cart-left">
                        <div className="img">
                          <img src={getImageById(item.images[0])} alt="" />
                        </div>
                        {/* <div className="cartControl d_flex">
                          <button
                            className="desCart"
                            onClick={() => decreaseQty(item)}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <button
                            className="incCart"
                            onClick={() => addToCart(item)}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div> */}
                      </div>
                      <div className="cart-right">
                        <div className="cart-details">
                          <h3>
                            {i18n.language === "en"
                              ? item.name_en
                              : item.name_ar}
                          </h3>
                          <h4>
                            <span className="price-qt">
                              {" "}
                              AED {item.TotalPrice} * {item.quantity}{" "}
                            </span>
                            <span className="final-price">
                              AED {productQty}
                            </span>
                          </h4>
                        </div>
                        <div className="cart-items-function">
                          <div className="cartControl">
                            <button
                              className="desCart"
                              onClick={() => handleDecrease(item)}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <button
                              className="incCart"
                              onClick={() => handleIncrease(item)}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                          <div className="removeCart">
                            <button
                              className="removeCartBtn"
                              onClick={() => handleRemove(item)}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="cart-item-price"></div>
                    </div>
                  )}
                </>
              );
            })}
          </div>

          <div className="cart-summary">
            <div className="payment-method">
              <h3>{t("cart.payment_method")}</h3>
              <tbody>
                <tr>
                  <label htmlFor="cash">
                    <td>
                      <input
                        type="radio"
                        name="payment"
                        id="cash"
                        onClick={() => setPaymentMethod("cash")}
                      />
                      <label htmlFor="cash">{t("cart.cash_on_delivery")}</label>
                    </td>
                  </label>
                </tr>
                <tr>
                  <label htmlFor="card">
                    <td>
                      <input
                        type="radio"
                        name="payment"
                        id="card"
                        onClick={() => setPaymentMethod("card")}
                      />
                      <label htmlFor="card">{t("cart.card")}</label>
                    </td>
                  </label>
                </tr>
              </tbody>
            </div>
            <div className="cart-total">
              <h2>{t("cart.cart_summary")}</h2>
              <div className="d_flex">
                <h4>{t("cart.total_price")}</h4>
                <h3>AED {totalPrice}</h3>
              </div>
              <span>(5% VAT INCLUDED)</span>
            </div>
            <div className="cart-checkout">
              {user !== null ? (
                <>
                  {CartItems.length > 0 ? (
                    <>
                      {paymentMethod === "card" ? (
                        <Link to="/checkout">
                          <button className="checkout-btn">
                            {t("cart.checkout")}
                          </button>
                        </Link>
                      ) : (
                        <Link to="/cod-checkout">
                          <button className="checkout-btn">
                            {t("cart.checkout")}
                          </button>
                        </Link>
                      )}
                    </>
                  ) : (
                    <button className="checkout-btn" disabled>
                      {t("cart.empty")}
                    </button>
                  )}
                </>
              ) : (
                <Link to="/login">
                  <button className="checkout-btn">{t("cart.login")}</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
