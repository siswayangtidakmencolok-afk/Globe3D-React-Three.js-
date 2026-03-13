import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function GasPlanet(){

const group = useRef<THREE.Group>(null!)
const planet = useRef<THREE.Mesh>(null!)

const texture = useLoader(
THREE.TextureLoader,
"/textures/gasplanet.jpg"
)

useFrame((state)=>{

const t = state.clock.elapsedTime * 0.15

if(group.current){

group.current.position.x = Math.cos(t) * 14
group.current.position.z = Math.sin(t) * 14

}

if(planet.current){

planet.current.rotation.y += 0.004

}

})

return(

<group ref={group}>

{/* planet utama */}

<mesh ref={planet}>

<sphereGeometry args={[1.8,32,32]}/>
<meshStandardMaterial map={texture}/>

</mesh>

{/* atmosphere glow */}

<mesh>

<sphereGeometry args={[1.95,32,32]}/>

<meshBasicMaterial
color="#66ccff"
transparent
opacity={0.18}
side={THREE.BackSide}
/>

</mesh>

</group>

)

}