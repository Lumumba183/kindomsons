import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Welcome from './sections/Welcome';
import Programs from './sections/Programs';
import CampusLife from './sections/CampusLife';
import Impact from './sections/Impact';
import Admissions from './sections/Admissions';
import Community from './sections/Community';
import CTA from './sections/CTA';
import Donate from './sections/Donate';
import Footer from './sections/Footer';
import FloatingDonate from './sections/FloatingDonate';

export default function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      <main>
        <Hero />
        <Welcome />
        <Programs />
        <CampusLife />
        <Impact />
        <Admissions />
        <Community />
        <CTA />
        <Donate />
      </main>
      <Footer />
      <FloatingDonate />
    </div>
  );
}
