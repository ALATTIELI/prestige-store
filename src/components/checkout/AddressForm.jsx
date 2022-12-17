import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";

const AddressForm = () => {
  const { t } = useTranslation();
  return (
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
  );
};

export default AddressForm;
