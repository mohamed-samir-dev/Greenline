import HeroSection from './components/HeroSection';
import MissionCards from './components/MissionCards';
import ValuesGrid from './components/ValuesGrid';
import Timeline from './components/Timeline';
import TeamSection from './components/TeamSection';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';

export default function AboutPage() {
  return (
    <main className="bg-white overflow-hidden">
      <HeroSection />
      <MissionCards />
      <ValuesGrid />
      <Timeline />
      <TeamSection />
      <Certifications />
      <Testimonials />
      <CTASection />
    </main>
  );
}