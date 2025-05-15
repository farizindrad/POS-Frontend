import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import type { Product } from "./ProductList";
import Cart from "./Cart";
import type { CartItem } from "./Cart";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Transaction: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="flex p-4 gap-4 bg-gray-100 items-start">
      <ProductList products={products} onSelect={addToCart} />
      <Cart items={cart} onClear={clearCart} total={total} />
    </div>
  );
};

export default Transaction;
