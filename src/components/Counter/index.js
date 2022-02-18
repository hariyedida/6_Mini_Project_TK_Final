import {Component} from 'react'
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'

import './index.css'

const getCartlistFromLocalStorage = () => {
  const localStorageCartList =
    JSON.parse(localStorage.getItem('cartData')) === null
      ? []
      : JSON.parse(localStorage.getItem('cartData'))
  return localStorageCartList
}

class Counter extends Component {
  state = {cartItemsList: getCartlistFromLocalStorage(), quantity: 0}

  componentDidMount = () => {
    const {cartItemsList} = this.state
    const {itemDetails} = this.props
    cartItemsList.map(eachItem => {
      if (eachItem.id === itemDetails.id) {
        return this.setState({quantity: eachItem.quantity})
      }
      return 0
    })
  }

  updateCartAmount = () => {
    const {updateCartValue} = this.props
    updateCartValue()
  }

  updateCartList = () => {
    const {quantity, cartItemsList} = this.state
    const {itemDetails, updateCartListState} = this.props
    const newList = cartItemsList.filter(
      eachItem => eachItem.id !== itemDetails.id,
    )
    const itemQuantityToUpdate = cartItemsList.filter(
      eachItem => eachItem.id === itemDetails.id,
    )
    const updateItemQuantity = {...itemQuantityToUpdate[0], quantity}
    const updatedCartList =
      updateItemQuantity.quantity === 0
        ? [...newList]
        : [...newList, updateItemQuantity]
    updateCartListState(updatedCartList)
    this.updateCartAmount()
  }

  onClickDeleteQuantity = () => {
    this.setState(
      prevState => ({
        quantity: prevState.quantity - 1,
        cartItemsList: getCartlistFromLocalStorage(),
      }),
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
    const {quantity} = this.state
    return (
      <div>
        <button
          onClick={this.onClickDeleteQuantity}
          type="button"
          className="cart-items-li-button"
          testid="decrement-quantity"
        >
          <AiOutlineMinus className="cart-items-li-button-icons" />
        </button>
        <span testid="item-quantity" className="cart-items-li-quantity">
          {quantity}
        </span>
        <button
          onClick={this.onClickIncreaseQuantity}
          type="button"
          className="cart-items-li-button"
          testid="increment-quantity"
        >
          <AiOutlinePlus className="cart-items-li-button-icons" />
        </button>
      </div>
    )
  }
}

export default Counter
