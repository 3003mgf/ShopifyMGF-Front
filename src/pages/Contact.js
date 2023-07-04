import React from 'react';
import HelmetMeta from '../components/Helmet';
import Breadcrumb from '../components/Breadcrumb';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEnquiry, resetContact } from '../features/contact/contactSlice';

const initialForm = {
  name: "",
  email: "",
  mobile: "",
  comment: ""
};

const Contact = () => {

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  
  const handleForm = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { contact, isLoading, isError, isSuccess } = state.contact;

  useEffect(() => {
    if(isLoading) setLoading(true);
    if(contact) setSubmitted("Thank you!");
    if(!isLoading) setLoading(false);
    if(!contact) setSubmitted(null);
  }, [isLoading, isError, isSuccess]);

  useEffect(() => {
    document.querySelector("#form-button-div *").addEventListener("pointerover", e=>{
      document.querySelector("#form-button").classList.add("fa-bounce");
    })
    document.querySelector("#form-button-div *").addEventListener("pointerleave", e=>{
      document.querySelector("#form-button").classList.remove("fa-bounce");
    })
  }, []);

  const handleSubmit = async(e) =>{
    e.preventDefault()
    await dispatch(createEnquiry(form));
    setForm(initialForm);
    setTimeout(()=>{
      dispatch(resetContact());
    }, 3000)
  };

  return ( 
    <div>
      <HelmetMeta title={"Contact Us"}/>
      <Breadcrumb title={"Contact Us"}/>
      <div className="contact-wrapper py-5">
        <div className="container-xxl">
          <div className="row">

            {/* MAP */}
            <div className="col-12">
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10498.727456708515!2d2.3218497914850875!3d48.86427661860748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671d877937b0f%3A0xb975fcfa192f84d4!2sMuseo%20del%20Louvre!5e0!3m2!1ses!2sar!4v1685576553867!5m2!1ses!2sar" 
            width="600" 
            height="450" 
            title='Our Location'
            className='border-0 w-100' 
            style={{borderRadius: "1rem"}}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

            {/* CONTACT */}
            <div className="col-12">
              <div className="contact-bottom-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title py-1 px-3 mb-4">
                    Contact
                    <i class="fa-solid fa-file-lines ms-2"></i>
                  </h3>
                  <form className='contact-form d-flex flex-column gap-20' onSubmit={handleSubmit}>
                    <div>
                      <input type="text" placeholder='Name' name='name' onChange={handleForm} value={form.name} className='form-control' required />
                    </div>
                    <div>
                      <input type="email" placeholder='Email' name='email' onChange={handleForm} value={form.email} className='form-control' required />
                    </div>
                    <div>
                      <input type="text" placeholder='Phone Number' name='mobile' onChange={handleForm} value={form.mobile} className='form-control' required />
                    </div>
                    <div>
                      <textarea name="comment" cols="30" rows="4" placeholder='Tell us...' onChange={handleForm} value={form.comment} className='w-100 form-control' required></textarea>
                    </div>

                    {loading && 
                    <div className='d-flex justify-content-center'>
                      <img src="images/oval.svg"  alt="" />
                    </div>}

                    {submitted && 
                    <div className='submitted-contact d-flex justify-content-center align-items-center'>
                      <p>{submitted}</p>  
                    </div>}

                    <div id='form-button-div'>
                      <button type="submit"className='form-button'>
                      <i id="form-button" class="fa-solid fa-paper-plane" style={{color: "palevioletred"}}></i>   
                      </button>
                    </div>
                  </form>
                </div>

                {/* GET IN TOUCH */}
                <div>
                  <h3 className="contact-title py-1 px-3 mb-4">Get In Touch With Us</h3>
                  <div className='get-in-touch'>
                    <address style={{color: "#9c9c9c"}} className='address-font'>
                    <i class="fa-solid fa-house me-2" style={{color: "#9c9c9c"}}></i>
                      333 Developer Street. Tucuman, Argentina. T4000
                    </address>
                    <a style={{color: "#9c9c9c", fontSize: "14px"}} href="tel:+17869019542" className="mt-4 d-block mb-3"><i className="fa-solid fa-mobile-button fa-shake me-2" style={{color: "#9c9c9c"}}></i>+ 1 786 9019542</a>
                    <a style={{color: "#9c9c9c", fontSize: "14px"}} href="mailto:gramajofeijoonacho@gmail.com" className="mt-4 d-block mb-3"><i className="fa-solid fa-envelope fa-spin me-2" style={{color: "#9c9c9c"}}></i>gramajofeijoonacho@gmail.com</a>
                    <address style={{color: "#9c9c9c"}} className='address-font mt-4 d-block mb-31'>
                    <i class="fa-solid fa-circle-info me-2" style={{color: "#9c9c9c"}}></i>
                      Monday - Friday 8AM - 8PM
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Contact;