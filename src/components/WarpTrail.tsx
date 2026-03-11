import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

type Props = {
active:boolean
}

export default function WarpTrail({active}:Props){

const trail = useRef<THREE.Mesh>(null!)

useFrame((state)=>{

if(!trail.current) return

if(active){

trail.current.scale.z = 20
trail.current.material.opacity =
0.5 + Math.sin(state.clock.elapsedTime*20)*0.2

}else{

trail.current.scale.z = 1
trail.current.material.opacity = 0

}

})

return(

<mesh ref={trail} position={[0,0,-8]}>
<cylinderGeometry args={[0.3,0.3,20,16]}/>
<meshBasicMaterial
color="#66ccff"
transparent
opacity={0}
/>
</mesh>

)

}