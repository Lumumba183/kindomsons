import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

const footerLinks = {
  About: ['Our Story', 'Leadership', 'Mission & Values', 'Careers'],
  Academics: ['Pre-Primary', 'Lower Primary', 'Upper Primary', 'Junior Secondary'],
  'Campus Life': ['Athletics', 'Arts & Music', 'Clubs', 'Community Service'],
  Connect: ['Contact', 'Donate', 'Events', 'News'],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-teal pt-16 pb-8">
      <div className="content-container">
        {/* Top: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-ivory">
                <path d="M16 2L20 10H28L22 16L24 24L16 20L8 24L10 16L4 10H12L16 2Z" fill="currentColor"/>
              </svg>
              <span className="font-display text-lg font-semibold text-ivory">KINGDOM SONS</span>
            </a>
            <p className="font-sans text-ivory/60 text-sm leading-relaxed">
              Creating to Create.<br />
              Nurturing tomorrow&apos;s leaders today.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="label-text text-ivory/80 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-ivory/60 text-sm hover:text-ivory transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle: Contact Info */}
        <div className="border-t border-ivory/10 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <a
              href="mailto:kingdomsonsinfo@gmail.com"
              className="flex items-center gap-2 text-ivory/60 hover:text-ivory transition-colors font-sans text-sm"
            >
              <Mail className="w-4 h-4" />
              kingdomsonsinfo@gmail.com
            </a>
            <a
              href="tel:+254700000000"
              className="flex items-center gap-2 text-ivory/60 hover:text-ivory transition-colors font-sans text-sm"
            >
              <Phone className="w-4 h-4" />
              +254 700 000 000
            </a>
            <span className="flex items-center gap-2 text-ivory/60 font-sans text-sm">
              <MapPin className="w-4 h-4" />
              Kipkaren, Kenya
            </span>
            <span className="flex items-center gap-2 text-ivory/60 font-sans text-sm">
              <Clock className="w-4 h-4" />
              Mon–Fri: 8am–4pm
            </span>
          </div>
        </div>

        {/* Bottom: Copyright + Social */}
        <div className="border-t border-ivory/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-ivory/50 text-sm">
            &copy; {new Date().getFullYear()} Kingdom Sons Academy. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-ivory/50 hover:text-ivory transition-colors duration-200"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="font-sans text-ivory/50 text-sm hover:text-ivory transition-colors">
              Privacy Policy
            </a>
            <span className="text-ivory/20">|</span>
            <a href="#" className="font-sans text-ivory/50 text-sm hover:text-ivory transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}