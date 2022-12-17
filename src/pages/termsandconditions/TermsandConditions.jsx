import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTnS } from "../../redux/apiCalls";
import "./termsandConditions.css";

export default function TermsandConditions() {
  const { t, i18n } = useTranslation();
  const [tns, setTns] = useState({});
  const [loading, setLoading] = useState(true);

  // change the title of the page
  useEffect(() => {
    document.title = `${t("about_us.terms_and_conditions")}`;
  }, [i18n.language, t]);

  useEffect(() => {
    async function fetchData() {
      const response = await getTnS();
      if (response) {
        setTns(response);
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="termspage">
      <div
        className="termsandconditions"
        dir={i18n.language === "en" ? "ltr" : "rtl"}
      >
        <h1>{t("about_us.terms_and_conditions")}</h1>
        {loading ? (
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        ) : (
          <span className="tns_description">
            {i18n.language === "en" ? (
              <>{tns.description_en}</>
            ) : (
              <>{tns.description_ar}</>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
