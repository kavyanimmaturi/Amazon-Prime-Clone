import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SlickMovies from '../SlickMovies'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Originals extends Component {
  state = {
    orignalVideos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOriginals()
  }

  getOriginals = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        orignalVideos: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.success})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {orignalVideos} = this.state

    return <SlickMovies movies={orignalVideos} />
  }

  onRetry = () => {
    this.getOriginals()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dtv22dsxc/image/upload/v1719931209/alert-triangle_hcjs5d.png"
        alt="failure view"
        className="failure-view"
      />
      <p className="failure-title">Something went wrong, Please try again</p>
      <button type="button" onClick={this.onRetry}>
        Try Again
      </button>
    </div>
  )

  renderOriginals = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.in_progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="render-originals">{this.renderOriginals()}</div>
  }
}

export default Originals