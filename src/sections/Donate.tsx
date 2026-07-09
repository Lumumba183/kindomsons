import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Globe, Check, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const donationAmounts = [
  { amount: 30, label: 'Sponsor a Child', period: 'per month', description: 'Provides tuition, food, school resources and bus fees for one child.' },
  { amount: 50, label: 'Education Support', period: 'per month', description: 'Supports learning materials and extracurricular activities.' },
  { amount: 100, label: 'Classroom Sponsor', period: 'per month', description: 'Helps maintain and equip classrooms with modern learning tools.' },
  { amount: 250, label: 'Scholarship Fund', period: 'one-time', description: 'Provides a full semester scholarship for a deserving student.' },
];

export default function Donate() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleDonate = () => {
    const amount = selectedAmount || Number(customAmount);
    if (amount > 0) {
      window.location.href = `mailto:kingdomsonsinfo@gmail.com?subject=Donation Inquiry - $${amount}&body=Hello, I would like to make a donation of $${amount} to Kingdom Sons Academy. Please let me know how to proceed.`;
    }
  };

  return (
    <section id="donate" ref={sectionRef} className="section-padding bg-teal overflow-hidden">
      <div className="content-container">
        <div ref={contentRef}>
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-ivory/10 rounded-full px-4 py-2 mb-4">
              <Globe className="w-4 h-4 text-ivory/70" />
              <span className="label-text text-ivory/80">In Partnership with Global Development Group</span>
            </div>
            <h2 className="font-display text-ivory text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.2] mb-4">
              Donate and <span className="italic">Support</span> Us
            </h2>
            <p className="font-sans text-ivory/80 text-lg max-w-2xl mx-auto">
              Your generosity transforms lives. All donations over $2 are tax deductible through our
              partnership with Global Development Group. Every contribution directly impacts our students.
            </p>
          </div>

          {/* Donation Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {donationAmounts.map((option) => (
              <button
                key={option.amount}
                onClick={() => { setSelectedAmount(option.amount); setCustomAmount(''); }}
                className={`relative text-left p-6 rounded-xl transition-all duration-300 ${
                  selectedAmount === option.amount
                    ? 'bg-ivory shadow-xl scale-[1.02]'
                    : 'bg-ivory/10 hover:bg-ivory/20'
                }`}
              >
                {selectedAmount === option.amount && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-teal flex items-center justify-center">
                    <Check className="w-4 h-4 text-ivory" />
                  </div>
                )}
                <div className={`font-display text-3xl font-semibold mb-1 ${
                  selectedAmount === option.amount ? 'text-teal' : 'text-ivory'
                }`}>
                  ${option.amount}
                </div>
                <div className={`text-sm font-sans font-medium mb-2 ${
                  selectedAmount === option.amount ? 'text-midnight' : 'text-ivory/80'
                }`}>
                  {option.label}
                </div>
                <div className={`text-xs font-sans mb-3 ${
                  selectedAmount === option.amount ? 'text-midnight/50' : 'text-ivory/50'
                }`}>
                  {option.period}
                </div>
                <p className={`text-sm font-sans leading-relaxed ${
                  selectedAmount === option.amount ? 'text-midnight/70' : 'text-ivory/70'
                }`}>
                  {option.description}
                </p>
              </button>
            ))}
          </div>

          {/* Custom Amount + CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-midnight/40 text-lg">$</span>
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                className="bg-ivory/10 border border-ivory/20 rounded-full pl-8 pr-4 py-3 font-sans text-ivory placeholder:text-ivory/40 focus:outline-none focus:ring-2 focus:ring-ivory/30 w-44"
              />
            </div>
            <button
              onClick={handleDonate}
              disabled={!selectedAmount && !customAmount}
              className="flex items-center gap-2 bg-ivory text-teal hover:bg-sand font-sans font-medium px-8 py-3 rounded-full transition-all duration-300 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Heart className="w-4 h-4" />
              Donate Now
            </button>
          </div>

          {/* Email contact */}
          <div className="text-center">
            <a
              href="mailto:kingdomsonsinfo@gmail.com"
              className="inline-flex items-center gap-2 text-ivory/70 hover:text-ivory transition-colors font-sans text-sm"
            >
              <Mail className="w-4 h-4" />
              kingdomsonsinfo@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}