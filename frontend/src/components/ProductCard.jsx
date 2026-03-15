import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Supports: full https:// URLs, 'images/file.jpg', or bare 'file.jpg'
function imgSrc(url) {
  if (!url) return '/images/sample.jpg';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const file = url.split('/').pop();
  return `/images/${file}`;
}

export default function ProductCard({ product }) {
  const { user }      = useAuth();
  const { addToCart } = useCart();
  const navigate      = useNavigate();
  const [adding, setAdding] = useState(false);
  const [added,  setAdded]  = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = async () => {
    if (!user) { navigate('/login'); return; }
    setAdding(true);
    try {
      await addToCart(product.id);
      setAdded(true);
      setTimeout(() => setAdded(false), 2200);
    } finally { setAdding(false); }
  };

  return (
    <div className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4]" style={{ background: 'var(--s2)' }}>
        <img
          src={imgSrc(product.image_url)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          onError={e => { e.target.src = '/images/sample.jpg'; }}
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,10,0.75), transparent 50%)',
            opacity: hovered ? 1 : 0,
          }} />

        {/* Add to cart — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300"
          style={{ transform: hovered ? 'translateY(0)' : 'translateY(100%)' }}>
          <button
            onClick={handleAdd}
            disabled={adding}
            className="w-full btn-gold text-[10px] py-3 disabled:opacity-60"
          >
            <span>{adding ? 'Adding…' : added ? '✓ Added to Cart' : 'Add to Cart'}</span>
          </button>
        </div>

        {/* Low stock badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-3 left-3 px-2 py-1 text-[9px] font-outfit font-semibold tracking-widest uppercase text-dark bg-gold">
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-playfair text-base font-medium text-ink truncate">{product.name}</h3>
          {product.description && (
            <p className="text-xs text-muted font-outfit font-light mt-0.5 truncate">{product.description}</p>
          )}
        </div>
        <span className="text-sm font-outfit font-medium whitespace-nowrap mt-0.5" style={{ color: 'var(--gold)' }}>
          ${Number(product.price).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
