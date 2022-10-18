import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import {
  getBrands,
  getImageById,
  getLimitedBrands,
} from "../../redux/apiCalls";

const Catg = () => {
  const { t, i18n } = useTranslation();
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getLimitedBrands();
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
        <div className="chead d_flex">
          <h1>{t("brands.brands")}</h1>
        </div>
        {productItems.map((productItem) => {
          return (
            <div
              className="box f_flex"
              key={productItem._id}
              onClick={() => handleClick(productItem._id)}
            >
              <img src={getImageById(productItem.image)} alt="" />
              <span>{productItem.name}</span>
            </div>
          );
        })}
        <div className="box box2">
          <Link to="/brands">
            <button>{t("brands.view_all_brands")}</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Catg;
