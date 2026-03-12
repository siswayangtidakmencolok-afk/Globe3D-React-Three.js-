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
import Nebula from "../components/Nebula"
import NebulaCloud from "../components/NebulaCloud"
import SaturnPlanet from "../components/SaturnPlanet"
import Spaceship from "../components/Spaceship"
import AsteroidField from "../components/AsteroidField"
import PlanetGravity from "../components/PlanetGravity"
import BlackHoleGravity from "../components/BlackHoleGravity"
import CinematicCamera from "../components/CinematicCamera"
import Wormhole from "../components/Wormhole"
import WarpStars from "../components/WarpStars"

export default function EarthScene(){

const [selectedCity,setSelectedCity] = useState<City | null>(null)
const [target,setTarget] = useState("earth")
const [cinematic,setCinematic] = useState(false)
const [warp,setWarp] = useState(false)

return(

<div style={{width:"100%",height:"100%"}}>

<Canvas 
style={{ width: "100%", height: "100%" }}
camera={{ position:[0,0,8], fov:45 }}
>

<AsteroidField/>
<PlanetGravity/>
<BlackHoleGravity/>
<CinematicCamera enabled={cinematic}/>
<GalaxySky/>
<Sun/>
<GasPlanet/>
<AsteroidBelt/>
<BlackHole/>
<ShootingStars/>
<NebulaCloud/>
<Nebula/>
<SaturnPlanet/>
<Wormhole/>
<WarpStars active={warp}/>

<ambientLight intensity={0.4}/>
<directionalLight position={[5,3,5]} intensity={2}/>

<Stars radius={200} depth={40} count={2000} factor={4}/>

<Globe setSelectedCity={setSelectedCity}/>
<Satellite/>
<OrbitLine/>
<Spaceship/>

<CameraRig target={target}/>
<CameraController selectedCity={selectedCity}/>

<mesh>
<sphereGeometry args={[2,32,32]}/>
<meshStandardMaterial color="blue"/>
</mesh>

<OrbitControls
enabled={!cinematic}
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

<button
onClick={()=>setCinematic(!cinematic)}>
{cinematic ? "Free Camera" : "Cinematic Mode"}
</button>

<button onClick={()=>setTarget("wormhole")}>
Wormhole
</button>

<button
onClick={()=>setWarp(!warp)}
>
{warp ? "Stop Warp" : "Warp Jump"}
</button>

</div>

</div>

)

}