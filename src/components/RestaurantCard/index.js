import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'

import './index.css'

const RestaurantCard = props => {
  const {details} = props
  return (
    <li className="all-rest-li" testid="restaurant-item">
      <Link className="all-rest-link-detail" to={`/restaurant/${details.id}`}>
        <img
          src={details.imageUrl}
          alt="restaurant"
          className="all-rest-image"
        />
        <div className="all-rest-details-cont">
          <h1 className="all-rest-title">{details.name}</h1>
          <p className="all-rest-type">{details.cuisine}</p>
          <div className="all-rest-rating-cont">
            <AiFillStar className="all-rest-rating-icon" />
            <p className="all-rest-rating">{details.rating}</p>
            <p className="all-rest-user-rating">{`(${details.totalReviews}) ratings`}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantCard
