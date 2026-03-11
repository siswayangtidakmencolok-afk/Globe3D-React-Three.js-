import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function SaturnPlanet(){

const group = useRef<THREE.Group>(null!)

useFrame(()=>{

if(!group.current) return

// orbit mengelilingi center scene
group.current.rotation.y += 0.002

})

return(

<group ref={group} position={[0,0,0]}>

{/* planet */}
<mesh position={[25,0,0]}>
<sphereGeometry args={[2.5,64,64]}/>
<meshStandardMaterial color="#d2b48c"/>
</mesh>

{/* ring saturn */}
<mesh rotation={[Math.PI/2,0,0]} position={[25,0,0]}>
<ringGeometry args={[3.5,6,64]}/>
<meshBasicMaterial
color="#caa96a"
side={THREE.DoubleSide}
transparent
opacity={0.7}
/>
</mesh>

</group>

)

}