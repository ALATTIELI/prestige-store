import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, link, useNavigate } from "react-router-dom";
import { getCategories, getImageById } from "../../redux/apiCalls";

const Categories = () => {
  const { t, i18n } = useTranslation();
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCategories();
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
      <div className="category">
        {productItems.map((productItem) => {
          return (
            <div className="box f_flex" key={productItem._id}>
              <img src={getImageById(productItem.image)} alt="" />
              <span>
                {i18n.language === "en"
                  ? productItem.name_en
                  : productItem.name_ar}
              </span>
            </div>
          );
        })}
        <div
          className="box mainpage_categories_viewAll"
          style={{ backgroundColor: "#f2f2f2" }}
        >
          <Link to="/categories">
            <span>{t("categories.view_all")}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Categories;
