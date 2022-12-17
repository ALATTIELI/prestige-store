import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getReturnRefund } from "../../redux/apiCalls";
import "./returnsandRefunds.css";

export default function ReturnsandRefunds() {
  const { t, i18n } = useTranslation();
  const [returns_and_refunds, setReturns_and_refunds] = useState({});
  const [loading, setLoading] = useState(true);

  // change the title of the page
  useEffect(() => {
    document.title = `${t("about_us.returns_and_refunds")}`;
  }, [i18n.language, t]);

  useEffect(() => {
    async function fetchData() {
      const response = await getReturnRefund();
      if (response) {
        setReturns_and_refunds(response);
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="returnspage">
      <div
        className="returnsandrefunds"
        dir={i18n.language === "en" ? "ltr" : "rtl"}
      >
        <h1>{t("about_us.returns_and_refunds")}</h1>
        {loading ? (
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        ) : (
          <span className="returns_and_refunds_description">
            {i18n.language === "en" ? (
              <>{returns_and_refunds.description_en}</>
            ) : (
              <>{returns_and_refunds.description_ar}</>
            )}
          </span>
        )}{" "}
      </div>
    </div>
  );
}
