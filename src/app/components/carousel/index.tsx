'use client'

import * as React from "react";
import { motion, useMotionValue } from "framer-motion"


const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;
const STRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 400,
  damping: 50 
}

export const SwipeCarousel = ({images}: {images: string[]}) => {
  const [imgIndex, setImgIndex] = React.useState(0);

  const dragX = useMotionValue(0);
  function onDragEnd() {

    const x = dragX.get();
    if(x <= -DRAG_BUFFER && imgIndex < images.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  }

  // React.useEffect(() => {
  //   const intervalRef = setInterval(() => {
  //     const x = dragX.get();

  //     if (x === 0) {
  //       setImgIndex((pv) => {
  //         if (pv === images.length - 1) {
  //           return 0;
  //         }
  //         return pv + 1;
  //       });
  //     }
  //   }, AUTO_DELAY);

  //   return () => clearInterval(intervalRef);
  // }, [])
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950">
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{
          x: dragX
        }}
        animate={{ 
          translateX: `-${imgIndex * 100}%`
        }}
        transition={STRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex items-center cursor-grab active:cursor-grabbing"
        
        >
        <Image images={images} imgIndex={imgIndex}/>
      </motion.div>

      <Dots images={images} imgIndex={imgIndex} setImgIndex={setImgIndex}/>
      <GradientEdges />
    </div>
  );
}

export function Image({images, imgIndex}: {images: string[], imgIndex: number}) {
  return (    
      <>
        {images.map((url, index) => {
          return (
            <motion.div 
              className="aspect-video overflow-hidden w-screen shrink-0 rounded-xl object-cover"
              key={index} 
              animate={{ 
                scale: imgIndex === index ? 0.95 : 0.85
               }}
              transition={STRING_OPTIONS}
              
              style={{
              backgroundImage: `url(${url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>

            </motion.div>
            
          )
        })}
      </>
  );
}

export function Dots ({ images, imgIndex, setImgIndex}: {images: string[], imgIndex: number, setImgIndex: React.Dispatch<React.SetStateAction<number>>}) {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {images.map((_, index) => {
          return (
            <button 
              key={index} 
              onClick={() => setImgIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 
                ${
                  index === imgIndex ? 'bg-neutral-50' : 'bg-neutral-500'
                }`}
            />
          )})}
    </div>
  )
}


const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
};