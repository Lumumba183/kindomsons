import { Heart } from 'lucide-react';

export default function FloatingDonate() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#donate')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <a
      href="#donate"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-teal hover:bg-teal-light text-ivory font-sans font-medium px-5 py-3 rounded-full shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-float"
    >
      <Heart className="w-4 h-4" />
      <span className="hidden sm:inline">Donate</span>
    </a>
  );
}