import React from "react";
import "./Header.css";
import cartIcon from "../image/shopping-cart.png"; // 네 장바구니 이미지 경로

export default function Header({ cartCount = 0, onCartClick }) {
  return (
    <header className="header">
      <div className="header-inner">
        {/* 왼쪽 로고 영역 */}
        <div className="logo"></div>

        {/* 장바구니 버튼 */}
        <button className="cart" onClick={onCartClick}>
          <img src={cartIcon} alt="cart" className="cart-img" />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
