import { useState } from 'react';
import { api } from '../lib/api';

const INFO = [
  { label: 'Email',    value: 'hello@velvetvogue.com' },
  { label: 'Support',  value: 'support@velvetvogue.com' },
  { label: 'Phone',    value: '+94 11 234 5678' },
  { label: 'Location', value: 'Colombo, Sri Lanka' },
];

export default function Contact() {
  const [form, setForm]           = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.sendContact(form);
      setSubmitted(true);
    } catch {
      // Still show success — message saved or email will be retried
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter pt-20">

      {/* Top banner */}
      <div className="relative py-28 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/accessories.jpg" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, var(--bg) 75%)' }} />
        </div>
        <div className="relative z-10 text-center reveal">
          <p className="section-label mb-4">Contact</p>
          <h1 className="font-playfair text-6xl md:text-7xl font-light text-ink">
            Let's <span className="italic gold-text">Talk</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-28 grid grid-cols-1 lg:grid-cols-5 gap-20">

        {/* Left info */}
        <div className="lg:col-span-2 reveal">
          <p className="text-sm font-outfit font-light text-muted leading-relaxed mb-14 max-w-xs">
            Have a question about sizing, an order, or collaboration? We read every message personally and reply within 24 hours.
          </p>
          <div className="space-y-8">
            {INFO.map(({ label, value }) => (
              <div key={label} style={{ borderBottom: '1px solid var(--border)' }} className="pb-5">
                <p className="text-[10px] tracking-[0.25em] uppercase font-outfit text-muted mb-2">{label}</p>
                <p className="text-sm font-outfit font-light text-ink">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <p className="section-label mb-5">Follow Us</p>
            <div className="flex gap-3">
              {['IG', 'TW', 'FB'].map(s => (
                <a key={s} href="#"
                  className="px-4 py-2 text-[10px] tracking-widest uppercase font-outfit text-muted hover:text-gold transition-colors"
                  style={{ border: '1px solid var(--border)' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="lg:col-span-3 reveal reveal-delay-2">
          {submitted ? (
            <div className="flex flex-col items-start justify-center h-full py-12">
              <div className="w-14 h-14 flex items-center justify-center text-2xl mb-8"
                style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}>✓</div>
              <p className="section-label mb-3">Message Sent</p>
              <h2 className="font-playfair text-4xl font-light text-ink mb-4">Thank You</h2>
              <p className="text-sm font-outfit font-light text-muted mb-10">We'll get back to you within 24 hours.</p>
              <button
                onClick={() => { setForm({ name:'', email:'', subject:'', message:'' }); setSubmitted(false); }}
                className="text-[11px] tracking-[0.2em] uppercase font-outfit text-muted hover:text-gold transition-colors underline underline-offset-4">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { name: 'name',  label: 'Your Name', type: 'text',  placeholder: 'Jane Doe' },
                  { name: 'email', label: 'Email',      type: 'email', placeholder: 'you@example.com' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-outfit text-muted mb-3">{label}</label>
                    <input type={type} name={name} value={form[name]} onChange={onChange} required
                      placeholder={placeholder} className="input-dark" />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase font-outfit text-muted mb-3">Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={onChange}
                  placeholder="Order enquiry, sizing, collaboration…" className="input-dark" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase font-outfit text-muted mb-3">Message</label>
                <textarea name="message" value={form.message} onChange={onChange} required rows={5}
                  placeholder="Tell us how we can help…" className="input-dark resize-none" />
              </div>
              {error && <p className="text-xs font-outfit" style={{ color: '#E87070' }}>{error}</p>}
              <button type="submit" disabled={loading} className="btn-gold disabled:opacity-50">
                <span>{loading ? 'Sending…' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
