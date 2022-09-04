import React from "react";
import { Link, link } from "react-router-dom";

const Categories = () => {
  const data = [
    {
      cateImg: "/images/category/cat1.png",
      cateName: "Fashion",
    },
    {
      cateImg: "/images/category/cat2.png",
      cateName: "Electronic",
    },
    {
      cateImg: "/images/category/cat3.png",
      cateName: "Cars",
    },
    {
      cateImg: "/images/category/cat4.png",
      cateName: "Home & Garden",
    },
    {
      cateImg: "/images/category/cat5.png",
      cateName: "Gifts",
    },
    {
      cateImg: "/images/category/cat6.png",
      cateName: "Music",
    },
    {
      cateImg: "/images/category/cat7.png",
      cateName: "Health & Beauty",
    },
    {
      cateImg: "/images/category/cat8.png",
      cateName: "Pets",
    },
    {
      cateImg: "/images/category/cat9.png",
      cateName: "Baby Toys",
    },
    {
      cateImg: "/images/category/cat10.png",
      cateName: "Groceries",
    },
  ];

  return (
    <>
      <div className="category">
        {data.map((value, index) => {
          return (
            <div className="box f_flex" key={index}>
              <img src={value.cateImg} alt="" />
              <span>{value.cateName}</span>
            </div>
          );
        })}
        <div className="box mainpage_categories_viewAll" style={{backgroundColor:"#f2f2f2"}}>
          <Link to="/categories">
            <span>All Categories</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Categories;
