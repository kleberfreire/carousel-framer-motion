'use client'

import * as React from "react";
import { motion, useMotionValue } from "framer-motion"
import { ButtonFullImageCarrousel } from "./button-full-image";
import { cn } from "@/lib/utils";
import Image from "next/image";

const DOTS_PER_IMAGE = 2;
const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;
const STRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 400,
  damping: 50 
}

type ImageType = {
  id: number, url: string
}

export const SwipeCarousel = ({images}: {images: ImageType[]}) => {
  const [imgIndex, setImgIndex] = React.useState(0);
  const [selected, setSelected] =  React.useState<ImageType | null>(null);

  const handleClickViewFullImage = (image: ImageType) => {
    setSelected(image);
  };
 
  const handleOutsideClick = () => {
    setSelected(null);
  };
 
  const handleChangeFullImage = (value:'PREVIOUS' | 'NEXT') => {
    // setImgIndex((state) => state + (value === 'NEXT' ? 1 : -1));
    if(selected) {
      setSelected(images[(selected?.id + (value === 'NEXT' ? 1 : -1)) % images.length]);
    }
  };


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
    <div>
      <div className="px-28 overflow-hidden mb-2 relative">
        <div className="relative">
          <motion.div 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{
              x: dragX
            }}
            animate={{ 
              translateX: `-${imgIndex * 100}%`,
            }}
            transition={STRING_OPTIONS}
            onDragEnd={onDragEnd}
            className="flex items-center cursor-grab active:cursor-grabbing"
        
          >
            <Images images={images} imgIndex={imgIndex} handleClick={handleClickViewFullImage}/>        
          </motion.div>
        </div>
          <CountImages images={images} imgIndex={imgIndex} setImgIndex={setImgIndex}/>
      </div>
        <div className="w-full flex items-center justify-center">
          <p className="italic">imagem {imgIndex + 1}</p>
        </div>
      
        {images.length > 1 && <Dots images={images} imgIndex={imgIndex} setImgIndex={setImgIndex}/>}
        {selected?.id === imgIndex && <SelectedImage selected={selected} handleOutsideClick={handleOutsideClick}/>}
    </div>
  );
}


export function Images({images, handleClick,imgIndex}: {images: ImageType[], imgIndex: number, handleClick: (img: ImageType) => void}) {
  return (    
      <>
        {images.map((img, index) => {
          return (
            <React.Fragment  key={index}>
              <motion.div
                className="aspect-square overflow-hidden w-full shrink-0 rounded-xl object-cover relative"
                key={index} 
                animate={{ 
                  scale: imgIndex === index ? 0.95 : 0.75,
                }}
                transition={STRING_OPTIONS}
                style={{
                backgroundImage: `url(${img.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
                {imgIndex === index && (
                <ButtonFullImageCarrousel 
                  className="rounded-full absolute bottom-5 right-5 z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => handleClick(img)}
                  transition={{
                    duration: 0.5
                  }}
                />) }
              </motion.div>
            </React.Fragment>
          )
        })}
     
      </>
  );
}

export function Dots ({ images, imgIndex, setImgIndex}: {images: ImageType[], imgIndex: number, setImgIndex: React.Dispatch<React.SetStateAction<number>>}) {
  return (
    <div className="mt-4 flex w-full justify-center items-center ">
      {images.map((_, index) => {
          return (
            <motion.button 
              key={index} 
              onClick={() => setImgIndex(index)}
              animate={{ 
                scale:  (index < imgIndex - DOTS_PER_IMAGE && (imgIndex - DOTS_PER_IMAGE >= 0)) || index > imgIndex + DOTS_PER_IMAGE ? 0.5 : imgIndex === index ? 1.3 : 1,
                // margin: imgIndex !== index ? -1 : 0
              }}
              // transition={STRING_OPTIONS}
              className={`${
                (index < imgIndex - DOTS_PER_IMAGE && (imgIndex - DOTS_PER_IMAGE >= 0)) || index > imgIndex + DOTS_PER_IMAGE ? 'mx-0' :
                'mx-1'
              } rounded-full transition-colors duration-300 w-3 h-3
                ${
                  index === imgIndex ? 'bg-neutral-50 border border-neutral-500' : 'bg-neutral-500'
                }`}
            />
          )})}
    </div>
  )
}
export function CountImages ({ images, imgIndex, setImgIndex}: {images: ImageType[], imgIndex: number, setImgIndex: React.Dispatch<React.SetStateAction<number>>}) {
  return (
    <div className="mt-4 flex w-full justify-center items-center gap-2 overflow-hidden">
        <p
           className="rounded-full absolute top-0 right-0 z-10 font-bold  p-2 leading-tight"
    
           
        >
          {`${imgIndex + 1} / ${images.length}`}
        </p>
   
    </div>
  )
}

function SelectedImage ({ selected, handleOutsideClick }: { selected: ImageType, handleOutsideClick: () => void }) {
  const [loaded, setLoaded] = React.useState(false);
  if (!selected) {
    return <></>;
  }

  return (
    <div
    onClick={() => handleOutsideClick()}
    className="fixed inset-0 bg-black/50 z-50 cursor-pointer overflow-y-scroll"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-[1200px] m-auto my-8 px-8 cursor-default"
    >
      <motion.div layoutId={`card-${selected.id}`}>
        <Image src={selected.url}  
          height="900"
          width="900"
          onLoad={() => setLoaded(true)}
          className={cn(
            "h-full w-full max-w-900 transition duration-200 rounded-lg aspect-square",
            loaded ? "blur-none" : "blur-md"
          )}
          alt=""
        />
      </motion.div>
      <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className=" bg-gray-900  p-4  gap-4 flex justify-center items-center rounded-lg mt-4"
        >
          <p className="text-gray-50">teste image</p>
        </motion.div>
    </div>
  </div>
  );
};


