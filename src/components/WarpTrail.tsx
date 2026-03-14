import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

type Props = {
active:boolean
position:[number,number,number]
}

export default function WarpTrail({active,position}:Props){

const trail = useRef<THREE.Mesh>(null!)

useFrame((state)=>{

if(!trail.current) return

const material = trail.current.material as THREE.MeshBasicMaterial

if(active){

trail.current.scale.z = 6

material.opacity =
0.2 + Math.sin(state.clock.elapsedTime*12)*0.08

}else{

trail.current.scale.z = 1
material.opacity = 0

}

})

return(

<mesh
ref={trail}
position={position}
rotation={[Math.PI/2,0,0]}
>

<cylinderGeometry args={[0.12,0.12,6,12]}/>

<meshBasicMaterial
color="#66ccff"
transparent
opacity={0}
/>

</mesh>

)
}