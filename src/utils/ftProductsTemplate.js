import React, { useEffect, useState, useContext } from 'react';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import { ScrollToTop } from '../components/ScrollTop';
import { useDispatch, useSelector } from 'react-redux';
import { addToCompare, addToWishlist, getWishlist, removeFromCompare } from '../features/products/productsSlice';
import { VPContext } from '../context/viewProductContext';

const ProductTemplate = ({prodId, img, img2, img3, brand, title, rate, price, grid, size, color, tags}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const { products, compare } = state.products;

  const data = useContext(VPContext);
  const { viewProductIsOpen, setViewProductIsOpen, setViewProductData } = data;

  const getProduct = products.filter(el => el._id === prodId);

  const { wishlist } = state.products;
  
  const ratingChanged = (newRating) =>{
    console.log(newRating)
  };
  
  const [onCompare, setOnCompare] = useState(false);

  useEffect(() => {
    let alreadyOnCompare = compare.find(el => el._id === prodId);
    setOnCompare(alreadyOnCompare);

  }, [compare]);

  // ScrollToTop();
  
  return ( 
    <div className={`${grid ? `gr-${grid}` : "col-3"} position-relative product-card-div`}>
        <div className="wishlist-icon position-absolute">
            {wishlist.find(el => el._id === prodId) ? <i className="fa-solid fa-heart" style={{color: "#d33131", cursor: "pointer"}} onClick={async()=> {await dispatch(addToWishlist(prodId)) ; await dispatch(getWishlist())}}></i> : <i class="fa-regular fa-heart" style={{color: "#777777", cursor: "pointer"}} onClick={async()=> {await dispatch(addToWishlist(prodId)) ; await dispatch(getWishlist())}}></i>}
            {/* <img style={{cursor: "pointer"}} onClick={()=> dispatch(addToWishlist(prodId))} src="../images/wish.svg" alt="addtowish" /> */}
        </div>
        {tags.includes("#Special") && 
          <div className="discount-div-store position-absolute">
            <span>30%</span>
          </div>
        }
       
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column align-items-center gap-10">
            {/* <Link>
              <img src="../images/add-cart.svg" title='Add To Cart' alt="add-cart" />
            </Link> */}
            <Link>
              <i className='fa-solid fa-eye fa-sm' style={{color: "#777777"}} title='View More' alt="add-cart" onClick={()=> {setViewProductIsOpen(true) ; setViewProductData({title, price, size, color, prodId, img, img2, img3, tags})}}></i>
            </Link>
            <Link>
              {onCompare ? <i className="fa-solid fa-shuffle fa-sm" onClick={()=> dispatch(removeFromCompare(getProduct[0]._id))}></i> : <i className="fa-solid fa-shuffle fa-sm" style={{color: "#777777"}} onClick={()=> dispatch(addToCompare(getProduct[0]))}></i>}
            </Link>
          </div>
        </div>

        <Link to={`/product/${prodId}`} className='d-flex justify-content-center align-items-center' style={{cursor: "default"}}>
          <div className="product-image d-flex justify-content-center align-items-center">
            <img src={img} alt="featured-product" />
            <img src={img2} alt="featured-product" />
          </div>
        </Link>

        <div className="product-details">
          <h6>{brand}</h6>
          <h5>{title}</h5>
          <ReactStars 
          count={5}
          onChange={ratingChanged}
          size={16}
          isHalf={true}
          value={rate} 
          edit={false}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"/>
          <div>{tags.includes("#Special") ?
            <div className='d-flex align-items-center gap-10'>
            <span>${price - price * 0.30}</span>
            <strike style={{color:"#777777", fontSize:"14px"}}>${price}</strike>
            </div>
            :
            <p>${price}</p>
            }
          </div>
        </div>

    </div>
   );
}
 
export default ProductTemplate;