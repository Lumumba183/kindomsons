import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const campusImages = [
  { src: '/images/hero-students.jpg', alt: 'Students at the school building', category: 'Campus' },
  { src: '/images/hero-classroom.jpg', alt: 'Interactive classroom learning', category: 'Academics' },
  { src: '/images/sports.jpg', alt: 'Students playing soccer', category: 'Sports' },
  { src: '/images/hero-portrait.jpg', alt: 'Student artwork showcase', category: 'Arts' },
  { src: '/images/volunteers.jpg', alt: 'Community volunteers', category: 'Community' },
  { src: '/images/school-building.jpg', alt: 'Douglas Dormitory', category: 'Boarding' },
  { src: '/images/campus-aerial.jpg', alt: 'Aerial view of campus', category: 'Campus' },
  { src: '/images/students-activities.jpg', alt: 'Sports and teamwork', category: 'Sports' },
];

export default function CampusLife() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

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
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current.children,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: galleryRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prevImage = () => setLightbox((l) => ({ ...l, index: (l.index - 1 + campusImages.length) % campusImages.length }));
  const nextImage = () => setLightbox((l) => ({ ...l, index: (l.index + 1) % campusImages.length }));

  // Close lightbox on escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    if (lightbox.open) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightbox.open]);

  return (
    <section id="campus" ref={sectionRef} className="section-padding bg-ivory overflow-hidden">
      <div className="content-container">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="label-text text-teal block mb-3">Campus Life</span>
          <h2 className="font-display text-midnight text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.2] mb-4">
            A Vibrant Community of <span className="italic">Learners</span>
          </h2>
          <p className="font-sans text-midnight/65 text-lg max-w-2xl mx-auto">
            Our beautiful campus provides a safe, stimulating environment where students can explore, create, and grow.
          </p>
        </div>

        {/* Gallery Grid */}
        <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {campusImages.map((img, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-xl cursor-pointer ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  index === 0 ? 'h-full min-h-[300px] md:min-h-[400px]' : 'h-40 md:h-48'
                }`}
              />
              <div className="absolute inset-0 bg-midnight/0 group-hover:bg-midnight/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="label-text text-ivory/80 block mb-1">{img.category}</span>
                <span className="font-sans text-sm text-ivory font-medium">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <p className="font-sans text-midnight/70 leading-relaxed">
            From modern classrooms to expansive sports facilities, every space is designed to inspire learning.
            Our campus features well-equipped science labs, a comprehensive library, and technology centers that
            prepare students for the digital age.
          </p>
          <p className="font-sans text-midnight/70 leading-relaxed">
            Beyond academics, our students engage in music, drama, sports, and community service — developing
            well-rounded individuals who are prepared to make a positive impact on the world. Our boarding
            facilities provide a home away from home for students from across the region.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 border-2 border-teal text-teal hover:bg-teal hover:text-ivory font-sans font-medium px-7 py-3 rounded-full transition-all duration-300"
          >
            <MapPin className="w-4 h-4" />
            Schedule a Campus Visit
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-[100] bg-midnight/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-ivory/70 hover:text-ivory transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 text-ivory/70 hover:text-ivory transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <img
            src={campusImages[lightbox.index].src}
            alt={campusImages[lightbox.index].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 text-ivory/70 hover:text-ivory transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/70 font-sans text-sm">
            {lightbox.index + 1} / {campusImages.length}
          </div>
        </div>
      )}
    </section>
  );
}