import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HandHeart, Handshake, Gift, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const communityCards = [
  {
    icon: HandHeart,
    image: '/images/volunteers.jpg',
    title: 'Volunteer',
    description:
      'Share your skills and time with our students. From mentoring to facility improvements, there are many ways to contribute to our community.',
    cta: 'Join as Volunteer',
  },
  {
    icon: Handshake,
    image: '/images/students-activities.jpg',
    title: 'Partner With Us',
    description:
      'Corporate sponsorships and institutional partnerships help us expand our programs and reach more students in need of quality education.',
    cta: 'Become a Partner',
  },
  {
    icon: Gift,
    image: '/images/hero-classroom.jpg',
    title: 'Give',
    description:
      'Your financial support provides scholarships, learning materials, and facility upgrades that directly benefit our students.',
    cta: 'Make a Donation',
  },
];

export default function Community() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-sand overflow-hidden">
      <div className="content-container">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="label-text text-teal block mb-3">Get Involved</span>
          <h2 className="font-display text-midnight text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.2]">
            Join Our Community of <span className="italic">Supporters</span>
          </h2>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {communityCards.map((card) => (
            <div
              key={card.title}
              className="group bg-ivory rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-ivory/90 flex items-center justify-center">
                  <card.icon className="w-5 h-5 text-teal" />
                </div>
              </div>
              {/* Content */}
              <div className="p-6">
                <h3 className="font-sans text-xl font-semibold text-midnight mb-3">
                  {card.title}
                </h3>
                <p className="font-sans text-midnight/65 text-sm leading-relaxed mb-5">
                  {card.description}
                </p>
                <a
                  href="#donate"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#donate')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-2 font-sans font-medium text-teal hover:text-teal-light transition-colors duration-300"
                >
                  {card.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}