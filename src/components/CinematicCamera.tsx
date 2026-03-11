import { useThree, useFrame } from "@react-three/fiber"

export default function CinematicCamera(){

const {camera} = useThree()

useFrame((state)=>{

const t = state.clock.elapsedTime*0.05

camera.position.x = Math.sin(t)*80
camera.position.z = Math.cos(t)*80
camera.position.y = 20

camera.lookAt(0,0,0)

})

return null

}