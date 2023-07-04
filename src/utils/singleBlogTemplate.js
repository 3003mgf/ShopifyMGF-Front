import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, PinterestShareButton, PinterestIcon} from "react-share"
import { ScrollToTop } from '../components/ScrollTop';

const initialForm = {
  name: "",
  email: "",
  comments: ""
}

const SingleBlogTemplate = ({title, img, img2, content, date, author}) => {
  
  ScrollToTop();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [form, setForm] = useState(initialForm);
  
  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };
  const handleBlogComment = (e) =>{
    e.preventDefault();
    setIsSubmitted(true);
      setTimeout(()=>{
        setIsSent(true);
      }, 3000)

      setTimeout(()=>{
        setIsSent(false);
        setIsSubmitted(false);
        setForm(initialForm);
      }, 6000)
  };

  return ( 
    <div className="single-blog-card">
      <h3 className='single-blog-title'>{title}</h3>
      <div className="single-blog-image d-flex align-items-center gap-20">
        <img src={img} alt={title} className='img-fluid w-50 my-4' />
        <img src={img2} alt={title} className='img-fluid w-50 my-4' />
      </div>
      <p dangerouslySetInnerHTML={{__html: content}}></p>
      <div className='d-flex align-items-center gap-30 py-3'>
        <p>{date}</p>
        <p><i class="fa-solid fa-user-pen me-1"></i><b>{author}</b></p>
      </div>
      <div className='py-4 go-back-div d-flex align-items-center justify-content-between'>
        {/* GO BACK */}
        <div>
          <i class="fa-solid fa-arrow-left-long"></i>
          <Link to="/blogs" className='ms-2 mb-3 single-blog-link'>Go Back To Blogs</Link>
        </div>

        {/* SHARE */}
        <div className='d-flex align-items-center gap-15'>
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={25}/>
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={25}/>
            </TwitterShareButton>
            <PinterestShareButton url={window.location.href}>
              <PinterestIcon size={25}/>
            </PinterestShareButton>
        </div>

        {/* FORM */}
      </div>
      <div className='blog-form'>
        <h5 className='section-heading'>Leave A Comment</h5>
        <form action="" className='d-flex flex-wrap gap-30 justify-content-between' onSubmit={handleBlogComment}>
          <div className='flex-grow-1'>
            <input type="text" placeholder='Name *' name='name' required className='form-control form-input' onChange={handleChange} value={form.name} />
          </div>
          <div className='flex-grow-1'>
            <input type="email" placeholder='Email *' name='email' required className='form-control form-input' onChange={handleChange} value={form.email} />
          </div>
          <div className='w-100'>
              <textarea placeholder='Comments *' name="comments" id="Comments" cols="30" rows="5" className='form-control' onChange={handleChange} value={form.comments} required></textarea>
          </div>
          <div className='mt-4'>
            <button type='submit' className='py-3 px-4'>Post Comment</button>
          </div>
        </form>
        {isSubmitted && <div className='d-flex justify-content-center mb-3'>
          <label htmlFor="" className={`label-check-icon ${isSent && "sent"}`}>
            <div className={`check-icon ${isSent && "sent"}`}></div>
          </label>
        </div>}
      </div>
    </div>
   );
}
 
export default SingleBlogTemplate;