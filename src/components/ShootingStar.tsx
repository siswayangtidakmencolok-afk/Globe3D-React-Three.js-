import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function ShootingStar(){

const ref = useRef<THREE.Mesh>(null)

useFrame(()=>{

if(ref.current){

ref.current.position.x -= 0.05
ref.current.position.y -= 0.02

if(ref.current.position.x < -10){

ref.current.position.x = 10
ref.current.position.y = 5

}

}

})

return(

<mesh ref={ref} position={[10,5,-5]}>

<sphereGeometry args={[0.04,8,8]} />

<meshBasicMaterial color="white" />

</mesh>

)

}