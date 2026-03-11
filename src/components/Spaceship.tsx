import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

import Drone from "./Drone"
import EngineFlame from "./EngineFlame"

export default function Spaceship(){

const ship = useRef<THREE.Group>(null!)

useFrame((state)=>{

if(!ship.current) return

// orbit keliling sistem
const t = state.clock.elapsedTime*0.2

ship.current.position.x = Math.sin(t)*30
ship.current.position.z = Math.cos(t)*30
ship.current.position.y = Math.sin(t*0.5)*2

ship.current.rotation.y += 0.01

})

return(

<group ref={ship}>

{/* badan utama */}
<mesh>
<boxGeometry args={[3,1,10]}/>
<meshStandardMaterial color="#5f6b7a"/>
</mesh>

{/* cockpit */}
<mesh position={[0,0.5,4]}>
<sphereGeometry args={[1,32,32]}/>
<meshStandardMaterial
color="#88ccff"
emissive="#0044ff"
/>
</mesh>

{/* sayap kiri */}
<mesh position={[-3,0,0]}>
<boxGeometry args={[4,0.2,3]}/>
<meshStandardMaterial color="#444"/>
</mesh>

{/* sayap kanan */}
<mesh position={[3,0,0]}>
<boxGeometry args={[4,0.2,3]}/>
<meshStandardMaterial color="#444"/>
</mesh>

{/* engine kiri */}
<group position={[-1,0,-6]}>
<cylinderGeometry args={[0.5,0.5,1,32]}/>
<meshStandardMaterial emissive="#00aaff" color="#111"/>
<EngineFlame/>
</group>

{/* engine kanan */}
<group position={[1,0,-6]}>
<cylinderGeometry args={[0.5,0.5,1,32]}/>
<meshStandardMaterial emissive="#00aaff" color="#111"/>
<EngineFlame/>
</group>

{/* drone squad */}

<group position={[0,0,0]}>
<Drone offset={0}/>
<Drone offset={2}/>
<Drone offset={4}/>
</group>

</group>

)

}