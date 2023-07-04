import React from 'react';
import ColorsSetter from './colors';
import { useDispatch } from 'react-redux';
import { removeFromCompare } from '../features/products/productsSlice';


const CompareProduct = ({prodId, img, title, price, brand, type, sku, availability, color, size}) => {
  
  const dispatch = useDispatch();

  return ( 
    <div className='col-3'>
      <div className="compare-product-card position-relative mt-3">
          <i className="fa-solid fa-xmark position-absolute cross" style={{color: "#232f3e"}} onClick={()=> dispatch(removeFromCompare(prodId))}></i>
        <div className="compare-image w-100 d-flex justify-content-center align-items-center py-3">
          <img src={img} alt="compare-product" className='img-fluid' />
        </div>
        <div className="compare-details mt-4">
          <h5 className='title'>{title}</h5>
          <h6 className='price'>{price}</h6>

          <div>
            <div className="compare-subdetails">
              <h5>Brand:</h5>
              <p>{brand}</p>
            </div>
            <div className="compare-subdetails">
              <h5>Type:</h5>
              <p>{type}</p>
            </div>
            <div className="compare-subdetails">
              <h5>SKU:</h5>
              <p>{sku}</p>
            </div>
            <div className="compare-subdetails">
              <h5>Availability:</h5>
              <p>{availability}</p>
            </div>
            <div className="compare-subdetails">
              <h5>Color:</h5>
              <ul>{<ColorsSetter colors={color}/>}</ul>
            </div>
            <div className="compare-subdetails">
              <h5>Size:</h5>
              <div className="d-flex gap-10">
                {size.map(el => <p>{el}</p>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default CompareProduct;