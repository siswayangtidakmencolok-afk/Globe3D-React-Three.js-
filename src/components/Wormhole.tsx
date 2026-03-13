import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function Wormhole(){

const ring1 = useRef<THREE.Mesh>(null!)
const ring2 = useRef<THREE.Mesh>(null!)
const core = useRef<THREE.Mesh>(null!)

useFrame((state)=>{

const t = state.clock.elapsedTime

if(ring1.current){

ring1.current.rotation.z += 0.01

}

if(ring2.current){

ring2.current.rotation.z -= 0.015

}

if(core.current){

const pulse = 1 + Math.sin(t*2)*0.05
core.current.scale.set(pulse,pulse,pulse)

}

})

return(

<group position={[-12,3,-18]}>

<mesh ref={core}>

<sphereGeometry args={[1.5,32,32]}/>

<meshBasicMaterial
color="#5500ff"
transparent
opacity={0.35}
/>

</mesh>

<mesh ref={ring1} rotation={[Math.PI/2,0,0]}>

<torusGeometry args={[3,0.2,16,100]}/>

<meshBasicMaterial
color="#aa66ff"
transparent
opacity={0.45}
/>

</mesh>

<mesh ref={ring2} rotation={[0.5,0,0]}>

<torusGeometry args={[4,0.1,16,100]}/>

<meshBasicMaterial
color="#66ccff"
transparent
opacity={0.25}
/>

</mesh>

</group>

)
}