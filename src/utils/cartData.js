import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteCartItem, getCart, updateCartItem } from "../features/user/userSlice";

const CartData = ({prodId, img, title, color, size, price, quantity}) => {

  const dispatch = useDispatch();
  const [quantityValue, setQuantityValue] = useState(quantity);

  const handleQuantityChange = async(e) =>{
    await setQuantityValue(e.target.value);
    await dispatch(updateCartItem({id: prodId, quantity: e.target.value}))
    await dispatch(getCart()); 
    // UPDATE Y GET CART para no perder los cambios en el redux state.
  }

  const handleDeleteItem = () =>{
    Swal.fire({
      icon: "warning",
      title: "Wait...",
      text: "Are you sure you want to remove this product from your cart?",
      showDenyButton: true,
      denyButtonText: "No",
      denyButtonColor: "#232f3e",
      confirmButtonText: "Yes",
      confirmButtonColor: "#febd69"
    }).then(result => {
      if(result.isConfirmed){
        dispatch(deleteCartItem(prodId));
      }else if(result.isDenied){
        return;
      }
    })
  };

  return (
    <div className="cart-data d-flex justify-content-between align-items-center">
      <div className="cart-col-1 d-flex align-items-center gap-20">
        <div className="w-25">
          <img
            src={img}
            alt="cart-img"
            className="img-fluid"
          />
        </div>
        <div className="w-75 mt-3">
          <div>
            <p className="cart-title">{title}</p>
          </div>
          <div className="d-flex align-items-center">
            <p className="cart-color">Color:</p>
            <ul className="cart-color-ul">
              <li
                className="cart-color-li"
                style={{ backgroundColor: `${color}`}}
                title={color}
              ></li>
            </ul>
          </div>
          <div>
            <p className="cart-size">Size: {size}</p>
          </div>
        </div>
      </div>
      <div className="cart-col-2">
        <h5>$ {price}</h5>
      </div>
      <div className="cart-col-3 d-flex align-items-center gap-15">
        <input 
          type="number" 
          min="1"
          max="10"
          onChange={handleQuantityChange}
          value={quantityValue}
          className="form-control quantity-input"
        />
        <i
          className="fa-solid fa-trash-can fa-large py-2 px-2"
          style={{ color: "white" }}
          onClick={handleDeleteItem}
        ></i>
      </div>
      <div className="cart-col-4">
        <h5>$ {price * quantity}</h5>
      </div>
    </div>
  );
};

export default CartData;
