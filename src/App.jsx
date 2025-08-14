import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import ProductCard from "./components/ProductCard.jsx";
import CardList from "./components/CardList.jsx";
import CardForm from "./components/CardForm.jsx";

import * as productsMod from "./data/products.js";

import "./App.css";

function normalizeProducts(mod) {
  if (Array.isArray(mod)) return mod;
  if (Array.isArray(mod?.default)) return mod.default;
  if (Array.isArray(mod?.products)) return mod.products;
  return [];
}

// ──────────────────────────────────────────────────────────────
// 상품 목록 페이지
// ──────────────────────────────────────────────────────────────
function ProductListPage({ cartItems, setCartItems, handlePurchase }) {
  const items = normalizeProducts(productsMod);

  const toggleCart = (id) => {
    setCartItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Header cartCount={cartItems.length} onCartClick={handlePurchase} />

      <div className="page">
        <div className="section-title">
          <h1>신발 상품 목록</h1>
          <p>현재 {items.length}개의 상품이 있습니다.</p>
        </div>

        {items.length === 0 && (
          <pre
            style={{
              background: "#f3f4f6",
              border: "1px solid #e5e7eb",
              padding: 12,
              borderRadius: 8,
              fontSize: 12,
              color: "#374151",
              overflowX: "auto",
              marginTop: 8,
            }}
          >
            {`[DEBUG] products module shape:
keys=${Object.keys(productsMod).join(", ")}
default_is_array=${Array.isArray(productsMod?.default)}
products_is_array=${Array.isArray(productsMod?.products)}
raw=${JSON.stringify(productsMod).slice(0, 400)}...`}
          </pre>
        )}

        <div className="grid">
          {items.map((p) => (
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

  useEffect(() => {
    const saved = localStorage.getItem("myCards");
    if (saved) setCards(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("myCards", JSON.stringify(cards));
  }, [cards]);

  const handlePurchase = () => {
    if (cards.length > 0) navigate("/cards");
    else navigate("/cards/new");
  };

  return (
    <div className="app-container">
      <Routes>
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
        <Route
          path="/cards"
          element={
            <CardList cards={cards} onAddNew={() => navigate("/cards/new")} />
          }
        />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
