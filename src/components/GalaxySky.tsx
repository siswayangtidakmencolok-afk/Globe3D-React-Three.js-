import { useTexture } from "@react-three/drei"
import * as THREE from "three"

export default function GalaxySky() {

const galaxy = useTexture("/textures/milkyway.jpg")

return (

<mesh>

<sphereGeometry args={[100, 64, 64]} />

<meshBasicMaterial
map={galaxy}
side={THREE.BackSide}
/>

</mesh>

)

}