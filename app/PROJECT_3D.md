# Projet React Three.js - Mise en Scène 3D

## 🎯 Objectif du Projet
Créer une application React interactive pour mettre en scène des éléments 3D avec des modèles statiques et animés.

## 📦 Dépendances Installées
- `@react-three/fiber` - Interface React pour Three.js
- `@react-three/drei` - Helpers et composants utilitaires pour React Three Fiber
- `three` - Bibliothèque 3D JavaScript

## 🏗️ Structure du Projet

```
src/
├── components/
│   ├── 3d/                     # Composants 3D
│   │   ├── Model.js            # Modèles statiques
│   │   ├── AnimatedModel.js    # Modèles animés
│   │   ├── Ground.js           # Sol/terrain
│   │   └── index.js            # Exports
│   ├── ui/
│   │   └── LoadingScreen.js    # Écran de chargement
│   └── Scene3DExample.js       # Exemple complet
├── hooks/
│   └── useModelPreloader.js    # Hook pour préchargement
└── App.js                      # Application principale

public/
├── models/
│   ├── static/                 # Modèles sans animation (.glb)
│   ├── animated/               # Modèles avec animations (.glb)
│   └── README.md              # Guide des modèles
```

## 🎮 Fonctionnalités Implémentées

### ✅ Composants Prêts

1. **Model** - Composant pour modèles statiques
   - Props: `modelPath`, `position`, `scale`, `onClick`
   - Fonction de préchargement intégrée

2. **AnimatedModel** - Composant pour modèles animés
   - Props: `modelPath`, `position`, `scale`, `autoPlay`, `animationName`
   - Gestion des animations au clic
   - Rotation automatique quand l'animation n'est pas active

3. **Ground** - Sol de la scène
   - Props: `size`, `color`, `position`
   - Réception des ombres

4. **LoadingScreen** - Écran de chargement
   - Barre de progression
   - Animation des points
   - Props: `isLoading`, `progress`

### 🎣 Hooks Personnalisés

1. **useModelPreloader** - Gestion du préchargement
   - Surveille la progression du chargement
   - Gestion de l'état de chargement

## 🚀 Utilisation

### Démarrer le projet
```bash
npm start
```

### Ajouter des modèles 3D
1. Placez vos fichiers `.glb` dans `public/models/static/` ou `public/models/animated/`
2. Mettez à jour les chemins dans votre composant

### Exemple d'utilisation

```jsx
import { Model, AnimatedModel, Ground } from './components/3d';

// Modèle statique
<Model 
  modelPath="/models/static/mon-modele.glb" 
  position={[0, 0, 0]} 
  scale={1} 
/>

// Modèle animé
<AnimatedModel 
  modelPath="/models/animated/mon-modele-anime.glb" 
  position={[2, 0, 0]} 
  scale={1.5}
  autoPlay={false}
/>

// Sol
<Ground size={20} color="#f0f0f0" />
```

## 🎨 Configuration de la Scène

### Éclairage
- **ambientLight** : Éclairage ambiant doux
- **directionalLight** : Éclairage directionnel avec ombres

### Environnement
- **Environment** : Preset "warehouse" pour un éclairage réaliste
- **ContactShadows** : Ombres de contact au sol

### Contrôles
- **OrbitControls** : Navigation 3D (rotation, zoom, panoramique)

## 📋 Prochaines Étapes

Maintenant que le terrain est préparé, vous pouvez :

1. **Ajouter vos modèles 3D** dans `public/models/`
2. **Tester les composants** en décommentant les imports dans `App.js`
3. **Personnaliser l'éclairage** selon vos besoins
4. **Ajuster les positions** et échelles des modèles
5. **Configurer les animations** spécifiques à vos modèles

## 🎯 Fonctionnalités Bonus Prêtes

- ✅ Préchargement des modèles avec `useGLTF.preload()`
- ✅ Écran de chargement avec progression
- ✅ Gestion des animations au clic
- ✅ Système d'ombres configuré
- ✅ Interface utilisateur overlay

Le projet est maintenant prêt pour recevoir vos modèles 3D ! 🚀
