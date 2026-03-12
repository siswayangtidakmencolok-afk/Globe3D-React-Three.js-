import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

type Props={
active:boolean
}

export default function WarpStars({active}:Props){

const group = useRef<THREE.Group>(null!)

const stars = Array.from({length:300}).map(()=>({
x:(Math.random()-0.5)*200,
y:(Math.random()-0.5)*200,
z:Math.random()*-500
}))

useFrame(()=>{

if(!group.current || !active) return

group.current.children.forEach((star:any)=>{

star.position.z += 10

if(star.position.z > 10){
star.position.z = -500
}

})

})

return(

<group ref={group}>

{stars.map((s,i)=>(
<mesh key={i} position={[s.x,s.y,s.z]}>

<cylinderGeometry args={[0.05,0.05,2,6]}/>

<meshBasicMaterial color="white"/>

</mesh>
))}

</group>

)

}