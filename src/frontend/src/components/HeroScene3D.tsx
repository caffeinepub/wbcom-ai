import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type * as THREE from "three";

interface FloatingMeshProps {
  position: [number, number, number];
  rotSpeed: [number, number, number];
  bobSpeed?: number;
  bobAmp?: number;
  children: React.ReactNode;
}

function FloatingMesh({
  position,
  rotSpeed,
  bobSpeed = 1,
  bobAmp = 0.3,
  children,
}: FloatingMeshProps) {
  const ref = useRef<THREE.Mesh>(null);
  const baseY = position[1];

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += rotSpeed[0] * delta;
    ref.current.rotation.y += rotSpeed[1] * delta;
    ref.current.rotation.z += rotSpeed[2] * delta;
    ref.current.position.y =
      baseY + Math.sin(state.clock.elapsedTime * bobSpeed) * bobAmp;
  });

  return (
    <mesh ref={ref} position={position}>
      {children}
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#9d4edd" />
      <pointLight position={[0, 5, -8]} intensity={0.5} color="#f5c842" />

      <Stars
        radius={50}
        depth={20}
        count={800}
        factor={2}
        saturation={0.5}
        fade
        speed={0.5}
      />

      {/* Icosahedron — neon cyan wireframe */}
      <FloatingMesh
        position={[-3.5, 0.5, -2]}
        rotSpeed={[0.4, 0.5, 0.2]}
        bobSpeed={0.9}
        bobAmp={0.4}
      >
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#001a2a"
          emissive="#00d4ff"
          emissiveIntensity={0.9}
          wireframe
        />
      </FloatingMesh>

      {/* TorusKnot — neon violet */}
      <FloatingMesh
        position={[3.2, -0.3, -1]}
        rotSpeed={[0.3, 0.6, 0.1]}
        bobSpeed={1.1}
        bobAmp={0.35}
      >
        <torusKnotGeometry args={[0.7, 0.22, 80, 12]} />
        <meshStandardMaterial
          color="#1a0830"
          emissive="#9d4edd"
          emissiveIntensity={0.7}
          metalness={0.3}
          roughness={0.5}
        />
      </FloatingMesh>

      {/* Octahedron — neon amber */}
      <FloatingMesh
        position={[1.5, 1.8, -3]}
        rotSpeed={[0.5, 0.3, 0.4]}
        bobSpeed={0.7}
        bobAmp={0.5}
      >
        <octahedronGeometry args={[0.9]} />
        <meshStandardMaterial
          color="#1a1000"
          emissive="#f5c842"
          emissiveIntensity={0.6}
          metalness={0.5}
          roughness={0.4}
        />
      </FloatingMesh>

      {/* Box — glass */}
      <FloatingMesh
        position={[-1.8, -1.5, -1.5]}
        rotSpeed={[0.2, 0.4, 0.3]}
        bobSpeed={1.3}
        bobAmp={0.25}
      >
        <boxGeometry args={[1.0, 1.0, 1.0]} />
        <meshStandardMaterial
          color="#002040"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
          metalness={0.8}
          roughness={0.1}
        />
      </FloatingMesh>

      {/* Small icosahedron — accent */}
      <FloatingMesh
        position={[0.5, -2, -0.5]}
        rotSpeed={[0.6, 0.2, 0.5]}
        bobSpeed={1.5}
        bobAmp={0.2}
      >
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#1a0030"
          emissive="#9d4edd"
          emissiveIntensity={1.0}
          wireframe
        />
      </FloatingMesh>
    </>
  );
}

export function HeroScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
