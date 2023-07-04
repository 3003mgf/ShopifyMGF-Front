import React, {useContext, useEffect, useState} from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {BiSearchAlt} from "react-icons/bi"
import {BsFillTelephoneForwardFill} from "react-icons/bs"
import {MdDiscount} from "react-icons/md"
import {AiTwotoneShopping} from "react-icons/ai"
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../features/user/userSlice';
import {VPContext} from "../context/viewProductContext";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';


const Header = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const userState = state.user;
  const { userCart } = state.user;
  const { products } = state.products;


  const data = useContext(VPContext);
  const {totalLength, setTotalLength, totalAmount, setTotalAmount} = data;

  const isLocalStorage = localStorage.getItem("customer");
  const [paginate, setPaginate] = useState(true);
  const [paginateOpt, setPaginateOpt] = useState([]);
  const [paginateValue, setPaginateValue] = useState("");

  const handleLogout = (e) =>{
    localStorage.removeItem("customer");
    setTotalLength(0);
    setTotalAmount(0);
    setTimeout(()=>{
      navigate("/login");
    },200)
  };

  useEffect(() => {
    let boxy = 0;
    if(userCart.length){
      userCart.map(el => boxy += (el.productId.tags.includes("#Special") ? (el.productId.price - (el.productId.price * 0.30)) * el.quantity : el.productId.price * el.quantity));
    };
    setTotalAmount(boxy);

    setTotalLength(userCart.length);
  }, [userCart]);

  useEffect(() => {
    let data = [];
    for(let i = 0; i < products.length; i++){
      const el = products[i];
      data.push({id: i, prod: el?._id, name: el?.title})
    }
    setPaginateOpt(data);
  }, [products]);

  useEffect(() => {

    document.querySelector(".compare-link-p").addEventListener("pointerover", e=>{
      document.querySelector(".compare-svg").classList.add("fa-spin");
    })

    document.querySelector(".compare-link-p").addEventListener("pointerleave", e=>{
      document.querySelector(".compare-svg").classList.remove("fa-spin");
    })

    document.querySelector(".login-link-p").addEventListener("pointerover", e=>{
      document.querySelector(".login-svg").classList.add("fa-bounce");
    })

    document.querySelector(".login-link-p").addEventListener("pointerleave", e=>{
      document.querySelector(".login-svg").classList.remove("fa-bounce");
    })

    document.querySelector(".favorites-link-p").addEventListener("pointerover", e=>{
      document.querySelector(".heart-svg").style.color = "#cf5656";
      document.querySelector(".heart-svg").classList.add("fa-beat");
    })

    document.querySelector(".favorites-link-p").addEventListener("pointerleave", e=>{
      document.querySelector(".heart-svg").style = null;
      document.querySelector(".heart-svg").classList.remove("fa-beat");
    })
  }, []); 

  useEffect(() => {
    if(isLocalStorage){
      dispatch(getCart());
    }
  }, [isLocalStorage]);
  
  const navigate = useNavigate();

  const validateLogin = () =>{
    const isLogged = localStorage.getItem("customer") ? true : false;

    if(!isLogged){
      toast.info(<div><p>Please Login to continue</p><button className='login-toast-btn' onClick={()=>navigate("/login")}>Go to Login</button></div>, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  useEffect(() => {
    if(paginateValue && paginateValue !== undefined){
      navigate(`/product/${paginateValue}`)
    }
  }, [paginateValue]);
  return ( 
    <div>
      <header className='header-top-strip py-3'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className='text-white mb-0 free-shipping'>Free Shipping Over $2000 & Free Returns! <MdDiscount className='ms-1'/></p>
            </div>
            <div className="col-6">
            <p className='text-end text-white mb-0'>
                Customer Service <BsFillTelephoneForwardFill className='ms-1'/> <a className='ms-2 phone' href="tel:+5493814232000">+54 9 381 4232000</a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper">
        <div className="container-xxl">
          <div className="row d-flex justify-content-center align-items-center py-4">
            
            {/* Title */}
            <div className="col-2">
              <h2>
                <Link className='text-white d-flex align-items-center'>Shopify <AiTwotoneShopping className='ms-1'/></Link>
              </h2>
            </div>

            {/* NavBar */}
            <div className="col-5">
            <div className="input-group">
              <Typeahead
                id="pagination-example"
                onPaginate={() => console.log('Results paginated')}
                onChange={(e)=> setPaginateValue(e[0]?.prod)}
                options={paginateOpt}
                paginate={paginate}
                labelKey={"name"}
                placeholder="Search Product..."
              />
              <span 
              className="input-group-text p-3" 
              id="basic-addon2">
              {<BiSearchAlt className='fs-5'/>}
              </span>
            </div>
            </div>

            {/* Links */}
            <div className="col-5">
            <div className="header-upper-links d-flex align-items-center justify-content-between">
           {/* Start 4 divs */}
            <div>
              <Link to="compare-products" className='d-flex align-items-center justify-content-center gap-10 text-white'>
              <i className="fa-solid fa-rotate fa-2xl compare-svg"></i>
                <p className='compare-link-p mt-3'>
                  Compare
                </p>
              </Link>
            </div>
            
            <div>
              <Link exact to="wishlist" className='d-flex align-items-center justify-content-center gap-10 text-white'>
               <i className="fa-solid fa-heart heart-svg fa-2xl"></i>
                <p className="favorites-link-p mt-3">
                  Wishlist
                </p>
              </Link>
            </div>
            
            <div>
                <div className={`dropdown d-flex align-items-center justify-content-center gap-10 text-white position-relative ${localStorage.getItem("customer") ? "d-block" : "d-none"}`}>
                    <i className="fa-solid fa-user fa-2xl login-svg"></i>
                    <button className="btn btn-secondary bg-transparent border-0 dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">My Account</button>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item text-white" exact to="my-account">My Profile</Link></li>
                    <li><Link className="dropdown-item text-white" onClick={handleLogout}>Logout</Link></li>
                  </ul>
                </div>
                
                <Link exact to="login" className={`d-flex align-items-center justify-content-center gap-10 text-white ${localStorage.getItem("customer") ? "d-none" : "d-block"}`}>
                  <i className="fa-solid fa-user fa-2xl login-svg"></i>
                  <p className='login-link-p mt-3'>
                    Login
                  </p>
                </Link>
            </div>
            
            <div>
              <Link exact to="cart" className='d-flex align-items-center gap-10 text-white'>
                <img src="/images/cart.svg" alt="cart" />
                <div className="d-flex flex-column gap-10">
                  <span className="badge bg-white text-dark ">{totalLength ? totalLength : "0"}</span>
                <p className='mb-0'>$ {totalAmount}</p>
                </div>
              </Link>
            </div>
            {/* End 4 divs */}
            </div>
            </div>

          </div> {/*End of Row Div*/}
        </div> {/*End of Container Div*/}
      </header>

      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30"> {/*With the gap we make the spaces between the dropdown and links*/}

                {/* DROPDOWN */}
                <div>
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="/images/menu.svg" alt="menu"/> <span className='me-5 d-inline-block'>Shop Categories</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item text-white" exact to="">Action</Link></li>
                      <li><Link className="dropdown-item text-white" exact to="">Another action</Link></li>
                      <li><Link className="dropdown-item text-white" exact to="">Something else here</Link></li>
                    </ul>
                  </div>
                </div>

                {/* LINKS */}
                <div className="menu-links d-flex align-items-center gap-15">
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="store">Our Store</NavLink>
                  <NavLink to="blogs">Blogs</NavLink>
                  <NavLink to="contact">Contact</NavLink>
                </div>

              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
   );
}
 
export default Header;