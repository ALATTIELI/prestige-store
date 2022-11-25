import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { publicRequest } from "../../requestMethods";
import "./stripe.css";
import "./checkout.css";
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import AddressForm from "./AddressForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function Checkout() {
  const Cart = useSelector((state) => state.cart);
  const CartItems = Cart.products;

  document.title = "Checkout";

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    publicRequest
      .post("/checkout/create-payment-intent", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
      .then((data) => setClientSecret(data.data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Checkout">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <AddressForm />
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
