import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../redux/apiCalls";
import User from "./User";

export default function UserProfile() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const userid = useSelector((state) => state.user.currentUser.id);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "User Profile";
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getUserById(userid);
        if (res !== null && res !== false) {
          setUser(res);
          console.log(res);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(true);
      }
    };
    getUser();
  }, [userid]);

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
    if (name === "city") {
      setEdit({
        ...edit,
        shippingAddress: { ...edit.shippingAddress, city: value },
      });
    } else if (name === "street") {
      setEdit({
        ...edit,
        shippingAddress: { ...edit.shippingAddress, street: value },
      });
    } else {
      setEdit({ ...edit, [name]: value });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    // check if form is empty

    let empty = true;
    // loop through editState and check if any value is empty
    for (const [value] of Object.entries(edit)) {
      if (value === "" || value === undefined || value === null) {
        empty = true;
        // break;
      } else {
        empty = false;
      }
    }

    if (empty) {
      alert("Please Change Something Before Saving");
      return;
    }

    console.log(edit);
    const updatedUser = {
      ...edit,
    };
    console.log(updatedUser);

    // update user
    try {
      let res = updateUser(userid, updatedUser);
      if (res) {
        alert("User Updated Successfully 😊");
      }
    } catch (err) {
      console.log("User not Updated 😔");
    }
  };

  try {
    return (
      <div className="UserProfile">
        {loading ? (
          <div className="loading">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
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
                      placeholder={user.phoneNumber}
                      value={user.phoneNumber}
                      disabled
                      onChange={(e) => e.target.value}
                    />
                  </div>
                  <div className="user-info">
                    <span className="user-info-title">{t("user.address")}</span>
                    <div className="adress-details">
                      <span className="adress-details-city">
                        {t("user.address_city")}
                      </span>
                      <input
                        className="user-info-value"
                        placeholder={
                          user.shippingAddress && user.shippingAddress.city
                            ? user.shippingAddress.city
                            : ""
                        }
                        value={
                          user.shippingAddress && user.shippingAddress.city
                            ? user.shippingAddress.city
                            : ""
                        }
                        disabled
                      />
                      <span className="adress-details-street">
                        {t("user.address_street")}
                      </span>
                      <input
                        className="user-info-value"
                        placeholder={
                          user.shippingAddress && user.shippingAddress.street
                            ? user.shippingAddress.street
                            : ""
                        }
                        defaultValue={
                          user.shippingAddress && user.shippingAddress.street
                            ? user.shippingAddress.street
                            : ""
                        }
                        disabled
                      />
                    </div>
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
                    <span className="user-info-title">{t("user.phone")}</span>
                    <input
                      className="user-info-value"
                      type="tel"
                      placeholder={user.phoneNumber}
                      defaultValue={user.phoneNumber}
                      name="phoneNumber"
                      onChange={(e) => handleEdit(e)}
                    />
                  </div>
                  <div className="user-info">
                    <span className="user-info-title">{t("user.address")}</span>
                    <div className="adress-details">
                      <span className="adress-details-city">
                        {t("user.address_city")}
                      </span>
                      <select
                        className="user-info-value"
                        name="city"
                        onChange={handleEdit}
                      >
                        <option value="Abu Dhabi">Abu Dhabi</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Sharjah">Sharjah</option>
                        <option value="Ajman">Ajman</option>
                        <option value="Umm Al Quwain">Umm Al Quwain</option>
                        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                        <option value="Fujairah">Fujairah</option>
                      </select>

                      <span className="adress-details-street">
                        {t("user.address_street")}
                      </span>
                      <input
                        className="user-info-value"
                        placeholder={
                          user.shippingAddress && user.shippingAddress.street
                            ? user.shippingAddress.street
                            : ""
                        }
                        defaultValue={
                          user.shippingAddress && user.shippingAddress.street
                            ? user.shippingAddress.street
                            : ""
                        }
                        name="street"
                        onChange={(e) => handleEdit(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="user-save">
                  <button className="user-save-btn" onClick={handleSave}>
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (err) {
    console.log(err);
  }
}
