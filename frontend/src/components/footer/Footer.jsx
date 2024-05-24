import React from 'react';
import './footer.scss';

import appStoreLogo from '../../assets/iconpla.jpg'; // Assurez-vous d'avoir ces logos
import googlePlayLogo from '../../assets/app.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Myski - Your Ski Resort Companion</h3>
        <p>Contact us at <a href="mailto:info@myski.com">info@myski.com</a></p>
        <div className="social-links">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="icon-facebook"></i></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="icon-twitter"></i></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="icon-instagram"></i></a>
        </div>
        <div className="download-links">
          <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"><img src={googlePlayLogo} alt="Google Play" /></a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer"><img src={appStoreLogo} alt="App Store" /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Myski. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
