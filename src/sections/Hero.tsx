import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, Play } from 'lucide-react';
import gsap from 'gsap';

const heroImages = [
  { src: '/images/hero-students.jpg', alt: 'Students at Kingdom Sons Academy' },
  { src: '/images/hero-classroom.jpg', alt: 'Classroom learning at Kingdom Sons' },
  { src: '/images/hero-portrait.jpg', alt: 'Happy student with artwork' },
  { src: '/images/campus-aerial.jpg', alt: 'Aerial view of the school campus' },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 6000);
    return () => clearInterval(intervalRef.current!);
  }, [nextSlide]);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" ref={heroRef} className="relative h-screen w-full overflow-hidden bg-midnight">
      {/* Background Slideshow */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img.src}
            alt={img.alt}
            className={`w-full h-full object-cover ${
              index === currentSlide ? 'animate-ken-burns' : ''
            }`}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/40 to-midnight/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/70 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-end pb-24 md:pb-32">
        <div className="content-container w-full" ref={contentRef}>
          {/* Label */}
          <div className="label-text text-ivory/70 mb-4">Est. 2012 &middot; Kipkaren, Kenya</div>

          {/* Headline */}
          <h1 className="font-display text-ivory text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] max-w-3xl mb-6">
            Where Every Child
            <br />
            Discovers Their{' '}
            <span className="italic text-sand">Purpose</span>
          </h1>

          {/* Description */}
          <p className="font-sans text-ivory/80 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            A Christ-centered community nurturing students from Pre-Primary through
            Junior Secondary to excel academically, grow spiritually, and lead with integrity.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#about"
              onClick={handleExplore}
              className="group flex items-center gap-2 bg-teal hover:bg-teal-light text-ivory font-sans font-medium px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore Our School
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button className="group flex items-center gap-2 text-ivory font-sans font-medium hover:text-sand transition-colors duration-300">
              <span className="flex items-center justify-center w-10 h-10 rounded-full border border-ivory/40 group-hover:border-sand/60 transition-colors">
                <Play className="w-4 h-4 ml-0.5" />
              </span>
              Watch Our Story
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide
                ? 'w-8 h-2 bg-ivory'
                : 'w-2 h-2 bg-ivory/40 hover:bg-ivory/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="label-text text-ivory/50 [writing-mode:vertical-lr]">Scroll to explore</span>
        <div className="w-px h-12 bg-ivory/30 relative overflow-hidden">
          <div className="w-full h-4 bg-ivory/70 absolute animate-[slideDown_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          0% { top: -16px; }
          100% { top: 48px; }
        }
      `}</style>
    </section>
  );
}