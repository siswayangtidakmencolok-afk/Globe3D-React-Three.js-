import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function PlanetGravity(){

const planet = useRef<THREE.Mesh>(null!)

const texture = useLoader(
THREE.TextureLoader,
"/textures/gravityplanet.jpg"
)

useFrame(()=>{

if(planet.current){

planet.current.rotation.y += 0.002

}

})

return(

<mesh ref={planet} position={[-18,5,-10]}>

<sphereGeometry args={[1.5,32,32]}/>

<meshStandardMaterial map={texture}/>

</mesh>

)
}