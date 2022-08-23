import React from "react";

import LanguageSelector from "../../components/languageSelector/LanguageSelector";
const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container d_flex">
          <div className="left_row">
            <i className="fa fa-phone"></i>
            <label> +971529744450</label>
            <i className="fa fa-envelope"></i>
            <label> info@prestigestore.ae </label>
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
