// Per-planet display configuration: position (x,y,z) and scale (uniform or array)
// You can edit these values to tweak where each planet appears in the scene and its size.

const planetConfig = {
  Mercury: { position: [ -12, 10, 8 ], scale: 0.8 },
  Venus:   { position: [ -8, 11, 12 ], scale: 0.02 },
  Earth:   { position: [ -2, 11, 14 ], scale: 0.9 },
  Mars:    { position: [ 6, 10, 16 ], scale: 0.9 },
  Jupiter: { position: [ 18, 14, -6 ], scale: 0.05},
  Saturn:  { position: [ 22, 13, -12 ], scale: 2 },
  Uranus:  { position: [ -20, 15, -8 ], scale: 2 },
  Neptune: { position: [ -26, 14, 4 ], scale: 2  },
  Moon:    { position: [ 2, 11, 13 ], scale: 0.05 },
};

export default planetConfig;
