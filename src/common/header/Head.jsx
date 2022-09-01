import React from "react";

import LanguageSelector from "../../components/languageSelector/LanguageSelector";
const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container d_flex">
          <div className="left_row">
            <i className="fa fa-phone"></i>
            <a href="tel:+971529744450"> +971529744450</a>
            <i className="fa fa-envelope"></i>
            <a href="mailto: info@prestigestore.ae"> info@prestigestore.ae </a>
          </div>
          <div className="right_row_RText">
            <LanguageSelector />
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
