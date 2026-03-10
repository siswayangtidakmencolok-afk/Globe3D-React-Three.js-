import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function AsteroidBelt(){

const beltRef = useRef<THREE.Group>(null!)
const asteroidData = useRef<
{ position:[number,number,number]; scale:number }[]
>([])

const asteroidCount = 300

// generate asteroid once
if(asteroidData.current.length === 0){

for(let i=0;i<asteroidCount;i++){

const angle = Math.random() * Math.PI * 2
const radius = 6 + Math.random() * 2

const x = Math.cos(angle) * radius
const z = Math.sin(angle) * radius
const y = (Math.random() - 0.5) * 0.3

const scale = 0.05 + Math.random() * 0.12

asteroidData.current.push({
position:[x,y,z],
scale
})

}

}

useFrame(()=>{
if(beltRef.current){
beltRef.current.rotation.y += 0.0007
}
})

return(

<group ref={beltRef}>

{asteroidData.current.map((a,i)=>(
<mesh
key={i}
position={a.position}
scale={a.scale}
>

<icosahedronGeometry args={[1,0]} />

<meshStandardMaterial color="#888888"/>

</mesh>
))}

</group>

)

}