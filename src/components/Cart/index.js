import {Component} from 'react'
import {Link} from 'react-router-dom'
import {format} from 'date-fns'
import Header from '../Header'
import CartItems from '../CartItems'
import Payment from '../Payment'
import Footer from '../Footer'

import './index.css'

const getCartlistFromLocalStorage = () => {
  const localStorageCartList =
    JSON.parse(localStorage.getItem('cartData')) === null
      ? []
      : JSON.parse(localStorage.getItem('cartData'))
  return localStorageCartList
}

const getCartValue = () => {
  const localStorageCartList = getCartlistFromLocalStorage()
  if (localStorageCartList.length > 0) {
    const costOfItems = localStorageCartList.map(
      eachItem => eachItem.cost * eachItem.quantity,
    )
    let sum = 0
    costOfItems.forEach(x => {
      sum += x
    })
    return sum
  }
  return 0
}

class Cart extends Component {
  state = {
    cartItemsList: getCartlistFromLocalStorage(),
    orderTotal: getCartValue(),
    displayPayment: false,
  }

  addCartListToLocalStorage = () => {
    const {cartItemsList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartItemsList))
    this.setState({orderTotal: getCartValue()})
  }

  updateCartListState = updatedCartList => {
    this.setState(
      {cartItemsList: updatedCartList},
      this.addCartListToLocalStorage,
    )
  }

  updateCartValue = () => {
    this.setState({orderTotal: getCartValue()})
  }

  clearCart = () => {
    const {cartItemsList} = this.state
    const orderPlacedAt = format(new Date(), 'MMM dd yyyy,p').toString()
    const updateOrderListWithDate = [cartItemsList, orderPlacedAt]
    const previousOrder =
      JSON.parse(localStorage.getItem('previousOrder')) === null
        ? []
        : JSON.parse(localStorage.getItem('previousOrder'))
    const updatedPreviousOrderList = [...previousOrder, updateOrderListWithDate]
    localStorage.setItem(
      'previousOrder',
      JSON.stringify(updatedPreviousOrderList),
    )
    localStorage.removeItem('cartData')
    this.setState({displayPayment: true})
  }

  render() {
    const {cartItemsList, orderTotal, displayPayment} = this.state

    let isCartEmpty = null
    if (cartItemsList.length > 0) {
      isCartEmpty = false
    } else {
      isCartEmpty = true
    }
    return (
      <div className="rest-cart-container">
        <Header />
        {displayPayment ? (
          <Payment />
        ) : (
          <div className="rest-cart-items-container">
            {isCartEmpty ? (
              <div className="rest-empty-cart-container">
                <img
                  alt="empty cart"
                  className="rest-empty-cart-img"
                  src="https://res.cloudinary.com/hariy/image/upload/v1642997774/TastyKitchen/cooking_1_lpi3li.png"
                />
                <div className="rest-empty-cart-desc-container">
                  <h1 className="rest-empty-cart-title">No Order Yet!</h1>
                  <p className="rest-empty-cart-desc">
                    Your cart is empty. Add something from the menu.
                  </p>
                  <Link className="rest-empty-cart-link" to="/">
                    <button className="rest-empty-cart-button" type="button">
                      Order Now
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rest-cart-items-desktop-container">
                <div className="rest-cart-items-desk-table-header-container">
                  <p className="rest-cart-items-desk-table-header  item">
                    Item
                  </p>
                  <p className="rest-cart-items-desk-table-header">Quantity</p>
                  <p className="rest-cart-items-desk-table-header">Price</p>
                </div>
                <div>
                  <ul className="rest-cart-item-desktop-ul">
                    {cartItemsList.map(eachItem => (
                      <CartItems
                        key={eachItem.id}
                        itemDetails={eachItem}
                        updateCartListState={this.updateCartListState}
                        updateCartValue={this.updateCartValue}
                      />
                    ))}
                  </ul>
                  <hr className="rest-cart-item-desk-hr-line" />
                  <div className="rest-cart-desk-total-container">
                    <h1 className="rest-cont-item-desk-total-title">
                      Order Total:
                    </h1>
                    <div>
                      <p
                        className="cart-items-desk-total-cost"
                        testid="total-price"
                      >
                        ₹{orderTotal}.00
                      </p>
                      <button
                        onClick={this.clearCart}
                        type="button"
                        className="cart-item-place-order-button"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <Footer />
      </div>
    )
  }
}

export default Cart
