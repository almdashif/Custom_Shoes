import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Shoe from '../src/components/Shoe';
import { Bounds, OrbitControls } from '@react-three/drei';
import Footer from '../src/components/Footer';

const App = () => {
  const [color, setColor] = useState('#ffffff'); // pink default

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
   
   
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls makeDefault />
        <Bounds fit clip observe>
          <Shoe color={color} />
        </Bounds>
      </Canvas>

      {/* Place footer OUTSIDE the Canvas */}
      <Footer setColor={setColor} currentColor={color} />
    </div>
  );
};

export default App;
