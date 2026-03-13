import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function Wormhole(){

const mesh = useRef<THREE.Mesh>(null!)

useFrame(()=>{

if(mesh.current){

mesh.current.rotation.z += 0.01

}

})

return(

<mesh
ref={mesh}
position={[-10,0,-12]}
renderOrder={2}
>

<torusGeometry args={[3,0.8,32,100]}/>

<meshStandardMaterial
color="#4400ff"
emissive="#6600ff"
emissiveIntensity={3}
transparent={false}
/>

</mesh>

)

}