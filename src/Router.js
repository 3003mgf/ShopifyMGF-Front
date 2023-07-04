import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import OurStore from './pages/OurStore';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import CompareProducts from './pages/CompareProducts';
import WishList from './pages/Wishlist';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsAndConditions from './pages/TermAndConditions';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PrivateRoute from './components/PrivateRoute';
import OpenRoute from './components/OpenRoute';
import MyAccount from './pages/MyAccount';



function Router() {

  return ( 
    <div>
      <BrowserRouter>
        <Routes>

          <Route path = "/" element={<Layout />}> {/*Para poder utilizar el Layout*/}

            <Route index element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route exact path="store" element={<PrivateRoute><OurStore/></PrivateRoute>}/>
            <Route exact path="cart" element={<PrivateRoute><Cart/></PrivateRoute>}/>
            <Route exact path="product/:id" element={<PrivateRoute><SingleProduct/></PrivateRoute>}/>
            <Route exact path="contact" element={<PrivateRoute><Contact/></PrivateRoute>}/>
            <Route exact path="blogs" element={<PrivateRoute><Blog/></PrivateRoute>}/>
            <Route exact path="blog/:id" element={<PrivateRoute><SingleBlog/></PrivateRoute>}/>
            <Route exact path="compare-products" element={<PrivateRoute><CompareProducts/></PrivateRoute>}/>
            <Route exact path="wishlist" element={<PrivateRoute><WishList/></PrivateRoute>}/>
            <Route exact path="login" element={<OpenRoute><Login/></OpenRoute>}/>
            <Route exact path="forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
            <Route exact path="sign-up" element={<OpenRoute><SignUp/></OpenRoute>}/>
            <Route exact path="reset-password/:token" element={<OpenRoute><ResetPassword/></OpenRoute>}/>
            <Route exact path="privacy-policy" element={<PrivacyPolicy/>}/>
            <Route exact path="refund-policy" element={<RefundPolicy/>}/>
            <Route exact path="shipping-policy" element={<ShippingPolicy/>}/>
            <Route exact path="terms-and-conditions" element={<TermsAndConditions/>}/>
          
          </Route>
  
          <Route exact path="my-account" element={<PrivateRoute><MyAccount/></PrivateRoute>}/>
          <Route exact path="checkout" element={<Checkout/>}/>

        </Routes>
      </BrowserRouter>
    </div>
   );
}

export default Router;