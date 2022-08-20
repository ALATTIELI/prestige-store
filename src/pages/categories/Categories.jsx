import React from "react";
import "./categories.css";

const Categories = () => {
  return (
    <div className="cate_card">
      <div className="cate_body_card">
        <img className="cate_img_card" src="https://cdn.shopify.com/s/files/1/0323/0593/8570/products/iphone-13-mini-product-red-select-2021.png?v=1634661101"/>
        <h2 className="cate_title_card">Mobiles</h2>
      </div>
      <div className="cate_body_card">
        <img className="cate_img_card" src="https://www.freepnglogos.com/uploads/macbook-png/macbook-cleanmymac-the-best-mac-cleanup-app-for-macos-get-32.png"/>
        <h2 className="cate_title_card">Computers & laptops</h2>
      </div>
      <div className="cate_body_card">
        <img className="cate_img_card" src="https://www.pngall.com/wp-content/uploads/5/Samsung-TV-PNG-Image-HD.png"/>
        <h2 className="cate_title_card">TVs</h2>
      </div>
      <div className="cate_body_card">
        <img className="cate_img_card" src="https://mm.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw40cc9388/450BT_black_angle_01-1606x1606px.png"/>
        <h2 className="cate_title_card">Headphones & Speakers</h2>
      </div>
      <div className="cate_body_card">
        <img className="cate_img_card" src="https://gmedia.playstation.com/is/image/SIEPDC/ps5-more-features-ps5-ps4-pro-image-block-01-en-22oct20?$native--t$"/>
        <h2 className="cate_title_card">Gaming</h2>
      </div>
      <div className="cate_body_card">
        <img className="cate_img_card" src="https://i.pinimg.com/originals/7f/dd/3b/7fdd3bda2076f7bdb2ed96e7ec01810a.png"/>
        <h2 className="cate_title_card">Cameras</h2>
      </div>
    </div>
  );
};

export default Categories;
