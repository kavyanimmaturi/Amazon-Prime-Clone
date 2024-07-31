import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import FailureView from '../FailureView'
import FooterSection from '../FooterSection'
import TrendingNow from '../TrendingNow'
import HomeBanner from '../HomeBanner'
import Originals from '../Originals'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    initialPoster: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomePagePoster()
  }

  getHomePagePoster = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/originals`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedDataLength = data.results.length
      const randomPoster =
        data.results[Math.floor(Math.random() * fetchedDataLength)]
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        overview: randomPoster.overview,
        title: randomPoster.title,
        posterPath: randomPoster.poster_path,
      }
      this.setState({
        initialPoster: {...updatedData},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getHomePagePoster()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={60} width={80} color="#d62013" />
    </div>
  )

  renderSuccessView = () => {
    const {initialPoster} = this.state

    return (
      <>
        <HomeBanner poster={initialPoster} />
      </>
    )
  }

  renderHomePosterView = () => {
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
      <div className="root-container">
        <Header />
        <div>{this.renderHomePosterView()}</div>
        <div>
          <div>
            <h1 className="trending-now-heading">Trending Now</h1>
            <TrendingNow />
          </div>

          <div>
            <h1 className="originals-heading">Originals</h1>
            <Originals />
          </div>
        </div>
        <FooterSection />
      </div>
    )
  }
}

export default Home
