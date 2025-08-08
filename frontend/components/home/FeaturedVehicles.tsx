import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Calendar, Gauge, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import backend from '~backend/client';

export default function FeaturedVehicles() {
  const { data: vehiclesData, isLoading } = useQuery({
    queryKey: ['featured-vehicles'],
    queryFn: () => backend.vehicle.listVehicles({ limit: 6, available_only: true })
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Véhicules d'Exception
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const vehicles = vehiclesData?.vehicles || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Véhicules d'Exception
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre sélection de voitures de collection disponibles à l'acquisition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={vehicle.vehicle_images?.[0]?.url || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3'}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-black/80 text-white">
                    {vehicle.country_flag} {vehicle.country_name}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex">
                    {[...Array(vehicle.rarity_level)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{vehicle.name}</h3>
                  <p className="text-red-600 font-medium">{vehicle.brand_name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {vehicle.year_start}{vehicle.year_end && vehicle.year_end !== vehicle.year_start ? `-${vehicle.year_end}` : ''}
                  </div>
                  {vehicle.power_hp && (
                    <div className="flex items-center">
                      <Gauge className="h-4 w-4 mr-2" />
                      {vehicle.power_hp} ch
                    </div>
                  )}
                </div>

                {vehicle.estimated_value_min && vehicle.estimated_value_max && (
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-900">
                      {vehicle.estimated_value_min.toLocaleString()} € - {vehicle.estimated_value_max.toLocaleString()} €
                    </p>
                  </div>
                )}

                <Button variant="outline" className="w-full group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-colors">
                  <Link to={`/vehicules/${vehicle.id}`} className="flex items-center justify-center w-full">
                    Voir les Détails
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-red-600 hover:bg-red-700">
            <Link to="/catalogue">
              Voir tout le Catalogue
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
