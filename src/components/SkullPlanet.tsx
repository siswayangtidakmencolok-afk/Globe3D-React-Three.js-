import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function SkullPlanet() {
  const group = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (group.current) {
      // Slow ominous rotation
      group.current.rotation.y += 0.001
      group.current.rotation.z += 0.0005
    }
  })

  // Far far away orbit position
  return (
    <group ref={group} position={[250, 40, -300]} scale={5}>

      {/* Main Skull Dome */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Skull Jaw/Lower Face */}
      <mesh position={[0, -1.2, 0.8]}>
        <boxGeometry args={[2.5, 1.5, 2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Left Eye Socket (Glowing Red) */}
      <mesh position={[-0.8, 0.2, 1.6]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={3} toneMapped={false} />
      </mesh>

      {/* Right Eye Socket (Glowing Red) */}
      <mesh position={[0.8, 0.2, 1.6]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={3} toneMapped={false} />
      </mesh>

      {/* Nose Hole */}
      <mesh position={[0, -0.4, 1.8]}>
        <coneGeometry args={[0.3, 0.6, 3]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Teeth / Grill */}
      {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
        <mesh key={i} position={[x, -1.5, 1.9]}>
          <boxGeometry args={[0.1, 0.6, 0.2]} />
          <meshStandardMaterial color="#333333" roughness={0.5} />
        </mesh>
      ))}

      {/* Evil Aura/Glow */}
      <mesh>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial color="#ff0000" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>

    </group>
  )
}
