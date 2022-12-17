import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./returnsandRefunds.css";

export default function ReturnsandRefunds() {
  const { t, i18n } = useTranslation();

  // change the title of the page
  useEffect(() => {
    document.title = `${t("about_us.returns_and_refunds")}`;
  }, [i18n.language, t]);
  return (
    <div className="returnspage">
      <div className="returnsandrefunds">
        <h1>{t("about_us.returns_and_refunds")}</h1>
        <p>jbauoggvousdbbviougouvghojvb9uhfouewbvpipdsishvHVLNCV</p>
      </div>
    </div>
  );
}
