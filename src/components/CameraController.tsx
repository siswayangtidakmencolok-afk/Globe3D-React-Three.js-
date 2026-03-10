import { useThree, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import type { City } from "../data/cities"
import { latLngToVector } from "../utils/latLngToVector"

type Props = {
  selectedCity: City | null
}

export default function CameraController({ selectedCity }: Props) {

const { camera } = useThree()

const target = useRef(new THREE.Vector3())
const isMoving = useRef(false)

useFrame(()=>{

if(selectedCity && !isMoving.current){

const pos = latLngToVector(
selectedCity.lat,
selectedCity.lng,
4
)

target.current.copy(pos)

isMoving.current = true

}

if(isMoving.current){

camera.position.lerp(target.current,0.05)

camera.lookAt(0,0,0)

if(camera.position.distanceTo(target.current) < 0.01){

isMoving.current = false

}

}

})

return null

}