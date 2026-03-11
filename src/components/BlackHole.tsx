import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function BlackHole(){

const diskRef = useRef<THREE.Mesh>(null!)
const particlesRef = useRef<THREE.Points>(null!)

useFrame(()=>{

if(diskRef.current){
diskRef.current.rotation.z += 0.01
}

if(particlesRef.current){
particlesRef.current.rotation.y += 0.002
}

})

/* create particle field */

const particleCount = 2000
const positions = new Float32Array(particleCount * 3)

for(let i=0;i<particleCount;i++){

const radius = 2 + Math.random()*2
const angle = Math.random()*Math.PI*2

positions[i*3] = Math.cos(angle)*radius
positions[i*3+1] = (Math.random()-0.5)*0.3
positions[i*3+2] = Math.sin(angle)*radius

}

return(

<group position={[15,4,-12]}>

{/* black core */}

<mesh>

<sphereGeometry args={[1.2,64,64]} />

<meshBasicMaterial color="black" />

</mesh>

{/* accretion disk */}

<mesh ref={diskRef} rotation={[Math.PI/2,0,0]}>

<ringGeometry args={[1.6,3.5,128]} />

<meshBasicMaterial
color="#ff8800"
side={THREE.DoubleSide}
transparent
opacity={0.6}
/>

</mesh>

{/* energy particles */}

<points ref={particlesRef}>

<bufferGeometry>

<bufferAttribute
attach="attributes-position"
array={positions}
count={particleCount}
itemSize={3}
/>

</bufferGeometry>

<pointsMaterial
size={0.05}
color="#ffaa33"
/>

</points>

</group>

)

}