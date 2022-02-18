import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showLoginError: false,
    errorMessage: '',
  }

  onSubmitSuccess = (jwtToken, userDetails) => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    localStorage.setItem('userDetails', JSON.stringify(userDetails))
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({errorMessage: error, showLoginError: true})
  }

  onSubmitLoginDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token, userDetails)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {password, username, showLoginError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="user-login-form-container">
        <div className="landing-image-container">
          <img
            src="https://res.cloudinary.com/hariy/image/upload/v1642577455/TastyKitchen/Rectangle_1456_vxi82x.png"
            alt="website login"
            className="login-desktop-landing-image"
          />
        </div>
        <div className="login-form-container">
          <form
            className="login-form-sub-container"
            onSubmit={this.onSubmitLoginDetails}
          >
            <img
              src="https://res.cloudinary.com/hariy/image/upload/v1642622290/TastyKitchen/Vector_1_i2n5wd.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="app-title">Tasty Kitchens</h1>
            <h1 className="login-heading">Login</h1>
            <div className="login-user-field-container">
              <label htmlFor="username" className="login-input-label">
                USERNAME
              </label>
              <input
                placeholder="Username"
                type="text"
                id="username"
                className="input-field"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="login-password-field-container">
              <label htmlFor="userpassword" className="login-input-label">
                PASSWORD
              </label>
              <input
                placeholder="Password"
                type="password"
                id="userpassword"
                className="input-field"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button type="submit" className="login-submit-button">
              Login
            </button>
            {showLoginError && (
              <p className="login-error-message">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
