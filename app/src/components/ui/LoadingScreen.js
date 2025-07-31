import React, { useState, useEffect } from 'react';

/**
 * Composant d'écran de chargement
 * @param {boolean} isLoading - État de chargement
 * @param {number} progress - Progression du chargement (0-100)
 */
function LoadingScreen({ isLoading = true, progress = 0 }) {
  const [dots, setDots] = useState('');

  // Animation des points de chargement
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      zIndex: 1000
    }}>
      <div style={{ marginBottom: '20px' }}>
        Chargement des modèles 3D{dots}
      </div>
      
      {/* Barre de progression */}
      <div style={{
        width: '300px',
        height: '10px',
        backgroundColor: '#333',
        borderRadius: '5px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#4CAF50',
          transition: 'width 0.3s ease'
        }} />
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '16px' }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
}

export default LoadingScreen;
