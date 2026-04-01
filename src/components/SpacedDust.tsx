import { useFrame } from "@react-three/fiber"
import { useMemo, useRef, useEffect } from "react"
import * as THREE from "three"

export default function SpaceDust(){

  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const count = 160

  const dustData = useMemo(() => {
    const data = []
    for(let i=0; i<count; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random()-0.5)*100,
          (Math.random()-0.5)*60,
          (Math.random()-0.5)*100
        ),
        speed: 0.1 + Math.random() * 0.2
      })
    }
    return data
  }, [])

  useEffect(() => {
    const dummy = new THREE.Object3D()
    dustData.forEach((d, i) => {
      dummy.position.copy(d.position)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [dustData])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.015
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[null!, null!, count]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.3} 
      />
    </instancedMesh>
  )
}