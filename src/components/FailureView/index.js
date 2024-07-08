import './index.css'

const FailureView = props => {
  const {onRetry} = props

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dtv22dsxc/image/upload/v1719134287/Background-Complete_shwgyq.png"
        className="failure-img"
        alt="failure view"
      />
      <p className="failure-title">Something went wrong, Please try again.</p>
      <button type="button" onClick={onClickRetry} className="retry-button">
        Try Again
      </button>
    </div>
  )
}

export default FailureView
