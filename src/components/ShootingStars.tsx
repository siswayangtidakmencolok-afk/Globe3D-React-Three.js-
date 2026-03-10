import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function ShootingStars() {

const starRef = useRef<THREE.Mesh>(null!)

useFrame(()=>{

if(!starRef.current) return

starRef.current.position.x -= 0.4
starRef.current.position.y -= 0.15

if(starRef.current.position.x < -50){

starRef.current.position.x = 50
starRef.current.position.y = Math.random()*30

}

})

return (

<mesh ref={starRef} position={[50,20,-20]}>

<sphereGeometry args={[0.1,8,8]} />

<meshBasicMaterial color="white" />

</mesh>

)

}