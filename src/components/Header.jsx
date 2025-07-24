import React from "react";
import "./Header.css";
import cartIcon from "../image/shopping-cart.png";

const Header = ({ cartCount }) => {
  return (
    <div className="header-top">
      <div className="logo"></div>
      <div className="cart-icon">
        <img src={cartIcon} alt="cart" />
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </div>
    </div>
  );
};

export default Header;
