import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, isInCart, onToggleCart }) {
  const navigate = useNavigate();

  const handlePurchaseClick = () => {
    navigate("/cards");
  };

  return (
    <article className="card">
      <div className="thumb">
        <img src={product.image} alt={product.brand} loading="lazy" />
      </div>
      <div className="body">
        <h4 className="brand">{product.brand}</h4>
        <p className="desc">{product.description}</p>
        <div className="price">{product.price.toLocaleString()}원</div>
        <div className="button-row">
          <button
            className={`pill ${isInCart ? "filled" : "outline"}`}
            onClick={onToggleCart}
          >
            {isInCart ? "담김" : "담기"}
          </button>
          <button className="pill buy" onClick={handlePurchaseClick}>
            구매
          </button>
        </div>
      </div>
    </article>
  );
}
