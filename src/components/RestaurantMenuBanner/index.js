import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantMenuBanner = props => {
  const {restaurantDetails} = props
  const {
    imageUrl,
    costForTwo,
    cuisine,
    location,
    name,
    rating,
    reviewsCount,
  } = restaurantDetails

  let userReviewCount = null

  switch (true) {
    case reviewsCount < 100:
      userReviewCount = Math.round(reviewsCount / 10) * 10
      break
    case reviewsCount < 1000:
      userReviewCount = Math.round(reviewsCount / 100) * 100
      break
    case reviewsCount < 10000:
      userReviewCount = Math.round(reviewsCount / 1000) * 1000
      break
    case reviewsCount < 100000:
      userReviewCount = Math.round(reviewsCount / 10000) * 10000
      break
    case reviewsCount < 1000000:
      userReviewCount = Math.round(reviewsCount / 100000) * 100000
      break

    default:
      break
  }

  return (
    <div className="rest-menu-rest-detail-container">
      <div className="rest-menu-rest-img-cont">
        <img
          src={imageUrl}
          alt="restaurant"
          className="rest-menu-mobile-rest-image"
        />
        <img
          src={imageUrl}
          alt="restaurant"
          className="rest-menu-desktop-rest-image"
        />
      </div>
      <div className="rest-menu-detail-container">
        <h1 className="rest-menu-title">{name}</h1>
        <p className="rest-menu-cuisine">{cuisine}</p>
        <p className="rest-menu-location">{location}</p>
        <div className="rest-menu-detail-rating-review-container">
          <div className="rest-menu-rating-review-container">
            <div className="rest-menu-rating-container">
              <AiFillStar className="rest-menu-star-icon" />
              <p className="rest-menu-star-rating">{rating}</p>
            </div>
            <p className="rest-menu-user-rating">{`${userReviewCount}+ Ratings`}</p>
          </div>
          <hr className="rest-menu-cont" />
          <div className="rest-cost-container">
            <p className="rest-menu-cost">{`₹ ${costForTwo}`}</p>
            <p className="rest-menu-cost-for">Cost for two</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantMenuBanner
