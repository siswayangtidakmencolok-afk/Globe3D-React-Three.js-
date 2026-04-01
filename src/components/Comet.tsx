import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Comet() {
  const cometRef = useRef<THREE.Group>(null!)
  const coreRef = useRef<THREE.Mesh>(null!)
  
  // Membuat data ekor komet (trail)
  const trailCount = 40
  const trailRef = useRef<THREE.InstancedMesh>(null!)
  
  const trailData = useMemo(() => {
    return Array.from({ length: trailCount }).map(() => ({
      offset: new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        Math.random() * 8 // Ekor memanjang ke belakang
      ),
      size: Math.random() * 0.1
    }))
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime * 0.2
    
    if (cometRef.current) {
      // Lintasan komet: melengkung jauh di angkasa
      const x = Math.sin(time) * 150
      const z = Math.cos(time) * 80 - 100
      const y = Math.sin(time * 0.5) * 30 + 20
      
      cometRef.current.position.set(x, y, z)
      
      // Rotasi komet menghadap arah gerak
      cometRef.current.lookAt(new THREE.Vector3(
        Math.sin(time + 0.1) * 150,
        Math.sin((time + 0.1) * 0.5) * 30 + 20,
        Math.cos(time + 0.1) * 80 - 100
      ))
    }

    // Animasi denyut inti komet
    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.2
      coreRef.current.scale.set(pulse, pulse, pulse)
    }

    // Update partikel ekor
    if (trailRef.current) {
      const dummy = new THREE.Object3D()
      trailData.forEach((d, i) => {
        // Efek ekor tertinggal dengan sedikit goyangan
        const flicker = Math.sin(state.clock.elapsedTime * 10 + i) * 0.05
        dummy.position.copy(d.offset)
        dummy.position.z += flicker
        dummy.scale.setScalar(1 - (d.offset.z / 8)) // Mengecil di ujung ekor
        dummy.updateMatrix()
        trailRef.current.setMatrixAt(i, dummy.matrix)
      })
      trailRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={cometRef}>
      {/* Inti Komet */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Cahaya Sekitar Inti */}
      <mesh scale={2.5}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#4ade80" transparent opacity={0.2} />
      </mesh>

      {/* Ekor Komet (Instanced) */}
      <instancedMesh ref={trailRef} args={[null!, null!, trailCount]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#4ade80" transparent opacity={0.4} />
      </instancedMesh>
      
      {/* Pointlight untuk menerangi objek sekitar saat lewat */}
      <pointLight color="#4ade80" intensity={2} distance={20} />
    </group>
  )
}
