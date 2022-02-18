import {Link} from 'react-router-dom'

const NoOrders = () => (
  <div className="rest-empty-cart-container">
    <img
      alt="empty cart"
      className="rest-empty-cart-img"
      src="https://res.cloudinary.com/hariy/image/upload/v1642997774/TastyKitchen/cooking_1_lpi3li.png"
    />
    <div className="rest-empty-cart-desc-container">
      <h1 className="rest-empty-cart-title">No Order Yet!</h1>
      <p className="rest-empty-cart-desc">
        You havent ordered with us. Order from your favourite restaurants.
      </p>
      <Link className="rest-empty-cart-link" to="/">
        <button className="rest-empty-cart-button" type="button">
          Order Now
        </button>
      </Link>
    </div>
  </div>
)

export default NoOrders
