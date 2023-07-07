import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', submitError: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="label" htmlFor="username">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <>
        <label className="label" htmlFor="username">
          Username
        </label>
        <input
          className="input"
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({submitError: true, errorMsg})
  }

  onSubmitForm = async event => {
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
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {submitError, errorMsg} = this.state
    return (
      <div className="login-form-cont" onSubmit={this.onSubmitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
          className="logo-mobile-img"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
          className="website-login"
        />
        <form className="form-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="logo-desktop-img"
          />
          <div className="input-cont">{this.renderUserName()}</div>
          <div className="input-cont">{this.renderPassword()}</div>
          <button type="submit" className="btn">
            Login
          </button>
          {submitError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
