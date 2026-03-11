import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function AsteroidField(){

const group = useRef<THREE.Group>(null!)

const asteroids = Array.from({length:40}).map(()=>({
pos:[
Math.random()*200-100,
Math.random()*20-10,
Math.random()*200-100
]
}))

useFrame(()=>{
if(!group.current) return
group.current.rotation.y += 0.0005
})

return(

<group ref={group}>

{asteroids.map((a,i)=>(
<mesh key={i} position={a.pos as any}>
<dodecahedronGeometry args={[Math.random()*0.6+0.3]}/>
<meshStandardMaterial color="#555"/>
</mesh>
))}

</group>

)

}