import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
import {
  getDiscountById,
  getImageById,
  getMobilePhones,
} from "../../redux/apiCalls";

const ShopCart = () => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const [productItems, setProductItems] = useState([]);
  const [discount, setDiscount] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getMobilePhones();
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

  useEffect(() => {
    productItems.map(async (item) => {
      if (item.discountID) {
        const discount = await getDiscountById(item.discountID);
        const discount_percentage = discount.discount_percentage;
        setDiscount((prev) => {
          return {
            ...prev,
            [item._id]: discount_percentage,
          };
        });
      }
    });
  }, [productItems]);

  // const handleClick = (id) => {
  //   navigate(`/brand/${id}`);
  // };

  return (
    <>
      {productItems.map((productItem) => {
        return (
          <div className="box">
            <div className="product mtop">
              <div className="img">
                {discount[productItem._id] ? (
                  <span className="top_left_popup">
                    {discount[productItem._id]}%
                  </span>
                ) : null}
                <img src={getImageById(productItem.images[0])} alt="" />
              </div>
              <div className="product-details">
                <div className="product-name">
                  <h3>{productItem.name_en}</h3>
                </div>
                <div className="price">
                  <h4>AED {productItem.TotalPrice} </h4>
                  <button
                  // onClick={() => addToCart(shopItems)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShopCart;
