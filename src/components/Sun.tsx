import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Sun(){

const sunRef = useRef<THREE.Mesh>(null!)

useFrame(()=>{
if(sunRef.current){
sunRef.current.rotation.y += 0.001
}
})

return(

<group position={[-25,10,-30]}>

{/* sphere sun */}

<mesh ref={sunRef}>

<sphereGeometry args={[5,64,64]} />

<meshBasicMaterial
color="#ffaa33"
/>

</mesh>

{/* sunlight */}

<pointLight
intensity={500}
distance={200}
decay={2}
color="#ffddaa"
/>

</group>

)

}