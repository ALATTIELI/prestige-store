import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getImageById } from "../../redux/apiCalls";
import {
  clearCart,
  decreaseProductQuantity,
  increaseProductQuantity,
  removeFromCart,
} from "../../redux/cartRedux";
import "./style.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { publicRequest } from "../../requestMethods";
import "./stripe.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Cart = () => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.cart);
  const CartItems = Cart.products;

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

  const totalPrice = Cart.total;
  // CartItem.reduce(
  //   (price, item) => price + item.qty * item.price,
  //   0
  // );

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

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    publicRequest
      .post("/checkout/create-payment-intent", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
      .then((data) => setClientSecret(data.data.clientSecret));

    // fetch("/create-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
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
                      <input type="radio" name="payment" id="cash" />
                      <label htmlFor="cash">{t("cart.cash_on_delivery")}</label>
                    </td>
                  </label>
                </tr>
                <tr>
                  <label htmlFor="card">
                    <td>
                      <input type="radio" name="payment" id="card" />
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
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
              {/* <button className="checkout-btn">{t("cart.checkout")}</button> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
