import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToWishlist, getWishlist } from "../features/products/productsSlice";

const SpecialProduct = ({prodId,  brand, title, img, img2, img3, price, discount, sold, quantity, rate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state);
  const { wishlist } = state.products;
  
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const date = "March 30, 2024 00:00:00"
  const limitDate = new Date(date).getTime(); 

  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  setInterval(()=>{
    let now = new Date().getTime();
    let limitTime = (limitDate - now);

    let days = Math.floor(limitTime / (1000 * 60 * 60 * 24));   
    let hours = ("0" + Math.floor((limitTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
    let minutes = ("0" + Math.floor((limitTime % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
    let seconds = ("0" + Math.floor((limitTime % (1000 * 60)) / (1000))).slice(-2);

    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);

  },1000)

  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div className="position-relative">
            <div className="sp-image-div">
              <img src={img} alt="sp" className="img-fluid" />
            </div>
            <div className="sp-wishlist-icon position-absolute">
                {wishlist.find(el => el._id === prodId) ? <i className="fa-solid fa-heart" style={{color: "#d33131", cursor: "pointer"}} onClick={async()=> {await dispatch(addToWishlist(prodId)) ; await dispatch(getWishlist())}}></i> : <i class="fa-regular fa-heart" style={{color: "#292b2e", cursor: "pointer"}} onClick={async()=> {await dispatch(addToWishlist(prodId)) ; await dispatch(getWishlist())}}></i>}
            </div>
            <div className="sp-discount-icon position-absolute mt-1">
              <p>{discount}</p>
            </div>
          </div>

          <div className="special-product-content w-50">
            <h6>{brand}</h6>
            <h5>{title}</h5>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              isHalf={true}
              value={rate}
              edit={false}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              className="react-stars"
            />

            <p className="sp-price">
              <span className="red-p">${price - price * 0.30}</span> &nbsp; <strike>${price}</strike>
            </p>

            <div className="discount-till d-flex justify-content-start ms-2 py-2">
                <div className="sp-div2 d-flex gap-10 align-items-center">
                  <span className="discount-till-circles d-flex align-items-center justify-content-center">{hours * 24}</span>:
                  <span className="discount-till-circles d-flex align-items-center justify-content-center">{minutes}</span>:
                  <span className="discount-till-circles d-flex align-items-center justify-content-center">{seconds}</span>
                </div>
            </div>

            <div className="sp-count my-3">
                <p>Products: {quantity}</p>
                <div className="progress">
                  <div 
                  className="progress-bar bg-success" 
                  role="progressbar"
                  style={{width: quantity / (quantity + sold) * 100 + "%"}} 
                  aria-valuenow={quantity / (quantity + sold) * 100} 
                  aria-valuemin={quantity} 
                  aria-valuemax={sold + quantity}>
                  </div>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <div className="mt-5">
                <span className="sp-button mt-4 me-3">View More</span>
                <i className="fa-solid sp-button2 fa-cart-shopping fa-xl mt-4" style={{color:"palevioletred"}} onClick={()=> navigate(`/product/${prodId}`)}></i>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
