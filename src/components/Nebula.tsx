import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Nebula(){

const pointsRef = useRef<THREE.Points>(null!)

const count = 4000
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for(let i=0;i<count;i++){

const r = 40 + Math.random()*30
const theta = Math.random()*Math.PI*2
const phi = Math.random()*Math.PI

const x = r * Math.sin(phi) * Math.cos(theta)
const y = r * Math.sin(phi) * Math.sin(theta)
const z = r * Math.cos(phi)

positions[i*3] = x
positions[i*3+1] = y
positions[i*3+2] = z

const color = new THREE.Color()

color.setHSL(Math.random(),0.7,0.6)

colors[i*3] = color.r
colors[i*3+1] = color.g
colors[i*3+2] = color.b

}

useFrame(()=>{

if(pointsRef.current){
pointsRef.current.rotation.y += 0.0002
}

})

return(

<points ref={pointsRef}>

<bufferGeometry>

<bufferAttribute
attach="attributes-position"
array={positions}
count={count}
itemSize={3}
/>

<bufferAttribute
attach="attributes-color"
array={colors}
count={count}
itemSize={3}
/>

</bufferGeometry>

<pointsMaterial
size={0.3}
vertexColors
transparent
opacity={0.6}
/>

</points>

)

}