import React from 'react';
import { useNavigate } from 'react-router-dom';


const HomeWrapper3 = ({title, p, img}) => {

  const navigate = useNavigate();

  return ( 
    <div className='d-flex gap-30 align-items-center'>
      <div>
        <h6>{title}</h6>
      </div>
      <img src={img}  alt="categories" className='category-image' onClick={()=> navigate("/store")}/>
    </div>
   );
}
 
export default HomeWrapper3;