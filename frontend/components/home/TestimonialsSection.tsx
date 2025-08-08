import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Pierre Dubois',
    location: 'Paris',
    vehicle: 'Porsche 911 Carrera 1973',
    rating: 5,
    text: 'Une restauration exceptionnelle ! Mon 911 a retrouvé sa splendeur d\'origine. L\'équipe de Custom My Ride a su préserver l\'âme de cette voiture tout en lui redonnant une seconde jeunesse.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Marie Lefevre',
    location: 'Lyon',
    vehicle: 'Ferrari 308 GTB 1978',
    rating: 5,
    text: 'Ils ont trouvé la Ferrari de mes rêves en seulement 3 mois ! Le service d\'acquisition sur commande est remarquable. Professionnalisme et passion au rendez-vous.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Jean-Claude Martin',
    location: 'Bordeaux',
    vehicle: 'Jaguar E-Type 1965',
    rating: 5,
    text: 'Un travail d\'orfèvre sur ma Jaguar E-Type. Chaque détail a été soigné avec une précision remarquable. Je recommande vivement leurs services.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Témoignages Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les expériences de nos clients passionnés d'automobiles de collection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="absolute top-4 right-4 text-red-500 opacity-20">
                  <Quote className="h-8 w-8" />
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                    <div className="text-sm text-red-600 font-medium">{testimonial.vehicle}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
