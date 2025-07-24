import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, isInCart, onToggleCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.brand} />
      <h4>{product.brand}</h4>
      <p>{product.description}</p>
      <p>{product.price.toLocaleString()}원</p>
      <button onClick={onToggleCart}>{isInCart ? "담김" : "담기"}</button>
    </div>
  );
};

export default ProductCard;
