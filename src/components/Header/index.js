import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseFill} from 'react-icons/ri'
import Cookies from 'js-cookie'

import 'reactjs-popup/dist/index.css'
import './index.css'

class Header extends Component {
  state = {path: '/', showMenu: false}

  componentDidMount = () => {
    this.setState({
      path: window.location.pathname,
    })
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    localStorage.removeItem('userDetails')
    history.replace('/login')
  }

  showHamburgerMenu = () => {
    const {showMenu} = this.state
    this.setState({showMenu: !showMenu})
  }

  close(e) {
    const {showMenu} = this.state
    e.preventDefault()
    this.setState({showMenu: !showMenu})
  }

  renderMobileView = () => (
    <div>
      <button
        type="button"
        className="mobile-menu-button"
        onClick={this.showHamburgerMenu}
      >
        <GiHamburgerMenu size={20} />
      </button>
    </div>
  )

  renderDesktopView = () => {
    const {path} = this.state
    let isSelectedHome = null
    let isSelectedCart = null
    let isSelectedAccount = null

    if (path === '/') {
      isSelectedHome = 'selected'
    } else {
      isSelectedHome = ''
    }

    if (path === '/cart') {
      isSelectedCart = 'selected'
    } else {
      isSelectedCart = ''
    }

    if (path === '/account') {
      isSelectedAccount = 'selected'
    } else {
      isSelectedAccount = ''
    }

    return (
      <div className="desktop-menu-container">
        <ul className="unordered-list-desktop">
          <li className="list-items">
            <Link
              to="/"
              className={`${isSelectedHome} desktop-nav-menu-item link`}
            >
              Home
            </Link>
          </li>
          <li className="list-items">
            <Link
              to="/cart"
              className={`${isSelectedCart} desktop-nav-menu-item link`}
            >
              Cart
            </Link>
          </li>
          <li className="list-items">
            <Link
              to="/account"
              className={`${isSelectedAccount} desktop-nav-menu-item link`}
            >
              Account
            </Link>
          </li>
          <li className="list-items">
            <button
              type="button"
              className="logout-button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    )
  }

  render() {
    const {path, showMenu} = this.state
    let isSelectedHome = null
    let isSelectedCart = null
    let isSelectedAccount = null
    if (path === '/') {
      isSelectedHome = 'selected'
    } else {
      isSelectedHome = ''
    }

    if (path === '/cart') {
      isSelectedCart = 'selected'
    } else {
      isSelectedCart = ''
    }

    if (path === '/account') {
      isSelectedAccount = 'selected'
    } else {
      isSelectedAccount = ''
    }

    return (
      <nav className="nav-container">
        <div className="web-nav-container">
          <Link to="/" className="nav-web-home-anchor-container">
            <img
              src="https://res.cloudinary.com/hariy/image/upload/v1642622290/TastyKitchen/Vector_1_i2n5wd.png"
              alt="website logo"
            />
            <p className="website-title">Tasty Kitchens</p>
          </Link>
          <div className="mobile-nav-menu">{this.renderMobileView()}</div>
          <div className="desktop-nav-menu">{this.renderDesktopView()}</div>
        </div>
        <div
          className={`mobile-pop-up-container ${showMenu ? 'expand-menu' : ''}`}
        >
          <ul className="unordered-list mobile-menu">
            <li className="list-items">
              <Link
                to="/"
                className={`${isSelectedHome} desktop-nav-menu-item link`}
              >
                Home
              </Link>
            </li>
            <li className="list-items">
              <Link
                to="/cart"
                className={`${isSelectedCart} desktop-nav-menu-item link`}
              >
                Cart
              </Link>
            </li>
            <li className="list-items">
              <Link
                to="/account"
                className={`${isSelectedAccount} desktop-nav-menu-item link`}
              >
                Account
              </Link>
            </li>
            <li className="list-items">
              <button
                type="button"
                className="mobile-logout-button desktop-nav-menu-item"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
          <button
            className="mobile-menu-close-button"
            type="button"
            onClick={e => this.close(e)}
          >
            <RiCloseFill />
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
