import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function DroneDock(){

const drone = useRef<THREE.Mesh>(null!)

useFrame((state)=>{

if(!drone.current) return

const t = state.clock.elapsedTime

drone.current.position.x = Math.sin(t)*2
drone.current.position.z = Math.cos(t)*2

if(Math.sin(t) > 0.9){
drone.current.position.set(0,0,0)
}

})

return(

<mesh ref={drone}>

<sphereGeometry args={[0.2,16,16]}/>
<meshStandardMaterial emissive="#00ffff" color="#222"/>

</mesh>

)

}