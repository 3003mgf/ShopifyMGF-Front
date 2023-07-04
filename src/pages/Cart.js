import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import HelmetMeta from '../components/Helmet';
import CartData from '../utils/cartData';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart, getCart } from '../features/user/userSlice';
import Swal from 'sweetalert2';
import { ScrollToTop } from '../components/ScrollTop';


const Cart = () => {

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { userCart } = state.user;

  const handleEmptyCart = () =>{
      Swal.fire({
        icon: "warning",
        title: "Why? 😔",
        text: "Are you sure you want to empty the cart?",
        showDenyButton: true,
        denyButtonText: "No",
        denyButtonColor: "#232f3e",
        confirmButtonText: "Yes",
        confirmButtonColor: "#febd69"
      }).then(result => {
        if(result.isConfirmed){
          dispatch(emptyCart());
          ScrollToTop();
        }else if(result.isDenied){
          return;
        }
      })
  };


  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let boxy = 0;
    if(userCart.length){
      userCart.map(el => boxy += el.productId.tags.includes("#Special") ? (el.productId.price - (el.productId.price * 0.30)) * el.quantity : el.productId.price * el.quantity);
    };

    setSubtotal(boxy);
  }, [userCart]);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return ( 
    <div>
      <Breadcrumb title={"Cart"}/>
      <HelmetMeta title={"Cart"}/>
      <section className="cart-wrapper py-5">
        <div className="container-xxl">
          {userCart.length ? 
            <div className="row">
    
            <div className="col-12">

              {/* CART HEADER */}
              <div className="cart-header d-flex justify-content-between align-items-center">
                <h4 className='cart-col-1'>Product</h4>
                <h4 className='cart-col-2'>Price</h4>
                <h4 className='cart-col-3'>Quantity</h4>
                <h4 className='cart-col-4'>Total</h4>
              </div>

              {/* CART DATA */}
              {userCart.length && userCart.map((el, index) => <CartData
                key={index}
                prodId={el._id}
                img={el.productId.images[0].url}
                title={el.productId.title}
                size={el.size}
                color={el.color}
                price={el.productId.tags.includes("#Special") ? el.productId.price - el.productId.price * 0.30 : el.productId.price}
                quantity={el.quantity}
              />)}
              
    
            </div>
            <div className="col-12 py-2 pb-5 d-flex align-items-center gap-30">
              <Link to="/store" className='continue-shopping py-3 px-4'>Continue Shopping</Link>
              <div className='d-flex ms-3 justify-content-center align-items-center position-relative empty-cart'>
                <img src="images/cart-trash.svg" alt="" className='border-0' onClick={handleEmptyCart}/>
                <p className='empty-cart-p position-absolute mt-3'>Empty Cart</p>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-end">
              {/* <div className='special-instructions'>
                <p>Special Instructions</p>
              </div> */}
              <div className='subtotal d-flex align-items-center gap-30 me-1'>
                <h5>Subtotal</h5>
                <h5>$ {subtotal}</h5>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-end align-items-end flex-column mt-5">
              <div>
                <p className='taxes-and-shipping'>Taxes & Shipping calculated at checkout</p>
              </div>
              <div>
                <Link to="/checkout" className='checkout-btn py-3'>Check Out</Link>
              </div>
            </div>
            
            </div> 
            :
            <div className='d-flex flex-column justify-content-center align-items-center gap-30'>
              <i className="fa-solid fa-face-tired fa-2xl d-block" style={{color: "#c7c7c7"}}></i>
              <p>You don't have products in your cart, yet...</p>
              <div className='d-flex justify-content-center align-items-center px-3 py-1 go-shopping-div'>
                <Link to="/store" className='p-2' style={{color: "white", textDecoration: "none"}}>GO SHOPPING <i class="fa-solid fa-shop" style={{color: "#bd0042"}}></i> </Link>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
   );
}
 
export default Cart;