import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

type Props = {
offset:number
}

export default function Drone({offset}:Props){

const drone = useRef<THREE.Mesh>(null!)

useFrame((state)=>{

if(!drone.current) return

const t = state.clock.elapsedTime + offset

drone.current.position.x = Math.sin(t)*2
drone.current.position.z = Math.cos(t)*2
drone.current.position.y = Math.sin(t*2)*0.5

drone.current.rotation.y += 0.05

})

return(

<mesh ref={drone}>
<sphereGeometry args={[0.15,16,16]}/>
<meshStandardMaterial emissive="#00ffff" color="#222"/>
</mesh>

)

}