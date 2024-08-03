import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import FooterSection from '../FooterSection'
import FailureView from '../FailureView'
import MovieDetails from '../MovieDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetails: [],
    genres: [],
    languagesAvailable: [],
    similarMovies: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = [data.movie_details].map(each => ({
        id: each.id,
        budget: each.budget,
        backdropPath: each.backdrop_path,
        title: each.title,
        overview: each.overview,
        originialLanguage: each.original_language,
        releaseDate: each.release_date,
        count: each.vote_count,
        rating: each.vote_average,
        runtime: each.runtime,
        posterPath: each.poster_path,
      }))
      const updatedGenresData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      const updatedSimilarData = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      const updatedLanguagesData = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          language: each.english_name,
        }),
      )

      this.setState({
        movieDetails: updatedData,
        apiStatus: apiStatusConstants.success,
        genres: updatedGenresData,
        languagesAvailable: updatedLanguagesData,
        similarMovies: updatedSimilarData.slice(0, 6),
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getMovieDetails()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className='loader-container' testid='loader'>
      <Loader type='TailSpin' height={80} width={80} color='#D81F26' />
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails, genres, languagesAvailable, similarMovies} = this.state
    const newMovieDetails = {...movieDetails[0]}
    const {releaseDate, count, rating, budget} = newMovieDetails

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const date = new Date(releaseDate)
    const monthName = months[date.getMonth()]
    const newDate = new Date(releaseDate)
    const year = newDate.getFullYear()
    const day = newDate.getDay().toString()

    let dateEndingWord
    if (day.endsWith('1')) {
      dateEndingWord = 'st'
    } else if (day.endsWith('2')) {
      dateEndingWord = 'nd'
    } else if (day.endsWith('3')) {
      dateEndingWord = 'rd'
    } else {
      dateEndingWord = 'th'
    }

    return (
      <>
        <div className='movie-details-container'>
          <div className='movie-details-card'>
            {movieDetails.map(each => (
              <MovieDetails movieDetails={each} key={each.id} />
            ))}
          </div>
        </div>

        <div className='additional-movie-details-container additional-details-sm-container'>
          <ul className='genres-list-container'>
            <h1 className='movie-details-genre-heading'>genres</h1>
            {genres.map(eachGenre => (
              <li className='movie-details-each-genre' key={eachGenre.id}>
                {eachGenre.name}
              </li>
            ))}
          </ul>

          <ul className='genres-list-container'>
            <h1 className='movie-details-languages-heading'>Audio Available</h1>
            {languagesAvailable.map(eachAudio => (
              <li className='movie-details-each-genre' key={eachAudio.id}>
                {eachAudio.language}
              </li>
            ))}
          </ul>

          <div className='genres-list-container'>
            <h1 className='movie-details-rating-count-heading'>Rating Count</h1>
            <p className='movie-details-rating-count'>{count}</p>
            <h1 className='movie-details-rating-avg-title'>Rating Average</h1>
            <p className='movie-details-rating'>{rating}</p>
          </div>

          <div className='genres-list-container'>
            <h1 className='movie-details-budget-heading'>Budget</h1>
            <p className='movie-details-budget'>{budget}</p>
            <h1 className='movie-details-release-date'>Release Date</h1>
            <p className='movie-details.release-year'>{releaseDate}</p>
            <p>
              <span className='movie-info-date'>{day}</span>
              <span className='movie-info-date-end'>{dateEndingWord}</span>
              <span className='movie-info-month-name'>{monthName}</span>
              <span className='movie-info-year'>{year}</span>
            </p>
          </div>
        </div>

        <div className='similar-movies-container'>
          <h1 className='more-like-this'>More like this</h1>
          <ul className='popular-ul-container similar-ul-container'>
            {similarMovies.map(each => (
              <Link to={`/movies/${each.id}`} key={each.id} target='blank'>
                <li className='popular-list-item' key={each.id}>
                  <img
                    className='popular-images'
                    src={each.posterPath}
                    alt={each.title}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderVideoDetailView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className='movie-item-container'>
        <Header />
        <div className='root-container'>
          <div
            className='video-details-view-container'
            data-testid='videoItemDetails'
          >
            {this.renderVideoDetailView()}
            <FooterSection />
          </div>
        </div>
      </div>
    )
  }
}

export default MovieItemDetails
