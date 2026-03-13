import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function PlanetGravity(){

const planet = useRef<THREE.Mesh>(null!)
const ring1 = useRef<THREE.Mesh>(null!)
const ring2 = useRef<THREE.Mesh>(null!)

const texture = useLoader(
THREE.TextureLoader,
"/textures/gravityplanet.jpg"
)

useFrame(()=>{

if(planet.current){

planet.current.rotation.y += 0.002

}

if(ring1.current){

ring1.current.rotation.z += 0.01

}

if(ring2.current){

ring2.current.rotation.x += 0.008

}

})

return(

<group position={[-18,5,-10]}>

{/* planet utama */}

<mesh ref={planet}>

<sphereGeometry args={[1.5,32,32]}/>
<meshStandardMaterial map={texture}/>

</mesh>

{/* ring gravity 1 */}

<mesh ref={ring1} rotation={[Math.PI/2,0,0]}>

<torusGeometry args={[2.4,0.05,16,100]}/>

<meshBasicMaterial
color="#66ccff"
transparent
opacity={0.5}
/>

</mesh>

{/* ring gravity 2 */}

<mesh ref={ring2} rotation={[0,0.5,0]}>

<torusGeometry args={[2.8,0.03,16,100]}/>

<meshBasicMaterial
color="#aa88ff"
transparent
opacity={0.35}
/>

</mesh>

</group>

)

}