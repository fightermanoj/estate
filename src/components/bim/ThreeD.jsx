import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ path }) {
  const { scene } = useGLTF(path); // Load the GLTF model
  return <primitive object={scene} />;
}

export default function ThreeD() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", margin: 0, overflow: "hidden" }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={5} />
        <Suspense fallback={null}>
          {/* Render the 3D model */}
          <Model path="/assets/models/tmp2sc1ipy0_3d.gltf" />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
