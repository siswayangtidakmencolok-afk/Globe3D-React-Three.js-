import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function Satellite(){

const ref = useRef<THREE.Mesh>(null)

useFrame(({clock})=>{

const t = clock.getElapsedTime()

if(ref.current){

ref.current.position.x = Math.cos(t)*3
ref.current.position.z = Math.sin(t)*3

}

})

return(

<mesh ref={ref}>

<sphereGeometry args={[0.08,16,16]} />

<meshBasicMaterial color="white" />

</mesh>

)

}