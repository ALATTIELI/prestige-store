import "./product.css";

export default function Product({ productItems, addToCart, CartItem }) {
  var TITLE = window.location.pathname.split("/").pop();
  // Show img from the thumbnail to the main img
  function showImg(e) {
    const img = e.target;
    const mainImg = document.getElementById("main-img");
    mainImg.src = img.src;
  }
  return (
    <div className="Product-Page">
      <main className="product-container">
        <div className="product-top">
          <div className="product-left-column">
            <div className="product-left-column-img">
              <img
                id="main-img"
                data-image="red"
                className="active"
                src="https://www.shopkees.com/cdn/images/1000/2328096834_1631972746.jpg"
                alt=""
              />
            </div>
            <div className="product-thumbnails">
              <div>
                <img
                  onClick={(e) => showImg(e)}
                  data-image="red"
                  className="active"
                  src="https://www.shopkees.com/cdn/images/1000/2328096834_1631972746.jpg"
                  alt=""
                />
              </div>

              <div>
                <img
                  onClick={(e) => showImg(e)}
                  data-image="red"
                  className="active"
                  src="https://photos5.appleinsider.com/gallery/47523-92824-New-Alpine-Green-iPhone-13-Pro-xl.jpg"
                  alt=""
                />
              </div>

              <div>
                <img
                  onClick={(e) => showImg(e)}
                  data-image="red"
                  className="active"
                  src="https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone13-Pro-alpine-green-hero-2up-220308_big_carousel.jpg.large.jpg"
                  alt=""
                />
              </div>

              <div>
                <img
                  onClick={(e) => showImg(e)}
                  data-image="red"
                  className="active"
                  src="https://image.khaleejtimes.com/?uuid=e61de6df-6f9a-5095-8884-a7f519185dd4&function=fit&type=preview&source=false&q=75&maxsize=1200&scaleup=0"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="product-right-column">
            <div className="product-product-description">
              <div className="product-product-description-top">
                <span>Phones</span>
                <h1>{TITLE}</h1>
              </div>
              <div className="product-product-description-bottom">
                <span>BRAND: Apple</span>
                <span>Stock: 3</span>
              </div>
            </div>

            <div className="product-product-configuration">
              <div className="product-product-price">
                <span>980 AED</span>
                <a href="" className="cart-btn">
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="product-bottom">
          <div className="product-description">
            <h1>Product Description</h1>
            <p>
            Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla Some words
              bla bla 
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
