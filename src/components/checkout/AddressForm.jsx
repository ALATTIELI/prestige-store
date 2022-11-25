import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";

const AddressForm = () => {
  return (
    <form>
      <h3>Shipping</h3>
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
