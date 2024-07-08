import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-card">
      <h1 className="not-found-title">Lost Your Way ?</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/" className="nav-link">
        <button type="button" className="not-found-button">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
