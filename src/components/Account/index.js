import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import {BiRupee} from 'react-icons/bi'
import {AiFillCheckCircle} from 'react-icons/ai'
import Header from '../Header'
import Footer from '../Footer'
import OrderedItems from '../OrderedItems'
import NoOrders from '../NoOrders'
import './index.css'

const userDetailsFromLS = () => JSON.parse(localStorage.getItem('userDetails'))
const pastOrdersFromLS = () =>
  JSON.parse(localStorage.getItem('previousOrder')) === null
    ? []
    : JSON.parse(localStorage.getItem('previousOrder')).reverse()

const userSavedAddressFromLs = () =>
  JSON.parse(localStorage.getItem('userSavedAddress')) === null
    ? 'Save your Address'
    : JSON.parse(localStorage.getItem('userSavedAddress')).address

class Account extends Component {
  state = {userDetails: [], address: '', pastOrders: [], editAddress: false}

  componentDidMount = () => {
    this.setState({
      userDetails: userDetailsFromLS(),
      pastOrders: pastOrdersFromLS(),
      address: userSavedAddressFromLs(),
    })
  }

  onClickEditAddress = () => {
    this.setState({editAddress: true})
  }

  onChangeUserAddress = event => {
    this.setState({address: event.target.value})
  }

  saveUserAddressToLs = () => {
    const {address} = this.state
    const updateAddress = {address}
    localStorage.setItem('userSavedAddress', JSON.stringify(updateAddress))
  }

  onSaveUserAddress = event => {
    event.preventDefault()
    this.setState({editAddress: false})
    this.saveUserAddressToLs()
  }

  editUserAddress = () => {
    const {address} = this.state

    return (
      <form type="submit" onSubmit={this.onSaveUserAddress}>
        <textarea
          id="address"
          rows="5"
          cols="50"
          value={address}
          onChange={this.onChangeUserAddress}
          className="account-address-text-area"
        >
          {address}
        </textarea>
        <button className="account-address-edit-button" type="submit">
          Save
        </button>
      </form>
    )
  }

  render() {
    const {userDetails, pastOrders, editAddress, address} = this.state
    const {username} = userDetails

    return (
      <div className="account-container">
        <Header />
        <div className="user-details-container">
          <p className="account-user-name-label">{`User name: ${username}`}</p>
          <div className="account-address-container">
            <p className="account-user-address-label">Address:</p>
            {editAddress ? (
              this.editUserAddress()
            ) : (
              <>
                <p className="account-user-address">{address}</p>
                <button
                  onClick={this.onClickEditAddress}
                  className="account-address-edit-button"
                  type="button"
                >
                  Edit address
                </button>
              </>
            )}
          </div>
          <div>
            {pastOrders.length > 0 ? (
              <div className="account-past-orders-container">
                <p className="account-user-past-orders-label">Past Orders</p>
                <ul className="ordered-items-ul">
                  {pastOrders.map(eachOrder => {
                    let totalCartCost = 0

                    return (
                      <div key={uuidV4()} className="ordered-item-container">
                        <div className="account-ordered-at-deliver-cont">
                          <div>
                            <p
                              key={uuidV4()}
                              className="account-ordered-at-label"
                            >
                              Ordered at:
                            </p>
                            <p
                              key={uuidV4()}
                              className="account-ordered-at-label"
                            >
                              {eachOrder[1]}
                            </p>
                          </div>
                          <p
                            key={uuidV4()}
                            className="account-order-delivered-cost"
                          >
                            Delivered
                            <AiFillCheckCircle className="account-delivered-icon" />
                          </p>
                        </div>
                        <div className="ordered-items-wrap-container">
                          {eachOrder[0].map(eachOrderItem => {
                            totalCartCost +=
                              eachOrderItem.cost * eachOrderItem.quantity
                            return (
                              <OrderedItems
                                key={eachOrderItem.id}
                                itemDetails={eachOrderItem}
                              />
                            )
                          })}
                        </div>
                        <div className="account-order-total-container">
                          <h1 className="account-order-total-label">
                            Order Total:
                          </h1>
                          <div>
                            <p
                              key={totalCartCost}
                              className="account-order-total-cost"
                            >
                              <BiRupee />
                              {totalCartCost}/-
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </ul>
              </div>
            ) : (
              <NoOrders />
            )}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Account
