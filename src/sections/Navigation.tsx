import { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Campus', href: '#campus' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="content-container">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 group">
              <div className="relative">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-teal transition-transform duration-300 group-hover:scale-110">
                  <path d="M16 2L20 10H28L22 16L24 24L16 20L8 24L10 16L4 10H12L16 2Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-semibold tracking-tight text-midnight leading-tight">
                  KINGDOM SONS
                </span>
                <span className="text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-teal -mt-0.5">
                  ACADEMY
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative font-sans text-[15px] font-medium text-midnight hover:text-teal transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a
                href="#donate"
                onClick={(e) => handleNavClick(e, '#donate')}
                className="hidden sm:flex items-center gap-2 bg-teal hover:bg-teal-light text-ivory font-sans text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4" />
                Donate Now
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-midnight hover:text-teal transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-ivory transition-transform duration-500 lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-display text-3xl text-midnight hover:text-teal transition-colors duration-300"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#donate"
            onClick={(e) => handleNavClick(e, '#donate')}
            className="flex items-center gap-2 bg-teal text-ivory font-sans text-lg font-medium px-8 py-3 rounded-full mt-4"
          >
            <Heart className="w-5 h-5" />
            Donate Now
          </a>
        </div>
      </div>
    </>
  );
}