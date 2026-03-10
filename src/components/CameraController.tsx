import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import { Vector3 } from "three"
import type { City } from "../data/cities"
import { latLngToVector } from "../utils/latLngToVector"

type Props = {
  selectedCity: City | null
}

export default function CameraController({ selectedCity }: Props) {

const { camera } = useThree()

useEffect(() => {

if (!selectedCity) return

const pos = latLngToVector(
selectedCity.lat,
selectedCity.lng,
4
)

camera.position.set(pos.x, pos.y, pos.z)

camera.lookAt(new Vector3(0,0,0))

}, [selectedCity])

return null
}