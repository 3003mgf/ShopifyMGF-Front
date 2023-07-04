import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeWrapper2 from "../utils/homeWrapper2";
import HomeWrapper1 from "../utils/homeWrapper1";
import HomeWrapper3 from "../utils/homewrapper3";
import Marquee from "react-fast-marquee";
import BlogTemplate from "../utils/blogTemplate";
import { BiSupport } from "react-icons/bi";
import { TbDiscountCheckFilled } from "react-icons/tb";
import ProductTemplate from "../utils/ftProductsTemplate";
import SpecialProduct from "../utils/specialProduct";
import FamousProduct from "../utils/famousProducts";
import HelmetMeta from "../components/Helmet";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getWishlist } from "../features/products/productsSlice";
import YouMayLike from "../utils/youmaylike";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { VPContext } from "../context/viewProductContext";
import { ViewProduct2 } from '../utils/viewProduct2';


const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  let number = 0;
  let popularProducts = 0;

  
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllBlogs());
    dispatch(getWishlist());
  }, []);
  
  const { products } = state.products;
  const { blogs } = state.blogs;

  return (
    <div>
      <HelmetMeta title="Home"/>
      {/* HOME WRAPPER 1 */}
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            {/* MAIN CONTENT */}
            <div className="col-6">
              <div className="main-banner position-relative">
                <img
                  src="/images/main-banner-1.jpg"
                  alt="main-banner"
                  className="img-fluid rounded-3"
                />

                <div className="main-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>From $999.00 or $41.62/month</p>
                  <Link to="/product/6477a3800dfd2e4f34b41e11" className="main-banner-content-link">BUY NOW</Link>
                </div>
              </div>
            </div>

            {/* FLEX-WRAP PRODUCTS */}
            <div className="col-6">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-10">
                <HomeWrapper1
                  id="64779d250dfd2e4f34b41d47"
                  img="/images/catbanner-01.jpg"
                  title="BEST SELLER"
                  subtitle="Macbook Air"
                  p={{ p1: "From 1400.00", p2: "or $64.62/month" }}
                />
                <HomeWrapper1
                  id="6477a1200dfd2e4f34b41db0"
                  img="/images/catbanner-02.jpg"
                  title="NEW ARRIVAL"
                  subtitle="Smartwatch 7"
                  p={{ p1: "Shop the latest band", p2: "styles and colors" }}
                />
                <HomeWrapper1
                  id="64779f850dfd2e4f34b41d77"
                  img="/images/catbanner-03.jpg"
                  title="25% OFF"
                  subtitle="Ipad Air"
                  p={{ p1: "From $999.00", p2: "or $49.52/month " }}
                />
                <HomeWrapper1
                  id="64751116ffe2981116609349"
                  img="/images/catbanner-04.jpg"
                  title="FREE ENGRAVING"
                  subtitle="AirPods Max"
                  p={{
                    p1: "High-fidelity playback",
                    p2: " & ultra-low distortion",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOME WRAPPER 2 SERVICES*/}
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            {/*  COL-12 */}
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <HomeWrapper2
                  image="fa-solid fa-xl fa-truck-fast"
                  h6="Free Shipping"
                  p="For all orders over $1000"
                />
                <HomeWrapper2
                  image="fa-solid fa-gift fa-xl fa-shake"
                  h6="Daily Surprise Offers"
                  p="Save up to 40%!"
                />
                <HomeWrapper2
                  ri={<BiSupport className="ri" />}
                  h6="Live Support 24/7"
                  p="Shop with an Expert"
                />
                <HomeWrapper2
                  ri={<TbDiscountCheckFilled className="ri" />}
                  h6="Affordable Prices"
                  p="Get Factory direct prices"
                />
                <HomeWrapper2
                  image="fa-solid fa-credit-card fa-xl fa-flip"
                  h6="Secure Payments"
                  p="100% Protected Payments"
                />
              </div>
            </div>
            {/* END COL-12 */}
          </div>
        </div>
      </section>

      {/* HOME WRAPPER 3 - CATEGORIES */}
      <section className="home-wrapper-3 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Categories</h3>
              <div className="categories d-flex flex-wrap justify-content-between align-items-center">
                <HomeWrapper3
                  img="/images/health.svg"
                  title="Health Care"
                  p="10 Items"
                />
                <HomeWrapper3
                  img="/images/speaker.svg"
                  title="Speaker"
                  p="10 Items"
                />
                <HomeWrapper3
                  img="/images/laptop.svg"
                  title="Laptops"
                  p="10 Items"
                />
                <HomeWrapper3
                  img="/images/headphone.svg"
                  title="Headphones"
                  p="10 Items"
                />

                <HomeWrapper3
                  img="/images/school.svg"
                  title="School"
                  p="10 Items"
                />
                <HomeWrapper3
                  img="/images/music.svg"
                  title="Music"
                  p="10 Items"
                />
                <HomeWrapper3
                  img="/images/sport.svg"
                  title="Sport"
                  p="10 Items"
                />
                <HomeWrapper3
                  img="/images/cinema.svg"
                  title="Cinema"
                  p="10 Items"
                />

                <HomeWrapper3
                  img="/images/games.svg"
                  title="Games"
                  p="10 Items"
                />
                <HomeWrapper3
                  img="/images/food.svg"
                  title="Food"
                  p="10 Items"
                />
                <HomeWrapper3
                  img="/images/travel.svg"
                  title="Travel"
                  p="10 Items"
                />
                <HomeWrapper3
                  img="/images/cameras.svg"
                  title="Cameras"
                  p="10 Items"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="product-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Featured Products</h3>
            </div>
            <div className="d-flex gap-10 justify-content-center">
              {products && products.map((el, index) => {
                if(el.tags.includes("#Featured")){
                  number += 1;
                  if(number < 5){
                  return (
                  <YouMayLike
                    prodId={el._id}
                    img={el.images[0].url}
                    img2={el.images[1].url}
                    brand={el.brand}
                    title={el.title}
                    rate={el.totalRating}
                    price={el.price}
                  />)
                  }
                }
              })}
            </div>
          </div>
        </div>
      </section>

      
      {/* FAMOUS PRODUCTS */}
      <section className="famous-wrapper">
        <div className="container-xxl">
          <div className="row">
            <FamousProduct img="images/famous-watch.webp" brand="BIG SCREEN" title="Apple Watch S7" details="From $399 or $16.62/month"/>
            <FamousProduct img="images/famous-laptop.webp" brand="STUDIO DISPLAY" title="Macbook Air" details="27-inch 5k Retina display" dark={true}/>
            <FamousProduct img="images/famous-iphone.webp" brand="SMARTPHONES" title="Iphone 13 Pro" details="Now in Green. From $999.00" dark={true}/>
            <FamousProduct img="images/famous-alexa.webp" brand="HOME SPEAKERS" title="Room-filling sound" details="From $699 or $116.58/month" dark={true}/>
          </div>
        </div>
      </section>


      {/* SPECIAL PRODUCTS */}
      <section className="special-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
            <div className="row">
              {products.length && products.map(el => {
                if(el.tags.includes("#Special")){
                  return (
                  <SpecialProduct
                    prodId={el._id}
                    img={el.images[0].url}
                    brand={el.brand}
                    title={el.title}
                    price={el.price}
                    discount="30%"
                    sold={el.sold}
                    quantity={el.quantity}
                    rate={el.totalRating}
                  />)
                }
              })}
              
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="popular-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>

            <div className="d-flex gap-20 justify-content-start">
              {products.length && products.map(el => {
                if(el.tags.includes("#Popular")){
                  popularProducts += 1;
                  if(popularProducts < 5){
                  return (
                  <YouMayLike
                    prodId={el._id}
                    img={el.images[0].url}
                    img2={el.images[1].url}
                    title={el.title}
                    brand={el.brand}
                    price={el.price}
                  />
                  )
                  }
                }
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marque-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex marquee-element">
                  <div className="mx-4 w-25">
                    <a
                      href="https://www.mcdonalds.com/us/es-us.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="images/brand-01.svg"
                        alt="brand"
                        className="sponsor"
                      />
                    </a>
                  </div>
                  <div className="mx-4 w-25">
                    <a
                      href="https://apple.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="images/brand-02.svg"
                        alt="brand"
                        className="sponsor"
                      />
                    </a>
                  </div>
                  <div className="mx-4 w-25">
                    <a
                      href="http://google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="images/brand-03.svg"
                        alt="brand"
                        className="sponsor"
                      />
                    </a>
                  </div>
                  <div className="mx-4 w-25">
                    <a
                      href="http://heineken.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="images/brand-04.svg"
                        alt="brand"
                        className="sponsor"
                      />
                    </a>
                  </div>
                  <div className="mx-4 w-25">
                    <a
                      href="http://airbnb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="images/brand-05.svg"
                        alt="brand"
                        className="sponsor"
                      />
                    </a>
                  </div>
                  <div className="mx-4 w-25">
                    <a
                      href="http://ethereum.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="images/brand-06.svg"
                        alt="brand"
                        className="sponsor"
                      />
                    </a>
                  </div>
                  <div className="mx-4 w-25">
                    <a
                      href="http://ferrari.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="images/brand-07.svg"
                        alt="brand"
                        className="sponsor"
                      />
                    </a>
                  </div>
                  <div className="mx-4 w-25">
                    <a
                      href="http://redbull.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="images/brand-08.svg"
                        alt="brand"
                        className="sponsor"
                      />
                    </a>
                  </div>
                  <div className="mx-4 w-25">
                    <a
                      href="http://nike.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="images/brand-09.svg"
                        alt="brand"
                        className="sponsor"
                      />
                    </a>
                  </div>
                  <div className="mx-4 w-25">
                    <a
                      href="http://chanel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="images/brand-10.svg"
                        alt="brand"
                        className="sponsor"
                      />
                    </a>
                  </div>
                  <div className="mx-4 w-25">
                    <a
                      href="http://thenorthface.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="images/brand-11.svg"
                        alt="brand"
                        className="sponsor"
                      />
                    </a>
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section className="blog-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Latest News</h3>
            </div>
            {blogs && blogs.map((el, index) => {
              if(index < 4){
                return <BlogTemplate
                id={el._id}
                img={el.images[0].url}
                title={el.title}
                description={el.description}
                date={el.createdAt}
                />
              }
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
