import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"
import CityMarkers from "./CityMarkers"
import Satellite from "./Satellite"
import type { City } from "../data/cities"

type Props = {
  setSelectedCity: (city: City) => void
}

export default function Globe({ setSelectedCity }: Props) {

const earthRef = useRef<THREE.Mesh>(null!)
const cloudRef = useRef<THREE.Mesh>(null!)

const dayMap = useTexture("/textures/earth.jpg")
const nightMap = useTexture("/textures/night.jpg")
const cloudMap = useTexture("/textures/earth_clouds.png")

useFrame(() => {

if (earthRef.current) {
  earthRef.current.rotation.y += 0.0007
}

if (cloudRef.current) {
  cloudRef.current.rotation.y += 0.001
}

})

return (

<group>

{/* EARTH */}
<mesh ref={earthRef}>

<sphereGeometry args={[2, 64, 64]} />

<meshStandardMaterial
map={dayMap}
emissiveMap={nightMap}
emissive={"#ffffff"}
emissiveIntensity={0.4}
/>

</mesh>

{/* CLOUDS */}
<mesh ref={cloudRef}>

<sphereGeometry args={[2.03, 64, 64]} />

<meshStandardMaterial
map={cloudMap}
transparent
opacity={0.8}
depthWrite={false}
/>

</mesh>

{/* ATMOSPHERE */}
<mesh scale={2.2}>

<sphereGeometry args={[1, 64, 64]} />

<meshBasicMaterial
color="#3aa6ff"
transparent
opacity={0.15}
side={THREE.BackSide}
/>

</mesh>

<CityMarkers setSelectedCity={setSelectedCity} />

<Satellite/>

</group>

)

}