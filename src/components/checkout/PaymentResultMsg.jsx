import { useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cartRedux";

export default function PaymentResultMsg() {
  const stripe = useStripe();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message === "Payment succeeded!") {
      dispatch(clearCart());
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [message]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
  return <div> {message && <div id="payment-message">{message}</div>}</div>;
}
