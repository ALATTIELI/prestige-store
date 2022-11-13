import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getCategories, getImageById } from "../../redux/apiCalls";
import "./categories.css";
import CategoryIcon from "@mui/icons-material/Category";

const Categories = () => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const [productItems, setProductItems] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCategories();
        // console.log(res);
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
    navigate(`/category/${id}`);
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="cate_card">
          <div className="cate_card_title">
            <CategoryIcon className="cate_card_title_icon" />
            <span>CATEGORIES</span>
          </div>
          <div className="cate_card_items">
            {productItems &&
              productItems.map((productItem) => {
                return (
                  <div
                    className="cate_card_item"
                    key={productItem._id}
                    onClick={() => handleClick(productItem._id)}
                  >
                    <div className="cate_card_item_img">
                      <img src={getImageById(productItem.image)} alt="" />
                    </div>
                    <div className="cate_card_item_name">
                      <span>
                        {i18n.language === "en"
                          ? productItem.name_en
                          : productItem.name_ar}
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

export default Categories;
