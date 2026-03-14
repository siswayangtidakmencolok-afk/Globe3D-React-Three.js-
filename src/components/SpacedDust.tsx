import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

export default function SpaceDust(){

const group = useRef<THREE.Group>(null!)

const dust = useMemo(()=>{

const arr = []

for(let i=0;i<160;i++){

arr.push({
x:(Math.random()-0.5)*80,
y:(Math.random()-0.5)*50,
z:(Math.random()-0.5)*80
})

}

return arr

},[])

useFrame(()=>{

if(group.current){

group.current.rotation.y += 0.0003

}

})

return(

<group ref={group}>

{dust.map((d,i)=>(

<mesh key={i} position={[d.x,d.y,d.z]}>

<sphereGeometry args={[0.03,4,4]}/>

<meshBasicMaterial
color="#ddddff"
transparent
opacity={0.5}
/>

</mesh>

))}

</group>

)
}