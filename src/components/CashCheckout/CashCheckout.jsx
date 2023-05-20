import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { AddressElement } from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import "./cashCheckout.css";
import { createOrder } from "../../redux/apiCalls";

// I might use Stripe Elements for the address form, but I'm not sure yet. It would eliminate the need for a custom address form.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function CashCheckout() {
  const Cart = useSelector((state) => state.cart);
  const CartItems = Cart.products;
  const amount = Cart.total;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [addressElement, setAddressElement] = useState({});

  document.title = "Cash Checkout";

  // check if user is logged in
  const user = useSelector((state) => state.user.currentUser);

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (CartItems.length === 0) {
      navigate("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CartItems]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    appearance,
    locale: i18n.language === "en" ? "en" : "ar",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!addressElement) {
      return;
    }

    if (!addressElement.complete) {
      alert("Please fill out the address form.");
      return;
    }

    console.log("submitting");
    let address = addressElement.value;
    console.log(address);

    let line1 = address.address.line1 === null ? "" : address.address.line1;
    let line2 = address.address.line2 === null ? "" : address.address.line2;
    let street = line1 + " " + line2;

    let shipping_address = {
      name: address.name,
      phone: address.phone,
      street: street,
      city: address.address.state,
    };

    let order = {
      user_email: email,
      products: CartItems,
      paymentOption: "COD",
      shipping_address: shipping_address,
    };

    try {
      let res = await createOrder(order);
      console.log(res);
      if (res) {
        alert(res.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddressChange = (event) => {
    let address = event;
    setAddressElement(address);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  return (
    <div className="cashCheckout">
      <Elements options={options} stripe={stripePromise}>
        <form onSubmit={handleSubmit}>
          <h3>{t("checkout.shipping")}</h3>
          <br />
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => handleEmailChange(e)}
            placeholder="Enter email address"
          />
          <AddressElement
            options={{
              mode: "shipping",
              allowedCountries: ["AE"],
              defaultValues: { address: { country: "AE" } },
              blockPoBox: false,
              fields: {
                phone: "always",
              },
              validation: {
                phone: {
                  required: "always",
                },
              },
            }}
            onChange={(e) => handleAddressChange(e)}
          />
          <br />
          <button id="submit" className="payment-button">
            <span id="button-text">
              {
                // false ? (
                //   <div className="spinner" id="spinner"></div>
                // ) : (
                <>
                  {i18n.language === "en" ? (
                    <>Submit Order, Total: {amount} AED</>
                  ) : (
                    <>تقديم الطلب، الإجمالي: {amount} درهم</>
                  )}
                </>
                // )
              }
            </span>
          </button>
        </form>
      </Elements>
    </div>
  );
}
