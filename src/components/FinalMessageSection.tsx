// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
import { Heart } from 'lucide-react';

const PageCover = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const isBack = props.isBack;
  
  return (
    <div 
       className={`w-full h-full bg-red-800 border-[8px] border-red-900 shadow-2xl relative overflow-hidden flex items-center justify-center p-3 ${
         isBack ? 'border-r-[18px] rounded-l-3xl' : 'border-l-[18px] rounded-r-3xl'
       }`} 
       ref={ref} 
       data-density="hard"
    >
      {/* Texture overlay to make the red notebook look physical */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] pointer-events-none" />
      
      {/* Subtle spine shadow depending on whether it's front or back */}
      {isBack ? (
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-black/40 z-10 pointer-events-none shadow-[-2px_0_10px_rgba(0,0,0,0.5)]" />
      ) : (
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/40 z-10 pointer-events-none shadow-[2px_0_10px_rgba(0,0,0,0.5)]" />
      )}
      
      {/* The actual user image applied perfectly onto the cover */}
      <img 
         src={props.imageSrc || "/images/book-cover.png"} 
         alt="Book Cover" 
         className="w-full h-full object-cover rounded-sm z-20 shadow-inner relative"
      />
    </div>
  );
});

const Page = React.forwardRef<HTMLDivElement, any>(({ number, children, imageSrc }, ref) => {
  return (
    <div className="w-full h-full bg-amber-50 shadow-inner flex flex-col p-3 md:p-6 relative border-r border-amber-100 overflow-hidden" ref={ref}>
      {/* Soft page texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
      
      {/* Page Content */}
      <div className="relative z-10 flex-col flex h-full">
        {imageSrc && (
          <div className="relative mx-auto mt-4 mb-6 rotate-[-2deg] w-[85%] max-h-[50%] transition-transform hover:rotate-0 duration-500 shrink-0">
             {/* Pin shadow and visual */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-400 shadow-lg border-2 border-rose-300 z-20" />
             <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-gray-400 z-10" />
             
             <img src={imageSrc} className="w-full h-full object-cover border-[6px] md:border-[8px] border-white shadow-lg pointer-events-none" style={{ maxHeight: '100%' }} />
          </div>
        )}
        <div className="font-dancing-script text-lg sm:text-xl md:text-2xl text-stone-600 leading-snug md:leading-relaxed flex-grow text-center flex flex-col justify-center drop-shadow-sm px-1 md:px-2 overflow-hidden">
          {children}
        </div>
        <div className="text-center font-inter text-stone-400 text-xs md:text-sm mt-auto pt-2 border-t border-stone-200/50 shrink-0">
           - {number} -
        </div>
      </div>
    </div>
  );
});

export default function FinalMessageSection() {
  const Book = HTMLFlipBook as any;
  const [bookSize, setBookSize] = useState({ width: 320, height: 480 });

  useEffect(() => {
    const handleResize = () => {
      // Calculate best notebook height/width to ensure it fits completely in the viewport safely!
      const paddingHeight = 150; 
      const maxAvailableHeight = window.innerHeight - paddingHeight;
      const calculatedHeight = Math.max(300, Math.min(maxAvailableHeight, 700));
      
      // Traditional book aspect ratio
      const calculatedWidth = calculatedHeight * 0.65;
      
      setBookSize({
        width: Math.min(window.innerWidth * 0.85, calculatedWidth),
        height: calculatedHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="h-[100dvh] w-full flex flex-col items-center justify-center px-2 bg-gradient-to-b from-peach-100/30 to-rose-200 py-10 z-30 relative overflow-hidden">
      <div className="w-full flex-grow flex items-center justify-center pt-8">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 1.5 }}
           className="w-full flex justify-center perspective-[2000px]"
        >
          {/* Notebook container perfectly sized */}
          <div className="w-full flex justify-center drop-shadow-2xl">
            <Book 
               width={bookSize.width} 
               height={bookSize.height} 
               size="stretch"
               minWidth={250}
               maxWidth={bookSize.width + 100}
               minHeight={300}
               maxHeight={bookSize.height + 100}
               maxShadowOpacity={0.4}
               showCover={true}
               mobileScrollSupport={true}
               className="book-wrapper mx-auto"
               style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
            >
              <PageCover />
              
              <Page number={1} imageSrc="/images/2.jpg">
                I’m really lucky to have you. You mean everything to me.
              </Page>
              
              <Page number={2} imageSrc="/images/6.jpg">
                And I’d choose you… every single time ❤️
              </Page>
              
              <Page number={3} imageSrc="/images/8.jpg">
                This notebook is for all the beautiful memories we will continue to make.
              </Page>
              
              <Page number={4}>
                Happy Birthday, baby. I love you!
              </Page>

              <PageCover isBack={true} imageSrc="/images/background1.png" />
  
            </Book>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
