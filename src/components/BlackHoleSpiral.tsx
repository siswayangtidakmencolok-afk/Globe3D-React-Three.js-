import { useMemo } from "react"

export default function BlackHoleSpiral(){

const asteroids = useMemo(()=>{

return Array.from({length:20},(_,i)=>{

const angle = i*0.4
const radius = 5 - i*0.2

return {
x: Math.cos(angle)*radius,
z: Math.sin(angle)*radius,
y:(i%3)*0.2
}

})

},[])

return(

<group position={[10,0,-12]}>

{asteroids.map((a,i)=>(

<mesh key={i} position={[a.x,a.y,a.z]}>

<sphereGeometry args={[0.08,8,8]}/>
<meshStandardMaterial color="#888888"/>

</mesh>

))}

</group>

)

}