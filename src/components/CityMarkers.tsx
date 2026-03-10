import { cities } from "../data/cities"
import { latLngToVector } from "../utils/latLngToVector"

export default function CityMarkers(){

return(

<group>

{cities.map((city)=>{

const pos = latLngToVector(city.lat, city.lng, 2.05)

return(

<mesh
key={city.name}
position={[pos.x, pos.y, pos.z]}
>

<sphereGeometry args={[0.05,16,16]} />

<meshBasicMaterial color="red"/>

</mesh>

)

})}

</group>

)

}