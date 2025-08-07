import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';

/**
 * Composant pour les modèles 3D animés
 * @param {string} modelPath - Chemin vers le fichier .glb avec animations
 * @param {array} position - Position [x, y, z] du modèle
 * @param {number|array} scale - Échelle du modèle
 * @param {array} rotation - Rotation [x, y, z] du modèle en radians
 * @param {boolean} autoPlay - Lecture automatique de l'animation
 * @param {string} animationName - Nom spécifique de l'animation à jouer
 */
function AnimatedModel({ 
  modelPath, 
  position = [0, 0, 0], 
  scale = 1,
  rotation = [0, 0, 0], 
  autoPlay = false,
  animationName = null,
  ...props 
}) {
  const ref = useRef();
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentAnimation, setCurrentAnimation] = useState(null);
  
  const { scene, animations } = useGLTF(modelPath);
  const { actions, names } = useAnimations(animations, ref);

  // Effet pour gérer la lecture des animations
  useEffect(() => {
    if (actions && names.length > 0) {
      console.log('🎬 Animations disponibles:', names);
      console.log('🎭 Actions disponibles:', Object.keys(actions));
      
      // Si un nom d'animation spécifique est fourni, l'utiliser
      const animToPlay = animationName && actions[animationName] 
        ? animationName 
        : names[0]; // Sinon, prendre la première animation disponible

      console.log('🎯 Animation sélectionnée:', animToPlay);
      setCurrentAnimation(animToPlay);

      if (autoPlay && actions[animToPlay]) {
        console.log('▶️ Démarrage automatique de l\'animation:', animToPlay);
        actions[animToPlay].play();
        setIsPlaying(true);
      }
    } else {
      console.log('❌ Aucune animation trouvée dans le modèle');
    }
  }, [actions, names, animationName, autoPlay]);

  // Fonction pour démarrer/arrêter l'animation
  const toggleAnimation = () => {
    if (currentAnimation && actions[currentAnimation]) {
      if (isPlaying) {
        actions[currentAnimation].stop();
        setIsPlaying(false);
      } else {
        actions[currentAnimation].play();
        setIsPlaying(true);
      }
    }
  };

  // Gestion du clic pour démarrer l'animation
  const handleClick = (event) => {
    event.stopPropagation();
    toggleAnimation();
  };

  // Animation continue (rotation douce si aucune animation n'est en cours)
  useFrame((state, delta) => {
    if (ref.current && !isPlaying) {
      ref.current.rotation.y += delta * 0.1; // Rotation lente
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation} // Rotation initiale appliquée
      onClick={handleClick}
      castShadow
      receiveShadow
      {...props}
    />
  );
}

export default AnimatedModel;

// Fonction de préchargement pour optimiser le loading
export const preloadAnimatedModel = (modelPath) => {
  useGLTF.preload(modelPath);
};
