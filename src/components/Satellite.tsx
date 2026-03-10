import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Satellite(){

const orbitRef = useRef<THREE.Group>(null!)

useFrame(()=>{

if(orbitRef.current){
orbitRef.current.rotation.y += 0.01
}

})

return(

<group ref={orbitRef}>

{/* orbit distance */}

<group position={[3,0,0]}>

{/* satellite body */}

<mesh>

<boxGeometry args={[0.2,0.2,0.3]} />

<meshStandardMaterial color="#bbbbbb" />

</mesh>

{/* solar panel kiri */}

<mesh position={[-0.35,0,0]}>

<boxGeometry args={[0.4,0.02,0.2]} />

<meshStandardMaterial color="#3366ff" />

</mesh>

{/* solar panel kanan */}

<mesh position={[0.35,0,0]}>

<boxGeometry args={[0.4,0.02,0.2]} />

<meshStandardMaterial color="#3366ff" />

</mesh>

</group>

</group>

)

}