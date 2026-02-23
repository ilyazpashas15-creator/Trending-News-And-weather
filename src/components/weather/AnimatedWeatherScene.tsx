'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud, Sky, Stars, Text, Float, Html, Billboard } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedWeatherSceneProps {
  condition?: string;
  temperature?: number;
  city?: string;
}

const AnimatedWeatherScene: React.FC<AnimatedWeatherSceneProps> = ({
  condition = 'Clear',
  temperature = 20,
  city = 'City'
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Animation based on weather condition
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle rotation for the whole scene
      groupRef.current.rotation.y += delta * 0.02;

      // Gentle floating effect for elements
      const time = state.clock.elapsedTime;
      const children = groupRef.current.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.userData && child.userData.type === 'weather-element') {
          child.position.y = Math.sin(time * 2 + i) * 0.1;
        }
      }
    }
  });

  // Define colors based on weather condition
  const sceneColors = useMemo(() => {
    if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle')) {
      return { sky: '#1e3a8a', fog: '#64748b' }; // Stormy blues
    } else if (condition.toLowerCase().includes('snow')) {
      return { sky: '#cbd5e1', fog: '#e2e8f0' }; // Cold greys
    } else if (condition.toLowerCase().includes('clear')) {
      return { sky: '#38bdf8', fog: '#93c5fd' }; // Clear sky blues
    } else if (condition.toLowerCase().includes('cloud')) {
      return { sky: '#93c5fd', fog: '#cbd5e1' }; // Cloudy blues/greys
    } else if (condition.toLowerCase().includes('thunderstorm')) {
      return { sky: '#334155', fog: '#475569' }; // Stormy dark
    } else {
      return { sky: '#7dd3fc', fog: '#bae6fd' }; // Default sky blue
    }
  }, [condition]);

  return (
    <group ref={groupRef}>
      {/* Sky background based on weather condition */}
      <Sky
        sunPosition={[100, 10, 100]}
        turbidity={condition.toLowerCase().includes('cloud') ? 10 : 2}
        rayleigh={condition.toLowerCase().includes('clear') ? 4 : 1}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />

      {/* Directional light for shadows */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Point light for additional illumination */}
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Weather-specific elements */}
      {condition.toLowerCase().includes('cloud') && (
        <Cloud
          position={[0, 2, 0]}
          opacity={0.8}
          scale={2}
          segments={20}
          userData={{ type: 'weather-element' }}
        />
      )}

      {condition.toLowerCase().includes('rain') && (
        <>
          {/* Rain drops */}
          {Array.from({ length: 100 }).map((_, i) => (
            <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.1}>
              <mesh
                position={[Math.random() * 10 - 5, Math.random() * 10 + 5, Math.random() * 10 - 5]}
                userData={{ type: 'weather-element' }}
              >
                <boxGeometry args={[0.02, 0.3, 0.02]} />
                <meshStandardMaterial color="#a5f3fc" transparent opacity={0.7} />
              </mesh>
            </Float>
          ))}
        </>
      )}

      {condition.toLowerCase().includes('snow') && (
        <>
          {/* Snowflakes */}
          {Array.from({ length: 100 }).map((_, i) => (
            <Float key={i} speed={0.5 + i * 0.05} rotationIntensity={0.5}>
              <mesh
                position={[Math.random() * 10 - 5, Math.random() * 10 + 5, Math.random() * 10 - 5]}
                userData={{ type: 'weather-element' }}
              >
                <octahedronGeometry args={[0.05, 0]} />
                <meshStandardMaterial color="white" transparent opacity={0.8} />
              </mesh>
            </Float>
          ))}
        </>
      )}

      {condition.toLowerCase().includes('clear') && (
        <>
          {/* Stars for clear night skies */}
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        </>
      )}

      {/* Temperature display using 2D HTML overlay */}
      <Billboard position={[2, 2, 0]} userData={{ type: 'weather-element' }}>
        <Html center>
          <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {temperature}°C
          </div>
        </Html>
      </Billboard>

      {/* City name display using 2D HTML overlay */}
      <Billboard position={[-2, 2, 0]} userData={{ type: 'weather-element' }}>
        <Html center>
          <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {city}
          </div>
        </Html>
      </Billboard>

      {/* 3D weather icon based on condition */}
      <Float speed={2} rotationIntensity={0.1} position={[0, 0, -2]} userData={{ type: 'weather-element' }}>
        <mesh>
          {/* Sphere for sunny, cloud for cloudy, etc. */}
          {condition.toLowerCase().includes('clear') ? (
            <sphereGeometry args={[0.5, 16, 16]} />
          ) : condition.toLowerCase().includes('cloud') ? (
            <sphereGeometry args={[0.8, 16, 16]} />
          ) : condition.toLowerCase().includes('rain') ? (
            <tetrahedronGeometry args={[0.7, 0]} />
          ) : condition.toLowerCase().includes('snow') ? (
            <octahedronGeometry args={[0.7, 0]} />
          ) : (
            <sphereGeometry args={[0.5, 16, 16]} />
          )}
          <meshStandardMaterial
            color={
              condition.toLowerCase().includes('clear') ? '#f59e0b' :
              condition.toLowerCase().includes('cloud') ? '#9ca3af' :
              condition.toLowerCase().includes('rain') ? '#60a5fa' :
              condition.toLowerCase().includes('snow') ? '#e5e7eb' :
              '#9ca3af'
            }
            transparent
            opacity={0.8}
            metalness={0.2}
            roughness={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
};

export default AnimatedWeatherScene;