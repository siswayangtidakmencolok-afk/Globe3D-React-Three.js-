import { useThree, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"

type Props = {
  target: string
}

export default function CameraRig({ target }: Props) {

  const { camera } = useThree()

  const targetPos = useRef(new THREE.Vector3())
  const moving = useRef(false)

  useEffect(() => {

    console.log("Camera target:", target)

    if(target === "earth"){
      targetPos.current.set(0,0,8)
    }

    if(target === "planet"){
      targetPos.current.set(15,2,8)
    }

    if(target === "blackhole"){
      targetPos.current.set(-15,4,10)
    }

    if(target === "wormhole"){
      targetPos.current.set(0,0,-40)
    }

    moving.current = true

  },[target])

  useFrame(()=>{

    if(!moving.current) return

    camera.position.lerp(targetPos.current,0.05)

    camera.lookAt(0,0,0)

    if(camera.position.distanceTo(targetPos.current) < 0.1){
      moving.current = false
    }

  })

  return null
}