import { useThree, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"

type Props = {
  target: string
  warp?: boolean
}

export default function CameraRig({ target, warp }: Props) {

  const { camera } = useThree()

  const targetPos = useRef(new THREE.Vector3())
  const lookTarget = useRef(new THREE.Vector3())
  const moving = useRef(false)

  useEffect(() => {

    if(target === "earth"){
      targetPos.current.set(0, 0, 8)
      lookTarget.current.set(0, 0, 0)
    }

    if(target === "planet"){
      targetPos.current.set(14, 3, 8)
      lookTarget.current.set(14, 0, 0)
    }

    if(target === "blackhole"){
      targetPos.current.set(-14, 4, 10)
      lookTarget.current.set(-12, 0, 0)
    }

    if(target === "wormhole"){
      targetPos.current.set(-12, 3, -10)
      lookTarget.current.set(-12, 3, -18)
    }

    moving.current = true

  }, [target])

  useFrame(() => {

    // Dynamic FOV for warp effect
    const targetFov = warp ? 100 : 45
    // @ts-ignore
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.05)
    camera.updateProjectionMatrix()

    if(!moving.current) return

    camera.position.lerp(targetPos.current, 0.03)

    const currentLook = new THREE.Vector3()
    currentLook.lerpVectors(
      currentLook,
      lookTarget.current,
      0.03
    )

    camera.lookAt(lookTarget.current)

    if(camera.position.distanceTo(targetPos.current) < 0.15){
      moving.current = false
    }

  })

  return null
}