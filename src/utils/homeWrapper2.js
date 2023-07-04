import React from 'react';


const HomeWrapper2 = ({image, ri, h6, p}) => {
  return ( 
    <div className='d-flex align-items-center gap-10'>
       {image ? <i class={image}></i> : ri}

       <div>
         <h6>{h6}</h6>
         <p className='mb-0'>{p}</p>
       </div>
    </div>
   );
}
 
export default HomeWrapper2;