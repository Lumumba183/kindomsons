import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 12, suffix: '+', label: 'Years of Excellence' },
  { value: 500, suffix: '+', label: 'Students Nurtured' },
  { value: 50, suffix: '', label: 'Expert Educators' },
  { value: 98, suffix: '%', label: 'Transition Rate' },
];

const testimonials = [
  {
    quote: "Kingdom Sons Academy has transformed my child's life. The teachers go above and beyond, and the Christ-centered values have helped shape my daughter into a confident, compassionate young leader.",
    author: 'Sarah M.',
    role: 'Parent',
  },
  {
    quote: "As a teacher here for 8 years, I've witnessed countless students discover their potential. The support from administration and the community makes this a truly special place to work and learn.",
    author: 'Mr. James O.',
    role: 'Senior Teacher',
  },
  {
    quote: "The boarding facilities gave me the stability I needed to focus on my studies. I'm now pursuing my dream of becoming a doctor, thanks to the foundation Kingdom Sons provided.",
    author: 'Grace W.',
    role: 'Alumni, Class of 2022',
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => setCount(Math.round(obj.val)),
        });
      },
    });
    return () => trigger.kill();
  }, [target]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-semibold text-ivory">
      {count}{suffix}
    </span>
  );
}

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-teal overflow-hidden">
      <div className="content-container">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <h2 className="font-display text-ivory text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.2]">
            Making a Difference, One Student at a Time
          </h2>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="label-text text-ivory/60 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Content + Testimonial */}
        <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left: About Impact */}
          <div>
            <h3 className="font-sans text-2xl font-semibold text-ivory mb-4">
              A Legacy of Transformation
            </h3>
            <p className="font-sans text-ivory/80 leading-relaxed mb-4">
              Since 2012, Kingdom Sons Academy has been more than a school — we are a catalyst for change
              in the Kipkaren community. Our holistic approach to education ensures that every student
              receives not just academic knowledge, but also spiritual guidance, emotional support, and
              practical life skills.
            </p>
            <p className="font-sans text-ivory/80 leading-relaxed mb-6">
              Our graduates have gone on to excel in top secondary schools and universities across Kenya,
              with many returning to contribute to their communities. The ripple effect of quality education
              extends far beyond our campus walls.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-ivory/10 rounded-lg px-5 py-3">
                <span className="font-display text-2xl text-ivory">250+</span>
                <p className="text-ivory/70 text-sm">Current Enrollment</p>
              </div>
              <div className="bg-ivory/10 rounded-lg px-5 py-3">
                <span className="font-display text-2xl text-ivory">14</span>
                <p className="text-ivory/70 text-sm">Dedicated Teachers</p>
              </div>
              <div className="bg-ivory/10 rounded-lg px-5 py-3">
                <span className="font-display text-2xl text-ivory">50</span>
                <p className="text-ivory/70 text-sm">Boarding Students</p>
              </div>
            </div>
          </div>

          {/* Right: Testimonial Carousel */}
          <div className="bg-ivory rounded-2xl p-8 relative">
            <Quote className="w-10 h-10 text-teal/20 absolute top-6 right-6" />
            <div className="min-h-[220px]">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    i === activeTestimonial ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 absolute'
                  }`}
                  style={{ position: i === activeTestimonial ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
                >
                  <p className="font-display text-midnight text-lg md:text-xl italic leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                      <span className="font-sans font-semibold text-teal text-sm">
                        {t.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans font-medium text-midnight text-sm">{t.author}</p>
                      <p className="font-sans text-midnight/60 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Dots */}
            <div className="flex items-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeTestimonial ? 'w-6 h-2 bg-teal' : 'w-2 h-2 bg-teal/30'
                  }`}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}