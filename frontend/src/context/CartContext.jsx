import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      api.getCart()
        .then(setItems)
        .catch(() => setItems([]))
        .finally(() => setLoading(false));
    } else {
      setItems([]);
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) return { requiresLogin: true };
    await api.addToCart({ product_id: productId, quantity });
    api.getCart().then(setItems);
  };

  const updateItem = async (id, quantity) => {
    await api.updateCart(id, { quantity });
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const removeItem = async (id) => {
    await api.removeFromCart(id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const total     = items.reduce((s, i) => s + Number(i.price) * i.quantity, 0);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, loading, total, itemCount, addToCart, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
