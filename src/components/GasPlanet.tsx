import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function GasPlanet(){

const planetRef = useRef<THREE.Mesh>(null!)
const glowRef = useRef<THREE.Mesh>(null!)

useFrame(()=>{

if(planetRef.current){
planetRef.current.rotation.y += 0.002
}

})

return(

<group position={[10,1,-4]}>

<mesh ref={planetRef}>
<sphereGeometry args={[1.2,64,64]} />
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

)

}