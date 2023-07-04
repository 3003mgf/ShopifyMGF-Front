import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import HelmetMeta from '../components/Helmet';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordSlice, resetForgotPassToken } from '../features/user/userSlice';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const navigate = useNavigate();

  const { forgotPassToken, isSuccess, isError, isLoading, message } = state.user;

  const handleForgotPassTokenSubmit = (e) =>{
    e.preventDefault();
    dispatch(forgotPasswordSlice({email: e.target.Email.value}));
  };

  useEffect(() => {
    if(isError && message === "Forgot Password - Error"){
      toast.error("The email address you entered does not belong to any account in Shopify", {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setTimeout(()=>{
          dispatch(resetForgotPassToken());
        },1000)
    }
  }, [isSuccess, isError, isLoading]);

  return ( 
    <div>
      <Breadcrumb title={"Forgot Your Password"}/>
      <HelmetMeta title={"Forgot Your Password"}/>
      <div className="forgot-password-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="forgot-password-card position-relative success-forgot-div">
                <div className={`${forgotPassToken ? "d-block" : "d-none"}`}>
                   <i className="fa-solid fa-angle-left position-absolute fa-lg" style={{color:"grey"}} onClick={()=> {navigate("/login") ; dispatch(resetForgotPassToken())}}></i>
                   <h3 className='forgot-title text-center mb-4'>Check your Inbox!</h3>
                   <p className='text-center forgot-p'>Great! You should get an email from us in a couple minutes.</p>
                   <p className='text-center forgot-p'>Please follow the steps in order to get access to your account!</p>
                   <div className='d-flex justify-content-center gap-50 mt-4 pt-4'>
                    <div className='forgot-pass-img-div'>
                      <img src="/images/gmail-icon.svg" alt="abc" onClick={()=> window.open("https://gmail.com", "wOpen", `innerWidth = 700, innerHeight = 700`)} />
                    </div>
                    <div className='forgot-pass-img-div'>
                      <img src="/images/outlook-icon.svg" alt="abc" onClick={()=> window.open("https://outlook.com", "wOpen", `innerWidth = 700, innerHeight = 700`)} />
                    </div>
                   </div>
                </div>
                
                <div className={`${forgotPassToken ? "d-none" : "d-block"}`}>
                  <h3 className='forgot-title text-center mb-3'>Forgot Your Password?</h3>
                  <p className='text-center forgot-p'>We will send you en email to reset your password</p>
                  <form onSubmit={handleForgotPassTokenSubmit}>
                    <div>
                      <input className='form-control' type="email" placeholder='Email' name='Email' required />
                    </div>
                    <div className="forgot-btn mt-4 mb-3">
                      <button type='submit' className='py-2 px-4 link'>Submit</button>
                    </div>
                  </form>
                  <div className="forgot-btn">
                    <Link to="/login" className='py-2 px-4 link-cancel'>Cancel</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default ForgotPassword;