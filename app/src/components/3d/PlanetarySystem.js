import React, { useRef, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text } from '@react-three/drei';
import usePlanetsDataLocal from '../../hooks/usePlanetsDataLocal';

// Composant pour une planète individuelle
function Planet({ planet, position, onHover, onLeave, onClick, isHovered, scale = 1 }) {
  const ref = useRef();
  
  // Chargement du modèle 3D réel avec hook correctement utilisé
  const gltf = useGLTF(planet.modelPath || '/models/planete/Mercury.glb');
  const scene = gltf?.scene;
  
  // Animation de rotation et mouvement vers le parking au survol
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;
      
      // Mouvement vers le parking (centre) au survol
      if (isHovered) {
        // Calculer la direction vers le centre (parking)
        const currentPos = ref.current.position;
        const targetPos = [position[0] * 0.7, position[1], position[2] * 0.7]; // 30% plus proche du centre
        
        // Interpolation douce vers la nouvelle position
        ref.current.position.x += (targetPos[0] - currentPos.x) * delta * 2;
        ref.current.position.z += (targetPos[2] - currentPos.z) * delta * 2;
      } else {
        // Retour à la position originale
        ref.current.position.x += (position[0] - ref.current.position.x) * delta * 2;
        ref.current.position.z += (position[2] - ref.current.position.z) * delta * 2;
      }
    }
  });

  return (
    <group position={position}>
      {/* Planète avec mouvement vers le parking */}
      <group
        ref={ref}
        scale={scale}
        onPointerEnter={() => onHover(planet)}
        onPointerLeave={onLeave}
        onClick={() => onClick(planet)}
      >
        {scene ? (
          // Modèle 3D si disponible
          <primitive object={scene.clone()} />
        ) : (
          // Sphère de fallback colorée par planète
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color={getPlanetColor(planet.name)}
              emissive={getPlanetColor(planet.name)}
              emissiveIntensity={0.3}
              metalness={0.1}
              roughness={0.7}
            />
          </mesh>
        )}
        
        {/* Étiquette avec le nom de la planète */}
        <Text
          position={[0, 2, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {planet.name}
        </Text>
      </group>
    </group>
  );
}

// Couleurs de fallback pour les planètes
function getPlanetColor(planetName) {
  const colors = {
    Mercury: '#8C7853',
    Venus: '#FFC649',
    Earth: '#6B93D6',
    Mars: '#CD5C5C',
    Jupiter: '#D8CA9D',
    Saturn: '#FAD5A5',
    Uranus: '#4FD0E7',
    Neptune: '#4B70DD',
    Moon: '#C0C0C0'
  };
  return colors[planetName] || '#888888';
}

// Composant principal du système planétaire
export default function PlanetarySystem({ onPlanetSelect }) {
  const { planets, loading, error } = usePlanetsDataLocal();
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  console.log('PlanetarySystem - État:', { loading, error, planetsCount: planets?.length });

  if (loading) {
    console.log('Chargement des planètes...');
    return (
      <Text
        position={[0, 5, 0]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Chargement planètes...
      </Text>
    );
  }
  
  if (error) {
    console.error('Erreur planètes:', error);
    return (
      <Text
        position={[0, 5, 0]}
        fontSize={1}
        color="red"
        anchorX="center"
        anchorY="middle"
      >
        Erreur: {error}
      </Text>
    );
  }

  if (!planets || planets.length === 0) {
    console.warn('Aucune planète trouvée');
    return (
      <Text
        position={[0, 5, 0]}
        fontSize={1}
        color="yellow"
        anchorX="center"
        anchorY="middle"
      >
        Aucune planète trouvée
      </Text>
    );
  }

  // Positions des planètes autour du parking (plus éloignées)
  const generatePlanetPositions = (planetsCount) => {
    const positions = [];
    const radius = 60; // Rayon plus grand pour être plus éloigné du parking
    const height = 8; // Plus en hauteur pour être visibles
    
    for (let i = 0; i < planetsCount; i++) {
      const angle = (i / planetsCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push([x, height, z]);
    }
    
    return positions;
  };

  const positions = generatePlanetPositions(planets.length);

  // Tailles des planètes (vos valeurs personnalisées)
  const getPlanetScale = (planetName) => {
    const scales = {
      Mercury: 30,    // VOS valeurs
      Venus: 0.1,     // VOS valeurs
      Earth: 6.5,     // VOS valeurs
      Mars: 0.11,     // VOS valeurs
      Jupiter: 0.1,   // VOS valeurs
      Saturn: 9.0,    // VOS valeurs
      Uranus: 7.5,    // VOS valeurs
      Neptune: 7.0,   // VOS valeurs
      Moon: 0.08      // VOS valeurs
    };
    return scales[planetName] || 1.2;
  };

  const handlePlanetHover = (planet) => {
    setHoveredPlanet(planet);
    document.body.style.cursor = 'pointer';
    console.log('Survol planète:', planet.name);
  };

  const handlePlanetLeave = () => {
    setHoveredPlanet(null);
    document.body.style.cursor = 'default';
  };

  const handlePlanetClick = (planet) => {
    if (onPlanetSelect) {
      onPlanetSelect(planet);
    }
    console.log('Clic planète:', planet.name);
  };

  console.log('Rendu planètes:', planets.length);

  return (
    <group>
      {/* Affichage des planètes */}
      <Suspense fallback={null}>
        {planets.map((planet, index) => {
          console.log(`Rendu planète ${index}:`, planet.name, planet.modelPath);
          
          return (
            <Planet
              key={planet.id || planet.name}
              planet={planet}
              position={positions[index]}
              onHover={handlePlanetHover}
              onLeave={handlePlanetLeave}
              onClick={handlePlanetClick}
              isHovered={hoveredPlanet?.id === planet.id}
              scale={getPlanetScale(planet.name)}
            />
          );
        })}
      </Suspense>

      {/* Éclairage spécial pour les planètes */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[20, 20, 20]}
        intensity={1.5}
        castShadow
      />
      {/* Lumières pour bien éclairer tout le pourtour */}
      <pointLight position={[30, 10, 0]} intensity={3} color="#ffffff" />
      <pointLight position={[-30, 10, 0]} intensity={3} color="#ffffff" />
      <pointLight position={[0, 10, 30]} intensity={3} color="#ffffff" />
      <pointLight position={[0, 10, -30]} intensity={3} color="#ffffff" />
    </group>
  );
}

// Préchargement des modèles 3D des planètes
useGLTF.preload('/models/planete/Mercury.glb');
useGLTF.preload('/models/planete/Venus.glb');
useGLTF.preload('/models/planete/Mars.glb');
useGLTF.preload('/models/planete/Jupiter.glb');
useGLTF.preload('/models/planete/Saturn.glb');
useGLTF.preload('/models/planete/Uranus.glb');
useGLTF.preload('/models/planete/Neptune.glb');
useGLTF.preload('/models/planete/Moon.glb');