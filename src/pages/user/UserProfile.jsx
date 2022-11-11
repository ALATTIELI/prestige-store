import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import User from "./User";

export default function UserProfile() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    document.title = "User Profile";
  }, []);

  useEffect(() => {
    if (!user || user === null) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // edit profile
  const [edit, setEdit] = useState({});

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const handleSave = () => {
    console.log(edit);
  };

  try {
    return (
      <div className="UserProfile">
        <div className="user-container">
          <User />
          <div className="user-profile-right">
            <div className="user-right">
              <div className="user-right-top">
                <span className="title">{t("user.my_profile")}</span>
              </div>
              <div className="user-right-bottom">
                <div className="user-info">
                  <span className="user-info-title">{t("user.name")}</span>
                  <input
                    className="user-info-value"
                    placeholder={user.name}
                    value={user.name}
                    disabled
                    onChange={(e) => e.target.value}
                  />
                </div>
                <div className="user-info">
                  <span className="user-info-title">{t("user.email")}</span>
                  <input
                    className="user-info-value"
                    placeholder={user.email}
                    value={user.email}
                    disabled
                    onChange={(e) => e.target.value}
                  />
                </div>
                <div className="user-info">
                  <span className="user-info-title">{t("user.phone")}</span>
                  <input
                    className="user-info-value"
                    placeholder={user.phone}
                    value={user.phone}
                    disabled
                    onChange={(e) => e.target.value}
                  />
                </div>
                <div className="user-info">
                  <span className="user-info-title">{t("user.address")}</span>
                  <input
                    className="user-info-value"
                    placeholder={user.address}
                    value={user.address}
                    disabled
                    onChange={(e) => e.target.value}
                  />
                </div>
              </div>
            </div>

            {/* EDIT */}

            <div className="user-right">
              <div className="user-right-top">
                <span className="title">{t("user.edit_user")}</span>
              </div>
              <div className="user-right-bottom">
                <div className="user-info">
                  <span className="user-info-title">{t("user.name")}</span>
                  <input
                    className="user-info-value"
                    placeholder={user.name}
                    defaultValue={user.name}
                    name="name"
                    onChange={(e) => handleEdit(e)}
                  />
                </div>
                <div className="user-info">
                  <span className="user-info-title">{t("user.email")}</span>
                  <input
                    className="user-info-value"
                    placeholder={user.email}
                    defaultValue={user.email}
                    name="email"
                    onChange={(e) => handleEdit(e)}
                  />
                </div>
                <div className="user-info">
                  <span className="user-info-title">{t("user.phone")}</span>
                  <input
                    className="user-info-value"
                    type="tel"
                    placeholder={user.phone}
                    defaultValue={user.phone}
                    name="phone"
                    onChange={(e) => handleEdit(e)}
                  />
                </div>
                <div className="user-info">
                  <span className="user-info-title">{t("user.address")}</span>
                  <input
                    className="user-info-value"
                    placeholder={user.address}
                    defaultValue={user.address}
                    name="address"
                    onChange={(e) => handleEdit(e)}
                  />
                </div>
              </div>
              <button className="user-save" onClick={handleSave}>
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
  }
}
