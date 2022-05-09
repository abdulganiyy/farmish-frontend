import React, { useState } from "react";
import "./Checkout.scss";
import { useSelector } from "react-redux";
import Axios from "axios";

import { usePaystackPayment } from "react-paystack";

const getTotalPrice = (cart) => {
  return cart.reduce((acc, item) => (acc += item.price), 0);
};

const Checkout = () => {
  const [address, setAddress] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.shop);
  const [config] = useState({
    reference: new Date().getTime().toString(),
    email: currentUser && currentUser.email,
    amount: getTotalPrice(cart) * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
  });

  const handlePaystackSuccessAction = (reference) => {
    console.log(reference);

    Axios.post("http://localhost:6500/api/v1/order/", {
      user: currentUser._id,
      products: cart.map((product) => product._id),
      shippingAddress: address,
      status: "processing",
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePaystackCloseAction = () => {
    console.log(config);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className="checkout-page">
      <div className="checkout-wrapper">
        <form className="checkout-form">
          <div className="checkout-form__group">
            <input
              className="checkout-form__input"
              type="radio"
              defaultChecked
              value="home"
              name="delivery"
            />
            <label className="checkout-form__label">Home Delivery</label>
          </div>
          <div className="checkout-form__group">
            <label className="checkout-form__label">Delivery Address : </label>
            <input
              className="checkout-form__input"
              type="text"
              name="address"
              value={address}
              onChange={onChangeAddress}
            />
          </div>
        </form>
        <div className="checkout-form__group">
          Total Amount : <span>N{getTotalPrice(cart)}</span>
        </div>
        <div>
          <button
            className="btn--pay"
            onClick={() => {
              initializePayment(
                handlePaystackSuccessAction,
                handlePaystackCloseAction
              );
            }}
          >
            Pay
          </button>
          {/* <PaystackButton {...componentProps} /> */}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
