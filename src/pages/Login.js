import React, { useContext, useEffect, useState } from 'react';
import HelmetMeta from '../components/Helmet';
import Breadcrumb from '../components/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, resetUserState } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { VPContext } from '../context/viewProductContext';

// GOOGLE BUTTON
const Google = () => {
  const data = useContext(VPContext);
  const {fixbotData, setFixbotData, fixbotModal, setFixbotModal} = data;
  
  return (
      <GoogleLogin
          onSuccess={res => {
            let userData = jwtDecode(res.credential)
            setFixbotData({name: userData.name, email: userData.email});
            setFixbotModal(true);
          }}
          onError={() => {
            
          }}
          type='icon'
          shape='circle'
          text="signin_with"
          useOneTap
        /> 
  )
};

const initialForm = {
  email: "",
  password: ""
};

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state);
  const {isError, isSuccess, isLoading, utilUser, message } = state.user;

  const data = useContext(VPContext);
  const {fixbotData, setFixbotData, fixbotModal, setFixbotModal} = data;

  const [visibleInput, setVisibleInput] = useState(false);
  const [form, setForm] = useState(initialForm);
  
  const [googleShow, setGoogleShow] = useState(true);
  
  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    dispatch(loginUser(form));

  };

  let boxy = 0;

  useEffect(() => {
    if(isSuccess && utilUser){
        setTimeout(()=>{
          dispatch(resetUserState());
          navigate("/");
          window.location.reload();
        },100);
    };
    if(isError && message === "Login error"){
      toast.error('Invalid User', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setTimeout(()=>{
          dispatch(resetUserState());
        },1600);
    };
  }, [isError, isSuccess, isLoading]);

  
  
  return ( 
      <div>
        <Breadcrumb title={"Login"}/>
        <HelmetMeta title={"Login"}/>
        <div className="login-wrapper py-5">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <div className="login-card position-relative">
                  <h3 className='mb-3 text-center login-title'>Login</h3>
                  <form className='login-form d-flex flex-column gap-3 pb-2' onSubmit={handleSubmit}>
                    <div className='d-flex flex-column'>
                      <input className='form-control' type="text" placeholder='Email' name='email' onChange={handleChange} value={form.email} required />
                    </div>
                    <div className='d-flex flex-column position-relative'>
                      <input className='form-control' type={`${visibleInput ? "text" : "password"}`} placeholder='Password' name='password' onChange={handleChange} value={form.password} required />
                      <i onClick={()=> setVisibleInput(false)} className={`fa-solid fa-eye position-absolute see-input ${!visibleInput && "d-none"}`}></i>
                      <i onClick={()=> setVisibleInput(true)} className={`fa-solid fa-eye-slash position-absolute not-see-input ${visibleInput && "d-none"}`}></i>
                    </div>
                    <div>
                      <Link to="/forgot-password" className='mb-5 mt-2 forgot-password-btn'>
                        Forgot Your Password? <i class="fa-solid fa-face-sad-cry"></i>
                      </Link>
                      <div className="d-flex justify-content-center align-items-center gap-50">
                        <button type='submit' className='login-btn' >Login</button>
                        <Link to="/sign-up" className='login-btn' >Sign Up</Link>
                      </div>
                    </div>
                  </form>
                  <div className='google-login-btn position-absolute'>
                      <Google/>
                  </div>

                </div> 
                {/* END LOGIN CARD */}

                  {/* FIXBOT */}
                  <div className={`fix-bot-google me-5 w-35 position-absolute d-flex align-items-center ${fixbotModal && "active"}`} style={{gap:50, cursor:"pointer"}} onClick={()=> setFixbotModal(false)}>
                    <div className="w-30">
                      <img src="/images/notibot2.svg" alt="abc" className='img-fluid' />
                    </div>
                    <div className="w-70 d-flex flex-column gap-30 px-2">
                      <span>Shopify NotiBot</span>
                      <span style={{fontWeight:100}}>Hi <b>{fixbotData.name}</b>! We are currently working on the Google Login and Sign Up functionality.</span>
                      <span style={{fontWeight:100}}>We'll email you to <b>{fixbotData.email}</b> as soon as it is ready!</span>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   );
}
 
export default Login;