'use client'

import * as React from "react";
import { motion, useMotionValue } from "framer-motion"
import { ButtonFullImageCarrousel } from "./button-full-image";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ButtonPreviousImageCarrousel } from "./button-previous-image";
import { ButtonNextImageCarrousel } from "./button-next-image";

const DOTS_PER_IMAGE = 2;
const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 0;
const QTD_IMAGES_BASE_VIEW = 5
const STRING_OPTIONS = {
  duration: 0.2,
  // type: 'spring',
  // mass: 3,
  // stiffness: 400,
  // damping: 50 
}

type ImageType = {
  id: number, url: string
}

export const SwipeCarouselThumb = ({images}: {images: ImageType[]}) => {
  const [imgIndex, setImgIndex] = React.useState(images.length > 2 ? 1 : 0);
  const [selected, setSelected] =  React.useState<ImageType | null>(images[0]);

  const handleClickViewFullImage = (image: ImageType) => {
    setSelected(image);
  };
 
  const handleOutsideClick = () => {
    setSelected(null);
  };
 
  const handleChangeFullImage = (value:'PREVIOUS' | 'NEXT') => {
   
    if(selected) {
      setSelected(images[(selected?.id + (value === 'NEXT' ? 1 : -1)) % images.length]);
    }
  };

  const qtd_per_view = images.length > QTD_IMAGES_BASE_VIEW ? QTD_IMAGES_BASE_VIEW : images.length;
  const dragX = useMotionValue(0);
  function onDragEnd() {

    const x = dragX.get();

    if(x <= -DRAG_BUFFER && imgIndex < images.length - 1) {
      if(qtd_per_view + imgIndex < images.length) {
        setImgIndex((prev) => prev + QTD_IMAGES_BASE_VIEW);
      } else if(qtd_per_view + imgIndex >= images.length && imgIndex < images.length - 1 && images.length % qtd_per_view) {

        setImgIndex((prev) =>{
          console.log((prev + (images.length - prev)) % qtd_per_view )
          return (prev + (images.length - prev)) % qtd_per_view === 1 ? prev + (images.length - prev) + 1:  prev + (images.length - prev)
        })
      }

    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      if(imgIndex > 0 && imgIndex - qtd_per_view >= (Math.ceil(qtd_per_view / 2) - 1) ) {
        setImgIndex((prev) => prev - qtd_per_view);
      } else if(imgIndex > 0 && imgIndex - qtd_per_view > 0) {

        setImgIndex(Math.ceil(qtd_per_view / 2) - 1)
      }
    }
  }
  //!! auto change image 
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

  // const handleNextClick = (index: number) => {
  //   if (index < images.length - 1) {
  //     setImgIndex((prev) => prev + 1);
  //   }
  // };
  // const handlePreviousClick = (index: number) => {
  //   if (index > 0) {
  //     setImgIndex((prev) => prev - 1);
  //   }
  // };
  React.useEffect(() => {
    if(images.length > 0) {
      setSelected(images[0]);
    }

  },[images])
  React.useEffect(() => {
    console.log(images.length, qtd_per_view)
  
    if(images.length > 0 && images.length >= qtd_per_view) {

      console.log(Math.ceil(qtd_per_view / 2) - 1)
      setImgIndex(Math.ceil(qtd_per_view / 2) - 1);
    }
  },[images, qtd_per_view])

  console.log()

  return (
    <div>
       <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-[800px] m-auto my-8  cursor-default overflow-hidden "
    >
        <motion.div 
          layoutId={`card-${selected?.id ?? 0}`}
          className="relative rounded-lg  flex"
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            // translateX: `-${imgIndex * 100}%`,
            // translateX: `-${selected.id * 100}%`,
          }}
          transition={STRING_OPTIONS}
          >
            {selected && <Image src={selected?.url ?? ''}  
                  // key={img.id}
                  height="900"
                  width="900"
                  // onLoad={() => {
                  //   console.log('loaded')
                  // }}
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACPAI8DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7gAIqAAAAAAAAAAAIqAAA0IAAAIAAAKIAoAAIAAAIA0AAgAAACAKAAAAAAgAAA0ACAAIqAAAoAAAAAIAAADQACKgAAAAAAAAAACKgAANAAAAgAAAAAKAAioAACAA0AACAAAAAAAogAAAioAADQgAAAgAAAogCgACAAACADQACKgAAAAAAAAAACAAAD//2Q=="
                  // blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCACPAI8DAREAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAwABAgQGCP/EACkQAAIBAgQFBQEBAQAAAAAAAAABAhEhMVFx8GGBkbHBMkGh0fHhAyL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+iACnitPLAKfpfLugAlg9H2AAAZ+p8uyAyBAOhXSeYEAeOC0XYCwMTdkuNen6AQHOAEsXq+4AzxWnlgYA9gAM/U+H75AOb/51dPPgAJOkXpTrYAABk6yetOlgMgQB44LQCwGh6Vwr3A0Ac8Ut7sAYHOAEsXq+4Azx0X2BgD2AAN1bfEA54LXfcAJ+l8fsAQOd3beYEAgCwdtHvyBsBIPFc1veACADJ1b6IDDwejAADnAGXqe8LAZA9dJ0TzeG+AAgHN3S4V6/gATdkuNen6AMsHp3sAAEAgG4O9M/G2AoETpdAbc21SlHn9ZAYAzN/8AL423yACWD0YAAc7u28wIB6ltu7AoAZOsn03zACbulkt+ABm7JZvttAEBAIBadGnkA4EAgEAObwXPfyAM3/zq6efAASwenewAASqWLoB6gCOybyA58QAl6nr2sAM3fRb8AYAy5RVq9wNAQBoOq0t9b4AaAgEAGbrJ8Lb51AGbwXPfyAE3ZLN9toAgBk6vh7AeuAxN2pnv6AFuibyAAAG6tvN1AOcqKixfbfkAgNwlR0eDw13vEBQNRdHwdnvfuAwEApuibAAAZOsnwt0/oATd9FvwAM3RUz3/ADmAQHsABk6vhggCm7Uz39ABJ0T426/wAQAbq2+mgFAQBouq4rHe/cDQCwlVU918oDYBTlWywXcDDdE3kqgc4AN1bebqAE3V6W+wMgerlOtlzzAwAU3emW/oAJvBc9/IAzdFrb7AECAQDUXR8HZ737gMBALcm1SoFAYm7Uz39ABJ0i+nUAG6JvIAAIB6gCYAc7u28wBk6yfToAE3emW/oDAFOSTpUCwIA0XVcVZ73eoGgIBABm6vS32AM3guf15ACbtTPxtAEAMpNvh34sD1wGJu1M9/QAt0TeSAADnd23mBicqWWL7AEBuMqWeHbf8AQFA1F0fB4737gMBAKbom+moAADJ1k+nQAJu9Mv0AZuipn2AID2AAydW3yWgBTdqZv43QAJukXxtvlUAQAbq28wKAgDRdVxVnvd6gaAWEq2fthxX8A2AU5VdFgvkDDdE3kqgc4AN1bebqAE3WT4W3zAyB6yU1Si98XvfgDAKbvTJfO6ABN4Ln9eQBm6J8bb5ACBAIBqDo9bfQDAQC3JtUqBQGJu2r34AGTpF6U62ABuibyVQOcCAeoAgAN1bfH49gAn6nw/fIAzeC57+QDAgEAgDp1SeYFgQCAFN3SyXfaAGeCXHfcAJ+l8f3wAIGJSpZY+4HqwKbom+AAAA7t6sAJ+pgZANzdbJU3vADadVVe4FgLB2ay8/gGwIBAAk6t6gDPFLhvsAH+ntz38gG7JvIDnxA9gBmfpfH98AC7JvIDnAB3bebYGJuifG2+QAgJB4rmAgG4P8A61VPPgBQIBG6JvJVA5wBn6ny7ABPHl9gFP0vj++ABA9gBibslxr0/QBlg9H2AADnAP8A09ufgAwNRdJLWnWwDAWsVqu4DgQDMvS9+4AgBLF6sAJ+p8uyAGeCW93AMD2AB/6e3PwAMvS9+4AOyejAAAp4rTywMAXHFaruA4EA6AIBmfpfH98ACAEsXq+4AT9T5dkAP+ntz8AGB//Z"
                  placeholder="blur"
                  className={cn(
                    " w-full max-w-[900px]  transition duration-200 rounded-lg aspect-square",
                    true ? "blur-none" : "blur-md"
                  )}
                  alt=""
                />}
          {images.map((img, index) => {
            return (
                <Image src={img.url}  
                  key={img.id}
                  height="900"
                  width="900"
                  // onLoad={() => {
                  //   setLoaded(true)
                  // }}
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACPAI8DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7gAIqAAAAAAAAAAAIqAAA0IAAAIAAAKIAoAAIAAAIA0AAgAAACAKAAAAAAgAAA0ACAAIqAAAoAAAAAIAAADQACKgAAAAAAAAAACKgAANAAAAgAAAAAKAAioAACAA0AACAAAAAAAogAAAioAADQgAAAgAAAogCgACAAACADQACKgAAAAAAAAAACAAAD//2Q=="
                  // blurDataURL="data:image/jpeg;base64,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"
                  placeholder="blur"
                  className={cn(
                    " w-full max-w-[900px]  transition duration-200 rounded-lg aspect-square",
                    true ? "blur-none" : "blur-md"
                  )}
                  alt=""
                />
              )
            })}
          {/* {images.map((img, index) => {
            return (
                <Image src={img.url}  
                  key={img.id}
                  height="900"
                  width="900"
                  // onLoad={() => {
                  //   setLoaded(true)
                  // }}
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACPAI8DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7gAIqAAAAAAAAAAAIqAAA0IAAAIAAAKIAoAAIAAAIA0AAgAAACAKAAAAAAgAAA0ACAAIqAAAoAAAAAIAAADQACKgAAAAAAAAAACKgAANAAAAgAAAAAKAAioAACAA0AACAAAAAAAogAAAioAADQgAAAgAAAogCgACAAACADQACKgAAAAAAAAAACAAAD//2Q=="
                  // blurDataURL="data:image/jpeg;base64,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"
                  placeholder="blur"
                  className={cn(
                    " w-full max-w-[900px]  transition duration-200 rounded-lg aspect-square",
                    true ? "blur-none" : "blur-md"
                  )}
                  alt=""
                />
              )
            })} */}
        </motion.div>
    </div>
      <div className=" px-[135px] md:px-[215px] overflow-hidden mb-2 relative">
      {/* <div className="px-28 overflow-hidden mb-2 relative"> */}
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
          {/* <CountImages images={images} imgIndex={imgIndex} setImgIndex={setImgIndex}/> */}
      </div>
      
        {/* {images.length > 1 && <Dots images={images} imgIndex={imgIndex} setImgIndex={setImgIndex}/>} */}
        {/* {selected?.id === imgIndex && <SelectedImage images={images} selected={selected} handleOutsideClick={handleOutsideClick}/>} */}
    </div>
  );
}


export function Images({images, handleClick,imgIndex}: {images: ImageType[], imgIndex: number, handleClick: (img: ImageType) => void}) {
  const [imgIndexSelected, setImgIndexSelected] = React.useState(0);
  return (    
      <>
        {images.map((img, index) => {
          return (
            <React.Fragment  key={index}>
              <motion.div
                className="aspect-square overflow-hidden w-full shrink-0 rounded-xl object-cover relative scale-75"
                key={index} 
                onClick={() => {
                  setImgIndexSelected(index)
                  handleClick(img)
                }}
                animate={{ 
                  scale: imgIndexSelected === index ? 1 : 0.85,
                }}
                transition={STRING_OPTIONS}
                style={{
                backgroundImage: `url(${img.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
         
                {/* {imgIndex === index && (
                <ButtonFullImageCarrousel 
                  className="rounded-full absolute bottom-5 right-5 z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  // onClick={() => handleClick(img)}
                  transition={{
                    duration: 0.55
                  }}
                />) } */}
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
              initial={{ scale: 0.5 }}
              animate={{ 
                scale:  (index < imgIndex - DOTS_PER_IMAGE && (imgIndex - DOTS_PER_IMAGE >= 0)) || index > imgIndex + DOTS_PER_IMAGE ? 0.5 : imgIndex === index ? 1.3 : 1,
              }}
              transition={{
                duration: 0.5
              }}
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

function SelectedImage ({ images,  selected, handleOutsideClick}: { images: ImageType[], selected: ImageType, handleOutsideClick: () => void }) {
  const [loaded, setLoaded] = React.useState(false);
  const [indexImage, setIndexImage] = React.useState(selected.id);

  const handleNextClick = (index: number) => {
    if (indexImage < images.length - 1) {
      setIndexImage((prev) => prev + 1);
    }
  };
  const handlePreviousClick = (index: number) => {
    if (indexImage > 0) {
      setIndexImage((prev) => prev - 1);
    }
  };

  React.useEffect(() => {
    if (selected) {
      setIndexImage(selected.id);
    }
  }, [])
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
      className="w-full max-w-[800px] m-auto my-8  cursor-default overflow-hidden "
    >
        <motion.div 
            layoutId={`card-${selected.id}`}
            className="relative rounded-lg  flex"
            animate={{ 
              translateX: `-${indexImage * 100}%`,
              // translateX: `-${selected.id * 100}%`,
            }}
            transition={STRING_OPTIONS}
            >
            {images.map((img, index) => {
              return (
                  <Image src={img.url}  
                    key={img.id}
                    height="900"
                    width="900"
                    onLoad={() => {
                      setLoaded(true)
                    }}
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACPAI8DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7gAIqAAAAAAAAAAAIqAAA0IAAAIAAAKIAoAAIAAAIA0AAgAAACAKAAAAAAgAAA0ACAAIqAAAoAAAAAIAAADQACKgAAAAAAAAAACKgAANAAAAgAAAAAKAAioAACAA0AACAAAAAAAogAAAioAADQgAAAgAAAogCgACAAACADQACKgAAAAAAAAAACAAAD//2Q=="
                    // blurDataURL="data:image/jpeg;base64,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"
                    placeholder="blur"
                    className={cn(
                      " w-full max-w-[900px]  transition duration-200 rounded-lg aspect-square",
                      loaded ? "blur-none" : "blur-md"
                    )}
                    alt=""
                  />
                )
              })}
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
          className=" bg-gray-900  p-4  gap-4 flex justify-between items-center rounded-lg mt-4"
        >

        
          <ButtonPreviousImageCarrousel
            className="rounded-full opacity-50 shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => handlePreviousClick(selected.id)}
            transition={{
              duration: 0.55,
            }}
          />        
          <div className="flex-1 text-center">
            <p className="text-gray-50">teste image</p>
            <p className="text-gray-50">{`${indexImage + 1} / ${images.length}`}</p>
          </div>
      
    
          <ButtonNextImageCarrousel
            className="rounded-full opacity-50 shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => handleNextClick(selected.id)}
            transition={{
              duration: 0.55,
            }}
          />
        </motion.div>
    </div>
  </div>
  );
};


