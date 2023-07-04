import React from 'react';
import { Link } from 'react-router-dom';


const HomeWrapper1 = ({id, img, title, subtitle, p}) => {
  return ( 
    <Link to={`/product/${id}`} className="small-banner position-relative" style={{cursor: "default"}}>
    <div>
      <img src={img} alt="main-banner" className='img-fluid rounded-3'/>
                  
      <div className="small-banner-content position-absolute">
        <h4>{title}</h4>
        <h5>{subtitle}</h5>
        <p>{p.p1} <br /> {p.p2} </p>
      </div>
    </div>
    </Link>
   );
}
 
export default HomeWrapper1;