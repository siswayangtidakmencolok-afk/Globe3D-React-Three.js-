import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import Globe from "../components/Globe"
import Satellite from "../components/Satellite"

export default function EarthScene(){

return(

<Canvas camera={{ position:[0,0,6] }}>

<ambientLight intensity={0.5}/>

<directionalLight position={[5,5,5]}/>

<Stars radius={300} depth={60} count={5000} factor={4}/>

<Globe/>

<Satellite/>

<OrbitControls/>

</Canvas>

)

}