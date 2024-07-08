import './index.css'

const MovieDetails = props => {
  const {movieDetails} = props
  const {
    backdropPath,
    title,
    adult,
    runtime,
    releaseDate,
    overview,
    posterPath,
  } = movieDetails

  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const date = new Date(releaseDate)
  const year = date.getFullYear()

  return (
    <>
      <div
        className="movie-background-details-img-sm-devices"
        style={{
          backgroundImage: `url(${posterPath})`,
          backgroundSize: '100% 100%',
          width: '400px',
          height: '500px',
          margin: '10px',
        }}
      >
        <div className="movie-info-details-sm-devices heading-container">
          <h1 className="movie-title">{title}</h1>
          <div className="movie-runtime-container">
            <p className="movie-runtime-in-hrs-mins">{`${hours}h${minutes}m`}</p>
            <p className="movie-info-adult-a">{adult ? 'A' : 'U/A'}</p>
            <p className="movie-release-year">{year}</p>
          </div>

          <p className="movie-overview">{overview}</p>
          <button type="button" className="movie-details-play-btn">
            Play
          </button>
        </div>
      </div>

      <div
        className="movie-background-details-lg-devices"
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          height: '100%',
        }}
      >
        <div className="movie-info-details-lg-devices heading-container">
          <h1 className="movie-title">{title}</h1>
          <div className="movie-runtime-container">
            <p className="movie-runtime-in-hrs-mins">{`${hours}h${minutes}m`}</p>
            <p className="movie-info-adult-a">{adult ? 'A' : 'U/A'}</p>
            <p className="movie-release-year">{year}</p>
          </div>

          <p className="movie-overview">{overview}</p>
          <button type="button" className="movie-details-play-btn">
            Play
          </button>
        </div>
      </div>
    </>
  )
}
export default MovieDetails
