import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { Helmet } from 'react-helmet';
import BlogTemplate from '../utils/blogTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs, getAllBlogsFiltered, getBlogCategories } from '../features/blogs/blogSlice';


const Blog = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const [category, setCategory] = useState(null);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

  useEffect(() => {
    dispatch(getAllBlogsFiltered({category}))
  }, [category]);
  
  const { blogCategories, blogsFiltered } = state.blogs;

  return ( 
    <div>
      <Breadcrumb title="Blogs"/>
      <Helmet title="Blogs"/>
      <div className="blogs-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
             <div className='filter-card mb-3'>
                <h3 className="filter-title">Find By Categories</h3>
                <div>
                  <ul className='ps-0'>
                    {blogCategories.map((el, index) => <li key={index} onClick={()=> {category === el.title ? setCategory(null) : setCategory(el.title)}} style={{color: category === el.title ? "#000000" : "#777777", fontWeight: category === el.title ? "500" : "200"}}>{el.title}</li>)}
                  </ul>
                </div>
              </div>
            </div>
              <div className="col-9">
                <div className="row">
                    {blogsFiltered.length ? blogsFiltered.map(el => 
                      <BlogTemplate
                      id={el._id}
                      img={el.images[0].url}
                      title={el.title}
                      col={"6"}
                      description={el.description}
                      date={el.createdAt}
                      />
                    )
                    :
                    <div className='dummy-store-div d-flex flex-column justifiy-content-center align-items-center p-5 m-5'>
                      <div className='dummy-store-div-img' style={{backgroundColor:"orange"}}>
                        <img src="images/dummy2.svg" alt="dummy" className='img-fluid'/>
                      </div>
                      <p>Mmm... I don't think we have any blog related to that.</p>
                    </div>  
                    }
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Blog;