import React from "react";
import "./ProductCard.scss";
import { useDispatch } from "react-redux";
import { shopActions } from "../../slices/shopSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const onAddToCart = () => {
    dispatch(shopActions.addToCart(product._id));
  };

  return (
    <div className="product-card">
      <h4 className="product-card__title">{product.title}</h4>
      <div className="product-card__img-box">
        <img
          src={product.thumbnail}
          className="product-card__img"
          alt="product-thumbnail"
        />
      </div>
      <p className="product-card__price">
        <span>N{product.price}</span>
      </p>
      <p>
        <button className="btn" onClick={onAddToCart}>
          Add to cart
        </button>
      </p>
    </div>
  );
};

export default ProductCard;
