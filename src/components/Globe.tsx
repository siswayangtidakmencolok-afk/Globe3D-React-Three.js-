import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import CityMarkers from "./CityMarkers"

export default function Globe(){

const ref = useRef<THREE.Mesh>(null)

const earth = useLoader(
THREE.TextureLoader,
"/textures/earth.jpg"
)

useFrame(()=>{

if(ref.current){
ref.current.rotation.y += 0.001
}

})

return(

<group>

<mesh ref={ref}>

<sphereGeometry args={[2,64,64]} />

<meshStandardMaterial map={earth}/>

</mesh>

{/* MARKER KOTA */}
<CityMarkers/>

</group>

)

}