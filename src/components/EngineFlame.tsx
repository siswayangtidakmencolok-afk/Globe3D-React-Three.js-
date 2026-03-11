import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function EngineFlame(){

const flame = useRef<THREE.Mesh>(null!)

useFrame((state)=>{

if(!flame.current) return

flame.current.scale.y =
1 + Math.sin(state.clock.elapsedTime*10)*0.2

})

return(

<mesh ref={flame} rotation={[Math.PI/2,0,0]}>
<coneGeometry args={[0.4,2,16]}/>
<meshBasicMaterial
color="#00aaff"
transparent
opacity={0.7}
/>
</mesh>

)

}