import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFailure = errMsg => {
    this.setState({showSubmitError: true, errorMsg: errMsg})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    const {username, password} = this.state
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  submitForm = async event => {
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
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={this.onChangePassword}
          placeholder="PASSWORD"
          className="input-field"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="USERNAME"
          className="input-field"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dtv22dsxc/image/upload/v1719125947/Group_7399_tgj3eh.png"
          alt="login website logo"
          className="login-website-logo"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="login-title">Login</h1>
          <div className="input-field-container">
            {this.renderUsernameField()}
          </div>
          <div className="input-field-container">
            {this.renderPasswordField()}
          </div>
          {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          <button type="submit" className="login-form-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
