import * as THREE from "three"

export default function OrbitLine(){

const curve = new THREE.EllipseCurve(
0,
0,
3,
3,
0,
2*Math.PI,
false,
0
)

const points = curve.getPoints(100)

const geometry = new THREE.BufferGeometry().setFromPoints(
points.map(p => new THREE.Vector3(p.x,0,p.y))
)

return(

<line>

<primitive object={geometry} attach="geometry"/>

<lineBasicMaterial color="#888"/>

</line>

)

}