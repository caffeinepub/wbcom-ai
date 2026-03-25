import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import * as THREE from "three";

function ParticleField() {
  const count = 150;

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  const geo2 = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame(() => {
    const pos = geo.attributes.position;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += 0.008;
      if (arr[i * 3 + 1] > 15) arr[i * 3 + 1] = -15;
    }
    pos.needsUpdate = true;

    const pos2 = geo2.attributes.position;
    const arr2 = pos2.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr2[i * 3 + 1] += 0.005;
      arr2[i * 3] += Math.sin(Date.now() * 0.0001 + i) * 0.003;
      if (arr2[i * 3 + 1] > 15) arr2[i * 3 + 1] = -15;
    }
    pos2.needsUpdate = true;
  });

  return (
    <>
      <points geometry={geo}>
        <pointsMaterial
          color="#00d4ff"
          size={0.06}
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <points geometry={geo2}>
        <pointsMaterial
          color="#9d4edd"
          size={0.05}
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </>
  );
}

export function ParticleBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
