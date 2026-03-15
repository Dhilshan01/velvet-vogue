import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex flex-col leading-none mb-6">
            <span className="font-playfair text-2xl font-medium text-ink tracking-widest">Velvet</span>
            <span className="font-playfair text-2xl italic gold-text tracking-widest -mt-1">Vogue</span>
          </div>
          <p className="text-sm text-muted font-outfit font-light leading-relaxed max-w-xs">
            Curated fashion for those who appreciate the art of dressing well. Every piece tells a story.
          </p>
          <div className="flex gap-4 mt-8">
            {['IG', 'TW', 'FB'].map(s => (
              <a key={s} href="#" className="w-9 h-9 border border-border flex items-center justify-center text-[10px] font-outfit font-medium text-muted hover:border-gold hover:text-gold transition-all duration-300">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <h4 className="section-label mb-6">Navigate</h4>
          <ul className="space-y-3">
            {[['/', 'Home'], ['/men', 'Men'], ['/women', 'Women'], ['/cart', 'Cart'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-sm text-muted font-outfit font-light hover:text-gold transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="section-label mb-6">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-muted font-outfit font-light">
            <li>hello@velvetvogue.com</li>
            <li>+94 11 234 5678</li>
            <li>Colombo, Sri Lanka</li>
          </ul>
          <div className="mt-8">
            <h4 className="section-label mb-4">Account</h4>
            <ul className="space-y-3">
              {[['/login', 'Sign In'], ['/register', 'Create Account']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-muted font-outfit font-light hover:text-gold transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--border)' }} className="py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs font-outfit text-muted tracking-widest">© {new Date().getFullYear()} Velvet Vogue. All rights reserved.</p>
          <p className="text-xs font-outfit text-muted tracking-widest">Crafted with precision.</p>
        </div>
      </div>
    </footer>
  );
}
