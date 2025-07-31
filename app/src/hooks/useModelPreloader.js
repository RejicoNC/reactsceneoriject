import { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

/**
 * Hook personnalisé pour gérer le préchargement des modèles 3D
 * @param {array} modelPaths - Liste des chemins vers les modèles à précharger
 */
export function useModelPreloader(modelPaths = []) {
  const [isLoading, setIsLoading] = useState(true);
  const { progress } = useProgress();

  useEffect(() => {
    // Précharger tous les modèles
    const preloadPromises = modelPaths.map(async (path) => {
      try {
        // Ici vous pouvez utiliser useGLTF.preload() pour chaque modèle
        return path;
      } catch (error) {
        console.error(`Erreur lors du chargement du modèle ${path}:`, error);
        return null;
      }
    });

    Promise.all(preloadPromises).then(() => {
      setIsLoading(false);
    });
  }, [modelPaths]);

  useEffect(() => {
    // Le chargement est terminé quand la progression atteint 100%
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Petit délai pour une transition smooth

      return () => clearTimeout(timer);
    }
  }, [progress]);

  return {
    isLoading,
    progress
  };
}

/**
 * Fonction utilitaire pour précharger une liste de modèles
 * @param {array} modelPaths - Chemins des modèles à précharger
 */
export const preloadModels = (modelPaths) => {
  // Cette fonction sera implémentée quand vous ajouterez vos modèles
  modelPaths.forEach(path => {
    console.log(`Préchargement du modèle: ${path}`);
    // useGLTF.preload(path); // À décommenter quand les modèles seront ajoutés
  });
};
