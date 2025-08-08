import { Wrench, Search, ClipboardCheck, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Wrench,
    title: 'Restauration Complète',
    description: 'Remise à neuf complète de votre véhicule de collection avec un savoir-faire artisanal.',
    features: ['Carrosserie', 'Mécanique', 'Sellerie', 'Peinture'],
    color: 'text-red-500'
  },
  {
    icon: Search,
    title: 'Acquisition sur Commande',
    description: 'Recherche et acquisition de voitures de collection spécifiques selon vos critères.',
    features: ['Réseau international', 'Expertise', 'Négociation', 'Livraison'],
    color: 'text-blue-500'
  },
  {
    icon: ClipboardCheck,
    title: 'Expertise & Évaluation',
    description: 'Évaluation professionnelle de véhicules de collection pour achat ou assurance.',
    features: ['Rapport détaillé', 'Photos HD', 'Historique', 'Estimation'],
    color: 'text-green-500'
  },
  {
    icon: Settings,
    title: 'Maintenance Spécialisée',
    description: 'Entretien spécialisé pour préserver la valeur de vos véhicules de collection.',
    features: ['Révision', 'Diagnostic', 'Pièces d\'origine', 'Stockage'],
    color: 'text-purple-500'
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Services d'Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous accompagnons les passionnés d'automobiles de collection avec un savoir-faire unique et une expertise reconnue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                  <ul className="space-y-1 text-sm text-gray-500">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-red-600 hover:bg-red-700">
            <Link to="/services">
              Découvrir tous nos Services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
