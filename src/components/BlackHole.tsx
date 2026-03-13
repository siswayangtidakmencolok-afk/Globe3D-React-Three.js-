import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function BlackHole(){

const disk1 = useRef<THREE.Mesh>(null!)
const disk2 = useRef<THREE.Mesh>(null!)
const glow = useRef<THREE.Mesh>(null!)
const beamTop = useRef<THREE.Mesh>(null!)
const beamBottom = useRef<THREE.Mesh>(null!)

useFrame((state)=>{

const t = state.clock.elapsedTime

if(disk1.current){

disk1.current.rotation.z += 0.015

}

if(disk2.current){

disk2.current.rotation.z -= 0.01

}

if(glow.current){

const pulse = 1 + Math.sin(t*2)*0.08
glow.current.scale.set(pulse,pulse,pulse)

}

const beamPulse = 1 + Math.sin(t*3)*0.05

if(beamTop.current){

beamTop.current.scale.set(beamPulse,beamPulse,beamPulse)

}

if(beamBottom.current){

beamBottom.current.scale.set(beamPulse,beamPulse,beamPulse)

}

})

return(

<group position={[10,0,-12]}>

{/* inti blackhole */}

<mesh>

<sphereGeometry args={[1.5,32,32]}/>
<meshStandardMaterial color="black"/>

</mesh>

{/* accretion disk utama */}

<mesh ref={disk1} rotation={[Math.PI/2,0,0]}>

<torusGeometry args={[3,0.35,16,100]}/>
<meshBasicMaterial
color="#ff5500"
transparent
opacity={0.65}
/>

</mesh>

{/* disk energi kedua */}

<mesh ref={disk2} rotation={[0.6,0,0]}>

<torusGeometry args={[3.8,0.15,16,100]}/>
<meshBasicMaterial
color="#aa44ff"
transparent
opacity={0.35}
/>

</mesh>

{/* glow luar */}

<mesh ref={glow}>

<sphereGeometry args={[2.3,32,32]}/>
<meshBasicMaterial
color="#5522ff"
transparent
opacity={0.08}
side={THREE.BackSide}
/>

</mesh>

{/* beam atas */}

<mesh ref={beamTop} position={[0,4,0]}>

<cylinderGeometry args={[0.15,0.6,8,16]}/>
<meshBasicMaterial
color="#66ccff"
transparent
opacity={0.3}
/>

</mesh>

{/* beam bawah */}

<mesh ref={beamBottom} position={[0,-4,0]}>

<cylinderGeometry args={[0.6,0.15,8,16]}/>
<meshBasicMaterial
color="#66ccff"
transparent
opacity={0.3}
/>

</mesh>

</group>

)

}