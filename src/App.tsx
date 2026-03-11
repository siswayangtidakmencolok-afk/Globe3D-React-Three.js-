import { useState } from "react"
import type { City } from "./data/cities"
import EarthScene from "./scenes/EarthScene"

export default function App(){

const [selectedCity,setSelectedCity] = useState<City | null>(null)

return(
  <div style={{ width: "100vw", height: "100vh" }}>
<EarthScene/>
  </div>
  )

}