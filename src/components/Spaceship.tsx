import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

import DroneDock from "./DroneDock"


type Props = {
warp:boolean
}

export default function Spaceship({warp}:Props){
  
  const ship = useRef<THREE.Group>(null!)

useFrame(()=>{

if(!ship.current) return

if(warp){

ship.current.position.lerp(
new THREE.Vector3(-12,3,-18),
0.02
)

}else{

ship.current.position.x += 0.002

}

})


return(
  
  <group ref={ship}>

<mesh>
<boxGeometry args={[3,1,10]}/>
<meshStandardMaterial color="#666"/>
</mesh>

<mesh position={[0,0.5,4]}>
<sphereGeometry args={[1,32,32]}/>
<meshStandardMaterial emissive="#0088ff"/>
</mesh>

<DroneDock/>

</group>

)

}