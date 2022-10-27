import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getBrands, getImageById } from "../../redux/apiCalls";
import "./brands.css";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const Brands = () => {
  const { t, i18n } = useTranslation();
  const [productItems, setProductItems] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getBrands();
        console.log(res);
        if (res !== null) {
          setProductItems(res);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleClick = (id) => {
    navigate(`/brand/${id}`);
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="brand_card">
          <div className="brand_card_title">
            <WorkspacePremiumIcon className="brand_card_title_icon" />
            <span>BRANDS</span>
          </div>
          <div className="brand_card_items">
            {productItems &&
              productItems.map((productItem) => {
                return (
                  <div
                    className="brand_card_item"
                    key={productItem._id}
                    onClick={() => handleClick(productItem._id)}
                  >
                    <div className="brand_card_item_img">
                      <img src={getImageById(productItem.image)} alt="" />
                    </div>
                    <div className="brand_card_item_name">
                      <span>
                        {i18n.language === "en"
                          ? productItem.name
                          : productItem.name}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Brands;
