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

<mesh position={[15,2,0]}>
<sphereGeometry args={[2,64,64]}/>
<meshStandardMaterial color="orange"/>
</mesh>

{/* atmosphere glow */}

<mesh ref={glowRef}>
<sphereGeometry args={[2,64,64]} />
<meshBasicMaterial
color="#ff9d00"
transparent
opacity={0.6}
/>
</mesh>

</group>
</group>

)

}