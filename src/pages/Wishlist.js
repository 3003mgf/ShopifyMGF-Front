import React, { useEffect } from 'react';
import HelmetMeta from '../components/Helmet';
import Breadcrumb from '../components/Breadcrumb';
import WishlistTemplate from '../utils/wishlist';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist } from '../features/user/userSlice';

const WishList = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    dispatch(getWishlist());
  }, []);

  const { userWishlist } = state.user;

  return ( 
    <div>
      <HelmetMeta title={"WishList"}/>
      <Breadcrumb title={"WishList"}/>
      <div className="wishlist-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className='d-flex flex-wrap gap-30 justify-content-center align-items-center'>
            {!userWishlist.length && (
                <div className='d-flex flex-column justify-content-center align-items-center gap-30'>
                  <i class="fa-solid fa-inbox fa-2xl" style={{color: "#898b90"}}></i>
                  <p className='no-data py-2 px-3'>No Data</p>
                </div>)}
            {userWishlist.map(el => 
              <WishlistTemplate
              id={el._id}
              img={el.images[0].url}
              brand={el.brand}
              title={el.title}
              price={"$" + el.price}
              />
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default WishList;