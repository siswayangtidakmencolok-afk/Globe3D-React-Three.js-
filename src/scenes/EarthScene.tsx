import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Globe from "../components/Globe";

export default function EarthScene() {

  return (

    <Canvas camera={{ position: [0, 0, 5] }}>

      <ambientLight intensity={0.4} />

      <directionalLight position={[5,5,5]} />

      <Stars radius={100} depth={50} count={5000} factor={4} />

      <Globe />

      <OrbitControls />

    </Canvas>

  );

}