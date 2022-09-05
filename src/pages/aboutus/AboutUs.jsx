import React from "react";
import { useTranslation } from "react-i18next";
import "./aboutus.css";

export default function AboutUs() {
  const { t, i18n } = useTranslation();
  return (
    <div className="aboutuspage">
      <div className="aboutus">
        <h1>{t("about_us.about_us")}</h1>
        <p>
          jbauoggvousdbbviougouvghojvb9uhfo
        </p>
      </div>
    </div>
  );
}
