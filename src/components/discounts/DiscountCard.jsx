import React, { useEffect, useState } from "react";
import {
  getDiscountById,
  getImageById,
  getLatestDiscounts,
} from "../../redux/apiCalls";

// const BASE_URL = "http://localhost:3000/api/v1";
async function getImageUrl(id) {
  const url = getImageById(id);
  return url;
}

const DiscountCard = () => {
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getLatestDiscounts();
        console.log(res);
        if (res !== null) {
          // res.map(async (item) => {
          //   const discount = await getDiscountById(item.discountID);
          //   const discount_percentage = discount.discount_percentage;
          //   const newItem = { ...item, discount_percentage };
          //   setProductItems((prev) => [...prev, newItem]);
          // });
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
                <div className="discount_card_product">
                  <div className="discount_card_product_img">
                    <span className="top_left_popup">
                      {async() => {
                        return await getDiscount(productItem.discountID);
                      }}
                      % Off
                    </span>
                    <img src={getImageById(productItem.images[0])} alt="" />
                  </div>
                  <div className="discount_card_product_details">
                    <h3>{productItem.name_en}</h3>
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
