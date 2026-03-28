import React, { useRef } from 'react';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import MemoriesSection from './components/MemoriesSection';
import BirthdaySection from './components/BirthdaySection';
import FinalMessageSection from './components/FinalMessageSection';
import SurpriseButton from './components/SurpriseButton';

function App() {
  const introRef = useRef<HTMLElement>(null);

  const scrollToNext = () => {
    introRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-rose-50 overflow-x-hidden selection:bg-rose-200 selection:text-rose-900 relative">
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.2] mix-blend-color-burn bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/3.jpg')" }}
      />
      <div className="relative z-10">
        <HeroSection onScrollDown={scrollToNext} />
        
        <div ref={introRef as any}>
        <IntroSection />
      </div>
      
      <MemoriesSection />
      
      <BirthdaySection />
      
        <FinalMessageSection />
        
        <SurpriseButton />
      </div>
    </div>
  )
}

export default App;
