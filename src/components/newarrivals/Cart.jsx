import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getImageById, getLatestProducts } from "../../redux/apiCalls";

const Cart = () => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const [productItems, setProductItems] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getLatestProducts();
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
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div className="NewArrivals-grid">
        {productItems.map((productItem) => {
          return (
            <div
              className="box"
              key={productItem._id}
              onClick={() => handleClick(productItem._id)}
            >
              <div className="img">
                <img src={getImageById(productItem.images[0])} alt="" />
              </div>
              <div className="new-arrivals-name">
                <h4>
                  {i18n.language === "en"
                    ? productItem.name_en
                    : productItem.name_ar}
                </h4>
              </div>
              <span>AED {productItem.TotalPrice}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
