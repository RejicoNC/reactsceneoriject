import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Model, AnimatedModel, Ground } from '../components/3d';
import LoadingScreen from '../components/ui/LoadingScreen';
import { useModelPreloader } from '../hooks/useModelPreloader';

/**
 * Exemple d'utilisation complète de la scène 3D
 * Ce fichier montre comment utiliser tous les composants ensemble
 */
function Scene3DExample() {
  // Liste des modèles à précharger
  const modelPaths = [
    '/models/static/model1.glb',
    '/models/static/model2.glb',
    '/models/static/model3.glb',
    '/models/animated/animated-model.glb'
  ];

  const { isLoading, progress } = useModelPreloader(modelPaths);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* Écran de chargement */}
      <LoadingScreen isLoading={isLoading} progress={progress} />
      
      <Canvas
        camera={{ 
          position: [10, 10, 10], 
          fov: 50 
        }}
        shadows
      >
        {/* Éclairage */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Environnement */}
        <Environment preset="warehouse" />
        
        {/* Contrôles de caméra */}
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
        />
        
        {/* Contenu de la scène */}
        <Suspense fallback={null}>
          {/* Sol */}
          <Ground size={20} color="#e0e0e0" position={[0, -1, 0]} />
          
          {/* Modèles statiques */}
          <Model 
            modelPath="/models/static/model1.glb" 
            position={[-4, 0, 0]} 
            scale={1}
          />
          <Model 
            modelPath="/models/static/model2.glb" 
            position={[4, 0, 0]} 
            scale={0.8}
          />
          <Model 
            modelPath="/models/static/model3.glb" 
            position={[0, 0, -4]} 
            scale={1.2}
          />
          
          {/* Modèle animé */}
          <AnimatedModel 
            modelPath="/models/animated/animated-model.glb" 
            position={[0, 0, 4]} 
            scale={1}
            autoPlay={false}
          />
        </Suspense>
        
        {/* Ombres au sol */}
        <ContactShadows 
          position={[0, -0.8, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={1.5} 
          far={4.5} 
        />
      </Canvas>
      
      {/* Interface utilisateur */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        fontSize: '18px',
        fontFamily: 'Arial, sans-serif',
        pointerEvents: 'none',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
      }}>
        <h1>Scène 3D Interactive</h1>
        <p>• Faites glisser pour tourner la caméra</p>
        <p>• Molette pour zoomer</p>
        <p>• Cliquez sur le modèle animé pour démarrer l'animation</p>
      </div>
      
      {/* Contrôles en bas */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        color: 'white',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
      }}>
        <p>Modèles chargés: {modelPaths.length}</p>
        <p>Progression: {Math.round(progress)}%</p>
      </div>
    </div>
  );
}

export default Scene3DExample;
