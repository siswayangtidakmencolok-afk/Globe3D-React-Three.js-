import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function BlackHoleGravity(){

const hole = useRef<THREE.Mesh>(null!)

useFrame(()=>{

if(!hole.current) return

hole.current.rotation.y += 0.01

})

return(

<mesh ref={hole} position={[-50,0,0]}>

<sphereGeometry args={[3,64,64]}/>
<meshBasicMaterial color="black"/>

</mesh>

)

}