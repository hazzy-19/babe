import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useSwipeable } from 'react-swipeable';
import * as THREE from 'three';

const memories = [
  { id: 1, url: "/images/2.jpg", caption: "Cutie pie, cheki hio smile ❤️", type: "image" },
  { id: 2, url: "/images/3.jpg", caption: "The red queen, my God, this color should be your favorite 😩😩", type: "image" },
  { id: 3, url: "/images/4.jpg", caption: "Absalute beauty, beauty with the forehead 😘.", type: "image" },
  { id: 4, url: "/images/5.jpg", caption: "I bet you 1000, hapa nlikuwa nakusumbua usipige picha na amani 😂😂😂.", type: "image" },
  { id: 5, url: "/images/6.jpg", caption: "miss dimples, and her smile this one is my favorite 🌹❤🌹.", type: "image" },
  { id: 6, url: "/images/7.jpg", caption: "Look at you, being beautiful even before i met you 😭😭, whyyy!!.", type: "image" },
  { id: 7, url: "/images/9.jpg", caption: "Shy girl, big stomach, im writing this juu umekuwa ukikula food mingi of late, sishibii 😭😭😭.", type: "image" },
  { id: 8, url: "/images/8.jpg", caption: "Mungu kambariki na ngozi nyororo, lakini kazi ni skincare, results ni before na before(get it?😭)", type: "image" },
  { id: 9, url: "/images/10.jpg", caption: "Wabi-sabi 😂😂😂😂😂😂 ", type: "image" }
];

function CarouselItem({ mem, index, numItems, scrollPos }: { mem: any, index: number, numItems: number, scrollPos: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (groupRef.current) {
      const c = scrollPos.current;
      let delta = (index - c) % numItems;
      delta = ((delta + numItems / 2) % numItems + numItems) % numItems - numItems / 2;

      const absDelta = Math.abs(delta);
      
      const targetX = Math.sign(delta) * absDelta * 4.4;
      const targetZ = -absDelta * 3.5;
      const targetRotY = -Math.sign(delta) * Math.min(absDelta * 0.7, 1.2);

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
      
      const opacity = THREE.MathUtils.clamp(1 - absDelta * 0.25, 0, 1);
      
      if (htmlRef.current) {
        htmlRef.current.style.opacity = String(opacity);
        const blurValue = absDelta > 0.5 ? (absDelta - 0.5) * 4 : 0;
        htmlRef.current.style.filter = `blur(${blurValue}px)`;
        htmlRef.current.style.zIndex = String(Math.round(100 - absDelta * 10));
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Html 
        transform 
        position={[0, 0, 0]} 
        scale={0.95}
        distanceFactor={10}
        zIndexRange={[100, 0]} 
      >
        {/* We build it as one combined component (like a Polaroid frame) so they never disjoint or clip! */}
        <div 
          ref={htmlRef} 
          className="bg-white/90 backdrop-blur-xl p-4 pb-6 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col items-center justify-between w-[280px] h-[380px] md:w-[350px] md:h-[480px] pointer-events-none transition-transform max-w-[90vw]"
        >
          <img 
            src={mem.url} 
            alt="memory" 
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

function Carousel({ targetIndex }: { targetIndex: React.MutableRefObject<number> }) {
  const scrollPos = useRef(0);
  const numItems = memories.length;

  useFrame((state, delta) => {
    scrollPos.current = THREE.MathUtils.lerp(scrollPos.current, targetIndex.current, delta * 5);
  });

  return (
    <group>
      {memories.map((mem, i) => (
        <CarouselItem key={mem.id} mem={mem} index={i} numItems={numItems} scrollPos={scrollPos} />
      ))}
    </group>
  );
}

export default function MemoriesSection() {
  const targetIndex = useRef(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      targetIndex.current += 1;
      setIsSwiping(false);
    },
    onSwipedRight: () => {
      targetIndex.current -= 1;
      setIsSwiping(false);
    },
    onSwiping: () => {
      setIsSwiping(true);
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
          My girl, my woman, my little universe packed in a small body ❤️
        </h2>
      </motion.div>

      {/* R3F canvas auto sizes safely without overflowing. Swiping takes place right over the canvas. */}
      <div
        {...handlers}
        className={`relative w-full flex-grow z-20 touch-none ${isSwiping ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <Canvas camera={{ position: [0, 0, 13], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <Carousel targetIndex={targetIndex} />
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
