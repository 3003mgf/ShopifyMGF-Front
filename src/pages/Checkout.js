import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from '../utils/checkoutProduct';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, emptyCart, getCart } from '../features/user/userSlice';
import { PayPalButtons } from '@paypal/react-paypal-js';
import {Buffer} from "buffer";
import uniqid from "uniqid";
import axios from "axios";


const Checkout = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refNewsBtn = useRef();
  const state = useSelector(state => state);
  const { userCart, orderCreated, user } = state.user;

  const [subtotal, setSubtotal] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(subtotal);

  // INFORMATION PAGE DATA
  const [information, setInformation] = useState({shippingInfo: {country:"United States", firstName:"", lastName:"", address:"", other:"", city:"", state:"", zipCode:""}});

  const handleInformation = (e) =>{
    setInformation({shippingInfo: {...information.shippingInfo, [e.target.name]: e.target.value}})
  }

  const handleNewsAndOffers = () =>{
    refNewsBtn.current.classList.toggle("active");
  };

  // BREADCRUMB PAGE HANDLERS
  const [informationPage, setInformationPage] = useState(true);
  const [shippingPage, setShippingPage] = useState(false);
  const [paymentPage, setPaymentPage] = useState(false);

  const handleInformationSubmit = (e) =>{
    e.preventDefault();
    setInformationPage(false);
    setShippingPage(true);
  };

  const handleShippingPage = (e) =>{
    e.preventDefault();
    setShippingPage(false);
    setPaymentPage(true);
  };

  // BILLING ADDRESS INPUTS
  const [inputChecked, setInputChecked] = useState("check1");
  const [billingAddress, setBillingAddress] = useState({country:"United States", firstName:"", lastName:"", address:"", other:"", city:"", state:"", zipCode:""});

  const handleInputChecked = (e) =>{
    setInputChecked(e.target.name);
  };

  const handleNewBillingAddress = (e) =>{
    setBillingAddress({
      ...billingAddress,
      [e.target.name]: e.target.value
    })
  };


  // ORDER CREATED MODAL
  const [modalOpen, setModalOpen] = useState(false);
  const OrderCreatedModal = () => {
    return ( 
      <article className='order-created-modal-article'>
        <div className='order-created-modal-div d-flex flex-column justify-content-center align-items-center'>
          <i className="fa-solid fa-xmark order-created-modal-btn" onClick={()=> {setModalOpen(false) ; navigate("/home")}} style={{cursor:"pointer"}}></i>
          <div className='oc-img-container'>
            <img src="images/successModal.svg" alt="" />
          </div>
          <div className="oc-text">
            <span>
             <p className='text-center'>Thank you for your order! <i className="fa-solid fa-handshake fa-xl"></i></p>
             <p className='text-center'>We will send to <b>{user.email}</b> the details of your purchase.</p>
             <p>You can go to <b>View My Order</b> and see more details!</p>
            </span>
          </div>
          <div className='oc-bottom position-absolute d-flex align-items-center justify-content-center gap-30'>
            <span onClick={()=> {setModalOpen(false) ; navigate("/")}}>Got it!</span>
            <span onClick={()=> {setModalOpen(false) ; navigate("/my-account")}}>View My Order</span>
          </div>
        </div>
      </article>
     );
  };


  // SHIPPING CHECKBOX
  const [inputCheckbox, setInputCheckbox] = useState({method: "Fast Pass", price: 30});

  
  // UEF

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    let boxy = 0;
    userCart.map(el => boxy += el.productId.tags.includes("#Special") ? (el.productId.price - el.productId.price * 0.30) * el.quantity : el.productId.price * el.quantity);
    setSubtotal(boxy);
  }, [userCart]);

  
  return ( 
    <div>
      <div className="checkout-wrapper position-relative">
        <div className="container-xxl">
          <div className="row">
              <div className="col-7">
                <div className="checkout-left-data">
                  <h3 className="website-name mb-4">
                    Shopify
                    <i class="fa-solid fa-bag-shopping ms-2"></i>
                  </h3>
                  
                  {/* BREADCRUMB */}
                  <div className='checkout-breadcrumb mb-4'>
                  <nav style={{"--bs-breadcrumb-divider": '>'}} aria-label="breadcrumb">
                    <ol className="breadcrumb checking d-flex align-items-center gap-10">
                      <li clasName="breadcrumb-item"><Link to="/cart" className='go-back'>My Cart</Link></li>
                      
                      <i className="fa-solid fa-angle-right fa-xs" style={{color: "rgba(33, 37, 41, 0.75)"}}></i>
                      
                      <li className={`breadcrumb-item ${informationPage && "active"}`} aria-current="page">Information</li>
                      
                      <i className="fa-solid fa-angle-right fa-xs"></i>
                      
                      <li className={`breadcrumb-item ${shippingPage && "active"}`} aria-current="page">Shipping</li>
                      
                      <i className="fa-solid fa-angle-right fa-xs"></i>
                      
                      <li className={`breadcrumb-item ${paymentPage && "active"}`} aria-current="page">Payment</li>
                    </ol>
                  </nav>
                  </div>

                  {/* CONTACT INFORMATION */}
                  {informationPage && 
                  <div className='pb-6'>
                    <h4 className="checkout-title mt-5">Contact Information</h4>
                    <p className="user-details mb-4">
                      <p><i class="fa-solid fa-user-lock me-2"></i>Nacho Gramajo Feijoo</p>
                      <p><i class="fa-solid fa-envelope-open me-2"></i>gramajofeijoonacho@gmail.com</p>
                    </p>
                    <div className='d-flex align-items-center gap-10 mb-5'>
                      <div ref={refNewsBtn} className='email-me' id='email-me' onClick={handleNewsAndOffers}><i className="fa-solid fa-check" style={{color: "white"}}></i></div>
                      <label htmlFor="email-me" style={{color: "#777777"}}>Email me about news and offers!</label>
                    </div> 
                    <h4 className='mb-3'>Shipping Address</h4>
                    
                    <form onSubmit={handleInformationSubmit} className='d-flex gap-15 flex-wrap justify-content-between'>
                      {/* <div className='form-floating mb-1 w-100'>
                        <select name="address-select" id="address-select" className='address-select form-control form-select'>
                          <option value="">Use a new address</option>
                          <option value="">Muñecas 616 7C</option>
                        </select>
                        <label htmlFor="address-select">Saved Addresses</label>
                      </div> */}
                      <div className='form-floating mb-1 w-100 mt-2'>
                        <select name="country" id="address-select" className='address-select form-control form-select' onChange={handleInformation}>
                          <option value="Argentina" disabled>Argentina</option>
                          <option value="United States" selected>United States</option>
                          <option value="Spain" disabled>Spain</option>
                          <option value="Canada" disabled>Canada</option>
                        </select>
                        <label htmlFor="address-select">Country/Region</label>
                      </div>
                      <div className='flex-grow-1'>
                        <input type="text" className="form-control form-input" placeholder='First Name' name='firstName' onChange={handleInformation} value={information.shippingInfo.firstName} required />
                      </div>
                      <div className='flex-grow-1'>
                        <input type="text" className="form-control form-input" placeholder='Last Name' name='lastName' onChange={handleInformation} value={information.shippingInfo.lastName} required />
                      </div>
                      <div className='w-100'>
                        <input type="text" className="form-control form-input" placeholder='Address' name='address' onChange={handleInformation} value={information.shippingInfo.address} required />
                      </div>
                      <div className='w-100'>
                        <input type="text" className="form-control form-input" placeholder='Apartment, suite, etc. (optional)' name='other' onChange={handleInformation} value={information.shippingInfo.other} />
                      </div>
                      <div className='flex-grow-1'>
                        <input type="text" className="form-control form-input" placeholder='City' name='city' onChange={handleInformation} value={information.shippingInfo.city} required />
                      </div>
                      <div className='flex-grow-1 form-floating'>
                        <select name="state" id="state" className='form-control form-select' onChange={handleInformation}>
                          <option value="" selected disabled>--</option>
                          <option value="FL">FL</option>
                          <option value="CA">CA</option>
                          <option value="LA">LA</option>
                          <option value="NY">NY</option>
                        </select>
                        <label htmlFor="state">State</label>
                      </div>
                      <div className='flex-grow-1'>
                        <input type="text" className="form-control form-input" placeholder='Zip Code' name='zipCode' onChange={handleInformation} value={information.shippingInfo.zipCode} required />
                      </div>
                      <div className="checkout-bottom-btn d-flex align-items-center justify-content-between mt-5 w-100">
                        <Link to="/cart">
                          <i class="fa-solid fa-angle-left me-2"></i>
                          Return to Cart
                        </Link>
                        <button type='submit' className='continue-shopping-btn border-0'>Continue to Shipping</button>
                      </div>
                    </form>
                  </div>
                  }

                  {/* SHIPPING */}
                  {shippingPage && 
                  <div>
                    {/* CONTACT & SHIP TO */}
                    <div className='shipping-info-container p-3'>
                      <div className='shipping-info-inner-1 d-flex w-100 position-relative'>
                        <div>
                          <span className='span-1'>Contact</span>
                        </div>
                        <div className='span-2-div'>
                          <span className='span-2'>gramajofeijoonacho@gmail.com</span>
                        </div>
                        <div className='span-3-div position-absolute'>
                          <i className="fa-solid fa-address-card"></i>
                        </div>
                      </div>
                      <div className='shipping-info-inner-2 d-flex w-100 position-relative'>
                        <div>
                          <span className='span-1'>Ship to</span>
                        </div>
                        <div className='span-1-div'>
                          <span className='span-2'>{`${information.shippingInfo.address} ${information.shippingInfo.other}, ${information.shippingInfo.city} ${information.shippingInfo.state} ${information.shippingInfo.zipCode}, ${information.shippingInfo.country}`}</span>
                        </div>
                        <div className='span-3-div position-absolute'>
                          <i className="fa-brands fa-fedex fa-xl"></i>
                        </div>
                      </div>
                    </div>

                    {/* SHIPPING METHOD */}
                    <div className='mt-5'>
                      <h2 className='shipping-method-h2 mb-5'>Shipping Method</h2>
                      <div className='w-100 d-flex align-items-center justify-content-center gap-30'>
                        <div className='w-30'>
                          <img src="/images/fedex-logo.svg" alt="abc" className='img-fluid' width={150} height={150} />
                        </div>
                        <div className="w-70 d-flex flex-column gap-20">
                          <div className='d-flex align-items-center'>
                            <input type="radio" id='radio' name='Standard' checked={inputCheckbox.method === "Standard" ? true : false} onClick={(e)=> setInputCheckbox({method: e.target.name, price: 19.50})} />
                            <label htmlFor="radio" className='ms-2'>Standard &#8674; 4 - 7 Business Days</label>
                          </div>
                          <div className='d-flex align-items-center'>
                            <input type="radio" id='radio' name='Fast Pass' checked={inputCheckbox.method === "Fast Pass" ? true : false} onClick={(e)=> setInputCheckbox({method: e.target.name, price: 30})} />
                            <label htmlFor="radio" className='ms-2'>Fast Pass &#8674; 2 - 4 Business Days</label>
                          </div>
                          <div className='d-flex align-items-center'>
                            <input type="radio" id='radio' name='Shopify Pass' checked={inputCheckbox.method === "Shopify Pass" ? true : false} onClick={(e)=> setInputCheckbox({method: e.target.name, price: 45.75})} />
                            <label htmlFor="radio" className='ms-2'>Shopify Pass &#8674; 1 - 2 Business Days</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="checkout-bottom-btn d-flex align-items-center justify-content-between mt-5 w-100">
                       <Link onClick={()=> {setShippingPage(false) ; setInformationPage(true)}}>
                         <i class="fa-solid fa-angle-left me-2"></i>
                         Return to Information
                       </Link>
                       <button className='continue-shopping-btn border-0' onClick={handleShippingPage}>Continue to Payment</button>
                    </div>
                  </div>}

                  {paymentPage && 
                  <div>

                    <div className='shipping-info-container p-3'>
                      <div className='shipping-info-inner-1 d-flex w-100 position-relative'>
                        <div>
                          <span className='span-1'>Contact</span>
                        </div>
                        <div className='span-2-div'>
                          <span className='span-2'>gramajofeijoonacho@gmail.com</span>
                        </div>
                        <div className='span-3-div position-absolute'>
                          <i className="fa-solid fa-address-card"></i>
                        </div>
                      </div>
                      <div className='shipping-info-inner-2 d-flex w-100 position-relative'>
                        <div>
                          <span className='span-1'>Ship to</span>
                        </div>
                        <div className='span-1-div'>
                          <span className='span-2'>{`${information.shippingInfo.address} ${information.shippingInfo.other}, ${information.shippingInfo.city} ${information.shippingInfo.state} ${information.shippingInfo.zipCode}, ${information.shippingInfo.country}`}</span>
                        </div>
                        <div className='span-3-div position-absolute'>
                          <i class="fa-brands fa-fedex fa-xl"></i>
                        </div>
                      </div>
                      <div className='shipping-info-inner-3 d-flex w-100 position-relative'>
                        <div>
                          <span className='span-1'>Method</span>
                        </div>
                        <div className='span-1-div'>
                          <span className='span-2'><b>{inputCheckbox.method}</b> - ${inputCheckbox.price.toString()}</span>
                        </div>
                        <div className='span-3-div position-absolute'>
                          <i class="fa-solid fa-truck-fast"></i>
                        </div>
                      </div>
                    </div>

                    
                    {/* SELECT BILLING ADDRESS */}
                    <div className='billing-address mt-5'>
                      <div className={`input-radio-container ${inputChecked === "check1" && "checked"} px-4 d-flex align-items-center`}>
                        <input type="radio" id='same-address' name='check1' checked={inputChecked === "check1" ? true : false} className='checkout-ratio' onChange={handleInputChecked}/>
                        <label htmlFor="same-address">Same as shipping address</label>
                      </div>
                      <div className={`input-radio-container ${inputChecked === "check2" && "checked"} px-4 d-flex align-items-center`}>
                        <input type="radio" id='same-address' name='check2' checked={inputChecked === "check2" ? true : false} className='checkout-ratio' onChange={handleInputChecked}/>
                        <label htmlFor="same-address">Use a different billing address</label>
                      </div>
                    </div>

                    {/* NEW BILLING ADDRESS */}
                    <div className={`new-billing-address-container mt-2 ${inputChecked === "check2" ? "d-block" : "d-none"}`}>
                          <form onSubmit={(e)=> e.preventDefault()} className='d-flex gap-15 flex-wrap justify-content-between'>
                            <div className='form-floating mb-1 w-100 mt-2'>
                              <select name="country" id="address-select" className='address-select form-control form-select' onChange={handleNewBillingAddress}>
                                <option value="Argentina" disabled>Argentina</option>
                                <option value="United States" selected>United States</option>
                                <option value="Spain" disabled>Spain</option>
                                <option value="Canada" disabled>Canada</option>
                              </select>
                              <label htmlFor="address-select">Country/Region</label>
                            </div>
                            <div className='flex-grow-1'>
                              <input type="text" className="form-control form-input" placeholder='First Name' name='firstName' onChange={handleNewBillingAddress} value={billingAddress.firstName} required />
                            </div>
                            <div className='flex-grow-1'>
                              <input type="text" className="form-control form-input" placeholder='Last Name' name='lastName' onChange={handleNewBillingAddress} value={billingAddress.lastName} required />
                            </div>
                            <div className='w-100'>
                              <input type="text" className="form-control form-input" placeholder='Address' name='address' onChange={handleNewBillingAddress} value={billingAddress.address} required />
                            </div>
                            <div className='w-100'>
                              <input type="text" className="form-control form-input" placeholder='Apartment, suite, etc. (optional)' name='other' onChange={handleNewBillingAddress} value={billingAddress.other} />
                            </div>
                            <div className='flex-grow-1'>
                              <input type="text" className="form-control form-input" placeholder='City' name='city' onChange={handleNewBillingAddress} value={billingAddress.city} required />
                            </div>
                            <div className='flex-grow-1 form-floating'>
                              <select name="state" id="state" className='form-control form-select' onChange={handleNewBillingAddress}>
                                <option value="" selected disabled>--</option>
                                <option value="FL">FL</option>
                                <option value="CA">CA</option>
                                <option value="LA">LA</option>
                                <option value="NY">NY</option>
                              </select>
                              <label htmlFor="state">State</label>
                            </div>
                            <div className='flex-grow-1'>
                              <input type="text" className="form-control form-input" placeholder='Zip Code' name='zipCode' onChange={handleNewBillingAddress} value={billingAddress.zipCode} required />
                            </div>
                          </form>
                    </div>
                      
                    {/* PAYPAL */}
                    <div className='mt-5 pt-4'>
                      <div className='mb-5'>
                        <p><b>Sandbox Test Account</b></p>
                        <span><i className="fa-solid fa-user-secret me-2"></i>mgfpersonal@gmail.com</span>
                        <br />
                        <span><i className="fa-solid fa-key me-2"></i>12345678</span>
                      </div>
                      <PayPalButtons 
                        style={{layout: "vertical", color:"silver", shape: "pill"}}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                              purchase_units: [
                                  {
                                      amount: {
                                          value: subtotal + inputCheckbox.price,
                                      },
                                  },
                              ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          const orderedItems = [];
                          userCart.forEach(el => (
                            orderedItems.push({
                              product: el.productId._id,
                              color: el.color,
                              quantity: el.quantity,
                              price: el.productId.price
                            })
                          ));

                          let newOrder = {
                            shippingInfo: information.shippingInfo,
                            billingAddress: inputChecked === "check1" ? information.shippingInfo : billingAddress,
                            paymentInfo: {orderId: uniqid()},
                            orderItems: orderedItems,
                            totalPrice: subtotal,
                            shippingMethod: inputCheckbox.method,
                            shippingCost: inputCheckbox.price,
                            totalPriceAfterDiscount: priceAfterDiscount
                          };
                          
                          dispatch(createOrder(newOrder));
                          dispatch(emptyCart());
                          setTimeout(()=>{
                            setModalOpen(true);
                          },1000)
                        }}

                        showSpinner={true}
                      />
                    </div>

                    <div className="checkout-bottom-btn d-flex align-items-center justify-content-between mt-5 w-100">
                       <Link onClick={()=> {setPaymentPage(false) ; setShippingPage(true)}}>
                         <i class="fa-solid fa-angle-left me-2"></i>
                         Return to Shipping
                       </Link>
                    </div>  
                    
                    {modalOpen && <OrderCreatedModal/>}

                  </div>}

                </div>
                <div className='rights position-absolute'>
                  <p>
                    <i class="fa-solid fa-copyright me-2" style={{color: "#febd69"}}></i>
                    All Rights Reserved
                  </p>
                  <p className='ms-4'>SHOPIFY<i class="fa-solid fa-bag-shopping ms-2"></i></p>
                </div>
              </div>

              {/* PRODUCTS & SUBTOTAL */}
              <div className="col-5">
                <div className='checkout-wrapper-2 d-flex flex-column gap-20'>
                  {userCart.length && userCart.map((el, index) => <CheckoutProduct
                    key={index} 
                    title={el.productId.title}
                    img={el.productId.images[0].url}
                    size={el.size}
                    color={el.color}
                    price={el.productId.price}
                    quantity={el.quantity}
                  />)}
                </div>
                {/* SUBTOTAL - SHIPPING */}
                <div className="details d-flex flex-column gap-10 py-4">
                  <div className='details-1 d-flex justify-content-between align-items-center'>
                    <p>Subtotal</p>
                    <p><b>${subtotal}</b></p>
                  </div>
                  <div className='details-2 d-flex justify-content-between align-items-center'>
                    <p>Shipping</p>
                    <p><b>{(shippingPage || paymentPage) ? "$" + inputCheckbox.price : "--"}</b></p>
                  </div>
                </div>
                {/* TOTAL */}
                <div className='total-amount-div d-flex justify-content-between align-items-center'>
                  <p className='total-amount-1'>Total</p>
                  <div className='d-flex justify-content-end align-items-center'>
                    <h5 className='total-amount-2'>USD</h5>
                    <p className='total-amount-3'>${(shippingPage || paymentPage) ? subtotal + inputCheckbox.price : subtotal}</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Checkout;
