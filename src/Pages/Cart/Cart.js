import React from "react";
import { useSelector } from "react-redux";
import "./Cart.scss";
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state.shop);

  return (
    <div className="cart-page">
      <div className="cart-wrapper">
        <div className="cart-items">
          {cart &&
            cart.map((item, i) => {
              return (
                <div className="cart-item" key={i}>
                  <div className="cart-item__img-box">
                    <img
                      className="cart-item__img"
                      src={item.thumbnail}
                      alt="thumbnail"
                    />
                  </div>
                  <div className="cart-item__content">
                    <p className="cart-item__price">{item.title}</p>
                    <p>N{item.price}</p>
                  </div>
                  <div className="cart-item__actions">
                    <p>
                      <button>
                        <FaMinus />
                      </button>
                    </p>
                    <p>
                      <button>
                        <FaRegTrashAlt />
                      </button>
                    </p>
                    <p>
                      <button>
                        <FaPlus />
                      </button>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        <div>
          <Link to="/checkout" className="link">
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
