import { Trophy, Users, Clock, Award } from 'lucide-react';

const stats = [
  {
    icon: Clock,
    value: '15+',
    label: 'Années d\'expérience',
    description: 'dans la restauration automobile'
  },
  {
    icon: Trophy,
    value: '200+',
    label: 'Voitures restaurées',
    description: 'avec excellence et passion'
  },
  {
    icon: Users,
    value: '150+',
    label: 'Clients satisfaits',
    description: 'qui nous font confiance'
  },
  {
    icon: Award,
    value: '98%',
    label: 'Taux de satisfaction',
    description: 'selon nos clients'
  }
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            L'Excellence en Chiffres
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Notre expertise reconnue dans le monde de l'automobile de collection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-red-500 mb-2">{stat.value}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
