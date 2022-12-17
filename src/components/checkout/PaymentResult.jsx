import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useTranslation } from "react-i18next";
import PaymentResultMsg from "./PaymentResultMsg";
import "./paymentResult.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function PaymentResult() {
  const { i18n } = useTranslation();
  const appearance = {
    theme: "stripe",
  };
  const options = {
    appearance,
    locale: i18n.language === "en" ? "en" : "ar",
  };

  return (
    <div className="PaymentResult">
      {stripePromise && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentResultMsg />
        </Elements>
      )}
    </div>
  );
}
