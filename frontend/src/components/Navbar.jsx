import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout }        = useAuth();
  const { totalCount }          = useCart();
  const navigate                = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); setOpen(false); };

  const navCls = ({ isActive }) =>
    `text-[11px] tracking-[0.2em] uppercase font-outfit font-medium transition-colors duration-300 ${
      isActive ? 'text-gold' : 'text-dim hover:text-ink'
    }`;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 bg-dark/95 backdrop-blur-xl border-b border-border' : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none select-none">
            <span className="font-playfair text-xl font-medium text-ink tracking-widest">Velvet</span>
            <span className="font-playfair text-xl italic gold-text tracking-widest -mt-1">Vogue</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[['/', 'Home'], ['/men', 'Men'], ['/women', 'Women'], ['/contact', 'Contact']].map(([to, label]) => (
              <NavLink key={to} to={to} className={navCls} end={to === '/'}>{label}</NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-7">
            {user ? (
              <>
                <span className="text-[11px] tracking-widest uppercase text-muted font-outfit">{user.username}</span>
                <button onClick={handleLogout} className="text-[11px] tracking-[0.2em] uppercase text-dim hover:text-gold transition-colors font-outfit">Sign Out</button>
              </>
            ) : (
              <>
                <NavLink to="/login"    className="text-[11px] tracking-[0.2em] uppercase text-dim hover:text-gold transition-colors font-outfit">Sign In</NavLink>
                <NavLink to="/register" className="btn-gold text-[11px] py-2.5 px-5"><span>Join</span></NavLink>
              </>
            )}
            <NavLink to="/cart" className="relative group">
              <svg className="w-5 h-5 text-dim group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-outfit font-semibold text-dark bg-gold">{totalCount}</span>
              )}
            </NavLink>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-dim hover:text-ink transition-colors" onClick={() => setOpen(true)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center transition-all duration-500 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(24px)' }}>
        <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-dim hover:text-ink">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="flex flex-col items-center gap-8">
          {[['/', 'Home'], ['/men', 'Men'], ['/women', 'Women'], ['/contact', 'Contact'], ['/cart', `Cart${totalCount > 0 ? ` (${totalCount})` : ''}`]].map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}
              className="font-playfair text-4xl font-light italic text-ink hover:text-gold transition-colors">
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex gap-6 mt-12">
          {user
            ? <button onClick={handleLogout} className="section-label">Sign Out</button>
            : <>
                <NavLink to="/login"    onClick={() => setOpen(false)} className="section-label hover:text-ink transition-colors">Sign In</NavLink>
                <NavLink to="/register" onClick={() => setOpen(false)} className="btn-gold text-[11px] py-2.5 px-6"><span>Join</span></NavLink>
              </>
          }
        </div>
      </div>
    </>
  );
}
