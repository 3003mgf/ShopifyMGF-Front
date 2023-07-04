import React from 'react';

const CheckoutProduct = ({img, title, size, color, price, quantity}) => {
  return (  
    <div className='d-flex align-items-center justify-content-between gap-10'>
      <div className='d-flex align-items-center gap-20'>
        <div className='checkout-card-image position-relative'>
          <img src={img} alt="checkout-img" className='img-fluid checkout-image'/>
          <button className="d-flex justify-content-center align-items-center checkout-card-btn position-absolute">{quantity}</button>
        </div>
        <div className="checkout-card-details">
          <h5>{title}</h5>
          <p className='d-flex align-items-center'>{size} / &nbsp;<li style={{backgroundColor: color, width: "15px", height: "15px", borderRadius: "50%", color: color, boxShadow: "0 0 0.5rem lightgrey"}} title={color} className='d-flex justify-content-center align-items-center'></li></p>
        </div>
      </div>
      <div className='checkout-card-price'>
        <p>${price}</p>
      </div>
    </div>
  );
}
 
export default CheckoutProduct;