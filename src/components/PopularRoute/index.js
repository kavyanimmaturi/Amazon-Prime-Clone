import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../Header'
import FooterSection from '../FooterSection'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class PopularRoute extends Component {
  state = {
    popularMovies: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/popular-movies`
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
        overview: each.overview,
        backdropPath: each.backdrop_path,
      }))
      this.setState({
        popularMovies: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getPopularMovies()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader
        type="TailSpin"
        testid="loader"
        color="#D81F26"
        height={25}
        width={30}
      />
    </div>
  )

  renderSuccessView = () => {
    const {popularMovies} = this.state

    return (
      <>
        <h1 className="popular-movies-title">
          Explore the Popular Movies Here
        </h1>
        <ul className="popular-movies-container">
          {popularMovies.map(each => (
            <Link to={`/movies/${each.id}`} key={each.id}>
              <li className="popular-movies-list" key={each.id}>
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="popular-movie-poster"
                />
              </li>
            </Link>
          ))}
        </ul>
      </>
    )
  }

  renderPopularMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.in_progress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-movies">
        <Header />
        <div className="render-popularMovies">{this.renderPopularMovies()}</div>
        <FooterSection />
      </div>
    )
  }
}

export default PopularRoute
