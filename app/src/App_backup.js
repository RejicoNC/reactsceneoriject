import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';

// Components 3D
import Model from './components/3d/Model';
import AnimatedModel        <h1 style={{ margin: '0 0 10px 0', color: '#ff6b6b' }}>🧟‍♂️ Parking Zombie (Scène Complète)</h1>
        <p style={{ margin: '5px 0', color: '#ff0000' }}>🚗 Voiture rouge avec phares jaunes</p>
        <p style={{ margin: '5px 0', color: '#90EE90' }}>🧟‍♂️ Zombie vert avec yeux rouges</p>
        <p style={{ margin: '5px 0', color: '#ffe66d' }}>🏢 Parking avec lignes blanches</p>
        <p style={{ margin: '5px 0', fontSize: '14px', color: '#a0a0a0' }}>🎮 Glissez pour tourner • Molette pour zoomer</p>m './components/3d/AnimatedModel';
import Ground from './components/3d/Ground';
import LoadingScreen from './components/ui/LoadingScreen';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* Écran de chargement - ACTIVÉ */}
      <LoadingScreen isLoading={false} progress={100} />
      
      <Canvas
        camera={{ 
          position: [20, 12, 20], // 🎯 MODIFIABLE: Position plus éloignée pour voir tous les éléments [x, y, z]
          fov: 65 // 🎯 MODIFIABLE: Champ de vision plus large
        }}
        shadows
      >
        {/* Lighting - MODIFIABLE */}
        <ambientLight intensity={0.4} /> {/* 🎯 MODIFIABLE: Éclairage ambiant (0.1-1.0) */}
        <directionalLight
          position={[15, 15, 8]} // 🎯 MODIFIABLE: Position du soleil [x, y, z]
          intensity={1.2} // 🎯 MODIFIABLE: Intensité de la lumière (0.5-2.0)
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50} // 🎯 MODIFIABLE: Distance des ombres
          shadow-camera-left={-20} // 🎯 MODIFIABLE: Zone d'ombres
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        
        {/* Environment - MODIFIABLE */}
        <Environment preset="city" /> {/* 🎯 MODIFIABLE: city, warehouse, sunset, dawn, night, studio */}
        
        {/* Controls - MODIFIABLE */}
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={5} // 🎯 MODIFIABLE: Distance min de zoom
          maxDistance={40} // 🎯 MODIFIABLE: Distance max de zoom
          maxPolarAngle={Math.PI / 2.2} // 🎯 MODIFIABLE: Limite la rotation verticale
          target={[0, 2, 0]} // 🎯 MODIFIABLE: Point central de rotation [x, y, z]
        />
        
        {/* Scene content */}
        <Suspense fallback={null}>
          {/* 🏠 SOL/PARKING - MODIFIABLE */}
          <Ground 
            size={30} // 🎯 MODIFIABLE: Taille du parking (30x30)
            color="#404040" // 🎯 MODIFIABLE: Couleur gris foncé parking
            position={[0, -0.1, 0]} // 🎯 MODIFIABLE: Position [x, y, z]
          />
          
          {/* 🏢 PARKING (Modèle temporaire) - REMPLACER PAR VOTRE .GLB */}
          <mesh position={[0, 1, 0]} castShadow receiveShadow>
            <boxGeometry args={[15, 2, 10]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
          <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[16, 1, 11]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
          
          {/* Lignes de parking */}
          <mesh position={[-4, 0.01, 2]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[0.2, 4]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 0.01, 2]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[0.2, 4]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[4, 0.01, 2]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[0.2, 4]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          
          {/* Réverbère */}
          <group position={[10, 0, 8]}>
            <mesh position={[0, 2.5, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 5]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
            <mesh position={[0, 4.8, 0]} castShadow>
              <sphereGeometry args={[0.3]} />
              <meshStandardMaterial color="#ffff99" emissive="#ffff99" emissiveIntensity={0.5} />
            </mesh>
          </group>
          
          {/* 🚗 VOITURE (Modèle temporaire) - REMPLACER PAR VOTRE .GLB */}
          <group position={[-6, 1, 3]} rotation={[0, Math.PI / 6, 0]} scale={2}>
            {/* Carrosserie principale */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[3, 0.8, 1.5]} />
              <meshStandardMaterial color="#ff0000" />
            </mesh>
            {/* Toit */}
            <mesh position={[0, 1, -0.1]} castShadow receiveShadow>
              <boxGeometry args={[1.8, 0.6, 1.2]} />
              <meshStandardMaterial color="#cc0000" />
            </mesh>
            {/* Capot */}
            <mesh position={[1.2, 0.1, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.6, 0.4, 1.5]} />
              <meshStandardMaterial color="#dd0000" />
            </mesh>
            {/* Roues - plus visibles */}
            <mesh position={[1, -0.2, 0.6]} castShadow receiveShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.2]} rotation={[Math.PI/2, 0, 0]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[-1, -0.2, 0.6]} castShadow receiveShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.2]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[1, -0.2, -0.6]} castShadow receiveShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.2]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[-1, -0.2, -0.6]} castShadow receiveShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.2]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            {/* Phares */}
            <mesh position={[1.6, 0.3, 0.5]} castShadow>
              <sphereGeometry args={[0.15]} />
              <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[1.6, 0.3, -0.5]} castShadow>
              <sphereGeometry args={[0.15]} />
              <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.3} />
            </mesh>
          </group>
          
          {/* 🧟‍♂️ ZOMBIE (Modèle temporaire) - REMPLACER PAR VOTRE .GLB */}
          <group position={[8, 1, -4]} rotation={[0, -Math.PI / 4, 0]} scale={2}>
            {/* Corps principal */}
            <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.4, 0.5, 2]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Tête */}
            <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
              <sphereGeometry args={[0.5]} />
              <meshStandardMaterial color="#90EE90" />
            </mesh>
            {/* Bras gauche - plus visible */}
            <mesh position={[-0.8, 1.5, 0]} rotation={[0, 0, 0.8]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.2, 1.2]} />
              <meshStandardMaterial color="#90EE90" />
            </mesh>
            {/* Bras droit - plus visible */}
            <mesh position={[0.8, 1.5, 0]} rotation={[0, 0, -0.8]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.2, 1.2]} />
              <meshStandardMaterial color="#90EE90" />
            </mesh>
            {/* Jambe gauche */}
            <mesh position={[-0.3, 0.4, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.2, 0.25, 1.2]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            {/* Jambe droite */}
            <mesh position={[0.3, 0.4, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.2, 0.25, 1.2]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            {/* Yeux rouges brillants */}
            <mesh position={[-0.15, 2.6, 0.4]} castShadow>
              <sphereGeometry args={[0.08]} />
              <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1} />
            </mesh>
            <mesh position={[0.15, 2.6, 0.4]} castShadow>
              <sphereGeometry args={[0.08]} />
              <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1} />
            </mesh>
            {/* Bouche */}
            <mesh position={[0, 2.3, 0.4]} castShadow>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            {/* Cheveux décoiffés */}
            <mesh position={[0, 2.8, 0]} castShadow>
              <sphereGeometry args={[0.3]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
          </group>
          
          {/* 
          🎯 DÉCOMMENTEZ CES LIGNES QUAND VOUS AJOUTEREZ VOS MODÈLES .GLB :
          
          <Model 
            modelPath="/models/static/parking.glb"
            position={[0, 0, 0]}
            scale={[1, 1, 1]}
            rotation={[0, 0, 0]}
          />
          
          <Model 
            modelPath="/models/static/car.glb"
            position={[-3, 0, 2]}
            scale={1.2}
            rotation={[0, Math.PI / 4, 0]}
          />
          
          <AnimatedModel 
            modelPath="/models/animated/zombie.glb"
            position={[4, 0, -2]}
            scale={1.5}
            rotation={[0, -Math.PI / 3, 0]}
            autoPlay={false}
            animationName="walk"
          />
          */}
        </Suspense>
        
        {/* Ombres au sol - MODIFIABLE */}
        <ContactShadows 
          position={[0, -0.05, 0]} // 🎯 MODIFIABLE: Position des ombres [x, y, z]
          opacity={0.6} // 🎯 MODIFIABLE: Opacité des ombres (0-1)
          scale={25} // 🎯 MODIFIABLE: Taille de la zone d'ombres
          blur={2} // 🎯 MODIFIABLE: Flou des ombres (1-3)
          far={8} // 🎯 MODIFIABLE: Distance des ombres
        />
      </Canvas>
      
      {/* UI overlay - MODIFIABLE */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        fontSize: '20px', // 🎯 MODIFIABLE: Taille du texte
        fontFamily: 'Arial, sans-serif',
        pointerEvents: 'none',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)', // 🎯 MODIFIABLE: Ombre du texte
        backgroundColor: 'rgba(0,0,0,0.3)', // 🎯 MODIFIABLE: Fond semi-transparent
        padding: '15px',
        borderRadius: '10px'
      }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#ff6b6b' }}>🧟‍♂️ Parking Zombie (Demo)</h1>
        <p style={{ margin: '5px 0', color: '#4ecdc4' }}>🚗 Modèles temporaires en attendant vos .glb</p>
        <p style={{ margin: '5px 0', color: '#ffe66d' }}>� Ajoutez vos fichiers dans public/models/</p>
        <p style={{ margin: '5px 0', fontSize: '14px', color: '#a0a0a0' }}>🎮 Glissez pour tourner • Molette pour zoomer</p>
      </div>
      
      {/* Instructions d'ajout de modèles */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        color: 'white',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        pointerEvents: 'none',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '10px',
        borderRadius: '8px',
        maxWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#ffd93d' }}>📋 Pour ajouter vos modèles :</h3>
        <p style={{ margin: '3px 0', color: '#4ecdc4' }}>1. Placez parking.glb dans public/models/static/</p>
        <p style={{ margin: '3px 0', color: '#4ecdc4' }}>2. Placez car.glb dans public/models/static/</p>
        <p style={{ margin: '3px 0', color: '#4ecdc4' }}>3. Placez zombie.glb dans public/models/animated/</p>
        <p style={{ margin: '3px 0', color: '#ff6b6b' }}>4. Décommentez le code dans App.js</p>
      </div>
    </div>
  );
}

export default App;
