"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import styles from "./Globe.module.css";

function Earth() {
  const globe = useRef<THREE.Group>(null);
  const reduceMotion = useRef(false);
  const texture = useLoader(THREE.TextureLoader, "/images/earth-map.png");

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    // Reduce the visual width of the central Pacific while preserving
    // the same globe geometry and continuous one-direction rotation.
    texture.repeat.set(1.28, 1);
    texture.offset.set(-0.14, 0);
    texture.needsUpdate = true;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => { reduceMotion.current = preference.matches; };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, [texture]);

  useFrame((_, delta) => {
    if (globe.current && !reduceMotion.current) globe.current.rotation.y += delta * 0.13;
  });

  return (
    <group ref={globe} rotation={[0.08, -1.25, -0.12]}>
      <mesh>
        <sphereGeometry args={[1.62, 96, 96]} />
        <meshStandardMaterial map={texture} roughness={0.74} metalness={0.04} />
      </mesh>
      <mesh scale={1.025}>
        <sphereGeometry args={[1.62, 96, 96]} />
        <meshPhongMaterial
          color="#3ea6ff"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function Globe() {
  return (
    <div className={styles.globe} role="img" aria-label="كرة أرضية ثلاثية الأبعاد تدور ببطء">
      <Canvas
        camera={{ position: [0, 0, 4.25], fov: 46 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        fallback={<div className={styles.fallback} />}
      >
        <ambientLight intensity={0.52} />
        <directionalLight position={[4, 3, 5]} intensity={3.3} color="#d7eaff" />
        <directionalLight position={[-4, -1, -3]} intensity={0.28} color="#135dff" />
        <Suspense fallback={null}><Earth /></Suspense>
      </Canvas>
    </div>
  );
}
