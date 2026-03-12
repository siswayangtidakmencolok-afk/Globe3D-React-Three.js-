import { useThree, useFrame } from "@react-three/fiber"

type Props={
enabled:boolean
}

export default function CinematicCamera({enabled}:Props){

const {camera} = useThree()

useFrame((state)=>{

if(!enabled) return

const t = state.clock.elapsedTime*0.15

camera.position.set(
Math.sin(t)*60,
20,
Math.cos(t)*60
)

camera.lookAt(0,0,0)

})

return null

}