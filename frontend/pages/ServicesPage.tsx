import { useQuery } from '@tanstack/react-query';
import { Wrench, Search, ClipboardCheck, Settings, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import backend from '~backend/client';

const serviceIcons = {
  'Restauration Complète': Wrench,
  'Acquisition sur Commande': Search,
  'Expertise et Évaluation': ClipboardCheck,
  'Maintenance Spécialisée': Settings,
};

export default function ServicesPage() {
  const { data: serviceTypesData, isLoading } = useQuery({
    queryKey: ['service-types'],
    queryFn: () => backend.service.listServiceTypes()
  });

  const { data: projectsData } = useQuery({
    queryKey: ['restoration-projects'],
    queryFn: () => backend.service.listRestorationProjects({ limit: 6, status: 'completed' })
  });

  const serviceTypes = serviceTypesData?.service_types || [];
  const projects = projectsData?.projects || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Nos Services d'Excellence</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Nous accompagnons les passionnés d'automobiles de collection avec un savoir-faire unique et une expertise reconnue depuis plus de 15 ans.
          </p>
          <Button size="lg" className="bg-red-600 hover:bg-red-700">
            <Link to="/contact">
              Demander un Devis Gratuit
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Services Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nos Domaines d'Expertise
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg animate-pulse">
                  <div className="p-8 space-y-4">
                    <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-20 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {serviceTypes.map((service) => {
                const IconComponent = serviceIcons[service.name as keyof typeof serviceIcons] || Settings;
                return (
                  <Card key={service.id} className="group hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-600 transition-colors">
                          <IconComponent className="h-8 w-8 text-red-600 group-hover:text-white" />
                        </div>
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* Service-specific content */}
                      {service.name === 'Restauration Complète' && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Notre processus en 10 étapes :</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {[
                              'Évaluation initiale et diagnostic',
                              'Démontage complet et catalogage',
                              'Restauration de la carrosserie',
                              'Remise à neuf du moteur',
                              'Restauration de la transmission',
                              'Réfection de la sellerie',
                              'Système électrique et éclairage',
                              'Peinture et finitions',
                              'Remontage et réglages',
                              'Tests et livraison'
                            ].map((step, index) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.name === 'Acquisition sur Commande' && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Nos avantages :</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {[
                              'Réseau international de contacts',
                              'Expertise technique approfondie',
                              'Négociation professionnelle',
                              'Vérification complète du véhicule',
                              'Transport sécurisé',
                              'Garantie de conformité'
                            ].map((advantage, index) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                {advantage}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Button className="w-full mt-6 bg-red-600 hover:bg-red-700">
                        En savoir plus
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Portfolio Section */}
        {projects.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Nos Réalisations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.after_images?.[0] || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3'}
                      alt={project.project_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600">
                        Terminé
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {project.project_name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {project.vehicle_make} {project.vehicle_model} {project.vehicle_year}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-black text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à Concrétiser Votre Projet ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contactez nos experts pour discuter de votre projet d'acquisition ou de restauration. 
            Devis gratuit et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              <Link to="/contact">
                Demander un Devis
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              Voir le Catalogue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
