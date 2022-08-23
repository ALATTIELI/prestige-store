import React from "react";
import Flag from "react-world-flags";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div onChange={changeLanguage}>
      <label>
        <i>
          <Flag code="gb" height={10} />
        </i>
        <input
          type="radio"
          value="en"
          name="language"
          defaultChecked
          style={{ display: "none" }}
        />
        EN
      </label>

      <label>
        <i>
          <Flag code="ae" height={10} />
        </i>
        <input
          type="radio"
          value="ar"
          name="language"
          style={{ display: "none" }}
        />
        AR
      </label>
    </div>
  );
};

export default LanguageSelector;
