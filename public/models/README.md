# Dossier Models

Ce dossier contient tous les modèles 3D (.glb) utilisés dans l'application.

## Structure recommandée :

```
models/
├── static/              # Modèles sans animation
│   ├── model1.glb
│   ├── model2.glb
│   └── model3.glb
├── animated/            # Modèles avec animations
│   └── animated-model.glb
└── textures/            # Textures additionnelles (optionnel)
    ├── texture1.jpg
    └── texture2.png
```

## Formats supportés :
- .glb (recommandé)
- .gltf

## Conseils pour les modèles :
1. **Optimisation** : Gardez les modèles légers (< 5MB si possible)
2. **Textures** : Utilisez des textures compressées
3. **Animations** : Nommez clairement vos animations
4. **Échelle** : Respectez une échelle cohérente entre les modèles

## Ajout de modèles :
Placez vos fichiers .glb dans ce dossier et mettez à jour les imports dans votre code.
