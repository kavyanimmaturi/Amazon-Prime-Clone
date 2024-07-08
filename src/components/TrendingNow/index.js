import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'

import SlickMovies from '../SlickMovies'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
}

class TrendingNow extends Component {
  state = {
    trendingVideos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/trending-movies`
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
        trendingVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getTrendingMovies()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" height="25" width="30" color="#D81F26" />
    </div>
  )

  renderSuccessView = () => {
    const {trendingVideos} = this.state

    return (
      <>
        <SlickMovies movies={trendingVideos} />
      </>
    )
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderTrendingMoviesView = () => {
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
    return (
      <div className="trending-movies-container">
        {this.renderTrendingMoviesView()}
      </div>
    )
  }
}

export default TrendingNow
