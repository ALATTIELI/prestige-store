import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// eslint-disable-next-line no-unused-vars
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getFeaturedProducts, getImageById } from "../../redux/apiCalls";

const SlideCard = () => {
  const { t, i18n } = useTranslation();
  const [productItems, setProductItems] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    arrows: false,
    appendDots: (dots) => {
      return <ul style={{ margin: "10px" }}>{dots}</ul>
    },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getFeaturedProducts();
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
    navigate(`/product/${id}`);
  };

  return (
    <>
      <Slider {...settings}>
        {productItems.map((productItem) => {
          return (
            <>
              <div className="slider-box" key={productItem._id}>
                <div
                  className="left"
                  style={
                    i18n.language === "en"
                      ? { textAlign: "left" }
                      : { textAlign: "right" }
                  }
                >
                  <h1>
                    {i18n.language === "en"
                      ? productItem.title_en
                      : productItem.title_ar}
                  </h1>
                  <p>
                    {i18n.language === "en"
                      ? productItem.description_en
                      : productItem.description_ar}
                  </p>
                  <button
                    className="btn-primary"
                    onClick={() => handleClick(productItem._id)}
                  >
                    {t("slider.view")}
                  </button>
                </div>
                <div className="right">
                  <img src={getImageById(productItem.image)} alt="" />
                </div>
              </div>
            </>
          );
        })}
      </Slider>
    </>
  );
};

export default SlideCard;
