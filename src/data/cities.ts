export type City = {
  name: string
  lat: number
  lng: number
  role: string
  description: string
}

export const cities: City[] = [
  { name: "Jakarta", lat: -6.2, lng: 106.8, role: "Fullstack Developer", description: "Built scalable web apps for 3 startup clients." },
  { name: "Tokyo", lat: 35.6, lng: 139.6, role: "Frontend Engineer", description: "Lead React developer for an e-commerce platform." },
  { name: "London", lat: 51.5, lng: -0.1, role: "UI/UX Designer", description: "Designed banking dashboards and mobile apps." },
  { name: "New York", lat: 40.7, lng: -74.0, role: "3D Web Specialist", description: "Created immersive Three.js landing pages." },
  { name: "Sydney", lat: -33.8, lng: 151.2, role: "Open Source Contributor", description: "Maintained multiple popular NPM packages." }
]