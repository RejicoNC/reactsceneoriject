import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

function NeonText({ text = "RejicoNC - BUT MMI", position = [0, 25, -30], ...props }) {
  const textRef = useRef();
  
  // Animation avec VRAI clignotement
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Pulsation de base
    const basePulse = Math.sin(time * 2) * 0.3 + 0.7;
    
    // VRAI clignotement - le texte s'éteint complètement parfois
    const flicker = Math.sin(time * 20) > 0.8 ? 0.1 : 1; // Clignotement rapide
    const randomFlicker = Math.random() > 0.95 ? 0 : 1;   // Extinction aléatoire
    
    // Intensité finale
    const intensity = basePulse * flicker * randomFlicker;
    
    if (textRef.current) {
      textRef.current.material.emissiveIntensity = intensity * 3; // Plus intense sur le seul texte
    }
  });

  return (
    <group {...props} raycast={() => null}>
      {/* Texte principal 3D avec profondeur et visible des 2 côtés */}
      <Text
        ref={textRef}
        position={position}
        fontSize={6}
        color="#ff0080"          // Rose magenta
        anchorX="center"
        anchorY="middle"
        raycast={() => null}
        fillOpacity={1}          // Texte complètement rempli
        // EFFETS 3D
        bevelEnabled={true}      // Active les bords biseautés
        bevelSize={0.1}          // Taille du biseau
        bevelThickness={0.05}    // Épaisseur du biseau
        height={0.3}             // PROFONDEUR 3D du texte
        curveSegments={8}        // Qualité des courbes (plus = plus lisse)
      >
        {text}
        <meshStandardMaterial
          color="#ff0080"
          emissive="#ff0080"     // Couleur émissive rose
          emissiveIntensity={3}  // Très lumineux
          toneMapped={false}
          side={2}               // VISIBLE DES 2 CÔTÉS (DoubleSide)
          metalness={0.2}        // Légèrement métallique pour effet 3D
          roughness={0.3}        // Surface légèrement rugueuse
        />
      </Text>
      
      {/* Lumière rose intense pour créer l'effet de halo dans l'environnement */}
      <pointLight
        position={[position[0], position[1] - 2, position[2] + 3]}
        color="#ff0080"
        intensity={25}           // Plus intense pour compenser la suppression du gros texte
        distance={70}
        decay={1}
      />
      
      {/* Lumière supplémentaire pour plus d'effet */}
      <pointLight
        position={[position[0], position[1], position[2] + 2]}
        color="#ff66aa"          // Rose plus clair
        intensity={15}
        distance={40}
        decay={1.5}
      />
    </group>
  );
}

export default NeonText;
