import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function RobotPlanet() {
  const robotGroup = useRef<THREE.Group>(null!)
  const wireframeRef = useRef<THREE.Mesh>(null!)
  const coreRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (robotGroup.current) {
      robotGroup.current.rotation.y -= 0.002
      robotGroup.current.rotation.x += 0.0005
    }
    
    // Pulsing core effect
    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05
      coreRef.current.scale.set(pulse, pulse, pulse)
    }
    
    // Counter-rotating wireframe shell
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += 0.005
      wireframeRef.current.rotation.z -= 0.003
    }
  })

  // Positioned closer to the main scene but distinct from the other Gas Planters
  return (
    <group ref={robotGroup} position={[40, -10, -60]}>
      
      {/* Metallic Base Hull */}
      <mesh>
        <icosahedronGeometry args={[5, 3]} />
        <meshStandardMaterial 
          color="#2d3748" 
          metalness={0.9} 
          roughness={0.2} 
          flatShading 
        />
      </mesh>

      {/* Neon Wireframe Shell */}
      <mesh ref={wireframeRef} scale={1.05}>
        <icosahedronGeometry args={[5, 2]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={1.5} 
          wireframe={true} 
          transparent 
          opacity={0.4}
        />
      </mesh>

      {/* Pulsing Energy Core */}
      <mesh ref={coreRef} scale={0.8}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.5} />
      </mesh>
      
      {/* Sci-fi Rings */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[8, 0.2, 16, 100]} />
        <meshStandardMaterial color="#4fd1c5" emissive="#00ffff" emissiveIntensity={1} />
      </mesh>
      
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[6.5, 0.1, 16, 100]} />
        <meshStandardMaterial color="#cbd5e0" metalness={1} roughness={0.1} />
      </mesh>

    </group>
  )
}
