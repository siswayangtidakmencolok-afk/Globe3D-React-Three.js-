import CityMarkers from "./CityMarkers"
import type { City } from "../data/cities"
import { useTexture } from "@react-three/drei"

type Props = {
  setSelectedCity: (city: City) => void
}

export default function Globe({ setSelectedCity }: Props) {

const earthTexture = useTexture("/textures/earth.jpg")

return (

<group>

<mesh>

<sphereGeometry args={[2,64,64]} />

<meshStandardMaterial map={earthTexture} />

</mesh>

<CityMarkers setSelectedCity={setSelectedCity} />

</group>

)

}