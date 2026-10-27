import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function CameraMotion() {
  useFrame(({ camera, pointer, clock }) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.32, 2.2, 1 / 60);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 1.5 + pointer.y * 0.18 + Math.sin(clock.elapsedTime * 0.22) * 0.035, 2.2, 1 / 60);
    camera.lookAt(pointer.x * 0.12, 0, -2.4);
  });
  return null;
}

function Runway() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ pointer, clock }) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.08, 0.035);
      group.current.position.y = Math.sin(clock.elapsedTime * 0.35) * 0.08;
    }
  });
  return <group ref={group}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, -2]} receiveShadow>
      <planeGeometry args={[18, 42]} /><meshStandardMaterial color="#17131d" metalness={0.65} roughness={0.35} />
    </mesh>
    {[ -4.8, -3.2, -1.6, 0, 1.6, 3.2, 4.8 ].map((x, i) => <mesh key={i} position={[x, -1.66, -2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.018, 40]} /><meshBasicMaterial color={i === 3 ? '#d9b779' : '#725a85'} transparent opacity={i === 3 ? 0.75 : 0.3} />
    </mesh>)}
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.2}>
      <mesh position={[0, 0.25, -4]} rotation={[0.1, 0.2, 0]}>
        <torusGeometry args={[2.1, 0.025, 16, 180]} /><meshStandardMaterial color="#c9a76a" emissive="#8a6338" emissiveIntensity={1.1} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.25, -4.1]} rotation={[0.1, -0.15, 0]}>
        <torusGeometry args={[1.45, 0.012, 12, 180]} /><meshBasicMaterial color="#b7a0d0" transparent opacity={0.8} />
      </mesh>
    </Float>
    <pointLight position={[-4, 4, -2]} color="#b78ee5" intensity={45} distance={15} />
    <pointLight position={[4, 3, -1]} color="#e5bb76" intensity={35} distance={14} />
  </group>;
}
export default function Scene() {
  return <div className="scene-canvas" aria-hidden="true"><Canvas camera={{ position: [0, 1.5, 8], fov: 46 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
    <color attach="background" args={['#09090d']} /><fog attach="fog" args={['#09090d', 8, 24]} />
    <CameraMotion /><ambientLight intensity={0.7} /><directionalLight position={[0, 7, 4]} intensity={1.4} />
    <Stars radius={42} depth={24} count={900} factor={2} saturation={0.2} fade speed={0.35} />
    <Runway />
  </Canvas></div>;
}