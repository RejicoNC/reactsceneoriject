// Données de planètes en dur pour éviter les problèmes d'API
const PLANETS_DATA = [
  {
    id: 'mercury',
    name: 'Mercury',
    radius: 2439.7,
    distance: 57909050,
    period: 87.97,
    modelPath: '/models/planete/Mercury.glb'
  },
  {
    id: 'venus',
    name: 'Venus',
    radius: 6051.8,
    distance: 108208000,
    period: 224.7,
    modelPath: '/models/planete/Venus.glb'
  },
  {
    id: 'mars',
    name: 'Mars',
    radius: 3396.2,
    distance: 227939200,
    period: 686.98,
    modelPath: '/models/planete/Mars.glb'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    radius: 71492,
    distance: 778299000,
    period: 4332.59,
    modelPath: '/models/planete/Jupiter.glb'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    radius: 60268,
    distance: 1427000000,
    period: 10759.22,
    modelPath: '/models/planete/Saturn.glb'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    radius: 25559,
    distance: 2871000000,
    period: 30688.5,
    modelPath: '/models/planete/Uranus.glb'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    radius: 24764,
    distance: 4495000000,
    period: 60182,
    modelPath: '/models/planete/Neptune.glb'
  },
  {
    id: 'moon',
    name: 'Moon',
    radius: 1737.4,
    distance: 384400,
    period: 27.32,
    modelPath: '/models/planete/Moon.glb'
  }
];

export default function usePlanetsDataLocal() {
  // Simulation d'un état de chargement pour maintenir la même interface
  const loading = false;
  const error = null;
  const planets = PLANETS_DATA;

  console.log('🪐 Utilisation des données planétaires locales:', planets.length, 'planètes');

  return { planets, loading, error };
}