import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import CarouselImages from '../CarouselImages'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

export default class ReactSlider extends Component {
  state = {carouselList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getCarouselData()
  }

  getCarouselData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(carousel => ({
        id: carousel.id,
        imageUrl: carousel.image_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        carouselList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCarouselSuccess = () => {
    const {carouselList} = this.state
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
    }
    return (
      <div className="container">
        <Slider {...settings}>
          {carouselList.map(eachCarousel => (
            <CarouselImages
              key={eachCarousel.id}
              imageUrl={eachCarousel.imageUrl}
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderFailureView = () => <h1>dsf</h1>

  renderLoadingView = () => (
    <div
      className="products-loader-container loader"
      style={{width: '100%', height: '180px'}}
      testid="restaurants-offers-loader"
    >
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderCarouselPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCarouselSuccess()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="carousel-container">{this.renderCarouselPage()}</div>
  }
}
