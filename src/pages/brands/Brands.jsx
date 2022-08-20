import React from "react";
import "./brands.css";

const Brands = () => {
  return (
    <div className="brnd_card">
      <div className="brnd_body_card">
        <img className="brnd_img_card" src="https://img.icons8.com/ios-filled/100/1A1A1A/mac-os.png"/>
        <h2 className="brnd_title_card">Apple</h2>
      </div>
      <div className="brnd_body_card">
        <img className="brnd_img_card" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png"/>
        <h2 className="brnd_title_card">Samsung</h2>
      </div>
      <div className="brnd_body_card">
        <img className="brnd_img_card" src="https://www.pngall.com/wp-content/uploads/5/Samsung-TV-PNG-Image-HD.png"/>
        <h2 className="brnd_title_card">LG</h2>
      </div>
      <div className="brnd_body_card">
        <img className="brnd_img_card" src="https://mm.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw40cc9388/450BT_black_angle_01-1606x1606px.png"/>
        <h2 className="brnd_title_card">Oppo</h2>
      </div>
      <div className="brnd_body_card">
        <img className="brnd_img_card" src="https://gmedia.playstation.com/is/image/SIEPDC/ps5-more-features-ps5-ps4-pro-image-block-01-en-22oct20?$native--t$"/>
        <h2 className="brnd_title_card">Sony</h2>
      </div>
      <div className="brnd_body_card">
        <img className="brnd_img_card" src="https://i.pinimg.com/originals/7f/dd/3b/7fdd3bda2076f7bdb2ed96e7ec01810a.png"/>
        <h2 className="brnd_title_card">Lenovo</h2>
      </div>
    </div>
  );
};

export default Brands;