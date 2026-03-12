import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

import DroneDock from "./DroneDock"

export default function Spaceship(){

const ship = useRef<THREE.Group>(null!)

useFrame((state)=>{

if(!ship.current) return

const t = state.clock.elapsedTime

ship.current.position.x = Math.sin(t*0.2)*30
ship.current.position.z = Math.cos(t*0.5)*30

ship.current.rotation.y += 0.01

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