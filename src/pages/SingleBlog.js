import React, { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import HelmetMeta from '../components/Helmet';
import SingleBlogTemplate from '../utils/singleBlogTemplate';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlog } from '../features/blogs/blogSlice';

const SingleBlog = () => {
  const {  id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  
  useEffect(() => {
    dispatch(getBlog(id));
  }, []);

  const { blog } = state.blogs;

  return ( 
    <div>
      <Breadcrumb title={"What is an AI?"}/>
      <HelmetMeta title={"What is an AI?"}/>
      <div className="single-blog-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <SingleBlogTemplate 
              img={blog && blog.images[0].url}
              img2={blog && blog.images[1].url} 
              title={blog && blog.title} 
              content={blog && blog.description}
              date={blog && new Date(blog.createdAt).toDateString()}
              author={blog && blog.author}
             />
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default SingleBlog;