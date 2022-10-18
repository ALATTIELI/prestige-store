import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  getDiscountById,
  getImageById,
  getLatestDiscounts,
} from "../../redux/apiCalls";

const DiscountCard = () => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getLatestDiscounts();
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

  async function getDiscount(id) {
    const discount = await getDiscountById(id);
    const discount_percentage = discount.discount_percentage;
    console.log(discount_percentage);
    return discount_percentage;
  }

  const scroll = (direction) => {
    const discount_card = document.getElementById("discount_card_container");
    if (direction === "left") {
      discount_card.scrollBy({ left: -300, behavior: "smooth" });
    }
    if (direction === "right") {
      discount_card.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div className="discount_card">
        {/* add arrows to scroll */}
        <span
          className="prev"
          onClick={() => {
            scroll("left");
          }}
        >
          <i className="fa fa-long-arrow-alt-left"></i>
        </span>
        <div className="discount_card_container" id="discount_card_container">
          {loading ? (
            <div className="loading">No Discounts</div>
          ) : (
            productItems.map((productItem) => {
              return (
                <div
                  className="discount_card_product"
                  key={productItem._id}
                  onClick={() => handleClick(productItem._id)}
                >
                  <div className="discount_card_product_img">
                    <span className="top_left_popup">
                      {async () => {
                        return await getDiscount(productItem.discountID);
                      }}
                      % Off
                    </span>
                    <img src={getImageById(productItem.images[0])} alt="" />
                  </div>
                  <div className="discount_card_product_details">
                    <h3>
                      {i18n.language === "en"
                        ? productItem.name_en
                        : productItem.name_ar}
                    </h3>
                    <div className="discount_card_product_price">
                      <div className="DiscountPrice">
                        <span className="DiscountDPrice">
                          AED {productItem.TotalPrice}
                        </span>
                        <span
                          className="DiscountOriginalPrice"
                          style={{ textDecoration: "line-through" }}
                        >
                          AED {productItem.price}
                        </span>
                      </div>
                      <button
                      // onClick={() => addToCart(productItems)}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <span
          className="next"
          onClick={() => {
            scroll("right");
          }}
        >
          <i className="fa fa-long-arrow-alt-right"></i>
        </span>
      </div>
    </>
  );
};

export default DiscountCard;
