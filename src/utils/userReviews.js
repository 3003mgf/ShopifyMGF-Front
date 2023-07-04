/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react';
import ReactStars from "react-rating-stars-component";
import { toast } from 'react-toastify';

const UserReviews = ({rating, user, review, reviewTitle, date}) => {

  const ratingChanged = (newRating) =>{
    console.log(newRating);
  }

  const handleInappropiate = (e) =>{
    toast.warning(<div>
      <p>Are you sure you want to report this review as inappropiate?</p>
      <button className='border-0 bg-white py-1 px-2 inappropiate-btn' style={{borderRadius: "0.3rem", color:"#777777"}} onClick={()=>{
        toast.success('Thank you, our team will check it for you!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }}>Yes</button>
    </div>, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };

  useEffect(() => {
    document.querySelector("#report").addEventListener("pointerover", e=>{
      document.querySelector(".report-icon").classList.add("fa-beat");
    })

    document.querySelector("#report").addEventListener("pointerleave", e=>{
      document.querySelector(".report-icon").classList.remove("fa-beat");
    })
  }, []);

  return ( 
    <div className="user-review mt-4">
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={16}
        isHalf={true}
        value={rating} 
        edit={false}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
      <h6 className='user-review-title py-1 px-2'>{reviewTitle}</h6>
      <p className='user-review-details'>Wrote by <b>{user}</b> on {new Date(date).toDateString()}</p>
      <p className="user-review-subdetails">{review}</p>
      <div className='d-flex justify-content-end align-items-center'>
        <i class="report-icon fa-solid fa-circle-exclamation me-2"></i>
        <button id='report' className='border-0 bg-white' style={{textDecoration: "underline", color: "#777777"}} onClick={handleInappropiate}>Report as Inappropiate</button>
      </div>
    </div>
   );
}
 
export default UserReviews;