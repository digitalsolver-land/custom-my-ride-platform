import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
      
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Nous donnons vie à vos 
            <span className="text-red-500"> rêves automobiles</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
            Spécialistes de l'acquisition et de la restauration de voitures de collection depuis plus de 15 ans.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-4">
              <Link to="/catalogue" className="flex items-center">
                Découvrir le Catalogue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4">
              <Play className="mr-2 h-5 w-5" />
              Voir nos Réalisations
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-500">15+</div>
              <div className="text-sm text-gray-400">Années d'expérience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500">200+</div>
              <div className="text-sm text-gray-400">Voitures restaurées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500">98%</div>
              <div className="text-sm text-gray-400">Clients satisfaits</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
