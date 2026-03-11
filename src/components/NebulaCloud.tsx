import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function NebulaCloud(){

const nebula = useRef<THREE.Mesh>(null!)

useFrame((state)=>{
if(!nebula.current) return
nebula.current.rotation.y += 0.0005
})

return(

<mesh ref={nebula} position={[0,0,-40]}>
<sphereGeometry args={[80,64,64]}/>
<meshBasicMaterial
color={"#6622ff"}
transparent
opacity={0.15}
side={THREE.BackSide}
/>

</mesh>

)

}