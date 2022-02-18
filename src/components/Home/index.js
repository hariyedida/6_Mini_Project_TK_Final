import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import ReactSlider from '../Carousel'
import AllRestaurant from '../AllRestaurant'

class Home extends Component {
  render() {
    return (
      <div testid="home">
        <Header />
        <ReactSlider />
        <AllRestaurant />
        <Footer />
      </div>
    )
  }
}

export default Home
