import { cities } from "../data/cities"
import { latLngToVector } from "../utils/latLngToVector"

export default function CityMarkers(){

return(

<group>

{cities.map((city)=>{

const pos = latLngToVector(city.lat,city.lng,2.05)

return(

<group key={city.name} position={[pos.x,pos.y,pos.z]}>

{/* core */}
<mesh>

<sphereGeometry args={[0.04,16,16]}/>

<meshBasicMaterial color="#ff3b3b"/>

</mesh>

{/* glow */}
<mesh rotation={[Math.PI/2,0,0]}>

<ringGeometry args={[0.07,0.09,32]} />

<meshBasicMaterial
color="#ff3b3b"
transparent
opacity={0.6}
/>

</mesh>
<mesh scale={1.6}>

<sphereGeometry args={[0.04,16,16]}/>

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