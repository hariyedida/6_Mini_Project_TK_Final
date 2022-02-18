import {Component} from 'react'
import './index.css'

import {AiFillStar, AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'

class RestaurantMenuList extends Component {
  state = {quantity: 0}

  componentDidMount = () => {
    const {cartList, details} = this.props
    cartList.map(eachItem => {
      if (eachItem.id === details.id) {
        return this.setState({quantity: eachItem.quantity})
      }
      return 0
    })
  }

  addItemTocart = () => {
    const {details, onClickAddToCart} = this.props
    this.setState({quantity: 1})
    onClickAddToCart({...details, quantity: 1})
  }

  updateCartList = () => {
    const {quantity} = this.state
    const {cartList, details, updateCartListState} = this.props
    const newList = cartList.filter(eachItem => eachItem.id !== details.id)
    const itemQuantityToUpdate = cartList.filter(
      eachItem => eachItem.id === details.id,
    )
    const updateItemQuantity = {...itemQuantityToUpdate[0], quantity}
    const updatedCartList =
      updateItemQuantity.quantity === 0
        ? [...newList]
        : [...newList, updateItemQuantity]
    updateCartListState(updatedCartList)
  }

  onClickDeleteQuantity = () => {
    this.setState(
      prevState => ({quantity: prevState.quantity - 1}),
      this.updateCartList,
    )
  }

  onClickIncreaseQuantity = () => {
    this.setState(
      prevState => ({quantity: prevState.quantity + 1}),
      this.updateCartList,
    )
  }

  render() {
    const {details, cartList} = this.props
    const itemInCart = cartList.filter(eachItem => eachItem.id === details.id)
    const isItemInCart = itemInCart.length > 0
    const {quantity} = this.state

    return (
      <li testid="foodItem" className="rest-menu-list-items-li">
        <img
          src={details.imageUrl}
          alt="foodItem"
          className="restaurent-menu-list-images"
        />
        <div className="rest-menu-li-item-details-cont">
          <h1 className="rest-menu-li-item-name">{details.name}</h1>
          <p className="rest-menu-li-items-cost">{`₹ ${details.cost}.00`}</p>
          <div className="rest-menu-li-items-rating-cont">
            <AiFillStar className="rest-menu-li-items-rating-icon" />
            <p className="rest-menu-li-items-rating-label">{details.rating}</p>
          </div>
          {isItemInCart ? (
            <div>
              <button
                onClick={this.onClickDeleteQuantity}
                type="button"
                testid="decrement-count"
                className="cart-items-li-button"
              >
                <AiOutlineMinus className="cart-items-li-button-icons" />
              </button>
              <span className="cart-items-li-quantity" testid="active-count">
                {quantity}
              </span>
              <button
                onClick={this.onClickIncreaseQuantity}
                type="button"
                testid="increment-count"
                className="cart-items-li-button"
              >
                <AiOutlinePlus className="cart-items-li-button-icons" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={this.addItemTocart}
              className="rest-menu-li-items-button"
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default RestaurantMenuList
