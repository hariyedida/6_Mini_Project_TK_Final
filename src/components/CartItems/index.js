import Counter from '../Counter'

import './index.css'

const CartItems = props => {
  const {updateCartValue, itemDetails, updateCartListState} = props

  return (
    <li className="cart-items-desktop-li">
      <img
        alt="cart-item"
        src={itemDetails.imageUrl}
        className="cart-items-desktop-li-image"
      />
      <div className="cart-items-desktop-img-title-container">
        <p className="cart-items-desktop-li-title">{itemDetails.name}</p>
        <Counter
          itemDetails={itemDetails}
          updateCartListState={updateCartListState}
          updateCartValue={updateCartValue}
        />
        <p className="cart-items-li-cost" testid="total-price">
          ₹ {`${itemDetails.cost * itemDetails.quantity}`}.00
        </p>
      </div>
    </li>
  )
}

export default CartItems
