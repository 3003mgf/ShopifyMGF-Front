import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import HelmetMeta from '../components/Helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordSlice } from '../features/user/userSlice';
import { toast } from 'react-toastify';

const initialForm = {
  Password: "",
  ConfirmPassword: ""
};

const ResetPassword = () => {
  const { token } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector(state => state);

  const { resetedPassword, isError, isSuccess, isLoading } = state.user;
  
  const [form, setForm] = useState(initialForm);
  
  const [changePassword1, setChangePassword1] = useState("");

  const [changePassword2, setChangePassword2] = useState("");

  const [passwordType, setPasswordType] = useState(true);

  const [passwordType2, setPasswordType2] = useState(true);

  const [infoModalisOpen, setInfoModalisOpen] = useState(false);


  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  useEffect(() => {
    if(isSuccess && resetedPassword){
      toast.success("Password Updated, you'll be redirected to Login page!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setTimeout(()=>{
          navigate("/login");
        },3100);
    };
    if(isError){
      toast.error("Token Expired, you'll be redirected to Forgot Password page!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setTimeout(()=>{
          navigate("/forgot-password");
        },3100);
    };
  }, [isError, isSuccess, isLoading]);

  const PasswordInfoModal = () =>{
    return(
      <article className={`change-password-info-article`}>
        <div className='change-password-info-div'>
          <i className="fa-solid fa-xmark change-password-info-btn" onClick={()=> setInfoModalisOpen(false)}></i>
         <ul>
          <li>If both password match, the button will be violet! If not, it will be empty.</li>
          <li className='mt-4'>Please remember to create a strong password, we recommend using:
            <ol className='change-password-ol2 mt-3'>
              <li>Special Character - # @ $ &</li>
              <li>At least one uppercase</li>
              <li>Letters combined with numbers</li>
              <li>Not including your UserName on it</li>
            </ol>
          </li>
         </ul>
        </div>
      </article>
    )
  };

  const handleResetPassSubmit = (e) =>{
    e.preventDefault();
    if(changePassword1.length && changePassword2.length && changePassword1 === changePassword2){
      dispatch(resetPasswordSlice({password: changePassword1, token}));
    };
  };

  return ( 
    <div>

      <Breadcrumb title={"Reset Password"}/>
      <HelmetMeta title={"Reset Password"}/>
      <div className="reset-password-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="reset-password-card">
                <h3 className='text-center mb-4 reset-title'>Reset Password</h3>
                <form action="" className='d-flex flex-column gap-20' onSubmit={handleResetPassSubmit}>
                  <div className='form-floating ud-password position-relative'>
                    <input type={`${passwordType ? "password" : "text"}`} className='form-control' onChange={(e)=> setChangePassword1(e.target.value)} value={changePassword1} />
                    <label htmlFor="">New Password</label>
                    <div className='see-input-change-p position-absolute'>
                      {passwordType ? <i className="fa-solid fa-eye" onClick={()=> setPasswordType(false)}></i> : <i className="fa-solid fa-eye-slash" onClick={()=> setPasswordType(true)}></i>}
                    </div>
                  </div>
                  <div className='form-floating ud-password position-relative'>
                    <input type={`${passwordType2 ? "password" : "text"}`} className='form-control' onChange={(e)=> setChangePassword2(e.target.value)} value={changePassword2} />
                    <label htmlFor="">Confirm New Password</label>
                    <div className='see-input-change-p position-absolute'>
                      {passwordType2 ? <i className="fa-solid fa-eye" onClick={()=> setPasswordType2(false)}></i> : <i className="fa-solid fa-eye-slash" onClick={()=> setPasswordType2(true)}></i>}
                    </div>
                  </div>
                  <div className='ud-change-password-btn2 mt-4 d-flex justify-content-between align-items-center'>
                    <button type='submit' style={{cursor: (changePassword1.length && changePassword2.length && changePassword1 === changePassword2) ? "pointer" : "not-allowed"}} className={`${changePassword1.length && changePassword2.length && changePassword1 === changePassword2 && "match"}`}>Reset Password</button>
                    <i className="fa-solid fa-circle-info fa-xl" onClick={()=> setInfoModalisOpen(true)} style={{cursor:"pointer", color:"lightgrey"}}></i>
                  </div>
                </form>
                {infoModalisOpen && <PasswordInfoModal/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default ResetPassword;