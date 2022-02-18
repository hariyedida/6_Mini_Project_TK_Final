import {Component} from 'react'
import {BsFilterRight} from 'react-icons/bs'
import {MdNavigateNext, MdNavigateBefore} from 'react-icons/md'
import {BiSearch} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import RestaurantCard from '../RestaurantCard'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllRestaurant extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    allRestaurantList: [],
    activePage: 1,
    totalPages: 1,
    searchInput: '',
    activeSortId: sortByOptions[1].value,
  }

  componentDidMount = () => {
    this.getAllrestaurantDetails()
  }

  getAllrestaurantDetails = async () => {
    const {activePage, searchInput, activeSortId} = this.state
    const LIMIT = 9
    const offset = (activePage - 1) * LIMIT
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?sort_by_rating=${activeSortId}&search=${searchInput}&offset=${offset}&limit=${LIMIT}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(eachObject => ({
        costForTwo: eachObject.cost_for_two,
        cuisine: eachObject.cuisine,
        groupByTime: eachObject.group_by_time,
        hasOnlineDelivery: eachObject.has_online_delivery,
        hasTableBooking: eachObject.has_table_booking,
        id: eachObject.id,
        imageUrl: eachObject.image_url,
        isDeliveringNow: eachObject.is_delivering_now,
        location: eachObject.location,
        menuType: eachObject.menu_type,
        name: eachObject.name,
        opensAt: eachObject.opens_at,
        rating: eachObject.user_rating.rating,
        ratingColor: eachObject.user_rating.rating_color,
        ratingText: eachObject.user_rating.rating_text,
        totalReviews: eachObject.user_rating.total_reviews,
      }))
      const totalPages = Math.ceil(fetchedData.total / LIMIT)
      this.setState({
        apiStatus: apiStatusConstants.success,
        allRestaurantList: updatedData,
        totalPages,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="all-rest-input-container">
        <input
          type="search"
          value={searchInput}
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
          className="all-rest-search-input"
        />
        <button
          onClick={this.onCleckSearchButton}
          className="all-rest-search-button"
          type="button"
        >
          <BiSearch />
        </button>
      </div>
    )
  }

  onCleckSearchButton = () => {
    this.getAllrestaurantDetails()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getAllrestaurantDetails()
    }
  }

  onChangeActiveId = event => {
    this.setState(
      {
        activeSortId: event.target.value,
        allRestaurantList: [],
        activePage: 1,
        totalPages: 1,
        searchInput: '',
      },
      this.getAllrestaurantDetails,
    )
  }

  reDirectToHome = () => {
    this.setState(
      {
        apiStatus: apiStatusConstants.initial,
        allRestaurantList: [],
        activePage: 1,
        totalPages: 1,
        searchInput: '',
      },
      this.getAllrestaurantDetails,
    )
  }

  renderAllrestaurant = () => {
    const {allRestaurantList, activePage, totalPages} = this.state
    return (
      <>
        <ul className="all-rest-ul">
          {allRestaurantList.map(eachRest => (
            <RestaurantCard key={eachRest.id} details={eachRest} />
          ))}
        </ul>
        <div className="all-rest-button-cont">
          <button
            type="button"
            testid="pagination-left-button"
            className="all-rest-page-button"
            onClick={this.navgateToPrevPage}
          >
            <MdNavigateBefore className="navigate-page-icon" />
          </button>
          <p className="all-rest-page-desc">
            <span testid="active-page-number">{activePage}</span> of{' '}
            <span testid="total-page-numbers">{totalPages}</span>
          </p>
          <button
            type="button"
            testid="pagination-right-button"
            className="all-rest-page-button"
            onClick={this.navgateToNextPage}
          >
            <MdNavigateNext className="navigate-page-icon" />
          </button>
        </div>
      </>
    )
  }

  navgateToPrevPage = () => {
    const {activePage, totalPages} = this.state

    if (activePage <= totalPages && activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getAllrestaurantDetails,
      )
    }
  }

  navgateToNextPage = () => {
    const {activePage, totalPages} = this.state

    if (activePage < totalPages) {
      this.setState({activePage: activePage + 1}, this.getAllrestaurantDetails)
    }
  }

  renderFailureView = () => (
    <div className="all-rest-failure-container">
      <img
        src="https://res.cloudinary.com/hariy/image/upload/v1642997774/TastyKitchen/cooking_1_lpi3li.png"
        alt="not-found"
      />
      <div className="rest-empty-cart-desc-container">
        <h1 className="rest-empty-cart-title">No Restaurant Found!</h1>
        <p className="rest-empty-cart-desc">Search for other restaurants</p>
        <button
          onClick={this.reDirectToHome}
          className="all-rest-not-found-button"
          type="button"
        >
          Clear
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div
      style={{width: '100%', height: '280px'}}
      className="products-loader-container loader"
      testid="restaurants-list-loader"
    >
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderAllRestaurantPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllrestaurant()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeSortId} = this.state

    return (
      <div className="allvideos-container">
        <div className="allvideos-sub-container">
          <div className="allvideos-header-container">
            <div className="all-rest-desc-container">
              <h1 className="allvideos-title">Popular Restaurants</h1>
              <p className="allvideos-desc">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
            </div>
            <div className="allvideos-filter-container">
              <div className="all-rest-desktop-search-container">
                {this.renderSearchInput()}
              </div>
              <div className="allvideos-sort-container">
                <BsFilterRight className="filter-icon" />
                <p className="sort-by-label">Sort by</p>
                <select
                  onChange={this.onChangeActiveId}
                  value={activeSortId}
                  className="sort-by-select"
                >
                  {sortByOptions.map(eachObject => (
                    <option
                      key={eachObject.id}
                      defaultValue={eachObject.value}
                      className="select-option"
                    >
                      {eachObject.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <hr className="hr-line-desktop" />
          {this.renderAllRestaurantPage()}
        </div>
      </div>
    )
  }
}

export default AllRestaurant
