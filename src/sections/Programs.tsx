import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Baby, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    icon: Baby,
    title: 'Pre-Primary & Lower Primary',
    description:
      'Building strong foundations through play-based learning, phonics, and character development for our youngest learners. Our early childhood program focuses on holistic development.',
    color: 'bg-rose-50',
    iconColor: 'text-rose-500',
  },
  {
    icon: BookOpen,
    title: 'Upper Primary',
    description:
      'Rigorous academics paired with leadership training, preparing students for the challenges of secondary education and beyond. Critical thinking and creativity are emphasized.',
    color: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    icon: GraduationCap,
    title: 'Junior Secondary',
    description:
      'A comprehensive STEM and arts curriculum that equips students with critical thinking skills and creative confidence. Preparing tomorrow\'s leaders today.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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
    <section id="programs" ref={sectionRef} className="section-padding bg-sand overflow-hidden">
      <div className="content-container">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="label-text text-teal block mb-3">Our Programs</span>
          <h2 className="font-display text-midnight text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.2]">
            Excellence in Every <span className="italic">Classroom</span>
          </h2>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.title}
              className="group bg-ivory rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            >
              <div className={`${program.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                <program.icon className={`w-7 h-7 ${program.iconColor}`} />
              </div>
              <h3 className="font-sans text-xl font-semibold text-midnight mb-3">
                {program.title}
              </h3>
              <p className="font-sans text-midnight/65 leading-relaxed mb-6">
                {program.description}
              </p>
              <span className="inline-flex items-center gap-2 font-sans font-medium text-teal group-hover:text-teal-light transition-colors duration-300">
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}