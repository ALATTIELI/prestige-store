import React from "react";
import "./contactus.css";
import PhoneIcon from "@mui/icons-material/Phone";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const { t, i18n } = useTranslation();

  return (
    <div className="ContactUs">
      <div className="contactus-grid">
        <div className="contactus-item">
          <span className="contactus-item-title">
            {t("locations.prestige_one_mobile_Phones_mbz_city_branch")}
          </span>
          <div className="contactus-item-detail phone-section">
            <a className="phone" href="tel:+971529677703">
              <PhoneIcon className="contactus-item-icon" />
              +971529677703
            </a>
          </div>
          <div className="contactus-item-detail">
            <a
              className="contactus-item-detail-mapbtn"
              href="https://goo.gl/maps/Nh5xbQjBg4fbozv99"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/24/2875/2875433.png"
                  alt="Maps Icon"
                />
                {t("locations.view_in_google_maps")}
              </span>
            </a>
          </div>
        </div>

        <div className="contactus-item">
          <span className="contactus-item-title">
            {t("locations.prestige_one_mobile_phones_west_yas_plaza_branch")}
          </span>
          <div className="contactus-item-detail phone-section">
            <a className="phone" href="tel:+971522222136">
              <PhoneIcon className="contactus-item-icon" />
              +971522222136
            </a>
          </div>
          <div className="contactus-item-detail">
            <a
              className="contactus-item-detail-mapbtn"
              href="https://goo.gl/maps/wCz6VFmZdM2tNHje9"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/24/2875/2875433.png"
                  alt="Maps Icon"
                />
                {t("locations.view_in_google_maps")}
              </span>
            </a>
          </div>
        </div>
        <div className="contactus-item">
          <span className="contactus-item-title">
            {t("locations.prestige_one_mobile_phones_defence_road")}
          </span>
          <div className="contactus-item-detail phone-section">
            <a className="phone" href="tel:+97126411168">
              <PhoneIcon className="contactus-item-icon" />
              +97126411168
            </a>
            <a className="phone" href="tel:+97126506868">
              <PhoneIcon className="contactus-item-icon" />
              +97126506868
            </a>
          </div>
          <div className="contactus-item-detail">
            <a
              className="contactus-item-detail-mapbtn"
              href="https://goo.gl/maps/qznkYRPVNdxuJsVR9"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/24/2875/2875433.png"
                  alt="Maps Icon"
                />
                {t("locations.view_in_google_maps")}
              </span>
            </a>
          </div>
        </div>
        <div className="contactus-item">
          <span className="contactus-item-title">
            {t("locations.al_shamkhah_prestige_phones")}
          </span>
          <div className="contactus-item-detail phone-section">
            <a className="phone" href="tel:+971558957773">
              <PhoneIcon className="contactus-item-icon" />
              +971558957773
            </a>
          </div>
          <div className="contactus-item-detail">
            <a
              className="contactus-item-detail-mapbtn"
              href="https://goo.gl/maps/i512tbHVHwodTwzV9"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/24/2875/2875433.png"
                  alt="Maps Icon"
                />
                {t("locations.view_in_google_maps")}
              </span>
            </a>
          </div>
        </div>
        <div className="contactus-item">
          <span className="contactus-item-title">
            {t("locations.prestige_zakher_phones")}
          </span>
          <div className="contactus-item-detail phone-section">
            <a className="phone" href="tel:+971558957774">
              <PhoneIcon className="contactus-item-icon" />
              +971558957774
            </a>
          </div>
          <div className="contactus-item-detail">
            <a
              className="contactus-item-detail-mapbtn"
              href="https://goo.gl/maps/nJVkozB4BpzoYtar6"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/24/2875/2875433.png"
                  alt="Maps Icon"
                />
                {t("locations.view_in_google_maps")}
              </span>
            </a>
          </div>
        </div>
        <div className="contactus-item">
          <span className="contactus-item-title">
            {t("locations.prestige_yas_phone_L.L.C")}
          </span>
          <div className="contactus-item-detail phone-section">
            <a className="phone" href="tel:+971558957772">
              <PhoneIcon className="contactus-item-icon" />
              +971558957772
            </a>
          </div>
          <div className="contactus-item-detail">
            <a
              className="contactus-item-detail-mapbtn"
              href="https://goo.gl/maps/7iDNrsumUAWHWSpV6"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/24/2875/2875433.png"
                  alt="Maps Icon"
                />
                {t("locations.view_in_google_maps")}
              </span>
            </a>
          </div>
        </div>
        <div className="contactus-item">
          <span className="contactus-item-title">
            {t("locations.telephono")}
          </span>
          <div className="contactus-item-detail phone-section">
            <a className="phone" href="tel:+971558957771">
              <PhoneIcon className="contactus-item-icon" />
              +971558957771
            </a>
          </div>
          <div className="contactus-item-detail">
            <a
              className="contactus-item-detail-mapbtn"
              href="https://goo.gl/maps/nhWeve4FrYpZSuZh8"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/24/2875/2875433.png"
                  alt="Maps Icon"
                />
                {t("locations.view_in_google_maps")}
              </span>
            </a>
          </div>
        </div>
        <div className="contactus-item">
          <span className="contactus-item-title">
            {t("locations.prestige_one_mobile_phones_yas_branch")}
          </span>
          <div className="contactus-item-detail phone-section">
            <a className="phone" href="tel:+971529677704">
              <PhoneIcon className="contactus-item-icon" />
              +971529677704
            </a>
          </div>
          <div className="contactus-item-detail">
            <a
              className="contactus-item-detail-mapbtn"
              href="https://goo.gl/maps/E7WbGcT4qQT1swSD8"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/24/2875/2875433.png"
                  alt="Maps Icon"
                />
                {t("locations.view_in_google_maps")}
              </span>
            </a>
          </div>
        </div>
        <div className="contactus-item">
          <span className="contactus-item-title">
            {t("locations.prestige_yas_phones_L.T.D")}
          </span>
          <div className="contactus-item-detail phone-section">
            <a className="phone" href="tel:+971558951117">
              <PhoneIcon className="contactus-item-icon" />
              +971558951117
            </a>
          </div>
          <div className="contactus-item-detail">
            <a
              className="contactus-item-detail-mapbtn"
              href="https://goo.gl/maps/K96tFgDSvbU5Hiu38"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/24/2875/2875433.png"
                  alt="Maps Icon"
                />
                {t("locations.view_in_google_maps")}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
