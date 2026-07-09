import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Welcome() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: 60, scale: 0.95 },
          {
            opacity: 1, x: 0, scale: 1, duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-ivory overflow-hidden">
      <div className="content-container">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div ref={contentRef}>
            <span className="label-text text-teal block mb-4">Welcome to Kingdom Sons</span>
            <h2 className="font-display text-midnight text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.2] mb-6">
              A Place Where Young Minds Flourish and{' '}
              <span className="italic">Hearts</span> Are Transformed
            </h2>
            <p className="font-sans text-midnight/70 text-lg leading-relaxed mb-6">
              For over a decade, Kingdom Sons Academy has been a beacon of hope and excellence
              in the Kipkaren community. We believe every child is created with unique gifts,
              and our calling is to help them discover and develop those gifts in a nurturing,
              Christ-centered environment.
            </p>
            <p className="font-sans text-midnight/70 text-lg leading-relaxed mb-8">
              Our dedicated team of 50+ educators works tirelessly to provide quality education
              that transforms lives. From our modern classrooms to our vibrant extracurricular
              programs, every aspect of Kingdom Sons is designed to help students reach their
              full potential.
            </p>
            <a
              href="#programs"
              onClick={(e) => { e.preventDefault(); document.querySelector('#programs')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group inline-flex items-center gap-2 font-sans font-medium text-teal hover:text-teal-light transition-colors duration-300"
            >
              Learn About Our Story
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute bottom-0 left-0 w-full h-px bg-teal scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          </div>

          {/* Right Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <img
                src="/images/library.jpg"
                alt="Students reading in the school library"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/20 to-transparent" />
            </div>
            {/* Caption Card */}
            <div className="absolute -bottom-6 -left-6 bg-teal text-ivory px-6 py-4 rounded-xl shadow-lg">
              <span className="label-text text-ivory/80 block mb-1">Established</span>
              <span className="font-display text-2xl">2012 &middot; Kipkaren, Kenya</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}