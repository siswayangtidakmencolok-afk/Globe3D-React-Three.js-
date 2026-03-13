import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function OrbitPlanet(){

const group = useRef<THREE.Group>(null!)
const planet = useRef<THREE.Mesh>(null!)

const texture = useLoader(
THREE.TextureLoader,
"/textures/earth2.jpg"
)

useFrame((state)=>{

const t = state.clock.elapsedTime * 0.15

if(group.current){

group.current.position.x = Math.cos(t) * 18
group.current.position.z = Math.sin(t) * 18

}

if(planet.current){

planet.current.rotation.y += 0.003

}

})

return(

<group ref={group}>

<mesh ref={planet}>

<sphereGeometry args={[1.2,32,32]}/>

<meshStandardMaterial map={texture}/>

</mesh>

</group>

)

}