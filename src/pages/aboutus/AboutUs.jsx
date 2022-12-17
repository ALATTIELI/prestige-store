import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAboutUs } from "../../redux/apiCalls";
import "./aboutus.css";

export default function AboutUs() {
  const { t, i18n } = useTranslation();
  const [about_us, setAbout_us] = useState({});
  const [loading, setLoading] = useState(true);

  // change the title of the page
  useEffect(() => {
    document.title = `${t("about_us.about_us")}`;
  }, [i18n.language, t]);

  useEffect(() => {
    async function fetchData() {
      const response = await getAboutUs();
      if (response) {
        setAbout_us(response);
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="aboutuspage">
      <div className="aboutus" dir={i18n.language === "en" ? "ltr" : "rtl"}>
        <h1>{t("about_us.about_us")}</h1>
        {loading ? (
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        ) : (
          <span className="aboutus_description">
            {i18n.language === "en" ? (
              <>{about_us.description_en}</>
            ) : (
              <>{about_us.description_ar}</>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
