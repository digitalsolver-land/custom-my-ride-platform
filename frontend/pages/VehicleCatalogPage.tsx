import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import VehicleFilters from '../components/catalog/VehicleFilters';
import VehicleGrid from '../components/catalog/VehicleGrid';
import backend from '~backend/client';

export default function VehicleCatalogPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    country_id: undefined as number | undefined,
    brand_id: undefined as number | undefined,
    type_id: undefined as number | undefined,
    year_min: undefined as number | undefined,
    year_max: undefined as number | undefined,
    price_min: undefined as number | undefined,
    price_max: undefined as number | undefined,
    rarity_level: undefined as number | undefined,
    available_only: true,
    search: undefined as string | undefined,
  });

  const [currentPage, setCurrentPage] = useState(0);
  const limit = 12;

  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters = {
      country_id: searchParams.get('country') ? parseInt(searchParams.get('country')!) : undefined,
      brand_id: searchParams.get('brand') ? parseInt(searchParams.get('brand')!) : undefined,
      type_id: searchParams.get('type') ? parseInt(searchParams.get('type')!) : undefined,
      year_min: searchParams.get('year_min') ? parseInt(searchParams.get('year_min')!) : undefined,
      year_max: searchParams.get('year_max') ? parseInt(searchParams.get('year_max')!) : undefined,
      price_min: searchParams.get('price_min') ? parseInt(searchParams.get('price_min')!) : undefined,
      price_max: searchParams.get('price_max') ? parseInt(searchParams.get('price_max')!) : undefined,
      rarity_level: searchParams.get('rarity') ? parseInt(searchParams.get('rarity')!) : undefined,
      available_only: searchParams.get('available') !== 'false',
      search: searchParams.get('search') || undefined,
    };
    setFilters(initialFilters);
  }, [searchParams]);

  const { data: vehiclesData, isLoading, error } = useQuery({
    queryKey: ['vehicles', filters, currentPage],
    queryFn: async () => {
      try {
        console.log('Fetching vehicles with filters:', filters);
        const result = await backend.vehicle.listVehicles({
          ...filters,
          limit,
          offset: currentPage * limit
        });
        console.log('Vehicles result:', result);
        return result;
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        throw err;
      }
    },
    retry: 2,
    retryDelay: 1000,
  });

  const handleFilterChange = (newFilters: any) => {
    console.log('Filter change:', newFilters);
    setFilters(newFilters);
    setCurrentPage(0);
  };

  console.log('Render state:', { isLoading, error, vehiclesData, filters });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Catalogue de Véhicules de Collection</h1>
          <p className="text-xl text-gray-300">
            Découvrez notre sélection exceptionnelle de voitures de collection du monde entier.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <VehicleFilters 
              filters={filters} 
              onFiltersChange={handleFilterChange}
            />
          </div>

          {/* Vehicle Grid */}
          <div className="lg:w-3/4">
            {error ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Erreur de chargement</h3>
                <p className="text-gray-600">
                  Impossible de charger les véhicules. 
                  {error instanceof Error && (
                    <span className="block text-sm mt-2 text-red-600">
                      Détail: {error.message}
                    </span>
                  )}
                </p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Réessayer
                </button>
              </div>
            ) : (
              <VehicleGrid
                vehicles={vehiclesData?.vehicles || []}
                total={vehiclesData?.total || 0}
                hasMore={vehiclesData?.has_more || false}
                isLoading={isLoading}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                limit={limit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
