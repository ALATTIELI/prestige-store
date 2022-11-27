import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { publicRequest } from "../../requestMethods";
import "./stripe.css";
import "./checkout.css";
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import AddressForm from "./AddressForm";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function Checkout() {
  const Cart = useSelector((state) => state.cart);
  const CartItems = Cart.products;
  const navigate = useNavigate();

  document.title = "Checkout";

  const [clientSecret, setClientSecret] = useState("");

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (CartItems.length === 0) {
      navigate("/cart");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CartItems, user]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    publicRequest
      .post("/checkout/create-payment-intent", {
        items: CartItems,
      })
      .then((data) => setClientSecret(data.data.clientSecret));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {stripePromise && clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <AddressForm />
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
