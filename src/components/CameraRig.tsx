import { useThree, useFrame } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import * as THREE from "three"

type Props = {
  target: string
}

export default function CameraRig({ target }: Props) {

  const { camera } = useThree()

  const targetPos = useRef(new THREE.Vector3())
  const moving = useRef(false)

  useEffect(() => {

    if (target === "earth") {
      targetPos.current.set(0, 0, 6)
    }

    if (target === "planet") {
      targetPos.current.set(10, 2, 6)
    }

    if (target === "blackhole") {
      targetPos.current.set(15, 5, 8)
    }

    moving.current = true

  }, [target])

  useFrame(() => {

    if (!moving.current) return

    camera.position.lerp(targetPos.current, 0.05)

    if (camera.position.distanceTo(targetPos.current) < 0.05) {
      moving.current = false
    }

  })

  return null
}