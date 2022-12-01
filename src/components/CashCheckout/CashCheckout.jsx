import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { AddressElement } from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

// I might use Stripe Elements for the address form, but I'm not sure yet. It would eliminate the need for a custom address form.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function CashCheckout() {
  const Cart = useSelector((state) => state.cart);
  const CartItems = Cart.products;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  document.title = "Cash Checkout";

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (CartItems.length === 0) {
      navigate("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CartItems, user]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    appearance,
    locale: i18n.language === "en" ? "en" : "ar",
  };

  return (
    <div>
      <Elements options={options} stripe={stripePromise}>
        <form>
          <h3>{t("checkout.shipping")}</h3>
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
          />
        </form>
      </Elements>
    </div>
  );
}
