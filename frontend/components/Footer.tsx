import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold">Custom My Ride</span>
            </div>
            <p className="text-gray-400 text-sm">
              Spécialistes de l'acquisition et de la restauration de voitures de collection depuis plus de 15 ans.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-500">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Restauration Complète</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Acquisition sur Commande</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Expertise & Évaluation</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Maintenance Spécialisée</Link></li>
            </ul>
          </div>

          {/* Catalogue */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-500">Catalogue</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalogue?country=DE" className="text-gray-400 hover:text-white transition-colors">Voitures Allemandes</Link></li>
              <li><Link to="/catalogue?country=IT" className="text-gray-400 hover:text-white transition-colors">Voitures Italiennes</Link></li>
              <li><Link to="/catalogue?country=FR" className="text-gray-400 hover:text-white transition-colors">Voitures Françaises</Link></li>
              <li><Link to="/catalogue?country=GB" className="text-gray-400 hover:text-white transition-colors">Voitures Anglaises</Link></li>
              <li><Link to="/catalogue?country=US" className="text-gray-400 hover:text-white transition-colors">Voitures Américaines</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-500">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-500" />
                <span className="text-gray-400">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-500" />
                <span className="text-gray-400">contact@custommyride.fr</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                <span className="text-gray-400">
                  123 Avenue des Collectionneurs<br />
                  75001 Paris, France
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Custom My Ride. Tous droits réservés. | 
            <Link to="/mentions-legales" className="hover:text-white ml-1">Mentions légales</Link> | 
            <Link to="/politique-confidentialite" className="hover:text-white ml-1">Politique de confidentialité</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
