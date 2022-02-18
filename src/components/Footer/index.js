import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-sub-container">
        <div className="footer-title-container">
          <img
            className="footer-website-logo"
            src="https://res.cloudinary.com/hariy/image/upload/v1642747222/TastyKitchen/Vector_2_wfbmrn.png"
            alt="website-footer-logo"
          />
          <h1 className="footer-website-title">Tasty Kitchens</h1>
        </div>
        <p className="footer-desc">
          The only thing we are serious about is food. Contact us on
        </p>
        <div className="footer-social-container">
          <FaPinterestSquare
            testid="pintrest-social-icon"
            className="footer-social-icon"
          />
          <FaInstagram
            testid="instagram-social-icon"
            className="footer-social-icon"
          />
          <FaTwitter
            testid="twitter-social-icon"
            className="footer-social-icon"
          />
          <FaFacebookSquare
            testid="facebook-social-icon"
            className="footer-social-icon"
          />
        </div>
      </div>
    </div>
  )
}
