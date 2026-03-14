import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

export default function BlackHole(){

const particleGroup = useRef<THREE.Group>(null!)
const coreRef = useRef<THREE.Mesh>(null!)
const diskRef = useRef<THREE.Mesh>(null!)

const particles = useMemo(()=>{

const arr = []

for(let i=0;i<220;i++){

arr.push({
angle: Math.random()*Math.PI*2,
radius: 4 + Math.random()*8,
speed: 0.002 + Math.random()*0.003,
y:(Math.random()-0.5)*1.5
})

}

return arr

},[])

useFrame((state)=>{

const t = state.clock.elapsedTime

if(coreRef.current){
coreRef.current.scale.setScalar(1 + Math.sin(t*3)*0.04)
}

if(diskRef.current){
diskRef.current.rotation.z += 0.003
}

if(particleGroup.current){

particleGroup.current.children.forEach((child,i)=>{

const p = particles[i]

if(!p) return

p.angle += p.speed
p.radius -= 0.01

if(p.radius < 1.2){
p.radius = 5 + Math.random()*7
}

child.position.x = Math.cos(p.angle)*p.radius
child.position.z = Math.sin(p.angle)*p.radius
child.position.y = p.y

})

}

})

return(
<group position={[-15,4,0]}>

{/* core */}
<mesh ref={coreRef}>
<sphereGeometry args={[1.2,64,64]}/>
<meshBasicMaterial color="black"/>
</mesh>

{/* glowing disk */}
<mesh ref={diskRef} rotation={[Math.PI/2,0,0]}>
<ringGeometry args={[1.8,3.8,128]}/>
<meshBasicMaterial
color="#ff6600"
transparent
opacity={0.45}
/>
</mesh>

{/* outer disk */}
<mesh rotation={[Math.PI/2,0,0]}>
<ringGeometry args={[3.8,5.8,128]}/>
<meshBasicMaterial
color="#ffaa33"
transparent
opacity={0.15}
/>
</mesh>

{/* particles */}
<group ref={particleGroup}>
{particles.map((_,i)=>(
<mesh key={i}>
<sphereGeometry args={[0.04,4,4]}/>
<meshBasicMaterial color="white"/>
</mesh>
))}
</group>

</group>
)
}