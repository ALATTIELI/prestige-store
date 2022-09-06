import React from "react";
import { useTranslation } from "react-i18next";
import User from "./User";

export default function UserProfile() {
  const { t, i18n } = useTranslation();

  return (
    <div className="UserProfile">
      <div className="user-container">
        <User />
        <div className="user-right">
          <div className="user-right-top">
            <span className="title">{t("user.my_profile")}</span>
          </div>
          <div className="user-right-bottom">
            <div className="user-info">
              <span className="user-info-title">{t("user.name")}</span>
              <input
                className="user-info-value"
                placeholder="Ahmed"
                defaultValue={"Bilal"}
              />
            </div>
            <div className="user-info">
              <span className="user-info-title">{t("user.email")}</span>
              <input
                className="user-info-value"
                placeholder="email@gmail.com"
                defaultValue={"email@gmail.com"}
              />
            </div>
            <div className="user-info">
              <span className="user-info-title">{t("user.phone")}</span>
              <input
                className="user-info-value"
                placeholder="+20123456789"
                defaultValue={"+20123456789"}
              />
            </div>
            <div className="user-info">
              <span className="user-info-title">{t("user.address")}</span>
              <input
                className="user-info-value"
                placeholder="AJM - SNVNDKSKV"
                defaultValue="AJM - AL RAWDA 3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
