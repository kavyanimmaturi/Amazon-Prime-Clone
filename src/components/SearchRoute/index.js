import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'
import FooterSection from '../FooterSection'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class SearchRoute extends Component {
  state = {
    searchInput: '',
    searchMovies: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSearchMovies()
  }

  getSearchMovies = async () => {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
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
        posterPath: each.poster_path,
        title: each.title,
        id: each.id,
        backdropPath: each.backdrop_path,
      }))
      this.setState({
        searchMovies: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  searchInput = text => {
    this.setState({searchInput: text}, this.getSearchMovies)
  }

  onRetry = () => {
    this.getSearchMovies()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={80} width={80} />
    </div>
  )

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderNotFoundMovies = () => {
    const {searchInput} = this.state

    return (
      <div className="no-search-results-container">
        <img
          src="https://res.cloudinary.com/dtv22dsxc/image/upload/v1719210817/Layer_2_s7axnv.png"
          alt="no movies"
          className="no-search-img"
        />
        <h1 className="not-search-title">
          Your search for {searchInput} did not find any matches.
        </h1>
      </div>
    )
  }

  renderResultsView = () => {
    const {searchMovies} = this.state
    return (
      <>
        {searchMovies.length > 0 ? (
          <>
            <div className="search-results-bg-container">
              <div className="search-movies-filter-list-container">
                <ul className="search-results-container">
                  {searchMovies.map(each => (
                    <Link to={`/movies/${each.id}`} key={each.id}>
                      <li className="search-results-list-items" key={each.id}>
                        <img
                          src={each.posterPath}
                          alt={each.title}
                          className="search-results-poster"
                        />
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          this.renderNotFoundMovies()
        )}
      </>
    )
  }

  renderSuccessView = () => {
    const {searchInput} = this.state
    const isEmpty = searchInput === ''

    return (
      <div className="search-results">
        {isEmpty ? (
          <div className="search-filter-no-search">
            <p className="no-search-text">
              Search the movie, by clicking on the search icon
            </p>
          </div>
        ) : (
          this.renderResultsView()
        )}
      </div>
    )
  }

  renderSearchMovies = () => {
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
      <div className="search-results-bg-container">
        <Header searchInput={this.searchInput} />
        <div>{this.renderSearchMovies()}</div>
        <FooterSection />
      </div>
    )
  }
}
export default SearchRoute
