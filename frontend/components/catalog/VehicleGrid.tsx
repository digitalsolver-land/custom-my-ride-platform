import { ArrowRight, Calendar, Gauge, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import type { VehicleWithDetails } from '~backend/vehicle/types';

interface VehicleGridProps {
  vehicles: VehicleWithDetails[];
  total: number;
  hasMore: boolean;
  isLoading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  limit: number;
}

export default function VehicleGrid({ 
  vehicles, 
  total, 
  hasMore, 
  isLoading, 
  currentPage, 
  onPageChange, 
  limit 
}: VehicleGridProps) {
  const totalPages = Math.ceil(total / limit);
  const startItem = currentPage * limit + 1;
  const endItem = Math.min((currentPage + 1) * limit, total);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(limit)].map((_, i) => (
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
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🚗</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun véhicule trouvé</h3>
        <p className="text-gray-600">Essayez de modifier vos critères de recherche.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Affichage de {startItem} à {endItem} sur {total} véhicules
        </p>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              {!vehicle.available_for_acquisition && (
                <div className="absolute bottom-4 left-4">
                  <Badge variant="destructive">Non disponible</Badge>
                </div>
              )}
            </div>
            
            <CardContent className="p-6">
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{vehicle.name}</h3>
                <p className="text-red-600 font-medium">{vehicle.brand_name}</p>
                <p className="text-sm text-gray-500">{vehicle.type_name}</p>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </Button>
          
          <div className="flex space-x-1">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = Math.max(0, Math.min(totalPages - 5, currentPage - 2)) + i;
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className={pageNum === currentPage ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  {pageNum + 1}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasMore}
          >
            Suivant
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
