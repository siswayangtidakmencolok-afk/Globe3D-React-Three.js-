import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function GasPlanet(){

const orbitRef = useRef<THREE.Group>(null!)
const planetRef = useRef<THREE.Mesh>(null!)
const glowRef = useRef<THREE.Mesh>(null!)

useFrame(()=>{

if(orbitRef.current){
orbitRef.current.rotation.y += 0.003
}

if(planetRef.current){
planetRef.current.rotation.y += 0.001
}

})

return(

<group ref={orbitRef}>
<group position={[10,0,0]}>

<mesh ref={planetRef}>
<sphereGeometry args={[1.4,64,64]} />
<meshStandardMaterial
color="#6b4cff"
roughness={0.6}
/>
</mesh>

{/* atmosphere glow */}

<mesh ref={glowRef}>
<sphereGeometry args={[1.35,64,64]} />
<meshBasicMaterial
color="#a48cff"
transparent
opacity={0.25}
/>
</mesh>

</group>
</group>

)

}