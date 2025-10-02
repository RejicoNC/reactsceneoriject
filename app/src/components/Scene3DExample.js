import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Model, AnimatedModel, Ground } from '../components/3d';
import NeonText from './3d/NeonText';
import PlanetarySystem from './3d/PlanetarySystem';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

/**
 * Exemple d'utilisation complète de la scène 3D
 * Ce fichier montre comment utiliser tous les composants ensemble
 */

function Scene3DExample() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* Écran de chargement */}
  {/* LoadingScreen désactivé pour test planètes */}
      
      <Canvas
        camera={{
          position: [30, 20, 30],
          fov: 65
        }}
        shadows
      >
        {/* Lighting copied from main App (night scene) */}
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[15, 15, 8]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />

        <pointLight position={[15,8,-10]} intensity={5} color="#ffa500" distance={30} decay={1} castShadow />
        <pointLight position={[-15,8,5]} intensity={5} color="#ffa500" distance={30} decay={1} castShadow />
        <pointLight position={[5,8,15]} intensity={4} color="#ffa500" distance={25} decay={1} castShadow />

        <color attach="background" args={["#000000"]} />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={80}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 5, 0]}
        />

        <Suspense fallback={null}>
          {/* Ground / Parking diorama */}
          <Ground size={80} color="#1a1a1a" position={[0, -0.1, 0]} />

          <Model modelPath="/models/static/Parking Lot.glb" position={[0,0,0]} scale={[15,15,15]} />
          <Model modelPath="/models/static/nissan_skyline_gtr_r33.glb" position={[20,0.3,-6]} scale={2} rotation={[0, Math.PI/2, 0]} />
          {/* Animated zombie if available */}
          <AnimatedModel modelPath="/models/animated/Zombie.glb" position={[16,0.3,-11]} scale={0.8} autoPlay={true} />

          <NeonText text="RejicoNC - BUT MMI" position={[0, 20, -25]} />

          {/* Nouveau système planétaire interactif */}
          <PlanetarySystem onPlanetSelect={setSelectedPlanet} />
        </Suspense>
        
        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom 
            intensity={0.5} 
            luminanceThreshold={0.9} 
            luminanceSmoothing={0.025} 
          />
        </EffectComposer>
        
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
        <p>• Survolez les planètes pour voir un halo</p>
        <p>• Cliquez sur une planète pour ses informations</p>
      </div>

      {/* Panneau d'informations de planète en bas à gauche */}
      {selectedPlanet && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          background: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          minWidth: '300px',
          border: '2px solid #ff0080',
          fontFamily: 'Arial, sans-serif',
          boxShadow: '0 0 20px rgba(255, 0, 128, 0.5)'
        }}>
          <button
            onClick={() => setSelectedPlanet(null)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#ff0080',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '25px',
              height: '25px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ×
          </button>
          
          <h2 style={{ margin: '0 0 15px 0', color: '#ff0080' }}>
            {selectedPlanet.name}
          </h2>
          
          <div style={{ lineHeight: '1.6' }}>
            <p><strong>Rayon:</strong> {selectedPlanet.radius ? `${selectedPlanet.radius.toLocaleString()} km` : 'Non disponible'}</p>
            <p><strong>Distance du Soleil:</strong> {selectedPlanet.distance ? `${selectedPlanet.distance.toLocaleString()} km` : 'Non disponible'}</p>
            <p><strong>Période orbitale:</strong> {selectedPlanet.period ? `${selectedPlanet.period.toFixed(2)} jours` : 'Non disponible'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Scene3DExample;
