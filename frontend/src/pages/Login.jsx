import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left — image panel */}
      <div className="hidden md:block relative overflow-hidden">
        <img src="/images/women.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.6), rgba(10,10,10,0.3))' }} />
        <div className="absolute bottom-16 left-12 right-12">
          <p className="section-label mb-4">Welcome Back</p>
          <h2 className="font-playfair text-4xl font-light italic text-ink leading-tight">
            Your wardrobe<br />awaits you.
          </h2>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex items-center justify-center px-8 py-20" style={{ background: 'var(--bg)' }}>
        <div className="w-full max-w-sm page-enter">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none mb-14">
            <span className="font-playfair text-xl font-medium text-ink tracking-widest">Velvet</span>
            <span className="font-playfair text-xl italic gold-text tracking-widest -mt-1">Vogue</span>
          </Link>

          <p className="section-label mb-3">Sign In</p>
          <h1 className="font-playfair text-4xl font-light text-ink mb-10">Welcome Back</h1>

          <form onSubmit={onSubmit} className="space-y-8">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase font-outfit text-muted mb-3">Email Address</label>
              <input type="email" name="email" value={form.email} onChange={onChange} required
                placeholder="you@example.com" className="input-dark" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase font-outfit text-muted mb-3">Password</label>
              <input type="password" name="password" value={form.password} onChange={onChange} required
                placeholder="••••••••" className="input-dark" />
            </div>

            {error && (
              <p className="text-xs font-outfit tracking-wide" style={{ color: '#E87070' }}>{error}</p>
            )}

            <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
              <span>{loading ? 'Signing in…' : 'Sign In'}</span>
            </button>
          </form>

          <p className="mt-10 text-xs font-outfit text-muted text-center">
            New to Velvet Vogue?{' '}
            <Link to="/register" className="hover:text-gold transition-colors" style={{ color: 'var(--gold)' }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
