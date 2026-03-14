import { useState, useEffect } from "react"
import { cities } from "../data/cities"
import type { City } from "../data/cities"
import { latLngToVector } from "../utils/latLngToVector"
import { Html } from "@react-three/drei"

type Props = {
  setSelectedCity: (city: City) => void
}

export default function CityMarkers({ setSelectedCity }: Props) {

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  useEffect(() => {
    if(!activeTooltip) return

    const timer = setTimeout(() => {
      setActiveTooltip(null)
    }, 5000)

    return () => clearTimeout(timer)
  }, [activeTooltip])

return(

<group>

{cities.map((city)=>{

const pos = latLngToVector(city.lat,city.lng,2.1)

return(

<group
key={city.name}
position={[pos.x,pos.y,pos.z]}
onClick={(e)=>{
  e.stopPropagation()
  setSelectedCity(city)
  setActiveTooltip(city.name)
}}
>

<mesh>
<sphereGeometry args={[0.04,16,16]} />
<meshBasicMaterial color={activeTooltip === city.name ? "#00ff88" : "#ff3b3b"}/>
</mesh>

<mesh scale={1.6}>
<sphereGeometry args={[0.04,16,16]} />
<meshBasicMaterial
color={activeTooltip === city.name ? "#00ff88" : "#ff3b3b"}
transparent
opacity={0.3}
/>
</mesh>

{/* Interactive HTML Tooltip */}
{activeTooltip === city.name && (
  <Html position={[0, 0.1, 0]} center zIndexRange={[100, 0]}>
    <div style={{
      background: "rgba(10, 10, 10, 0.85)",
      backdropFilter: "blur(10px)",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "white",
      width: "220px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
      fontFamily: "'Inter', sans-serif",
      pointerEvents: "none",
      animation: "fadeIn 0.3s ease-in-out"
    }}>
      <h3 style={{ margin: "0 0 5px 0", fontSize: "16px", fontFamily: "'Outfit', sans-serif", color: "#a5b4fc" }}>
        {city.name}
      </h3>
      <p style={{ margin: "0 0 5px 0", fontSize: "12px", fontWeight: "bold", color: "#646cff" }}>
        {city.role}
      </p>
      <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.7)", lineHeight: "1.4" }}>
        {city.description}
      </p>
    </div>
  </Html>
)}

</group>

)

})}

</group>

)

}