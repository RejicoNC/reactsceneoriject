import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

/**
 * Composant pour les modèles 3D statiques (sans animation)
 * @param {string} modelPath - Chemin vers le fichier .glb
 * @param {array} position - Position [x, y, z] du modèle
 * @param {number|array} scale - Échelle du modèle
 * @param {array} rotation - Rotation [x, y, z] du modèle en radians
 * @param {function} onClick - Fonction appelée au clic
 */
function Model({ modelPath, position = [0, 0, 0], scale = 1, rotation = [0, 0, 0], onClick, ...props }) {
  const ref = useRef();
  
  console.log('🚗 Chargement du modèle:', modelPath);
  
  const { scene } = useGLTF(modelPath);
  
  console.log('✅ Modèle chargé:', modelPath, 'Position:', position, 'Scale:', scale);

  return (
    <primitive
      ref={ref}
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
      onClick={onClick}
      castShadow
      receiveShadow
      {...props}
    />
  );
}

export default Model;

// Fonction de préchargement pour optimiser le loading
export const preloadModel = (modelPath) => {
  useGLTF.preload(modelPath);
};
