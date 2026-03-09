import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Globe() {

  const meshRef = useRef<THREE.Mesh>(null);

  const texture = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>

      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* marker kota */}
      <mesh position={[1.5,0.3,1]}>
        <sphereGeometry args={[0.05,16,16]} />
        <meshBasicMaterial color="red" />
      </mesh>

    </group>
  );
}