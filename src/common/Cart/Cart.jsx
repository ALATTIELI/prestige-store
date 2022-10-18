import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.css";

const Cart = () => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const CartItem = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 1,
    },
  ]

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

  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">{t("cart.no_items_in_cart")}</h1>
            )}

            {CartItem.map((item) => {
              const productQty = item.price * item.qty;

              // eslint-disable-next-line no-lone-blocks
              return (
                <>
                  {isMobile ? (
                    <>
                      <div className="cart-list" key={item.id}>
                        <div className="cart-left">
                          <div className="img">
                            <img src={item.cover} alt="" />
                          </div>
                          <div className="cartControl d_flex">
                            <button
                              className="desCart"
                              // onClick={() => decreaseQty(item)}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <button
                              className="incCart"
                              // onClick={() => addToCart(item)}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="cart-right">
                          <div className="cart-details">
                            <h3>{item.name}</h3>
                            <h4>
                              <span className="price-qt">
                                {" "}
                                AED {item.price}.00 * {item.qty}{" "}
                              </span>
                              <span className="final-price">
                                AED {productQty}.00
                              </span>
                            </h4>
                          </div>
                          <div className="cart-items-function">
                            <div className="removeCart">
                              <button
                                className="removeCartBtn"
                                // onClick={() => removeItem(item)}
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
                          <img src={item.cover} alt="" />
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
                          <h3>{item.name}</h3>
                          <h4>
                            <span className="price-qt">
                              {" "}
                              AED {item.price}.00 * {item.qty}{" "}
                            </span>
                            <span className="final-price">
                              AED {productQty}.00
                            </span>
                          </h4>
                        </div>
                        <div className="cart-items-function">
                          <div className="cartControl">
                            <button
                              className="desCart"
                              // onClick={() => decreaseQty(item)}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <button
                              className="incCart"
                              // onClick={() => addToCart(item)}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                          <div className="removeCart">
                            <button
                              className="removeCartBtn"
                              // onClick={() => removeItem(item)}
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
                  <td>
                    <input type="radio" name="payment" id="cash" />
                    <label htmlFor="cash">{t("cart.cash_on_delivery")}</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="radio" name="payment" id="card" />
                    <label htmlFor="card">{t("cart.card")}</label>
                  </td>
                </tr>
              </tbody>
            </div>
            <div className="cart-total product">
              <h2>{t("cart.cart_summary")}</h2>
              <div className="d_flex">
                <h4>{t("cart.total_price")}</h4>
                <h3>AED {totalPrice}.00</h3>
              </div>
              <span>(5% VAT INCLUDED)</span>
            </div>
            <div className="cart-checkout">
              <button className="checkout-btn">{t("cart.checkout")}</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
