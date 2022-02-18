import './index.css'

const CarouselImages = props => {
  const {imageUrl} = props
  return <img src={imageUrl} alt="offer" className="carousel-image" />
}

export default CarouselImages
