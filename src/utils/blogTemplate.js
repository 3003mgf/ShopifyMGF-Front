import React from 'react';
import { Link } from 'react-router-dom';


const BlogTemplate = ({id, img, title, description, date, mime, col}) => {
  
  
  return ( 
    <div className={`col-${col ? col : "3"} mb-4`}>
        <div className="blog-card">
          <div className="card-image">
            <img src={img} alt="blog" className='img-fluid w-100' />
          </div>
          <div className="blog-content">
            <p className="blog-date">{new Date(date).toDateString()}</p>
            <h5 className="blog-title">{title}</h5>
            <p className="blog-description" dangerouslySetInnerHTML={{__html: description.substr(0, 200) + "..."}}></p>
            <Link to={`/blog/${id}`} className='blue-button'>READ MORE</Link>
          </div>
        </div>
    </div>
   );
}
 
export default BlogTemplate;