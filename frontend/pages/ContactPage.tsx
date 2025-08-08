import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import backend from '~backend/client';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    service_type_id: '',
    client_name: '',
    client_email: '',
    client_phone: '',
    vehicle_details: '',
    budget_min: '',
    budget_max: '',
    timeline_months: '',
    description: ''
  });

  const createRequestMutation = useMutation({
    mutationFn: (data: any) => backend.service.createServiceRequest(data),
    onSuccess: () => {
      toast({
        title: "Demande envoyée !",
        description: "Nous vous contacterons dans les plus brefs délais.",
      });
      setFormData({
        service_type_id: '',
        client_name: '',
        client_email: '',
        client_phone: '',
        vehicle_details: '',
        budget_min: '',
        budget_max: '',
        timeline_months: '',
        description: ''
      });
    },
    onError: (error) => {
      console.error('Error creating service request:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      service_type_id: parseInt(formData.service_type_id),
      budget_min: formData.budget_min ? parseInt(formData.budget_min) : undefined,
      budget_max: formData.budget_max ? parseInt(formData.budget_max) : undefined,
      timeline_months: formData.timeline_months ? parseInt(formData.timeline_months) : undefined,
    };

    createRequestMutation.mutate(submitData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Contactez-nous</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Prêt à concrétiser votre projet automobile ? Nos experts sont là pour vous accompagner.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Demande de Devis</CardTitle>
                <p className="text-gray-600">
                  Remplissez ce formulaire pour recevoir un devis personnalisé pour votre projet.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="client_name">Nom complet *</Label>
                      <Input
                        id="client_name"
                        value={formData.client_name}
                        onChange={(e) => handleInputChange('client_name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client_email">Email *</Label>
                      <Input
                        id="client_email"
                        type="email"
                        value={formData.client_email}
                        onChange={(e) => handleInputChange('client_email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="client_phone">Téléphone</Label>
                      <Input
                        id="client_phone"
                        type="tel"
                        value={formData.client_phone}
                        onChange={(e) => handleInputChange('client_phone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service_type_id">Type de service *</Label>
                      <Select
                        value={formData.service_type_id}
                        onValueChange={(value) => handleInputChange('service_type_id', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Restauration Complète</SelectItem>
                          <SelectItem value="2">Acquisition sur Commande</SelectItem>
                          <SelectItem value="3">Expertise et Évaluation</SelectItem>
                          <SelectItem value="4">Maintenance Spécialisée</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicle_details">Détails du véhicule</Label>
                    <Input
                      id="vehicle_details"
                      placeholder="Ex: Porsche 911 Carrera 1973, Ferrari 308 GTB..."
                      value={formData.vehicle_details}
                      onChange={(e) => handleInputChange('vehicle_details', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="budget_min">Budget minimum (€)</Label>
                      <Input
                        id="budget_min"
                        type="number"
                        value={formData.budget_min}
                        onChange={(e) => handleInputChange('budget_min', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget_max">Budget maximum (€)</Label>
                      <Input
                        id="budget_max"
                        type="number"
                        value={formData.budget_max}
                        onChange={(e) => handleInputChange('budget_max', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline_months">Délai souhaité (mois)</Label>
                      <Input
                        id="timeline_months"
                        type="number"
                        value={formData.timeline_months}
                        onChange={(e) => handleInputChange('timeline_months', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description du projet</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      placeholder="Décrivez votre projet en détail..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={createRequestMutation.isPending}
                  >
                    {createRequestMutation.isPending ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer la demande
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-red-500 mt-1" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-red-500 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">contact@custommyride.fr</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-red-500 mt-1" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-gray-600">
                      123 Avenue des Collectionneurs<br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horaires d'Ouverture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-red-500" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span className="text-gray-600">8h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi</span>
                      <span className="text-gray-600">9h00 - 17h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span className="text-gray-600">Fermé</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visite de l'Atelier</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Venez découvrir notre atelier et rencontrer notre équipe d'experts.
                </p>
                <Button variant="outline" className="w-full">
                  Prendre Rendez-vous
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
