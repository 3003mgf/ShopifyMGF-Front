import { useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';


const Breadcrumb = ({title}) => {

  useEffect(() => {
    document.querySelector(".breadcrumb-link").addEventListener("pointerover", e=>{
      document.querySelector(".breadcrumb-icon").classList.add("fa-bounce");
    });

    document.querySelector(".breadcrumb-link").addEventListener("pointerleave", e=>{
      document.querySelector(".breadcrumb-icon").classList.remove("fa-bounce");
    });
  }, []);

  return ( 
    <div className="breadcrumb pink py-4 mb-0">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className='text-center mb-0 '>
              <i class="fa-solid fa-house breadcrumb-icon"></i>
              <Link to="/" className='breadcrumb-link ms-2'>
                Home
              </Link>&nbsp;/ {title}
            </p>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Breadcrumb;