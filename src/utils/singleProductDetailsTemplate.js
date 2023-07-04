/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactStars from "react-rating-stars-component";
import ColorsSetter from "./colors";
import ShareModal from "../components/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { addToCompare, addToWishlist, getProduct, getWishlist, removeFromCompare, removeFromWishlist } from "../features/products/productsSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../features/user/userSlice";
import { VPContext } from "../context/viewProductContext";


const SingleProductDetailsTemplate = ({setFixbotModal}) => {
  const [modal, setModal] = useState(false);
  const {id} = useParams();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { products, product, wishlist, compare } = state.products;
  const refCartBtn = useRef();
  const refCartP = useRef();
  const refCartSvg = useRef();


  const data = useContext(VPContext);
  const {totalLength, setTotalLength, totalAmount, setTotalAmount} = data;

  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [addCartState, setAddCartState] = useState(false);

  const handleWishlist = async() =>{
    await dispatch(addToWishlist(id));
    await dispatch(getWishlist());
  };

  useEffect(() => {
    if(addCartState){
      refCartP.current.classList.add("text-animation");
      refCartSvg.current.classList.add("cart-animation");
      refCartBtn.current.classList.add("button-animation");
    }else{
      refCartP.current.classList.remove("text-animation");
      refCartSvg.current.classList.remove("cart-animation");
      refCartBtn.current.classList.remove("button-animation");
    }
  }, [addCartState]);
  
  useEffect(() => {
    dispatch(getProduct(id));
  }, []);
  
  const handleAddToCart = async(e) =>{
    if(!color || !size){
      toast.info(<p className="mt-3"><b>Size</b> & <b>Color</b> are required</p>, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }else if(quantity > 10 || quantity <= 0){
      toast.info(<p className="mt-3"><b>Quantity</b> can't exceed 10 or be less than 1</p>, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }else{
      dispatch(addToCart({cartData: {productId: id, color, size, quantity}})); 
      setAddCartState(true);
      setTotalLength(totalLength + 1);
      setTotalAmount(product.tags.includes("#Special") ? totalAmount + (product.price - product.price * 0.30) * quantity : totalAmount + product.price * quantity)
      setTimeout(()=>{
        setAddCartState(false)
      },3000)
      // Si cambiamos la clase de los REF aca, nos sale un error.
    }
  };



  return (
    <div>
      {modal && <ShareModal setModal={setModal}/> }
  
      <div className="main-product-details">
        <h4 className="mpd-title">{product && product.title}</h4>

        <div className="mpd-price py-1">
          {product &&
          <div>
            {product.tags.includes("#Special") ? 
              <div className="d-flex align-items-center gap-10 py-2">
                <span>${product.price - product.price * 0.30}</span>
                <strike style={{color:"#777777", fontSize:"14px"}}>{product.price}</strike>
              </div>
              :
              <p>${product.price}</p>
            }
          </div>
          }
        </div>

        <div className="mpd-rate d-flex align-items-center gap-10 mt-1">
          <ReactStars
            count={5}
            // onChange={ratingChanged}
            size={16}
            isHalf={true}
            value={5}
            edit={false}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
          <p className="single-product-review" style={{color:"#777777", fontSize:"13px"}}> ({product?.reviews?.length} Reviews) </p>
        </div>
        <p className="review-title">Write a review</p>
        <div className="main-product-subdetails">
          <div className="compare-subdetails">
            <h5>Type:</h5>
            <p>{product && product.type}</p>
          </div>
          <div className="compare-subdetails">
            <h5>Brand:</h5>
            <p>{product && product.brand}</p>
          </div>
          <div className="compare-subdetails d-flex align-items-center gap-10">
            <h5>Category:</h5>
            <div className="product-tags-yellow d-flex flex-wrap align-items-center gap-15 mb-2">
              
                <span className="badge bg-light rounded-3 py-2 px-3">{product && product.category}</span>
             
            </div>
          </div>
          <div className="compare-subdetails d-flex align-items-center gap-10">
            <h5>Tags:</h5>
            <div className="product-tags d-flex flex-wrap align-items-center gap-15 mb-2">
              {product && product.tags.map((el) => (
                <span className="badge bg-light rounded-3 py-2 px-3">{el}</span>
              ))}
            </div>
          </div>
          <div className="compare-subdetails">
            <h5>SKU:</h5>
            <p>{product && product.sku}</p>
          </div>
          <div className="compare-subdetails">
            <h5>Availability:</h5>
            <p>{product && product.quantity}</p>
          </div>
          <div className="compare-subdetails">
            <h5>Size:</h5>
            <div className="d-flex gap-10">
              {product && product.size.map(el => (
                  <button onClick={()=> {size === el ? setSize(null) : setSize(el)}} style={{backgroundColor: size === el && "#febd69", color: size === el && "white"}} className="size-btn py-1 px-2">{el}</button>
              ))}
            </div>
          </div>
          <div className="compare-subdetails">
            <h5>Color:</h5>
            <div>
              {product && <ul>{<ColorsSetter setColor={setColor} color={color} bigger={true} colors={product.color} />}</ul>}
            </div>
          </div>
          <div className="single-quantity-div d-flex gap-10 flex-row py-4 align-items-center">
            <h5 className="me-3 single-quantity">Quantity:</h5>
            <div>
              <input
                type="number"
                min="1"
                max="10"
                className="form-control"
                style={{ width: "70px" }}
                onChange={(e)=> setQuantity(e.target.value)}
                value={quantity}
              />
            </div>

            {/* BUTTONS */}
            <div className="single-btn ms-3 w-100 d-flex justify-content-center gap-30">
              <button ref={refCartBtn} className="add-cart-btn position-relative" onClick={handleAddToCart}>
                <img src="/images/shop-cart.svg" alt="cart" className="cart-svg" ref={refCartSvg} />
                <p className="cart-p" ref={refCartP}>Add To Cart</p>
              </button>
              <button style={{cursor:"not-allowed"}} className="buy-now-btn" onClick={()=> setFixbotModal(true)}>Buy Now</button>
            </div>
          </div>
          <div className="d-flex align-items-center gap-15 py-3">
            {/* ADD TO WISHLIST ICON */}
            <div className="me-2">
              {wishlist.find(el => el._id === id) ? 
                <div className="d-flex align-items-center">
                  <i
                    className="fa-solid fa-heart heart-svg me-1"
                    style={{ color: "#e14646" }}
                  ></i>
                  <span className="single-link" style={{cursor:"pointer"}} onClick={handleWishlist}>Remove From WishList</span>
                </div>
                :
                <div className="d-flex align-items-center">
                  <i className="fa-regular fa-heart me-1" ></i>
                  <span className="single-link" style={{cursor:"pointer"}} onClick={handleWishlist}>Add to WishList</span>
                </div>
              }
            </div>

            {/* ADD TO COMPARE ICON */}
            <div>
              {compare.find(el => el._id === id) ? 
                <div className="d-flex align-items-center me-2">
                  <i className="fa-solid fa-shuffle me-1" style={{color:"#0d6efd"}}></i>
                  <span style={{cursor:"pointer"}} className="single-link" onClick={()=> dispatch(removeFromCompare(product && product._id))}>Remove From Compare</span>
                </div>
                :
                <div className="d-flex align-items-center me-2">
                  <i className="fa-solid fa-shuffle me-1"></i>
                  <span style={{cursor:"pointer"}} className="single-link" onClick={()=> dispatch(addToCompare(product && product))}>Add to Compare</span>
                </div>

              }
            </div>

            {/* SHARE ICON */}
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-share-nodes me-1"></i>
              <a href="javascript:void(0);" className="single-link" onClick={()=> setModal(true)}>
                Share
              </a>
            </div>
          </div>

          {/* ACCORDION */}
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <i className="fa-solid fa-truck-fast me-2"></i>Shipping & Returns
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>
                    Free shipping andreturns available on all orders above
                    $1000! <br />
                    We ship all US & Argentina domestic orders within{" "}
                    <b>5-10 business days!</b>
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <i className="fa-solid fa-recycle me-2"></i>Materials
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>
                  The <b>{product && product.title}</b> borrows design elements from the preceding Apple Pro Mouse, notably its seamless 'zero-button' design and translucent acrylic surface.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <i className="fa-solid fa-ruler me-2"></i>Dimensions
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p className="not-available">
                      Not Available
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  <i className="fa-solid fa-square-plus me-2"></i>Care Instructions
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>
                  Don't get moisture in any openings or use aerosol sprays, solvents, abrasives, or cleaners containing hydrogen peroxide. If your Magic Mouse or Magic Mouse 2 isn't tracking properly, there might be a hair or other debris on the sensor lens. Turn the mouse over and inspect the sensor window using a bright light.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*END OF ACCORDION*/}
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetailsTemplate;
