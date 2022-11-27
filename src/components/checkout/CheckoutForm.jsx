import React, { useEffect, useState } from "react";
import {
  // PaymentRequestButtonElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const Cart = useSelector((state) => state.cart);
  const amount = Cart.total;

  const user = useSelector((state) => state.user.currentUser);

  //  wallet payment
  // const [paymentRequest, setPaymentRequest] = useState(null);

  // const [email, setEmail] = useState("");
  const email = user.email;
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // wallet payment
  // useEffect(() => {
  //   if (stripe) {
  //     const pr = stripe.paymentRequest({
  //       country: "AE",
  //       currency: "aed",
  //       total: {
  //         label: "Demo total",
  //         amount: 1099,
  //       },
  //       requestPayerName: true,
  //       requestPayerEmail: true,
  //     });
  //     // Check the availability of the Payment Request API.
  //     pr.canMakePayment().then((result) => {
  //       if (result) {
  //         setPaymentRequest(pr);
  //       }
  //     });
  //   }
  // }, [stripe]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location}`,
        receipt_email: email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => e.preventDefault()}
        placeholder="Enter email address"
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="payment-button"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            `Pay now AED ${amount}`
          )}
        </span>
      </button>
      {/* wallet payment */}
      {/* {paymentRequest && (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
      )} */}
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
