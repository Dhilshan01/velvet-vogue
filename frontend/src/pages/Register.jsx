import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const [form, setForm]       = useState({ username: '', email: '', password: '', confirm: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6)       { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left — form panel */}
      <div className="flex items-center justify-center px-8 py-20 order-2 md:order-1" style={{ background: 'var(--bg)' }}>
        <div className="w-full max-w-sm page-enter">

          <Link to="/" className="flex flex-col leading-none mb-14">
            <span className="font-playfair text-xl font-medium text-ink tracking-widest">Velvet</span>
            <span className="font-playfair text-xl italic gold-text tracking-widest -mt-1">Vogue</span>
          </Link>

          <p className="section-label mb-3">Create Account</p>
          <h1 className="font-playfair text-4xl font-light text-ink mb-10">Join the Circle</h1>

          <form onSubmit={onSubmit} className="space-y-7">
            {[
              { name: 'username', label: 'Username',         type: 'text',     placeholder: 'your_name' },
              { name: 'email',    label: 'Email Address',    type: 'email',    placeholder: 'you@example.com' },
              { name: 'password', label: 'Password',         type: 'password', placeholder: 'Min. 6 characters' },
              { name: 'confirm',  label: 'Confirm Password', type: 'password', placeholder: 'Repeat password' },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="block text-[10px] tracking-[0.2em] uppercase font-outfit text-muted mb-3">{label}</label>
                <input type={type} name={name} value={form[name]} onChange={onChange} required
                  placeholder={placeholder} className="input-dark" />
              </div>
            ))}

            {error && (
              <p className="text-xs font-outfit tracking-wide" style={{ color: '#E87070' }}>{error}</p>
            )}

            <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
              <span>{loading ? 'Creating account…' : 'Create Account'}</span>
            </button>
          </form>

          <p className="mt-10 text-xs font-outfit text-muted text-center">
            Already have an account?{' '}
            <Link to="/login" className="hover:text-gold transition-colors" style={{ color: 'var(--gold)' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right — image panel */}
      <div className="hidden md:block relative overflow-hidden order-1 md:order-2">
        <img src="/images/gown.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.3), rgba(10,10,10,0.6))' }} />
        <div className="absolute bottom-16 left-12 right-12">
          <p className="section-label mb-4">Exclusive Access</p>
          <h2 className="font-playfair text-4xl font-light italic text-ink leading-tight">
            Style starts<br />with a single step.
          </h2>
        </div>
      </div>
    </div>
  );
}
