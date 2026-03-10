import { cities } from "../data/cities"
import type { City } from "../data/cities"
import { latLngToVector } from "../utils/latLngToVector"

type Props = {
  setSelectedCity: (city: City) => void
}

export default function CityMarkers({ setSelectedCity }: Props) {

return(

<group>

{cities.map((city)=>{

const pos = latLngToVector(city.lat,city.lng,2.1)

return(

<group
key={city.name}
position={[pos.x,pos.y,pos.z]}
onClick={()=>setSelectedCity(city)}
>

<mesh>

<sphereGeometry args={[0.04,16,16]} />

<meshBasicMaterial color="#ff3b3b"/>

</mesh>

<mesh scale={1.6}>

<sphereGeometry args={[0.04,16,16]} />

<meshBasicMaterial
color="#ff3b3b"
transparent
opacity={0.3}
/>

</mesh>

</group>

)

})}

</group>

)

}