import React from "react";
import Flag from "react-world-flags";

const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container d_flex">
          <div className="left row">
            <i className="fa fa-phone"></i>
            <label> +971529744450</label>
            <i className="fa fa-envelope"></i>
            <label> info@prestigestore.ae </label>
          </div>
          <div className="right row RText">
            <i><Flag code="gb" height={10}/></i> 
            <label>EN</label>
            <i><Flag code="ae" height={10}/></i> 
            <label>AR</label>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
