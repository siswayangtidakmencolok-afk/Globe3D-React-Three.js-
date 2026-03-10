import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import Globe from "../components/Globe"
import Satellite from "../components/Satellite"
import OrbitLine from "../components/OrbitLine"
import CameraController from "../components/CameraController"
import type { City } from "../data/cities"
import GalaxySky from "../components/GalaxySky"

type Props = {
  selectedCity: City | null
  setSelectedCity: (city: City) => void
}

export default function EarthScene({ selectedCity, setSelectedCity }: Props) {

return(

<Canvas camera={{ position:[0,0,6], fov:45 }}>

<GalaxySky/>

<ambientLight intensity={0.4}/>

<directionalLight position={[5,3,5]} intensity={2}/>

<Stars radius={300} depth={60} count={8000} factor={6}/>

<Globe setSelectedCity={setSelectedCity}/>

<Satellite/>

<OrbitLine/>

<CameraController selectedCity={selectedCity}/>

<OrbitControls
  enableZoom={true}
  enablePan={true}
/>

</Canvas>

)

}