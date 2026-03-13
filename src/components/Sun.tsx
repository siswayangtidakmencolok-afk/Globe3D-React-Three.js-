import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function Sun(){

const sun = useRef<THREE.Mesh>(null!)
const glow = useRef<THREE.Mesh>(null!)

const texture = useLoader(
THREE.TextureLoader,
"/textures/sun.jpg"
)

useFrame(()=>{

if(sun.current){

sun.current.rotation.y += 0.002

}

if(glow.current){

glow.current.rotation.y -= 0.001

}

})

return(

<group position={[20,8,-25]}>

{/* matahari utama */}

<mesh ref={sun}>

<sphereGeometry args={[3,32,32]}/>

<meshStandardMaterial
map={texture}
emissive="#ff6600"
emissiveIntensity={1.8}
/>

</mesh>

{/* glow luar */}

<mesh ref={glow}>

<sphereGeometry args={[3.5,32,32]}/>

<meshBasicMaterial
color="#ffaa33"
transparent
opacity={0.18}
side={THREE.BackSide}
/>

</mesh>

</group>

)

}