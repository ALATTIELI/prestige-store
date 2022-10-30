import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import {
  getDiscountById,
  getImageById,
  getMobilePhones,
} from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartRedux";

const ShopCart = () => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const [productItems, setProductItems] = useState([]);
  const [discount, setDiscount] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product) => {
    const data = {
      ...product,
      quantity: 1,
    };
    dispatch(addToCart(data));
  };

  return (
    <>
      {productItems.map((productItem) => {
        return (
          <div
            className="box"
            key={productItem._id}
            onClick={() => handleClick(productItem._id)}
          >
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
                <div className="price" onClick={(e) => e.stopPropagation()}>
                  <h4>AED {productItem.TotalPrice} </h4>
                  <button onClick={() => handleAddToCart(productItem)}>
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
