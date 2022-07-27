import "./product.css"

export default function Product({ productItems, addToCart, CartItem }) {
  return (
    <div>
            <main class="product-container">

        <div class="product-left-column">
        <img data-image="red" class="active" src="https://www.shopkees.com/cdn/images/1000/2328096834_1631972746.jpg" alt="" />
      </div>
      <div class="product-right-column">

        <div class="product-product-description">
          <span>Phones</span>
          <h1>iPhone Mini 13</h1>
          <p>Ceramic Shield front <br/> Glass back and aluminum design</p>
        </div>

        <div class="product-product-configuration">




        <div class="product-product-price">
          <span>980$</span>
          <a href="" class="cart-btn">Add to cart</a>
        </div>
      </div>
      </div>
      </main>

    </div>
  )
}
