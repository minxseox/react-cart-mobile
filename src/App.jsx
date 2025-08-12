import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import ProductCard from "./components/ProductCard.jsx";
import CardList from "./components/CardList.jsx";
import CardForm from "./components/CardForm.jsx";
import products from "./data/products.js";
import "./App.css";

// 상품 목록 페이지
function ProductListPage({ cartItems, setCartItems, handlePurchase }) {
  const toggleCart = (id) => {
    setCartItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* 상품 목록 페이지 전용 헤더 */}
      <Header cartCount={cartItems.length} onCartClick={handlePurchase} />

      <div className="page">
        <div className="section-title">
          <h1>신발 상품 목록</h1>
          <p>현재 {products.length}개의 상품이 있습니다.</p>
        </div>

        <div className="grid">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isInCart={cartItems.includes(p.id)}
              onToggleCart={() => toggleCart(p.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  // 로컬 저장소 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("myCards");
    if (saved) setCards(JSON.parse(saved));
  }, []);

  // 로컬 저장소 저장
  useEffect(() => {
    localStorage.setItem("myCards", JSON.stringify(cards));
  }, [cards]);

  // 구매 버튼 클릭 → 카드목록 or 카드추가 이동
  const handlePurchase = () => {
    if (cards.length > 0) navigate("/cards");
    else navigate("/cards/new");
  };

  return (
    <div className="app-container">
      <Routes>
        {/* 상품 목록 */}
        <Route
          path="/"
          element={
            <ProductListPage
              cartItems={cartItems}
              setCartItems={setCartItems}
              handlePurchase={handlePurchase}
            />
          }
        />

        {/* 카드 목록 (검정 헤더 없이) */}
        <Route
          path="/cards"
          element={
            <CardList cards={cards} onAddNew={() => navigate("/cards/new")} />
          }
        />

        {/* 카드 추가 (검정 헤더 없이) */}
        <Route
          path="/cards/new"
          element={
            <CardForm
              onSave={(card) => {
                setCards((prev) => [card, ...prev]);
                navigate("/cards");
              }}
            />
          }
        />
      </Routes>
    </div>
  );
}
