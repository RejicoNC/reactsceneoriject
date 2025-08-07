import React from 'react';

/**
 * Composant pour créer un sol/terrain dans la scène 3D
 * @param {number} size - Taille du sol
 * @param {string} color - Couleur du sol
 * @param {array} position - Position du sol
 */
function Ground({ size = 20, color = "#f0f0f0", position = [0, -1, 0] }) {
  return (
    <mesh 
      position={position} 
      rotation={[-Math.PI / 2, 0, 0]} 
      receiveShadow
    >
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Ground;
