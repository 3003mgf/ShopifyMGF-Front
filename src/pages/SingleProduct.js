/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import HelmetMeta from '../components/Helmet';
import ProductTemplate from '../utils/ftProductsTemplate';
import ReactStars from "react-rating-stars-component";
import UserReviews from '../utils/userReviews';
import SingleProductTemplateImages from '../utils/singleProductImagesTemplate';
import SingleProductDetailsTemplate from '../utils/singleProductDetailsTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getAllProducts, getProduct, resetProductState, setReviewPromedy } from '../features/products/productsSlice';
import { useParams } from 'react-router-dom';
import YouMayLike from '../utils/youmaylike';
import Swal from 'sweetalert2';

const initialForm = {
  name: "",
  email: "",
  rating: 0,
  reviewTitle: "",
  review: ""
};

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const { products, product, isError, isSuccess, isLoading, review, reviewPromedy } = state.products;

  useEffect(() => {
    if(product){
      product.reviews.map(el => dispatch(setReviewPromedy(el.rating)));
    };
  }, [product]);
  
  useEffect(() => {
    dispatch(getProduct(id))
    dispatch(getAllProducts());

    document.querySelector(".write-review").addEventListener("click", e=>{
      e.preventDefault();
      document.querySelector(".review-form").classList.toggle("active");
      document.querySelector(".write-review").classList.toggle("active");
    });
  }, [review, id]);

  

  const [orderedProduct, setOrderedProduct] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [fixbotModal, setFixbotModal] = useState(false);

  const ratingChanged = (newRating) =>{
    setForm({...form, rating: newRating});
  };

  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(createReview({prodId: id, review: {...form, date: new Date()}}));
  };

  useEffect(() => {
    if(review === "AlreadyExist"){
      Swal.fire({
        icon: "info",
        title: "Ups",
        text: "Remember Only 1 Review is allowed",
        showConfirmButton: true,
        confirmButtonText: "Got it!",
        showCancelButton: false
      }).then(result => {
        if(result.isConfirmed){
          dispatch(resetProductState());
        }
      })
    };
    if(review){
      if(review.name){
      setIsSubmitted(true);
      setTimeout(()=>{
        setIsSent(true);
      }, 3000)

      setTimeout(()=>{
        setIsSent(false);
        setIsSubmitted(false);
        dispatch(resetProductState());
        setForm(initialForm);
      }, 6000)
    }
  }
  }, [isError, isSuccess, isLoading]);

  let youMayLikeLimit = 0;


  return ( 
    <div>
      <Breadcrumb title={"Single Product"}/>
      <HelmetMeta title={"Single Product"}/>
      <div className="single-product-wrapper py-5">
    
        <div className="single-product-card position-relative py-5">
          <div className="container-xxl">
            <div className="row bg-white">
              <div className="col-6">
                <SingleProductTemplateImages/>
              </div> {/*End of first col-6*/}
              
              <div className="col-6">
                <SingleProductDetailsTemplate setFixbotModal={setFixbotModal}/>
                <div className={`fix-bot-buy-btn me-5 w-35 position-absolute d-flex align-items-center ${fixbotModal && "active"}`} style={{gap:50, cursor:"pointer"}} onClick={()=> setFixbotModal(false)}>
                  <div className="w-30">
                    <img src="/images/repair-robot.svg" alt="abc" />
                  </div>
                  <div className="w-70 d-flex flex-column gap-30 px-2">
                    <span>Shopify FixBot</span>
                    <span style={{fontWeight:100}}>This functionality is currently being updated, forgive us for the inconvenience.</span>
                    <span style={{fontWeight:100}}>Shopify wants to give you the best experience possible!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="description-wrapper py-5">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <div className='radius bg-white p-4'>
                <h4 className='section-heading'>Description</h4>
                  <p dangerouslySetInnerHTML={{__html: product && product.description}}></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section className="reviews-wrapper py-5">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <div className="review-inner-wrapper p-4">
                  <div className="review-head d-flex justify-content-between align-items-end">
                    <div>
                      <h4>Customer Reviews</h4>
                      <div className='d-flex gap-10'>
                        {!reviewPromedy && <ReactStars
                          className="customer-rating"
                          count={5}
                          size={16}
                          isHalf={true}
                          value={5} 
                          edit={false}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"/>}
                        {reviewPromedy && <ReactStars
                          className="customer-rating"
                          count={5}
                          size={16}
                          isHalf={true}
                          value={(reviewPromedy / product.reviews.length)} 
                          edit={false}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"/>}
                          <p style={{color: "#777777"}} className='mb-0'>
                            {product && product.reviews.length ? (product.reviews.length ===  1 ? `Based on ${product.reviews.length} review` : `Based on ${product.reviews.length} reviews`) : "Based on Shopify review"}
                          </p>
                        </div>
                    </div>
                    {orderedProduct && 
                    <div>
                      <p className='write-review review-title text-decoration-underline'>Write a Review</p>
                    </div>  
                    }
                  </div>

                  {/* REVIEW FORM */}
                  <div className="review-form mt-4">
                    <h5 className='review-title'>Write Your Review</h5>
                    <form className='d-flex flex-column gap-20 mt-4 review-form-submit' onSubmit={handleSubmit}>
                      <div>
                        <h6>Name</h6>
                        <input type="text" name='name' className='form-control' placeholder='Enter your name' onChange={handleChange} value={form.name} required/>
                      </div>                      
                      <div>
                        <h6>Email</h6>
                        <input type="email" name='email' className='form-control' placeholder='youremail@example.com' onChange={handleChange} value={form.email} required/>
                      </div>   
                      <div className='review-rating'>
                        <h6>Rating</h6>
                        <ReactStars
                            required
                            count={5}
                            onChange={ratingChanged}
                            size={16}
                            isHalf={true}
                            value={form.rating ? form.rating : 0} 
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                          />
                      </div>                  
                      <div>
                        <h6>Review Title</h6>
                        <input type="text" name='reviewTitle' className='form-control' placeholder='Give your review a title' onChange={handleChange} value={form.reviewTitle} required/>
                      </div>                      
                      <div>
                        <h6>Body of Review (1500)</h6>
                        <textarea name="review" cols="30" rows="10" className='form-control' placeholder='Write your comments here' onChange={handleChange} value={form.review} required></textarea>
                      </div>                      
                    <div className='d-flex justify-content-end'>
                      <button type='submit' className='submit-review py-1 px-3'><i className="fa-solid fa-envelope"></i></button>
                    </div>
                    </form>
                    <div>
                      {/* CHECK ICON */}
                      {isSubmitted && <div className='d-flex justify-content-center mb-3'>
                        <label htmlFor="" className={`label-check-icon ${isSent && "sent"}`}>
                          <div className={`check-icon ${isSent && "sent"}`}></div>
                        </label>
                      </div>}
                    </div>
                  </div>

                  {/* USERS REVIEWS */}
                  <div className="user-reviews">
                    {product && product.reviews.length === 0 && <UserReviews
                      user="Shopify"
                      rating={5}
                      review={"Every single product in Shopify is great!"}
                      reviewTitle={"Amazing!"}
                      date={new Date()}
                    />}
                    {product && product.reviews.map(el => <UserReviews
                      user={el.name}
                      rating={el.rating}
                      review={el.review}
                      reviewTitle={el.reviewTitle}
                      date={el.date}
                    />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* YOU MAY ALSO LIKE */}
        <section className="you-may-like py-5">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <h3 className="section-heading title mb-3">You May Also Like</h3>
              </div>
            </div>
            <div className="row gap-20 w-100">
                {product && products.length && products.map(el => {
                  if((el.brand === product.brand || el.category === product.category || el.type === product.type) && el._id !== id){
                      youMayLikeLimit++;
                      if(youMayLikeLimit < 4){
                        return <YouMayLike
                        prodId={el._id}
                        img={el.images[0].url}
                        img2={el.images[1].url}
                        img3={el.images[2].url}
                        brand={el.brand}
                        color={el.color}
                        size={el.size}
                        title={el.title}
                        tags={el.tags}
                        rate={el.totalRating}
                        price={el.price}
                      /> 
                      }
                    }
                })}
            </div>
          </div>
        </section>

      </div>
    </div>
   );
}
 
export default SingleProduct;


