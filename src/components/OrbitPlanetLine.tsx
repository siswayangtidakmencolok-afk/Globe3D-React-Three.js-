export default function OrbitPlanetLine(){

return(

<mesh
rotation={[Math.PI/2,0,0]}
position={[0,-0.02,0]}
>

<ringGeometry args={[17.8,18,128]}/>

<meshBasicMaterial
color="white"
transparent
opacity={0.18}
side={2}
depthWrite={false}
/>

</mesh>

)

}