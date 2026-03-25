import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useSwipeable } from 'react-swipeable';
import * as THREE from 'three';

const memories = [
  { id: 1, url: "/images/2.jpg", caption: "I still think about this day ❤️", type: "image" },
  { id: 2, url: "/images/3.jpg", caption: "Just you and me against the world.", type: "image" },
  { id: 3, url: "/images/4.jpg", caption: "Every little moment counts.", type: "image" },
  { id: 4, url: "/images/5.jpg", caption: "Warmest memories.", type: "image" },
  { id: 5, url: "/images/6.jpg", caption: "The beautiful parts of life.", type: "image" },
  { id: 6, url: "/images/7.jpg", caption: "Always laughing together.", type: "image" },
  { id: 7, url: "/images/8.jpg", caption: "Forever grateful for you.", type: "image" },
  { id: 8, url: "/images/9.jpg", caption: "Such a perfect feeling.", type: "image" },
  { id: 9, url: "/images/10.jpg", caption: "And we're just getting started...", type: "image" }
];

function CarouselItem({ mem, index, numItems, radius }: { mem: any, index: number, numItems: number, radius: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

  const angle = (index / numItems) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  useFrame(() => {
    if (groupRef.current) {
      const worldPos = new THREE.Vector3();
      groupRef.current.getWorldPosition(worldPos);
      
      const opacity = THREE.MathUtils.clamp((worldPos.z + radius - 2) / (radius * 1.5), 0.05, 1);
      
      if (htmlRef.current) {
        htmlRef.current.style.opacity = String(opacity);
        // Add a blur only to items behind to keep performance extremely high on mobile
        const blurValue = opacity < 0.6 ? (1 - opacity) * 5 : 0;
        htmlRef.current.style.filter = `blur(${blurValue}px)`;
      }
    }
  });

  return (
    <group ref={groupRef} position={[x, 0, z]} rotation={[0, angle, 0]}>
      <Html 
        transform 
        position={[0, 0, 0]} 
        scale={0.5}
        distanceFactor={10}
        zIndexRange={[100, 0]} // Ensures front ones appear above back ones natively
      >
        {/* We build it as one combined component (like a Polaroid frame) so they never disjoint or clip! */}
        <div 
          ref={htmlRef} 
          className="bg-white/90 backdrop-blur-xl p-3 pb-5 rounded-md shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex flex-col items-center justify-between w-[280px] h-[360px] md:w-[320px] md:h-[420px] pointer-events-none"
        >
          <img 
            src={mem.url} 
            alt={mem.caption} 
            className="w-full h-[250px] md:h-[300px] object-cover rounded shadow-inner mb-3 pointer-events-none" 
          />
          <p className="font-inter font-bold text-lg md:text-xl text-rose-700 text-center leading-snug w-full flex-grow flex items-center justify-center break-words px-2 drop-shadow-sm">
            {mem.caption}
          </p>
        </div>
      </Html>
    </group>
  );
}

function Carousel({ swipeSpeed }: { swipeSpeed: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const numItems = memories.length;
  // Radius adjusted for wider 1:1 polaroid items
  const radius = 5.2; 

  useFrame((state, delta) => {
    if (groupRef.current) {
      const baseSpeed = 0.08; 
      groupRef.current.rotation.y += (baseSpeed + swipeSpeed.current) * delta;
      swipeSpeed.current = THREE.MathUtils.lerp(swipeSpeed.current, 0, delta * 2.5);
    }
  });

  return (
    <group ref={groupRef}>
      {memories.map((mem, i) => (
        <CarouselItem key={mem.id} mem={mem} index={i} numItems={numItems} radius={radius} />
      ))}
    </group>
  );
}

export default function MemoriesSection() {
  const swipeSpeed = useRef(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handlers = useSwipeable({
    onSwiping: (e) => {
      setIsSwiping(true);
      const speed = e.velocity * 4; 
      swipeSpeed.current = e.dir === 'Left' ? speed : -speed;
    },
    onSwiped: (e) => {
      setIsSwiping(false);
      const push = e.velocity * 8;
      swipeSpeed.current = e.dir === 'Left' ? push : -push;
    },
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <section className="h-[100dvh] w-full flex flex-col items-center py-10 relative z-20 bg-rose-50/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1 }}
        className="text-center mt-6 mb-2 z-30 px-4 shrink-0"
      >
        <h2 className="text-4xl md:text-5xl font-dancing-script text-rose-600 mb-2 drop-shadow-sm font-bold tracking-wide">
          This is my girl, my woman, my little universe ❤️
        </h2>
      </motion.div>

      {/* R3F canvas auto sizes safely without overflowing. Swiping takes place right over the canvas. */}
      <div 
        {...handlers} 
        className={`relative w-full flex-grow z-20 touch-none ${isSwiping ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <Canvas camera={{ position: [0, 0, 11], fov: 60 }}>
          <ambientLight intensity={1.5} />
          <Carousel swipeSpeed={swipeSpeed} />
        </Canvas>
      </div>

      <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ delay: 0.5, duration: 1 }}
         className="mt-6 mb-4 text-2xl md:text-3xl font-dancing-script text-rose-400 z-30 shrink-0"
      >
        And we're just getting started...
      </motion.div>
    </section>
  );
}
