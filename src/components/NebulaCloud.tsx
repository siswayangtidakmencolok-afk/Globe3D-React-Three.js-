import { useLoader, useFrame } from "@react-three/fiber"
import { TextureLoader } from "three"
import * as THREE from "three"
import { useRef } from "react"

export default function NebulaCloud(){

const nebula1 = useLoader(TextureLoader,"/textures/nebula1.jpg")
const nebula2 = useLoader(TextureLoader,"/textures/nebula2.jpg")

const layer1 = useRef<THREE.Mesh>(null!)
const layer2 = useRef<THREE.Mesh>(null!)

useFrame(()=>{

if(layer1.current)
layer1.current.rotation.y += 0.0003

if(layer2.current)
layer2.current.rotation.y -= 0.00015

})

return(

<>

<mesh ref={layer1} position={[0,0,-70]}>
<sphereGeometry args={[150,64,64]}/>
<meshBasicMaterial
map={nebula1}
side={THREE.BackSide}
transparent
opacity={0.6}
/>
</mesh>

<mesh ref={layer2} position={[0,0,-90]}>
<sphereGeometry args={[180,64,64]}/>
<meshBasicMaterial
map={nebula2}
side={THREE.BackSide}
transparent
opacity={0.5}
/>
</mesh>

</>

)

}