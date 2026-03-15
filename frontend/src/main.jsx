import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home     from './pages/Home';
import Men      from './pages/Men';
import Women    from './pages/Women';
import Cart     from './pages/Cart';
import Login    from './pages/Login';
import Register from './pages/Register';
import Contact  from './pages/Contact';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="men"      element={<Men />} />
              <Route path="women"    element={<Women />} />
              <Route path="cart"     element={<Cart />} />
              <Route path="login"    element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="contact"  element={<Contact />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
