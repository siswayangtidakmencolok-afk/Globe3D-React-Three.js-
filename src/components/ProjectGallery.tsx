import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Text } from "@react-three/drei"
import * as THREE from "three"

const projects = [
  {
    title: "Food Ordering App",
    url: "https://app-pemesananmakanan.vercel.app/",
    description: "Full-stack food delivery platform.",
    color: "#4ade80",
    position: new THREE.Vector3(-8, 5, -20),
    rotation: new THREE.Euler(0, Math.PI / 4, 0)
  },
  {
    title: "Frieren Web Tribute",
    url: "https://siswayangtidakmencolok-afk.github.io/website-frieren/",
    description: "Interactive anime tribute site.",
    color: "#a855f7",
    position: new THREE.Vector3(8, 6, -25),
    rotation: new THREE.Euler(0, -Math.PI / 6, 0)
  }
]

export default function ProjectGallery() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation for the entire gallery
      const yOffset = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      groupRef.current.position.y = yOffset
    }
  })

  return (
    <group ref={groupRef}>
      {projects.map((proj, idx) => (
        <ProjectCard key={idx} project={proj} />
      ))}
    </group>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const cardRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (cardRef.current) {
      // Individual rotation/hover effect
      cardRef.current.rotation.y = project.rotation.y + Math.sin(state.clock.elapsedTime + project.position.x) * 0.1
      
      // Scale up when hovered
      const targetScale = hovered ? 1.1 : 1
      cardRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group 
      ref={cardRef} 
      position={project.position} 
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false) }}
      onClick={() => window.open(project.url, "_blank")}
    >
      {/* Hologram Glass Board */}
      <mesh>
        <planeGeometry args={[6, 4]} />
        <meshBasicMaterial 
          color={project.color} 
          transparent 
          opacity={hovered ? 0.3 : 0.15} 
          side={THREE.DoubleSide} 
          depthWrite={false}
        />
      </mesh>

      {/* Glowing Border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[6.1, 4.1]} />
        <meshBasicMaterial 
          color={project.color} 
          wireframe 
          transparent 
          opacity={0.8}
        />
      </mesh>

      {/* 3D Title Text */}
      <Text
        position={[0, 1, 0.1]}
        fontSize={0.5}
        color="#ffffff"
        font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1O4G0EkE.woff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor={project.color}
      >
        {project.title}
      </Text>

      {/* 3D Description Text */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.25}
        color="#e2e8f0"
        font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
      >
        {project.description}
      </Text>

      {/* Interactive HTML Button Overlay */}
      <Html position={[0, -1, 0.1]} transform center distanceFactor={15}>
        <div style={{
          background: hovered ? project.color : "transparent",
          border: `1px solid ${project.color}`,
          color: hovered ? "#000" : project.color,
          padding: "8px 16px",
          borderRadius: "4px",
          fontFamily: "'Inter', sans-serif",
          fontWeight: "bold",
          fontSize: "14px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: hovered ? `0 0 15px ${project.color}` : "none",
          pointerEvents: "none" // Let Three.js handle the click
        }}>
          {hovered ? "LAUNCH PROJECT" : "VIEW DETAILS"}
        </div>
      </Html>
    </group>
  )
}
