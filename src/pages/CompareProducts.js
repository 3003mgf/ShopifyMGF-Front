import React from 'react';
import HelmetMeta from '../components/Helmet';
import Breadcrumb from '../components/Breadcrumb';
import CompareProduct from '../utils/compareTemplate';
import { useSelector } from 'react-redux';


const CompareProducts = () => {
  
  const state = useSelector(state => state);
  const { compare } = state.products;

  return ( 
    <div>
      <HelmetMeta title={"Compare Products"}/>
      <Breadcrumb title={"Compare Products"}/>
      <div className="compare-products-wrapper py-5" style={{backgroundColor:"white"}}>
        <div className="container-xxl">
          <div className="row">
            
            {compare.length ? compare.map(el => (
              <CompareProduct
              prodId={el._id} 
              img={el.images[0].url} 
              title={el.title}
              price={el.price}
              brand={el.brand}
              size={el.size}
              sku={el.sku}
              type={el.type}
              availability={el.quantity > 0 ? "In Stock" : "Out of Stock"}
              color={el.color}
              />
            ))
            :
              <div className='d-flex flex-column gap-30 justify-content-center align-items-center'>
                <i className="fa-solid fa-inbox fa-2xl" style={{color:"#777777"}}></i>
                <p style={{color:"#777777", backgroundColor:"#f5f5f7", padding:"0.5rem", borderRadius:"0.4rem"}}>No Products to Compare</p>
              </div>
            }
          
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default CompareProducts;