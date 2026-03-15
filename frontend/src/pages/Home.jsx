import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.getProducts().then(d => setFeatured(d.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <div className="page-enter">

      {/* ── Hero ────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <img src="/images/hero.jpg" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9) 30%, rgba(10,10,10,0.3) 70%, transparent 100%)' }} />

        {/* Floating label */}
        <div className="absolute top-1/3 right-10 md:right-20 hidden md:block">
          <div className="border border-gold/30 px-4 py-2 glass-card">
            <p className="section-label text-[10px]">New Season 2025</p>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-24 w-full">
          <div className="max-w-3xl">
            <p className="section-label mb-6 animate-fade-up">Where Style Meets Soul</p>
            <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-light text-ink leading-[0.92] mb-8 animate-fade-up">
              Dressed<br />
              <span className="italic gold-text">in Vogue</span>
            </h1>
            <p className="text-sm md:text-base font-outfit font-light text-dim max-w-md mb-12 leading-relaxed animate-fade-up">
              Elevated essentials and statement pieces crafted for the discerning wardrobe.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up">
              <Link to="/women" className="btn-gold"><span>Shop Women</span></Link>
              <Link to="/men"   className="btn-outline-gold">Shop Men</Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 right-10 flex flex-col items-center gap-3 hidden md:flex">
            <p className="section-label text-[9px] rotate-90 origin-center mb-4">Scroll</p>
            <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
          </div>
        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 grid grid-cols-3 divide-x divide-border">
          {[['500+', 'Curated Pieces'], ['12K+', 'Happy Clients'], ['24h', 'Express Delivery']].map(([n, l]) => (
            <div key={l} className="flex flex-col items-center gap-1 py-2">
              <span className="font-playfair text-2xl md:text-3xl gold-text">{n}</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted font-outfit">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-28">
        <div className="flex items-end justify-between mb-16">
          <div className="reveal">
            <p className="section-label mb-3">Collections</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-light text-ink">Shop by Category</h2>
          </div>
          <Link to="/men" className="hidden md:block text-[11px] tracking-[0.2em] uppercase text-muted hover:text-gold transition-colors font-outfit reveal">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Men',         sub: 'Jackets · Shirts · Footwear',    path: '/men',   img: 'men.jpeg',       span: false },
            { label: 'Women',       sub: 'Dresses · Blouses · Accessories',path: '/women', img: 'women.jpg',      span: true  },
            { label: 'Accessories', sub: 'Curated Extras',                 path: '/',      img: 'accessories.jpg',span: false },
          ].map(({ label, sub, path, img, span }, i) => (
            <Link key={label} to={path}
              className={`group relative overflow-hidden reveal reveal-delay-${i + 1} ${span ? 'md:row-span-2' : ''}`}
              style={{ aspectRatio: span ? 'auto' : '4/5', minHeight: span ? '100%' : undefined }}>
              <img src={`/images/${img}`} alt={label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: span ? '500px' : '300px' }} />
              <div className="absolute inset-0 transition-colors duration-500"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.75), rgba(10,10,10,0.1))' }} />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] tracking-[0.2em] uppercase text-gold/80 font-outfit mb-1">{sub}</p>
                <div className="flex items-center justify-between">
                  <h3 className="font-playfair text-3xl font-light italic text-ink">{label}</h3>
                  <span className="text-gold text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured products ───────────────────────── */}
      {featured.length > 0 && (
        <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
          className="py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex items-end justify-between mb-16">
              <div className="reveal">
                <p className="section-label mb-3">Handpicked</p>
                <h2 className="font-playfair text-4xl md:text-5xl font-light text-ink">Featured Pieces</h2>
              </div>
              <Link to="/women" className="hidden md:block text-[11px] tracking-[0.2em] uppercase text-muted hover:text-gold transition-colors font-outfit reveal">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
              {featured.map((p, i) => (
                <div key={p.id} className={`reveal reveal-delay-${i + 1}`}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Full-width editorial banner ─────────────── */}
      <section className="relative overflow-hidden py-36 flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img src="/images/men.jpg" alt="" className="w-full h-full object-cover object-top opacity-20" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, var(--bg) 70%)' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 reveal">
          <p className="section-label mb-6">Our Philosophy</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-light text-ink leading-tight mb-8">
            Style is not a luxury.<br />
            <span className="italic shimmer">It's a language.</span>
          </h2>
          <p className="text-sm font-outfit font-light text-dim max-w-md mx-auto leading-relaxed mb-12">
            Every thread, every cut, every detail is chosen with intention. Dress like you mean it.
          </p>
          <Link to="/register" className="btn-outline-gold">Create Your Account</Link>
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }} className="py-20">
        <div className="max-w-xl mx-auto px-6 text-center reveal">
          <p className="section-label mb-4">Stay in the loop</p>
          <h3 className="font-playfair text-3xl font-light text-ink mb-8">Join the Inner Circle</h3>
          <div className="flex gap-0" style={{ borderBottom: '1px solid var(--border)' }}>
            <input type="email" placeholder="Your email address" className="flex-1 py-3.5 bg-transparent text-sm font-outfit text-ink placeholder-muted outline-none" />
            <button className="btn-gold text-[10px] py-2.5 px-6"><span>Subscribe</span></button>
          </div>
        </div>
      </section>
    </div>
  );
}
