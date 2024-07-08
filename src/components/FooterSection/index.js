import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const FooterSection = () => (
  <>
    <div className="footer-icons-container">
      <button type="button" className="icon-button">
        <FaGoogle size={24} color="#ffffff" />
      </button>

      <button type="button" className="icon-button">
        <FaTwitter size={24} color="#ffffff" />
      </button>

      <button type="button" className="icon-button">
        <FaInstagram size={24} color="#ffffff" />
      </button>

      <button type="button" className="icon-button">
        <FaYoutube size={24} color="#ffffff" />
      </button>
    </div>
    <p className="contact-us-title">Contact us</p>
  </>
)

export default FooterSection
