import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { useState } from "react"

import Globe from "../components/Globe"
import Satellite from "../components/Satellite"
import OrbitLine from "../components/OrbitLine"
import CameraController from "../components/CameraController"
import type { City } from "../data/cities"

import GalaxySky from "../components/GalaxySky"
import ShootingStars from "../components/ShootingStars"
import GasPlanet from "../components/GasPlanet"
import Sun from "../components/Sun"
import AsteroidBelt from "../components/AsteroidBelt"
import BlackHole from "../components/BlackHole"
import CameraRig from "../components/CameraRig"

export default function EarthScene(){

const [selectedCity,setSelectedCity] = useState<City | null>(null)
const [target,setTarget] = useState("earth")

return(

<div style={{width:"100%",height:"100%"}}>

<Canvas 
style={{ width: "100%", height: "100%" }}
camera={{ position:[0,0,8], fov:45 }}
>

<GalaxySky/>
<Sun/>
<GasPlanet/>
<AsteroidBelt/>
<BlackHole/>
<ShootingStars/>

<ambientLight intensity={0.4}/>
<directionalLight position={[5,3,5]} intensity={2}/>

<Stars radius={300} depth={60} count={8000} factor={6}/>

<Globe setSelectedCity={setSelectedCity}/>
<Satellite/>
<OrbitLine/>

<CameraRig target={target}/>
<CameraController selectedCity={selectedCity}/>

<OrbitControls
enableZoom={true}
enablePan={true}
/>

</Canvas>


{/* UI CAMERA BUTTON */}

<div
style={{
position:"absolute",
top:20,
left:20,
display:"flex",
gap:"10px"
}}
>

<button onClick={()=>setTarget("earth")}>
Earth
</button>

<button onClick={()=>setTarget("planet")}>
Gas Planet
</button>

<button onClick={()=>setTarget("blackhole")}>
Black Hole
</button>

</div>

</div>

)

}