import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function PlanetGravity(){

const planet = useRef<THREE.Mesh>(null!)

useFrame((state)=>{

if(!planet.current) return

planet.current.rotation.y += 0.002

})

return(

<mesh ref={planet} position={[40,0,0]}>

<sphereGeometry args={[4,64,64]}/>
<meshStandardMaterial color="#d9a066"/>

</mesh>

)

}