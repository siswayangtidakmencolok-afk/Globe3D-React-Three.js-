import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { useState, Suspense, useEffect } from "react"

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
import BlackHoleSpiral from "../components/BlackHoleSpiral"
import WarpTrail from "../components/WarpTrail"
import SpaceDust from "../components/SpacedDust"

export default function EarthScene(){

const [selectedCity,setSelectedCity] = useState<City | null>(null)
const [target,setTarget] = useState("earth")
const [cinematic,setCinematic] = useState(false)
const [warp,setWarp] = useState(false)
const [showAbout,setShowAbout] = useState(false)

// Auto-hide About Modal after 5 seconds
useEffect(() => {
  if (!showAbout) return
  
  const timer = setTimeout(() => {
    setShowAbout(false)
  }, 5000)

  return () => clearTimeout(timer)
}, [showAbout])

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

<div className="app-container">

<div className="canvas-container">
<Canvas
style={{ width:"100%", height:"100%" }}
camera={{ position:[0,0,8], fov:45 }}
dpr={[1,1.5]}
gl={{
antialias:false,
powerPreference:"high-performance"
}}
>

<Suspense fallback={null}>
<GalaxySky/>
<Sun/>
<ShootingStars/>
<SpaceDust/>

<Globe setSelectedCity={setSelectedCity}/>
<Satellite/>
<OrbitLine/>

<Spaceship warp={warp}/>
<WarpTrail active={warp} position={[-8,2,-14]}/>

<GasPlanet/>
<NewPlanet/>
<PlanetGravity/>

<BlackHole/>
<BlackHoleSpiral/>

<Wormhole/>

<SaturnPlanet/>

{/* mode tambahan */}

{target==="planet" && (
<>
<OrbitPlanet/>
<OrbitPlanetLine/>
<AsteroidBelt/>
</>
)}

{target==="blackhole" && (
<>
<BlackHoleGravity/>
<AsteroidField/>
</>
)}

{target==="wormhole" && (
<>
<Nebula/>
<NebulaCloud/>
<WarpStars active={warp}/>
</>
)}

<CameraRig target={target} warp={warp}/>
<CameraController selectedCity={selectedCity}/>
<CinematicCamera enabled={cinematic}/>

<ambientLight intensity={0.4}/>
<directionalLight position={[5,3,5]} intensity={2}/>

<Stars
radius={120}
depth={35}
count={isMobile ? 500 : 1200}
factor={isMobile ? 2 : 3}
/>

<OrbitControls
enabled={!cinematic}
enableZoom={true}
enablePan={true}
/>

<EffectComposer disableNormalPass>
  <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
  <Vignette eskil={false} offset={0.1} darkness={1.1} />
</EffectComposer>
</Suspense>

</Canvas>

<div className="ui-layer">
  {/* Header Navigation */}
  <header className="nav-header">
    <div className="logo">PORTFOLIO</div>
    <nav className="nav-links">
      <div className="nav-item active">Home</div>
      <div 
        className="nav-item" 
        onClick={() => setShowAbout(true)}
        style={{ cursor: "pointer" }}
      >
        About
      </div>
      <div className="nav-item">Projects</div>
      <div className="nav-item">Contact</div>
    </nav>
  </header>

  {/* Holographic About Modal */}
  {showAbout && (
    <div className="about-modal">
      <h2 style={{ fontFamily: "'Outfit', sans-serif", color: "#4ade80", marginBottom: "1rem", fontSize: "1.5rem" }}>
        Transmission Received... 📡
      </h2>
      <div className="about-content">
        <p>
          Hallo! Nama saya <strong>Fhazwan Athar Ramadhan</strong>, seorang pelajar yang tinggal di Jakarta 🏙️. Saya memiliki berbagai hobi yang saya sukai, mulai dari menggambar 🎨, coding 💻, membaca manga 📚, bermain game 🎮, hingga berpergian untuk mengeksplorasi tempat-tempat baru 🗺️.
        </p>
        <p>
          Saya membuat profil ini untuk semua orang yang berkunjung dan ingin melihat perjalanan saya di dunia pemrograman. Saya orangnya cenderung dingin, tapi memiliki rasa ingin tahu yang sangat tinggi terhadap hal-hal baru 🔍. Itulah yang membawa saya masuk ke jurusan RPL—untuk menambah wawasan tentang pemrograman dan mengasah berbagai keahlian yang saya minati.
        </p>
      </div>
    </div>
  )}

  {/* Hero Content */}
  <div className="hero-content">
    <h1 className="hero-title">Discover The Universe</h1>
    <p className="hero-subtitle">Interactive 3D Experiences & Frontend Engineering.</p>
  </div>

  {/* Control Panel (Glassmorphism) */}
  <div className="control-panel glass">
    <button
      onClick={()=>{
        setTarget("earth")
        setWarp(false)
      }}
      className={`control-btn ${target === "earth" ? "active" : ""}`}
    >
      🌍 Earth
    </button>

    <button
      onClick={()=>{
        setTarget("planet")
        setWarp(false)
      }}
      className={`control-btn ${target === "planet" ? "active" : ""}`}
    >
      🪐 Gas Planet
    </button>

    <button
      onClick={()=>{
        setTarget("blackhole")
        setWarp(false)
      }}
      className={`control-btn ${target === "blackhole" ? "active" : ""}`}
    >
      🕳️ Black Hole
    </button>

    <button
      onClick={()=>{
        setTarget("wormhole")
        setWarp(true)
      }}
      className={`control-btn ${target === "wormhole" ? "active" : ""}`}
      style={{ background: target === "wormhole" ? "rgba(76, 29, 149, 0.6)" : "" }}
    >
      🌌 Wormhole
    </button>

    <button
      onClick={()=>setWarp(!warp)}
      className="control-btn"
    >
      🚀 {warp ? "Stop Warp" : "Warp Jump"}
    </button>

    <button
      onClick={()=>setCinematic(!cinematic)}
      className="control-btn"
    >
      🎥 {cinematic ? "Free Camera" : "Cinematic"}
    </button>
  </div>
</div>
</div>
</div>

)
}