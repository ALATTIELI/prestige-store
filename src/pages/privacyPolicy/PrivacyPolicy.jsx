import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./privacyPolicy.css";

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();

  // change the title of the page
  useEffect(() => {
    document.title = `${t("about_us.privacy_policy")}`;
  }, [i18n.language, t]);
  return (
    <div className="privacypage">
      <div className="privacyPolicy">
        <h1>{t("about_us.privacy_policy")}</h1>
        <p>jbauoggvousdbbviougouvghojvb9uhfouewbvpipdsishv</p>
      </div>
    </div>
  );
}
