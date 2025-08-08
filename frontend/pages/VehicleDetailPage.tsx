import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Gauge, Star, Wrench, DollarSign, Info, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import backend from '~backend/client';

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: vehicle, isLoading, error } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => backend.vehicle.getVehicle({ id: parseInt(id!) }),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Véhicule non trouvé</h1>
          <Link to="/catalogue">
            <Button>Retour au catalogue</Button>
          </Link>
        </div>
      </div>
    );
  }

  const primaryImage = vehicle.vehicle_images?.find(img => img.is_primary) || vehicle.vehicle_images?.[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/catalogue" className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au catalogue
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{vehicle.name}</h1>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-black text-white">
                  {vehicle.country_flag} {vehicle.country_name}
                </Badge>
                <span className="text-xl text-red-600 font-semibold">{vehicle.brand_name}</span>
                <span className="text-gray-600">{vehicle.type_name}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Rarity and Availability */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Rareté:</span>
              <div className="flex">
                {[...Array(vehicle.rarity_level)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <Badge variant={vehicle.available_for_acquisition ? "default" : "destructive"}>
              {vehicle.available_for_acquisition ? "Disponible" : "Non disponible"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={primaryImage?.url || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3'}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {vehicle.vehicle_images && vehicle.vehicle_images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 p-4">
                    {vehicle.vehicle_images.slice(1, 5).map((image, index) => (
                      <div key={image.id} className="aspect-square overflow-hidden rounded">
                        <img
                          src={image.url}
                          alt={`${vehicle.name} ${index + 2}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specs">Spécifications</TabsTrigger>
                <TabsTrigger value="history">Histoire</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed">
                      {vehicle.description || "Description détaillée à venir..."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specs" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Caractéristiques générales</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Années de production:</span>
                            <span>{vehicle.year_start}{vehicle.year_end && vehicle.year_end !== vehicle.year_start ? `-${vehicle.year_end}` : ''}</span>
                          </div>
                          {vehicle.power_hp && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Puissance:</span>
                              <span>{vehicle.power_hp} ch</span>
                            </div>
                          )}
                          {vehicle.top_speed_kmh && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Vitesse max:</span>
                              <span>{vehicle.top_speed_kmh} km/h</span>
                            </div>
                          )}
                          {vehicle.acceleration_0_100 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">0-100 km/h:</span>
                              <span>{vehicle.acceleration_0_100}s</span>
                            </div>
                          )}
                          {vehicle.production_count && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Exemplaires produits:</span>
                              <span>{vehicle.production_count.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {vehicle.engine_specs && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Moteur</h4>
                          <p className="text-sm text-gray-700">{vehicle.engine_specs}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed">
                      {vehicle.history || "Histoire détaillée à venir..."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price and Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Estimation de valeur
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vehicle.estimated_value_min && vehicle.estimated_value_max && (
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {vehicle.estimated_value_min.toLocaleString()} € - {vehicle.estimated_value_max.toLocaleString()} €
                    </p>
                    <p className="text-sm text-gray-600">Estimation actuelle du marché</p>
                  </div>
                )}
                
                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                    Demander une Acquisition
                  </Button>
                  <Button variant="outline" className="w-full">
                    Demander une Expertise
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Informations rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Difficulté de restauration:</span>
                  <div className="flex">
                    {[...Array(vehicle.restoration_difficulty)].map((_, i) => (
                      <Wrench key={i} className="h-4 w-4 text-red-500" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Niveau de rareté:</span>
                  <div className="flex">
                    {[...Array(vehicle.rarity_level)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Disponibilité:</span>
                  <Badge variant={vehicle.available_for_acquisition ? "default" : "destructive"}>
                    {vehicle.available_for_acquisition ? "Disponible" : "Non disponible"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Besoin d'aide ?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Nos experts sont là pour vous conseiller dans votre projet d'acquisition.
                </p>
                <Button variant="outline" className="w-full">
                  <Link to="/contact">
                    Nous Contacter
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
