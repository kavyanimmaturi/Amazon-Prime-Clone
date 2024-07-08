import './index.css'

const HomeBanner = props => {
  const {poster} = props
  const {backdropPath, title, overview} = poster

  return (
    <>
      <div
        className="home-banner-container"
        alt={title}
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          height: '100%',
        }}
      >
        <div className="home-header-container heading-content">
          <h1 className="home-banner-title home-poster-name">{title}</h1>
          <h1 className="home-banner-description movies-details-overview">
            {overview}
          </h1>
          <button type="button" className="home-banner-button home-details-btn">
            Play
          </button>
        </div>
      </div>
    </>
  )
}

export default HomeBanner
