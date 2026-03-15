import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { user }  = useAuth();
  const { items, loading, updateItem, removeItem, subtotal } = useCart();

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="text-center reveal">
        <p className="section-label mb-4">Cart</p>
        <h1 className="font-playfair text-5xl font-light text-ink mb-6">Sign In First</h1>
        <p className="text-sm font-outfit font-light text-muted mb-10 max-w-xs mx-auto">Create an account or sign in to save items to your cart.</p>
        <div className="flex gap-4 justify-center">
          <Link to="/login"    className="btn-gold"><span>Sign In</span></Link>
          <Link to="/register" className="btn-ghost">Join Free</Link>
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <p className="section-label">Loading cart…</p>
    </div>
  );

  if (items.length === 0) return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="text-center reveal">
        <p className="section-label mb-4">Cart</p>
        <h1 className="font-playfair text-5xl font-light text-ink mb-6">Your Cart is Empty</h1>
        <p className="text-sm font-outfit font-light text-muted mb-10 max-w-xs mx-auto">Explore our collections and find something you love.</p>
        <div className="flex gap-4 justify-center">
          <Link to="/women" className="btn-gold"><span>Shop Women</span></Link>
          <Link to="/men"   className="btn-ghost">Shop Men</Link>
        </div>
      </div>
    </div>
  );

  const shipping = 20;
  const total    = subtotal + shipping;

  return (
    <div className="page-enter pt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">

        {/* Header */}
        <div className="mb-14 reveal">
          <p className="section-label mb-3">Review</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-light text-ink">Your Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Items list */}
          <div className="lg:col-span-2">
            {/* Header row */}
            <div className="hidden md:grid grid-cols-12 pb-4 mb-2"
              style={{ borderBottom: '1px solid var(--border)' }}>
              {['Item', 'Qty', 'Price', 'Total'].map((h, i) => (
                <span key={h} className={`text-[10px] tracking-[0.2em] uppercase font-outfit text-muted ${i === 0 ? 'col-span-6' : i === 3 ? 'col-span-2 text-right' : 'col-span-2 text-center'}`}>{h}</span>
              ))}
            </div>

            {items.map(item => (
              <div key={item.id} className="grid grid-cols-12 items-center gap-4 py-7"
                style={{ borderBottom: '1px solid var(--border)' }}>

                {/* Product info */}
                <div className="col-span-12 md:col-span-6 flex items-center gap-5">
                  <div className="w-20 h-24 overflow-hidden flex-shrink-0" style={{ background: 'var(--s2)' }}>
                    <img src={`/images/${item.image_url?.split('/').pop()}`} alt={item.name}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.src = '/images/sample.jpg'; }} />
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg font-medium text-ink">{item.name}</h3>
                    <p className="text-xs font-outfit text-muted capitalize mt-1">{item.category}</p>
                    <button onClick={() => removeItem(item.id)}
                      className="text-[11px] font-outfit text-muted hover:text-red-400 transition-colors mt-3 tracking-widest uppercase">
                      Remove
                    </button>
                  </div>
                </div>

                {/* Qty */}
                <div className="col-span-4 md:col-span-2 flex items-center justify-center">
                  <div className="flex items-center" style={{ border: '1px solid var(--border)' }}>
                    <button onClick={() => item.quantity > 1 ? updateItem(item.id, item.quantity - 1) : removeItem(item.id)}
                      className="w-8 h-8 flex items-center justify-center text-dim hover:text-gold transition-colors font-outfit">−</button>
                    <span className="w-8 text-center text-sm font-outfit text-ink">{item.quantity}</span>
                    <button onClick={() => updateItem(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-dim hover:text-gold transition-colors font-outfit">+</button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-4 md:col-span-2 text-center text-sm font-outfit text-muted">
                  ${Number(item.price).toFixed(2)}
                </div>

                {/* Line total */}
                <div className="col-span-4 md:col-span-2 text-right text-sm font-outfit font-medium text-gold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h2 className="font-playfair text-2xl font-light text-ink mb-8">Order Summary</h2>

              <div className="space-y-4 text-sm font-outfit pb-6 mb-6" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-ink">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span className="text-ink">${shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between font-outfit font-medium text-ink mb-8">
                <span>Total</span>
                <span className="gold-text text-lg">${total.toFixed(2)}</span>
              </div>

              <button className="btn-gold w-full"><span>Proceed to Checkout</span></button>
              <Link to="/women" className="block text-center text-[11px] tracking-[0.2em] uppercase font-outfit text-muted hover:text-gold transition-colors mt-5">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
