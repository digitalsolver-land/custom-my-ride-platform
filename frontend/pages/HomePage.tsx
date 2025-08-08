import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import FeaturedVehicles from '../components/home/FeaturedVehicles';
import StatsSection from '../components/home/StatsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BlogPreview from '../components/home/BlogPreview';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <ServicesSection />
      <FeaturedVehicles />
      <StatsSection />
      <TestimonialsSection />
      <BlogPreview />
    </div>
  );
}
