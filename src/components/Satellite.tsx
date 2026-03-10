import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function Satellite(){

const group = useRef<THREE.Group>(null)

useFrame(({clock})=>{

const t = clock.getElapsedTime()

if(group.current){

group.current.position.x = Math.cos(t)*3
group.current.position.z = Math.sin(t)*3
group.current.rotation.y += 0.01

}

})

return(

<group ref={group}>

{/* body */}
<mesh>

<boxGeometry args={[0.1,0.05,0.05]}/>

<meshStandardMaterial color="white"/>

</mesh>

{/* solar panel kiri */}
<mesh position={[-0.15,0,0]}>

<boxGeometry args={[0.2,0.02,0.1]}/>

<meshStandardMaterial color="#2a6cff"/>

</mesh>

{/* solar panel kanan */}
<mesh position={[0.15,0,0]}>

<boxGeometry args={[0.2,0.02,0.1]}/>

<meshStandardMaterial color="#2a6cff"/>

</mesh>

</group>

)

}