import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import HelmetMeta from '../components/Helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetUserRegistered, resetUserState } from '../features/user/userSlice';
import { toast } from 'react-toastify';

const initialForm = {
  userName: "",
  firstName: "",
  mobile: "",
  email: "",
  password: ""
};

const SignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state);
  const { isError, isSuccess, isLoading, userRegistered } = state.user;

  const [form, setForm] = useState(initialForm);
  const [passwordType, setPasswordType] = useState(true);


  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const handleSignUpSubmit = (e) =>{
    e.preventDefault();
    dispatch(registerUser(form));
  };

  useEffect(() => {
    if(isSuccess && userRegistered){
      toast.success('Account Created!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

        setTimeout(()=>{
          navigate("/login");
          dispatch(resetUserRegistered());
        },3000);
    };
    if(isError){
      toast.error('Something went wrong 😟', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        
        dispatch(resetUserRegistered());
        return;
    }
  }, [isError, isSuccess, isLoading]);

 
  return ( 
    <div>
      <Breadcrumb title={"Create Account"}/>
      <HelmetMeta title={"Create Account"}/>
      <div className="sign-up-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="sign-up-card d-flex justify-content-center align-items-center">
                <div className='w-100 sign-up-form-div'>
                  <h3 className='sign-up-title text-center mb-4 py-3 px-5'>Create Account</h3>
                  <form action="" className='sign-up-form d-flex flex-column gap-30 w-100' onSubmit={handleSignUpSubmit}>
                    <div>
                      <input className='form-control pb-3' type="text" placeholder='User Name' name='userName' onChange={handleChange} value={form.userName} required/>
                    </div>

                    <div>
                      <input className='form-control pb-3' type="text" placeholder='First Name' name='firstName' onChange={handleChange} value={form.firstName} required/>
                    </div>

                    <div>
                      <input className='form-control pb-3' type="text" placeholder='Last Name' name='lastName' onChange={handleChange} value={form.lastName} required/>
                    </div>

                    <div>
                      <input className='form-control pb-3' type="number" placeholder='Phone' name='mobile' onChange={handleChange} value={form.mobile} required/>
                    </div>

                    <div>
                      <input className='form-control pb-3' type="email" placeholder='Email' name='email' onChange={handleChange} value={form.email} required/>
                    </div>

                    <div className='position-relative'>
                      <input className='form-control pb-3' type={`${passwordType ? "password" : "text"}`} placeholder='Password' name='password' onChange={handleChange} value={form.password} required/>
                      <div className='see-input-change-p-signup position-absolute'>
                      {passwordType ? <i className="fa-solid fa-eye" onClick={()=> setPasswordType(false)}></i> : <i className="fa-solid fa-eye-slash" onClick={()=> setPasswordType(true)}></i>}
                      </div>
                    </div>
                    
                    <div className='d-flex justify-content-center mt-4 gap-50'>
                      <div className='ud-edit-send-btn2 d-flex justify-content-end mt-3 mb-4'>
                        <button type="submit" className='button-span-edit d-flex justify-content-center align-items-center'><i className="fa-solid fa-circle-check fa-2xl"></i></button>
                      </div>
                      <div className='ud-edit-send-btn2 d-flex justify-content-end mt-3 mb-4'>
                        <button className='button-span-edit d-flex justify-content-center align-items-center'><i className="fa-solid fa-circle-xmark fa-2xl" onClick={()=> navigate("/login")}></i></button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default SignUp;