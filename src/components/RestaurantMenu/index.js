import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import RestaurantMenuBanner from '../RestaurantMenuBanner'
import RestaurantMenuList from '../RestaurantMenuList'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const getCartlistFromLocalStorage = () => {
  const localStorageCartList =
    JSON.parse(localStorage.getItem('cartData')) === null
      ? []
      : JSON.parse(localStorage.getItem('cartData'))
  return localStorageCartList
}

class RestaurantMenu extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantDetails: [],
    foodItems: [],
    cartItemsList: getCartlistFromLocalStorage(),
  }

  componentDidMount = () => {
    this.getRestaurantMenu()
  }

  getRestaurantMenu = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const restaurantDetails = {
        costForTwo: fetchedData.cost_for_two,
        cuisine: fetchedData.cuisine,
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        itemsCount: fetchedData.items_count,
        location: fetchedData.location,
        name: fetchedData.name,
        opensAt: fetchedData.opens_at,
        rating: fetchedData.rating,
        reviewsCount: fetchedData.reviews_count,
      }
      const foodItems = fetchedData.food_items.map(eachItem => ({
        cost: eachItem.cost,
        foodType: eachItem.food_type,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
        rating: eachItem.rating,
      }))

      this.setState({
        foodItems,
        restaurantDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  addCartListToLocalStorage = () => {
    const {cartItemsList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartItemsList))
  }

  updateCartListState = updatedCartList => {
    this.setState(
      {cartItemsList: updatedCartList},
      this.addCartListToLocalStorage,
    )
  }

  onClickAddToCart = newItem => {
    this.setState(
      prevState => ({cartItemsList: [...prevState.cartItemsList, newItem]}),
      this.addCartListToLocalStorage,
    )
  }

  renderRestaurantDetailsMenu = () => {
    const {restaurantDetails, foodItems, cartItemsList} = this.state

    return (
      <div className="rest-menu-container">
        <RestaurantMenuBanner restaurantDetails={restaurantDetails} />
        <ul className="rest-menu-items-list">
          {foodItems.map(eachItem => (
            <RestaurantMenuList
              key={eachItem.id}
              details={eachItem}
              cartList={cartItemsList}
              onClickAddToCart={this.onClickAddToCart}
              updateCartListState={this.updateCartListState}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div
      className="products-loader-container loader"
      testid="restaurant-details-loader"
    >
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderFailureView = () => <h1>sadf</h1>

  renderRestaurantDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetailsMenu()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderRestaurantDetails()}
        <Footer />
      </>
    )
  }
}

export default RestaurantMenu
