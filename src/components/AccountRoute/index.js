import Cookies from 'js-cookie'
import Header from '../Header'
import FooterSection from '../FooterSection'

import './index.css'

const AccountRoute = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  const asteriskPassword = password ? '*'.repeat(password.length) : ''

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="account-container">
      <Header />
      <div className="account-details-container">
        <h1 className="account-heading">Account</h1>
        <hr className="separator" />
        <div className="membership-details-container">
          <p className="membership-title">Member ship</p>
          <div>
            <p className="membership-email">{username}@gmail.com</p>
            <p className="membership-password">Password : {asteriskPassword}</p>
          </div>
        </div>
        <hr className="separator" />
        <div className="membership-container">
          <p className="plan-details-title">Plan details</p>
          <p className="membership-plan-type">Premium</p>
          <p className="plan-type">Ultra HD</p>
        </div>
        <hr className="separator" />
        <div className="account-logout-container">
          <button
            type="button"
            className="account-logout-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <FooterSection />
    </div>
  )
}

export default AccountRoute
