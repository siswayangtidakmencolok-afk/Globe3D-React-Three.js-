import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function Wormhole(){

const mesh = useRef<THREE.Mesh>(null!)

useFrame((state)=>{

if(!mesh.current) return

mesh.current.rotation.z += 0.02

})

return(

<mesh ref={mesh} position={[0,0,-40]}>

<torusGeometry args={[6,2,64,128]}/>

<meshStandardMaterial
color="#3300ff"
emissive="#4400ff"
emissiveIntensity={4}
metalness={1}
roughness={0}
/>
</mesh>

)

}