import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';

const MOCK = [
  { id: '1', name: 'Leather Jacket', price: 250, category: 'men', image_url: 'images/men_jacket.jpg',  description: 'Premium full-grain leather biker jacket',     stock: 12 },
  { id: '2', name: 'Casual Shirt',   price: 50,  category: 'men', image_url: 'images/men_shirt.jpeg', description: 'Relaxed-fit cotton Oxford shirt',             stock: 40 },
  { id: '3', name: 'Stylish Shoes',  price: 120, category: 'men', image_url: 'images/men_shoes.jpg',  description: 'Italian-crafted leather derby shoes',         stock: 25 },
  { id: '4', name: 'Luxury Watch',   price: 300, category: 'men', image_url: 'images/men_watch.jpg',  description: 'Swiss movement sapphire crystal watch',       stock: 8  },
];

export default function Men() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    api.getProducts('men')
      .then(d => setProducts(d?.length > 0 ? d : MOCK))
      .catch(() => { setProducts(MOCK); setError('Showing preview — connect backend for live data.'); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-enter pt-20">

      {/* Hero banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src="/images/men.jpg" alt="Men"
          className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.3) 60%, transparent 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 text-center px-6">
          <p className="section-label mb-3">The Edit</p>
          <h1 className="font-playfair text-5xl md:text-7xl font-light text-ink">
            Men's <span className="italic gold-text">Collection</span>
          </h1>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
        className="sticky top-[60px] z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <p className="text-xs font-outfit text-muted tracking-widest">
            {loading ? '—' : `${products.length} pieces`}
          </p>
          <div className="flex gap-6">
            {['All', 'Jackets', 'Shirts', 'Footwear', 'Accessories'].map((f, i) => (
              <button key={f}
                className="text-[11px] tracking-[0.15em] uppercase font-outfit transition-colors"
                style={{ color: i === 0 ? 'var(--gold)' : 'var(--text-muted)' }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        {error && (
          <div className="mb-8 px-5 py-3 text-xs font-outfit tracking-wide flex items-center gap-3"
            style={{ border: '1px solid var(--gold-d)', background: 'rgba(138,111,46,0.1)', color: 'var(--gold)' }}>
            <span>⚠</span>{error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="skeleton aspect-[3/4] mb-4" />
                <div className="skeleton h-3 w-3/4 mb-2" />
                <div className="skeleton h-3 w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.map((p, i) => (
              <div key={p.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
