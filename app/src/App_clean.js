import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';

// Components 3D
import Model from './components/3d/Model';
import AnimatedModel from './components/3d/AnimatedModel';
import Ground from './components/3d/Ground';
import LoadingScreen from './components/ui/LoadingScreen';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* Écran de chargement - ACTIVÉ */}
      <LoadingScreen isLoading={false} progress={100} />
      
      <Canvas
        camera={{ 
          position: [30, 20, 30], // 🎯 MODIFIABLE: Position encore plus éloignée pour voir tous les éléments [x, y, z]
          fov: 75 // 🎯 MODIFIABLE: Champ de vision encore plus large
        }}
        shadows
      >
        {/* Lighting - MODIFIABLE - VRAIE AMBIANCE NOCTURNE */}
        <ambientLight intensity={0.1} /> {/* 🎯 MODIFIABLE: Éclairage ambiant très faible pour vraie nuit */}
        
        {/* Éclairage directionnel pour simuler la lune */}
        <directionalLight
          position={[10, 20, 10]} // 🎯 MODIFIABLE: Position plus haute comme la lune
          intensity={0.2} // 🎯 MODIFIABLE: Intensité très faible pour vraie nuit
          color="#b8c6db" // 🎯 MODIFIABLE: Couleur bleutée comme la lune
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />
        
        {/* 💡 LAMPADAIRES - Lumières ponctuelles pour simuler les lampadaires */}
        {/* Lampadaire 1 - Près de la voiture */}
        <pointLight
          position={[15, 8, -10]} // 🎯 MODIFIABLE: Position du lampadaire 1
          intensity={5} // 🎯 MODIFIABLE: Intensité très forte pour bien éclairer
          color="#ffa500" // 🎯 MODIFIABLE: Couleur orangée des lampadaires
          distance={30} // 🎯 MODIFIABLE: Portée augmentée
          decay={1} // 🎯 MODIFIABLE: Atténuation réduite pour plus de portée
          castShadow
        />
        
        {/* Lampadaire 2 - Côté parking */}
        <pointLight
          position={[-15, 8, 5]} // 🎯 MODIFIABLE: Position du lampadaire 2
          intensity={5}
          color="#ffa500"
          distance={30}
          decay={1}
          castShadow
        />
        
        {/* Lampadaire 3 - Arrière de la scène */}
        <pointLight
          position={[5, 8, 15]} // 🎯 MODIFIABLE: Position du lampadaire 3
          intensity={4}
          color="#ffa500"
          distance={25}
          decay={1}
          castShadow
        />
        
        {/* Lampadaire 4 - Entrée du parking */}
        <pointLight
          position={[-10, 8, -15]} // 🎯 MODIFIABLE: Position du lampadaire 4
          intensity={4}
          color="#ffa500"
          distance={25}
          decay={1}
          castShadow
        />
        
        {/* Environment - MODIFIABLE */}
        <Environment preset="night" /> {/* 🎯 MODIFIABLE: Vraie ambiance nocturne */}
        
        {/* Controls - MODIFIABLE */}
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={10} // 🎯 MODIFIABLE: Distance min de zoom augmentée
          maxDistance={80} // 🎯 MODIFIABLE: Distance max de zoom augmentée
          maxPolarAngle={Math.PI / 2.2} // 🎯 MODIFIABLE: Limite la rotation verticale
          target={[0, 5, 0]} // 🎯 MODIFIABLE: Point central de rotation plus haut [x, y, z]
        />
        
        {/* Scene content */}
        <Suspense fallback={null}>
          {/* 🏠 SOL/PARKING - VRAIE AMBIANCE NOCTURNE */}
          <Ground 
            size={80} // 🎯 MODIFIABLE: Taille du sol beaucoup plus grande (80x80)
            color="#1a1a1a" // 🎯 MODIFIABLE: Couleur très sombre pour vraie nuit
            position={[0, -0.1, 0]} // 🎯 MODIFIABLE: Position [x, y, z]
          />
          
          {/* 🏢 PARKING - Votre modèle .glb */}
          <Model 
            modelPath="/models/static/Parking Lot.glb"
            position={[0, 0, 0]} // 🎯 MODIFIABLE: Position [x, y, z]
            scale={[15, 15, 15]} // 🎯 MODIFIABLE: Échelle encore plus grande [x, y, z]
            rotation={[0, 0, 0]} // 🎯 MODIFIABLE: Rotation [x, y, z]
          />
          
          {/* 🚗 VOITURE NISSAN SKYLINE GTR R33 - Votre nouveau modèle .glb */}
          <Model 
            modelPath="/models/static/nissan_skyline_gtr_r33.glb"
            position={[20, 0.3, -6]} // 🎯 MODIFIABLE: Position à gauche du zombie [x, y, z]
            scale={2} // 🎯 MODIFIABLE: Même échelle que le zombie
            rotation={[0, Math.PI / 2, 0]} // 🎯 MODIFIABLE: Rotation [x, y, z]
          />
          
          {/* 🧟‍♂️ ZOMBIE ANIMÉ - Votre modèle .glb */}
          <AnimatedModel 
            modelPath="/models/animated/Zombie.glb"
            position={[16, 0.3, -11]} // 🎯 MODIFIABLE: Position [x, y, z]
            scale={0.8} // 🎯 MODIFIABLE: Échelle très réduite
            rotation={[0, 25, 0]} // 🎯 MODIFIABLE: Rotation [x, y, z]
            autoPlay={true} // 🎯 MODIFIABLE: Animation automatique activée
            // animationName supprimé pour utiliser la première animation disponible
          />
        </Suspense>
        
        {/* Ombres au sol - MODIFIABLE - AMBIANCE NOCTURNE */}
        <ContactShadows 
          position={[0, -0.05, 0]} // 🎯 MODIFIABLE: Position des ombres [x, y, z]
          opacity={0.8} // 🎯 MODIFIABLE: Opacité plus forte pour la nuit
          scale={60} // 🎯 MODIFIABLE: Taille de la zone d'ombres augmentée
          blur={1.5} // 🎯 MODIFIABLE: Ombres plus nettes pour les lampadaires
          far={12} // 🎯 MODIFIABLE: Distance des ombres
          color="#000000" // 🎯 MODIFIABLE: Ombres noires pour la nuit
        />
      </Canvas>
    </div>
  );
}

export default App;
