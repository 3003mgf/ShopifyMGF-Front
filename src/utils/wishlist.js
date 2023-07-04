import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../features/products/productsSlice';
import { getWishlist } from '../features/user/userSlice';

const WishlistTemplate = ({id, img, brand, title, price}) => {
  const dispatch = useDispatch();
  
  return ( 
    <div className='col-3'>
      <div className="wishlist-product-card position-relative">
        <i className="fa-solid fa-xmark position-absolute cross" style={{color: "#232f3e",cursor: "pointer"}} onClick={async()=> {await dispatch(removeFromWishlist(id)) ; await dispatch(getWishlist())}}></i>
        <div className="wishlist-image">
          <Link to={`/product/${id}`}><img src={img} alt="wishlist-product" className='img-fluid' /></Link>
        </div>
        <div className="wishlist-product-details">
          <h6>{brand}</h6>
          <h5 className='title mb-3'>{title}</h5>
          <p className='price py-1 px-3'>{price}</p>
        </div>
      </div>
    </div>
   );
}
 
export default WishlistTemplate;