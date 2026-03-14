import { useFrame, useLoader } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

export default function SaturnPlanet(){

const group = useRef<THREE.Group>(null!)
const planet = useRef<THREE.Mesh>(null!)
const ring = useRef<THREE.Mesh>(null!)
const glow = useRef<THREE.Mesh>(null!)
const moon = useRef<THREE.Mesh>(null!)
const aurora = useRef<THREE.Mesh>(null!)

const planetTexture = useLoader(
THREE.TextureLoader,
"/textures/saturn.jpg"
)

const ringTexture = useLoader(
THREE.TextureLoader,
"/textures/saturn_ring.png"
)

const moonTexture = useLoader(
THREE.TextureLoader,
"/textures/moon.jpg"
)

const particles = useMemo(()=>{

const arr = []

for(let i=0;i<140;i++){

const angle = Math.random()*Math.PI*2
const radius = 3.2 + Math.random()*1.2

arr.push({
x:Math.cos(angle)*radius,
z:Math.sin(angle)*radius,
y:(Math.random()-0.5)*0.04
})

}

return arr

},[])

useFrame((state)=>{

const t = state.clock.elapsedTime * 0.08

if(group.current){

group.current.position.x = Math.cos(t) * 26
group.current.position.z = Math.sin(t) * 26

}

if(planet.current){

planet.current.rotation.y += 0.0025

}

if(ring.current){

ring.current.rotation.z += 0.0004

}

if(glow.current){

const pulse = 1 + Math.sin(state.clock.elapsedTime*2)*0.015
glow.current.scale.set(pulse,pulse,pulse)

}

if(moon.current){

const mt = state.clock.elapsedTime * 0.7

moon.current.position.x = Math.cos(mt)*5
moon.current.position.z = Math.sin(mt)*5

moon.current.rotation.y += 0.01

}

if(aurora.current){

const material = aurora.current.material as THREE.MeshBasicMaterial

material.opacity = 0.08 + Math.sin(state.clock.elapsedTime*3)*0.02

}

})

return(

<group ref={group}>

{/* PLANET */}
<mesh ref={planet}>
<sphereGeometry args={[2.2,48,48]}/>
<meshStandardMaterial
map={planetTexture}
roughness={0.9}
metalness={0.05}
/>
</mesh>

{/* GLOW */}
<mesh ref={glow}>
<sphereGeometry args={[2.34,48,48]}/>
<meshBasicMaterial
color="#ffd89c"
transparent
opacity={0.12}
side={THREE.BackSide}
/>
</mesh>

{/* AURORA */}
<mesh ref={aurora}>
<sphereGeometry args={[2.42,48,48,0,Math.PI*2,0,0.35]}/>
<meshBasicMaterial
color="#8fffd1"
transparent
opacity={0.08}
side={THREE.DoubleSide}
/>
</mesh>

{/* RING */}
<mesh ref={ring} rotation={[Math.PI/2,0,0]}>
<ringGeometry args={[3,4.5,96]}/>
<meshStandardMaterial
map={ringTexture}
transparent
side={THREE.DoubleSide}
roughness={1}
/>
</mesh>

{/* DARK SHADOW RING */}
<mesh rotation={[Math.PI/2,0,0]}>
<ringGeometry args={[2.95,4.6,128]}/>
<meshBasicMaterial
color="#000000"
transparent
opacity={0.12}
side={THREE.DoubleSide}
/>
</mesh>

{/* INNER SHADOW */}
<mesh rotation={[Math.PI/2,0,0]}>
<ringGeometry args={[3.1,4.2,128]}/>
<meshBasicMaterial
color="#111111"
transparent
opacity={0.08}
side={THREE.DoubleSide}
/>
</mesh>

{/* ICE PARTICLES */}
{particles.map((p,i)=>(

<mesh
key={i}
position={[p.x,p.y,p.z]}
>

<sphereGeometry args={[0.02,4,4]}/>
<meshBasicMaterial color="#f8f4ff"/>

</mesh>

))}

{/* MOON */}
<mesh ref={moon}>
<sphereGeometry args={[0.32,20,20]}/>
<meshStandardMaterial
map={moonTexture}
roughness={1}
/>
</mesh>

{/* LIGHT */}
<pointLight
position={[-12,4,0]}
intensity={1}
distance={30}
/>

</group>

)

}