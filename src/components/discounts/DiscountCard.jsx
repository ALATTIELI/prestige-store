import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDiscountById, getLatestDiscounts } from "../../redux/apiCalls";
import { addToCart } from "../../redux/cartRedux";

const DiscountCard = () => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const [productItems, setProductItems] = useState([]);
  const [discount, setDiscount] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getLatestDiscounts();
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

  useEffect(() => {
    productItems.map(async (item) => {
      const discount = await getDiscountById(item.discountID);
      const discount_percentage = discount.discount_percentage;
      setDiscount((prev) => {
        return {
          ...prev,
          [item._id]: discount_percentage,
        };
      });
    });
  }, [productItems]);

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

  const handleAddToCart = (product) => {
    const data = {
      ...product,
      quantity: 1,
      inStock: product.quantity,
    };
    dispatch(addToCart(data));
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
                  style={
                    productItem.quantity === 0
                      ? { opacity: "0.5", cursor: "not-allowed" }
                      : {}
                  }
                  onMouseOver={
                    productItem.quantity === 0
                      ? (e) => {
                          e.target.title = t("product.out_of_stock");
                        }
                      : null
                  }
                >
                  <div className="discount_card_product_img">
                    <span className="top_left_popup">
                      {discount[productItem._id]}% Off
                    </span>
                    <img src={productItem.images[0].url} alt="" />
                  </div>
                  <div className="discount_card_product_details">
                    <div className="discount_card_product_name">
                      <h3>
                        {i18n.language === "en"
                          ? productItem.name_en
                          : productItem.name_ar}
                      </h3>
                    </div>
                    <div
                      className="discount_card_product_price"
                      onClick={(e) => e.stopPropagation()}
                    >
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
                      {productItem.quantity > 0 ? (
                        <button onClick={() => handleAddToCart(productItem)}>
                          <i className="fa fa-plus"></i>
                        </button>
                      ) : (
                        <button
                          disabled
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            cursor: "not-allowed",
                          }}
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      )}
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
