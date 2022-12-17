import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPrivacyPolicy } from "../../redux/apiCalls";
import "./privacyPolicy.css";

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const [privacy_policy, setPrivacy_policy] = useState({});
  const [loading, setLoading] = useState(true);

  // change the title of the page
  useEffect(() => {
    document.title = `${t("about_us.privacy_policy")}`;
  }, [i18n.language, t]);

  useEffect(() => {
    async function fetchData() {
      const response = await getPrivacyPolicy();
      if (response) {
        setPrivacy_policy(response);
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="privacypage">
      <div
        className="privacyPolicy"
        dir={i18n.language === "en" ? "ltr" : "rtl"}
      >
        <h1>{t("about_us.privacy_policy")}</h1>
        {loading ? (
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        ) : (
          <span className="privacy_policy_description">
            {i18n.language === "en" ? (
              <>{privacy_policy.description_en}</>
            ) : (
              <>{privacy_policy.description_ar}</>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
