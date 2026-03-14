import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

export default function BlackHoleGravity(){

const group = useRef<THREE.Group>(null!)

const particles = useMemo(()=>{

const arr = []

for(let i=0;i<220;i++){

const angle = Math.random()*Math.PI*2
const radius = 4 + Math.random()*10

arr.push({
radius,
angle,
speed:0.002 + Math.random()*0.003,
y:(Math.random()-0.5)*1.5
})

}

return arr

},[])

useFrame(()=>{

if(!group.current) return

group.current.children.forEach((child,i)=>{

if(i >= particles.length) return

const p = particles[i]

if(!p) return

p.angle += p.speed
p.radius -= 0.01

if(p.radius < 1){

p.radius = 8 + Math.random()*6

}

child.position.x = Math.cos(p.angle)*p.radius
child.position.z = Math.sin(p.angle)*p.radius
child.position.y = p.y

})

})

return(

<group ref={group}>

{particles.map((_,i)=>(

<mesh key={i}>

<sphereGeometry args={[0.04,4,4]}/>
<meshBasicMaterial color="#ffffff"/>

</mesh>

))}

</group>

)
}