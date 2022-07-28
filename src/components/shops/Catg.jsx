import React from "react"

const Catg = () => {
  const data = [
    {
      cateImg: "https://img.icons8.com/material-rounded/24/000000/mac-os.png",
      cateName: "Apple",
    },
    {
      cateImg: "https://img.icons8.com/color/48/000000/samsung.png",
      cateName: "Samasung",
    },
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Oppo",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Vivo",
    },
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Redmi",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Sony",
    },{
      cateImg: "./images/category/cat-1.png",
      cateName: "Huawei",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Xiaomi",
    },
  ]
  return (
    <>
      <div className='category'>
        <div className='chead d_flex'>
          <h1>Brands </h1>
          <h1>Shops </h1>
        </div>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
        <div className='box box2'>
          <button>View All Brands</button>
        </div>
      </div>
    </>
  )
}

export default Catg
