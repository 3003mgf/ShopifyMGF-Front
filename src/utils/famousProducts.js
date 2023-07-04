import React from 'react';

const FamousProduct = ({img, brand, title, details, dark}) => {
  return ( 
    <div className="col-3">
      <div className="famous-card position-relative">
        <img src={img} alt="famous-product" className='img-fluid' />
        <div className={`famous-content position-absolute ${dark && "dark-text"}`}>
          <h5>{brand}</h5>
          <h6>{title}</h6>
          <p>{details}</p>
        </div>
      </div>
    </div>
   );
}
 
export default FamousProduct;