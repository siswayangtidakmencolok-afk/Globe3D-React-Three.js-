import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function Sun(){

const sun = useRef<THREE.Mesh>(null!)
const glow = useRef<THREE.Mesh>(null!)
const flare1 = useRef<THREE.Mesh>(null!)
const flare2 = useRef<THREE.Mesh>(null!)

const texture = useLoader(
THREE.TextureLoader,
"/textures/sun.jpg"
)

useFrame((state)=>{

const t = state.clock.elapsedTime

if(sun.current){

sun.current.rotation.y += 0.002

}

if(glow.current){

const pulse = 3.5 + Math.sin(t*2)*0.12
glow.current.scale.set(pulse,pulse,pulse)

}

if(flare1.current){

flare1.current.rotation.z += 0.01

}

if(flare2.current){

flare2.current.rotation.z -= 0.008

}

})

return(

<group position={[20,8,-25]}>

{/* inti matahari */}

<mesh ref={sun}>

<sphereGeometry args={[3,32,32]}/>

<meshStandardMaterial
map={texture}
emissive="#ff6600"
emissiveIntensity={2}
/>

</mesh>

{/* glow denyut */}

<mesh ref={glow}>

<sphereGeometry args={[1,32,32]}/>

<meshBasicMaterial
color="#ffaa33"
transparent
opacity={0.12}
side={THREE.BackSide}
/>

</mesh>

{/* flare lava 1 */}

<mesh ref={flare1} rotation={[Math.PI/2,0,0]}>

<torusGeometry args={[4.2,0.15,16,100]}/>

<meshBasicMaterial
color="#ff5500"
transparent
opacity={0.35}
/>

</mesh>

{/* flare lava 2 */}

<mesh ref={flare2} rotation={[0,0,Math.PI/4]}>

<torusGeometry args={[4.8,0.08,16,100]}/>

<meshBasicMaterial
color="#ff2200"
transparent
opacity={0.22}
/>

</mesh>

</group>

)

}