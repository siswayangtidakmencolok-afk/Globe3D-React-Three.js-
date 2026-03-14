import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Helper function to generate random positions within a radius
const generateFleet = (count: number, radius: number, side: "blue" | "red") => {
  const ships = []
  for (let i = 0; i < count; i++) {
    ships.push({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * radius,
        (Math.random() - 0.5) * radius,
        (Math.random() - 0.5) * radius
      ),
      rotation: new THREE.Euler(
        (Math.random() - 0.5) * 0.5,
        side === "blue" ? Math.PI / 2 : -Math.PI / 2, // Face each other
        0
      ),
      speed: Math.random() * 0.05 + 0.02,
      offset: Math.random() * Math.PI * 2
    })
  }
  return ships
}

export default function SpaceBattle() {
  const lasersRef = useRef<THREE.Group>(null!)
  const battleGroupRef = useRef<THREE.Group>(null!)

  // Generate 20 ships for each side
  const blueFleet = useMemo(() => generateFleet(20, 30, "blue"), [])
  const redFleet = useMemo(() => generateFleet(20, 30, "red"), [])

  // Pre-allocate laser projectiles
  const maxLasers = 40
  const lasers = useMemo(() => {
    return Array.from({ length: maxLasers }).map(() => ({
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      active: false,
      color: "blue",
      life: 0
    }))
  }, [])

  useFrame(() => {

    // Slow orbit of the entire battle
    if (battleGroupRef.current) {
      battleGroupRef.current.rotation.y += 0.0002
    }

    // Animate lasers
    if (lasersRef.current) {
      const children = lasersRef.current.children

      // Fire new lasers randomly
      if (Math.random() > 0.6) {
        const inactiveLaserIndex = lasers.findIndex(l => !l.active)
        if (inactiveLaserIndex !== -1) {
          const l = lasers[inactiveLaserIndex]
          const isBlue = Math.random() > 0.5
          const fleet = isBlue ? blueFleet : redFleet
          const targetFleet = isBlue ? redFleet : blueFleet
          
          const shooter = fleet[Math.floor(Math.random() * fleet.length)]
          const target = targetFleet[Math.floor(Math.random() * targetFleet.length)]
          
          // Origin based on fleet position offset
          const originX = isBlue ? -40 : 40
          
          l.position.set(
            shooter.position.x + originX,
            shooter.position.y,
            shooter.position.z
          )
          
          const targetPos = new THREE.Vector3(
            target.position.x + (isBlue ? 40 : -40),
            target.position.y,
            target.position.z
          )
          
          l.velocity.copy(targetPos).sub(l.position).normalize().multiplyScalar(2)
          l.active = true
          l.color = isBlue ? "#00ffff" : "#ff0000"
          l.life = 0
          
          // Update actual mesh
          if (children[inactiveLaserIndex]) {
            const mesh = children[inactiveLaserIndex] as THREE.Mesh
            mesh.position.copy(l.position)
            mesh.visible = true
            ;(mesh.material as THREE.MeshBasicMaterial).color.set(l.color)
            
            // Orient laser to velocity
            mesh.quaternion.setFromUnitVectors(
              new THREE.Vector3(0, 1, 0), 
              l.velocity.clone().normalize()
            )
          }
        }
      }

      // Move active lasers
      lasers.forEach((l, i) => {
        if (l.active) {
          l.position.add(l.velocity)
          l.life += 1
          
          if (children[i]) {
            children[i].position.copy(l.position)
          }

          if (l.life > 40) {
            l.active = false
            if (children[i]) children[i].visible = false
          }
        }
      })
    }
  })

  return (
    // Positioned far away on the opposite side of Skull Planet
    <group ref={battleGroupRef} position={[-200, 30, -150]} scale={0.5}>
      
      {/* Blue Legion */}
      <group position={[-40, 0, 0]}>
        {blueFleet.map((ship, i) => (
          <group key={`blue-${i}`} position={ship.position} rotation={ship.rotation}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.5, 2, 8]} />
              <meshStandardMaterial color="#3b82f6" metalness={0.8} />
            </mesh>
            {/* Engine Glow */}
            <mesh position={[0, 0, -1]}>
              <sphereGeometry args={[0.3, 8, 8]} />
              <meshBasicMaterial color="#00ffff" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Red Legion */}
      <group position={[40, 0, 0]}>
        {redFleet.map((ship, i) => (
          <group key={`red-${i}`} position={ship.position} rotation={ship.rotation}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.6, 2.2, 4]} />
              <meshStandardMaterial color="#ef4444" metalness={0.8} />
            </mesh>
             {/* Engine Glow */}
             <mesh position={[0, 0, -1.1]}>
              <sphereGeometry args={[0.3, 8, 8]} />
              <meshBasicMaterial color="#ff7700" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Laser Particles */}
      <group ref={lasersRef}>
        {lasers.map((_, i) => (
          <mesh key={`laser-${i}`} visible={false}>
            <cylinderGeometry args={[0.08, 0.08, 3, 4]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
          </mesh>
        ))}
      </group>

    </group>
  )
}
