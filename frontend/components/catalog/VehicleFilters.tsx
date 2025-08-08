import { useQuery } from '@tanstack/react-query';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import backend from '~backend/client';

interface VehicleFiltersProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
}

export default function VehicleFilters({ filters, onFiltersChange }: VehicleFiltersProps) {
  const { data: countriesData } = useQuery({
    queryKey: ['countries'],
    queryFn: () => backend.vehicle.listCountries()
  });

  const { data: brandsData } = useQuery({
    queryKey: ['brands', filters.country_id],
    queryFn: () => backend.vehicle.listBrands({ country_id: filters.country_id })
  });

  const { data: typesData } = useQuery({
    queryKey: ['vehicle-types'],
    queryFn: () => backend.vehicle.listVehicleTypes()
  });

  const countries = countriesData?.countries || [];
  const brands = brandsData?.brands || [];
  const types = typesData?.types || [];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    
    // Reset brand when country changes
    if (key === 'country_id') {
      newFilters.brand_id = undefined;
    }
    
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({
      country_id: undefined,
      brand_id: undefined,
      type_id: undefined,
      year_min: undefined,
      year_max: undefined,
      price_min: undefined,
      price_max: undefined,
      rarity_level: undefined,
      available_only: true,
      search: undefined,
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== undefined && value !== '' && value !== true
  ).length;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtres
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Recherche</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Nom du véhicule ou marque..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value || undefined)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label>Pays d'origine</Label>
          <Select
            value={filters.country_id?.toString() || ''}
            onValueChange={(value) => handleFilterChange('country_id', value ? parseInt(value) : undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous les pays" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les pays</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id.toString()}>
                  {country.flag_emoji} {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <Label>Marque</Label>
          <Select
            value={filters.brand_id?.toString() || ''}
            onValueChange={(value) => handleFilterChange('brand_id', value ? parseInt(value) : undefined)}
            disabled={!filters.country_id}
          >
            <SelectTrigger>
              <SelectValue placeholder="Toutes les marques" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les marques</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id.toString()}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label>Type de véhicule</Label>
          <Select
            value={filters.type_id?.toString() || ''}
            onValueChange={(value) => handleFilterChange('type_id', value ? parseInt(value) : undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year Range */}
        <div className="space-y-2">
          <Label>Année</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="De"
              value={filters.year_min || ''}
              onChange={(e) => handleFilterChange('year_min', e.target.value ? parseInt(e.target.value) : undefined)}
              min="1900"
              max="2024"
            />
            <Input
              type="number"
              placeholder="À"
              value={filters.year_max || ''}
              onChange={(e) => handleFilterChange('year_max', e.target.value ? parseInt(e.target.value) : undefined)}
              min="1900"
              max="2024"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Prix estimé (€)</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.price_min || ''}
              onChange={(e) => handleFilterChange('price_min', e.target.value ? parseInt(e.target.value) : undefined)}
              min="0"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.price_max || ''}
              onChange={(e) => handleFilterChange('price_max', e.target.value ? parseInt(e.target.value) : undefined)}
              min="0"
            />
          </div>
        </div>

        {/* Rarity */}
        <div className="space-y-2">
          <Label>Niveau de rareté</Label>
          <Select
            value={filters.rarity_level?.toString() || ''}
            onValueChange={(value) => handleFilterChange('rarity_level', value ? parseInt(value) : undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous niveaux" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous niveaux</SelectItem>
              <SelectItem value="1">⭐ Commune</SelectItem>
              <SelectItem value="2">⭐⭐ Peu commune</SelectItem>
              <SelectItem value="3">⭐⭐⭐ Rare</SelectItem>
              <SelectItem value="4">⭐⭐⭐⭐ Très rare</SelectItem>
              <SelectItem value="5">⭐⭐⭐⭐⭐ Ultra rare</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Availability */}
        <div className="space-y-2">
          <Label>Disponibilité</Label>
          <Select
            value={filters.available_only ? 'true' : 'false'}
            onValueChange={(value) => handleFilterChange('available_only', value === 'true')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Disponibles uniquement</SelectItem>
              <SelectItem value="false">Tous les véhicules</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
