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
import OrbitPlanet from "../components/OrbitPlanet"
import OrbitPlanetLine from "../components/OrbitPlanetLine"
import NewPlanet from "../components/NewPlanet"

export default function EarthScene(){

const [selectedCity,setSelectedCity] = useState<City | null>(null)
const [target,setTarget] = useState("earth")
const [cinematic,setCinematic] = useState(false)
const [warp,setWarp] = useState(false)

const buttonStyle = {
padding:"12px 16px",
fontSize:"14px",
borderRadius:"10px",
border:"none",
background:"rgba(0,0,0,0.55)",
color:"white",
cursor:"pointer",
backdropFilter:"blur(6px)",
width:"130px",
textAlign:"left" as const
}

const isMobile = window.innerWidth < 768

return(

<div style={{width:"100%",height:"100%"}}>

<Canvas 
style={{ width: "100%", height: "100%" }}
camera={{ position:[0,0,8], fov:45 }}
dpr={[1,1.5]}
gl={{
antialias:false,
powerPreference:"high-performance"
}}
>
<GalaxySky/>
<Sun/>
<ShootingStars/>
<Globe setSelectedCity={setSelectedCity}/>
<NewPlanet/>
<Satellite/>
<OrbitLine/>
<Spaceship/>
<GasPlanet/>

{/* PLANET MODE */}
{target === "planet" && (
<>
<GasPlanet/>
<SaturnPlanet/>
<OrbitPlanet/>
<OrbitPlanetLine/>
<AsteroidBelt/>
<Spaceship/>
</>
)}

{/* BLACKHOLE MODE */}
{target === "blackhole" && (
<>
<BlackHoleGravity/>
<AsteroidField/>
<Spaceship/>
</>
)}
<BlackHole/>
<Wormhole/>

{/* WORMHOLE MODE */}
{target === "wormhole" && (
<>
<Nebula/>
<NebulaCloud/>
<WarpStars active={warp}/>
<Spaceship/>
</>
)}

{/* CAMERA SYSTEM */}
<PlanetGravity/>
<CinematicCamera enabled={cinematic}/>
<CameraRig target={target}/>
<CameraController selectedCity={selectedCity}/>

{/* LIGHT */}
<ambientLight intensity={0.4}/>
<directionalLight position={[5,3,5]} intensity={2}/>

{/* STARS */}
<Stars
radius={120}
depth={35}
count={isMobile ? 500 : 1200}
factor={isMobile ? 2 : 3}
/>

{/* DEBUG PLANET */}
<mesh>
<sphereGeometry args={[2,32,32]}/>
<meshStandardMaterial color="blue"/>
</mesh>

{/* CONTROL */}
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
flexDirection:"column",
gap:"12px",
zIndex:10
}}
>

<button onClick={()=>setTarget("earth")} style={buttonStyle}>
Earth
</button>

<button onClick={()=>setTarget("planet")} style={buttonStyle}>
Gas Planet
</button>

<button onClick={()=>setTarget("blackhole")} style={buttonStyle}>
Black Hole
</button>

<button onClick={()=>setTarget("wormhole")} style={buttonStyle}>
Wormhole
</button>

<button onClick={()=>setWarp(!warp)} style={buttonStyle}>
{warp ? "Stop Warp" : "Warp Jump"}
</button>

<button onClick={()=>setCinematic(!cinematic)} style={buttonStyle}>
{cinematic ? "Free Camera" : "Cinematic"}
</button>

</div>

</div>

)
}