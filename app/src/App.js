import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Glitch } from '@react-three/postprocessing';

// Components 3D
import Model from './components/3d/Model';
import AnimatedModel from './components/3d/AnimatedModel';
import Ground from './components/3d/Ground';
import NeonText from './components/3d/NeonText';
import LoadingScreen from './components/ui/LoadingScreen';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000000' }}>
      {/* Écran de chargement - ACTIVÉ */}
      <LoadingScreen isLoading={false} progress={100} />
      
      <Canvas
        camera={{ 
          position: [30, 20, 30], // 🎯 MODIFIABLE: Position encore plus éloignée pour voir tous les éléments [x, y, z]
          fov: 75 // 🎯 MODIFIABLE: Champ de vision encore plus large
        }}
        shadows
        gl={{ alpha: false, antialias: true }}
        style={{ backgroundColor: '#000000' }}
      >
        {/* Lighting - MODIFIABLE - VRAIE AMBIANCE NOCTURNE AMÉLIORÉE */}
        <ambientLight intensity={0.2} /> {/* 🎯 MODIFIABLE: Éclairage ambiant légèrement augmenté pour voir les effets */}
        
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
          intensity={15} // 🎯 MODIFIABLE: Intensité beaucoup plus forte
          color="#ffaa33" // 🎯 MODIFIABLE: Couleur plus chaude et visible
          distance={35} // 🎯 MODIFIABLE: Portée plus grande
          decay={0.5} // 🎯 MODIFIABLE: Atténuation encore plus réduite
          castShadow
        />
        
        {/* Lampadaire 2 - Côté parking */}
        <pointLight
          position={[-15, 8, 5]} // 🎯 MODIFIABLE: Position du lampadaire 2
          intensity={15}
          color="#ffaa33"
          distance={35}
          decay={0.5}
          castShadow
        />
        
        {/* Lampadaire 3 - Arrière de la scène */}
        <pointLight
          position={[5, 8, 15]} // 🎯 MODIFIABLE: Position du lampadaire 3
          intensity={12}
          color="#ffaa33"
          distance={30}
          decay={0.5}
          castShadow
        />
        
        {/* Lampadaire 4 - Entrée du parking */}
        <pointLight
          position={[-10, 8, -15]} // 🎯 MODIFIABLE: Position du lampadaire 4
          intensity={12}
          color="#ffaa33"
          distance={30}
          decay={0.5}
          castShadow
        />
        
        {/* 🔦 SPOTS SUPPLÉMENTAIRES pour plus d'éclairage */}
        {/* Spot 1 - Centre parking */}
        <spotLight
          position={[0, 12, 0]} // 🎯 Position centrale haute
          target-position={[0, 0, 0]} // 🎯 Cible le centre
          intensity={8}
          color="#ffaa33"
          angle={Math.PI / 3} // 🎯 Angle du cône de lumière
          penumbra={0.5} // 🎯 Douceur des bords
          distance={40}
          decay={0.5}
          castShadow
        />
        
        {/* Spot 2 - Zone voiture */}
        <spotLight
          position={[20, 10, -5]} // 🎯 Au-dessus de la voiture
          target-position={[20, 0, -6]} // 🎯 Cible la voiture
          intensity={6}
          color="#ffaa33"
          angle={Math.PI / 4}
          penumbra={0.3}
          distance={25}
          decay={0.5}
          castShadow
        />
        
        {/* Background noir complet au lieu d'Environment */}
        <color attach="background" args={['#000000']} />
        
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
          
          {/* ✨ TEXTE NÉON DANS LE CIEL */}
          <NeonText 
            text="RejicoNC - BUT MMI"
            position={[0, 20, -25]}
          />
        </Suspense>
        
        {/* Ombres au sol - MODIFIABLE - AMBIANCE NOCTURNE AMÉLIORÉE */}
        <ContactShadows 
          position={[0, -0.05, 0]} // 🎯 MODIFIABLE: Position des ombres [x, y, z]
          opacity={0.9} // 🎯 MODIFIABLE: Opacité très forte pour contraste
          scale={80} // 🎯 MODIFIABLE: Zone d'ombres encore plus grande
          blur={1} // 🎯 MODIFIABLE: Ombres nettes pour lampadaires
          far={20} // 🎯 MODIFIABLE: Distance des ombres augmentée
          color="#000000" // 🎯 MODIFIABLE: Ombres noires pour la nuit
          resolution={1024} // 🎯 MODIFIABLE: Qualité des ombres
        />
        
        {/* 🌟 EFFETS DE POST-PROCESSING POUR VRAIS EFFETS NÉON */}
        <EffectComposer multisampling={0}>
          {/* Effet Bloom MODÉRÉ pour les halos néon */}
          <Bloom
            intensity={0.8} // 🎯 Intensité réduite pour lisibilité
            kernelSize={2} // 🎯 Taille réduite
            luminanceThreshold={0.3} // 🎯 Seuil plus élevé pour moins d'effet
            luminanceSmoothing={0.6} // 🎯 Lissage augmenté
            mipmapBlur={true}
          />
          
          {/* Effet Glitch très subtil pour ambiance cyberpunk */}
          <Glitch
            delay={[15, 25]} // 🎯 Délai plus long entre les glitchs
            duration={[0.05, 0.15]} // 🎯 Durée plus courte
            strength={[0.1, 0.2]} // 🎯 Force très réduite
            mode={0}
            active
            ratio={0.9} // 🎯 Ratio plus élevé
          />
          
          {/* ChromaticAberration SUPPRIMÉ - causait le texte bleu */}
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default App;
