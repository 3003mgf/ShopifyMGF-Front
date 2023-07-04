import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {

  useEffect(() => {
    document.querySelector(".newsletter-input").addEventListener("pointerover", e=>{
      document.querySelector(".footer-envelope").classList.add("fa-bounce");
    })

    document.querySelector(".newsletter-input").addEventListener("pointerleave", e=>{
      document.querySelector(".footer-envelope").classList.remove("fa-bounce");
    })
  }, []);

  return ( 
    <div className='footer-container'>
    {/* NEWSLETTER */}
    <footer className="py-4">
      <div className="container-xxl py-5">
        <div className="row align-items-center">
          {/* FOOTER TOP DATA */}
          <div className="col-5">
            <div className="footer-top-data d-flex gap-30 align-items-center">
            <i class="footer-envelope fa-solid fa-envelopes-bulk fa-2xl" style={{color: "#fff"}}></i>
            <h2 className='text-white mb-0'>Sign Up for Newsletter</h2>
            </div>
         </div>

          {/* FOOTER  */}
          <div className="col-7">
          <div className="input-group">
              <input 
              type="text" 
              className="newsletter-input form-control py-1" 
              placeholder="Your Email Address..." 
              aria-label="Your Email Address..." 
              aria-describedby="basic-addon2"/>
              <span 
              className="input-group-text py-2" 
              id="basic-addon2">
                Sign Up
              </span>

            </div>
          </div>
        </div>
      </div>
    </footer>

    {/* LINKS */}
    <footer className="py-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-4">
            <h4 className='text-white mb-4'>Contact us</h4>
            <div className='footer-links d-flex flex-column'>
              <address className='text-white address-font'>
                300 MGF Developers Asociation <br/> Tucuman, Argentina <br/> Zip 4000
              </address>
              <a href="tel:+17869019542" className="mt-4 text-white d-block mb-3 mobile-footer"><i className="fa-solid fa-mobile-button fa-shake me-2" style={{color: "#f2db69;"}}></i>+ 1 786 9019542</a>
              <a href="mailto:gramajofeijoonacho@gmail.com" className="mt-4 text-white d-block mb-3 email-footer"><i className="fa-solid fa-envelope fa-spin me-2" style={{color: "#f2bd69;"}}></i>gramajofeijoonacho@gmail.com</a>
              <div className="social-icons mt-4">
                <a href="https://www.instagram.com/mci3003/" target='_blank' rel='noopener noreferrer'>
                  <i class="fa-brands fa-instagram fa-xl text-white me-3"></i>
                </a>
                <a href="https://github.com/3003mgf" target='_blank' rel='noopener noreferrer'>
                  <i class="fa-brands fa-github fa-xl text-white me-3"></i>
                </a>
                <a href="https://ar.linkedin.com/in/marcelo-cruz-ignacio-gramajo-feijoo-03932b257" target='_blank' rel='noopener noreferrer'>
                  <i class="fa-brands fa-linkedin fa-xl text-white me-3"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="col-3">
            <h4 className='text-white mb-4'>Information</h4>
            <div className='footer-links d-flex flex-column'>
              <Link to="/privacy-policy" className="text-white mb-1 py-2 underlineLinks">Privacy Policy</Link>
              <Link to="/refund-policy" className="text-white mb-1 py-2 underlineLinks">Refund Policy</Link>
              <Link to="/shipping-policy" className="text-white mb-1 py-2 underlineLinks">Shipping Policy</Link>
              <Link to="/terms-and-conditions" className="text-white mb-1 py-2 underlineLinks">Terms Of Service</Link>
              <Link to="blogs" className="text-white mb-1 py-2 underlineLinks">Blogs</Link>
            </div>
          </div>
          
          <div className="col-3">
            <h4 className='text-white mb-4'>Account</h4>
            <div className='footer-links d-flex flex-column'>
              <Link className='text-white py-2 mb-1 underlineLinks'>Search</Link>
              <Link className='text-white py-2 mb-1 underlineLinks'>About Us</Link>
              <Link className='text-white py-2 mb-1 underlineLinks'>Faq</Link>
              <Link className='text-white py-2 mb-1 underlineLinks'>Contact</Link>
              <Link className='text-white py-2 mb-1 underlineLinks'>Size Chart</Link>
            </div>
          </div>
          
          <div className="col-2">
            <h4 className='text-white mb-4'>Quick Links</h4>
            <div className='footer-links d-flex flex-column'>
              <Link className='text-white py-2 mb-1 underlineLinks'>Accesories</Link>
              <Link className='text-white py-2 mb-1 underlineLinks'>Laptops</Link>
              <Link className='text-white py-2 mb-1 underlineLinks'>Headphones</Link>
              <Link className='text-white py-2 mb-1 underlineLinks'>Tablets</Link>
              <Link className='text-white py-2 mb-1 underlineLinks'>Watch</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>

    {/* Powered By */}
    <footer className="py-3">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className="text-center mb-0 text-white">&copy; {new Date().getFullYear()} Powered by Gramajo Feijoo</p>
          </div>
        </div>
      </div>
    </footer>
    </div>
   );
}
 
export default Footer;