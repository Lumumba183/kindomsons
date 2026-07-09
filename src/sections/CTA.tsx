import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding-lg bg-ivory relative overflow-hidden">
      {/* Subtle Crown Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10L34 20H44L36 26L38 36L30 30L22 36L24 26L16 20H26L30 10Z' fill='%23084560'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }} />

      <div className="content-container relative z-10">
        <div ref={contentRef} className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-midnight text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.2] mb-4">
            Ready to Discover <span className="italic">Kingdom Sons</span>?
          </h2>
          <p className="font-sans text-midnight/70 text-lg leading-relaxed mb-8">
            Visit our campus, meet our faculty, and see firsthand how we&apos;re shaping the next
            generation of leaders. We&apos;d love to welcome you to our community.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="flex items-center gap-2 bg-teal hover:bg-teal-light text-ivory font-sans font-medium px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              Schedule a Visit
            </a>
            <a
              href="mailto:info@kingdomsonsacademy.ac.ke"
              className="flex items-center gap-2 border-2 border-teal text-teal hover:bg-teal hover:text-ivory font-sans font-medium px-7 py-3 rounded-full transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}