import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, FileText, UserCheck, Check, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Calendar,
    number: '01',
    title: 'Schedule a Visit',
    description: 'Come experience our campus and meet our dedicated staff. See firsthand the warm, nurturing environment that makes Kingdom Sons special.',
  },
  {
    icon: FileText,
    number: '02',
    title: 'Submit Application',
    description: 'Complete our straightforward application form. Our admissions team will guide you through every step of the process.',
  },
  {
    icon: UserCheck,
    number: '03',
    title: 'Enrollment',
    description: 'Secure your child\'s place for the upcoming academic year. Join the Kingdom Sons family and start an incredible journey.',
  },
];

const gradeOptions = [
  'Pre-Primary',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
];

export default function Admissions() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    visitDate: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current.children,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1, x: 0, duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formDataObj as any).toString(),
    })
      .then(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', grade: '', visitDate: '', message: '' });
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        alert('Something went wrong. Please try again.');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-ivory overflow-hidden">
      <div className="content-container">
        <div className="grid lg:grid-cols-[45%_55%] gap-12 lg:gap-16">
          {/* Left: Steps */}
          <div ref={leftRef}>
            <span className="label-text text-teal block mb-3">Admissions</span>
            <h2 className="font-display text-midnight text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.2] mb-4">
              Begin Your Child&apos;s <span className="italic">Journey</span>
            </h2>
            <p className="font-sans text-midnight/70 leading-relaxed mb-10">
              Joining Kingdom Sons Academy is simple. Follow these three steps to give your child
              the gift of quality, Christ-centered education.
            </p>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-teal text-ivory flex items-center justify-center font-display text-lg font-semibold shrink-0">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-px h-full bg-teal/20 mt-2 min-h-[40px]" />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="w-5 h-5 text-teal" />
                      <h3 className="font-sans text-lg font-semibold text-midnight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="font-sans text-midnight/65 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div ref={rightRef}>
            <div className="bg-sand rounded-2xl p-8 md:p-10">
              <h3 className="font-sans text-xl font-semibold text-midnight mb-6">
                Request Information
              </h3>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-teal" />
                  </div>
                  <h4 className="font-display text-2xl text-midnight mb-2">Thank You!</h4>
                  <p className="font-sans text-midnight/70">
                    We&apos;ve received your request and will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>Don&apos;t fill this out: <input name="bot-field" /></label>
                  </p>

                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Parent / Guardian Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-ivory border border-midnight/10 rounded-lg px-4 py-3 font-sans text-midnight placeholder:text-midnight/40 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-ivory border border-midnight/10 rounded-lg px-4 py-3 font-sans text-midnight placeholder:text-midnight/40 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-ivory border border-midnight/10 rounded-lg px-4 py-3 font-sans text-midnight placeholder:text-midnight/40 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full bg-ivory border border-midnight/10 rounded-lg px-4 py-3 font-sans text-midnight focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Child&apos;s Grade Level</option>
                      {gradeOptions.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      name="visitDate"
                      value={formData.visitDate}
                      onChange={handleChange}
                      className="w-full bg-ivory border border-midnight/10 rounded-lg px-4 py-3 font-sans text-midnight focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Additional Message (optional)"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-ivory border border-midnight/10 rounded-lg px-4 py-3 font-sans text-midnight placeholder:text-midnight/40 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-teal hover:bg-teal-light text-ivory font-sans font-medium py-3.5 rounded-full transition-all duration-300 hover:shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    Send Request
                  </button>
                </form>
              )}

              <div className="flex items-center gap-2 mt-4 text-midnight/50">
                <Check className="w-4 h-4 text-teal" />
                <span className="font-sans text-sm">We&apos;ll contact you within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}