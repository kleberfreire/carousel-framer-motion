'use client'

import * as React from "react";
import { SwipeCarousel } from "./components/carousel";
import { SwipeCarouselThumb } from "./components/carousel-thumb";
import { SwipeCarouselThumbOrder } from "./components/carousel-thumb-order";
import { Reorder } from "framer-motion";
import { Item } from "./components/carousel-thumb-order/item-order";

const numberOfImages = 10;

const width = 1200;
const height = 1200;


export default function Home() {
  const [images, setImages] = React.useState<{id: number, url: string, description: string}[]>([]);


  React.useEffect(() => {

    async function getRandomImage() {
      try {
        try {
          const response = await fetch(`https://source.unsplash.com/${width}x${height}/?random`);
  
          if (!response.ok) {
            throw new Error('Não foi possível obter a imagem.');
          }
  
       
          const randomImageUrl = response.url;
          return randomImageUrl;

        } catch (error) {
          console.error('Ocorreu um erro ao obter a imagem:', error);
        }
      } catch (error) {
        console.error('Ocorreu um erro ao obter a imagem:', error);
        return null;
      }
    }
    
    async function getImages() {
     
      const promises = Array.from({ length: numberOfImages }, () => getRandomImage());
      await Promise.all(promises).then((urls) => {
        if(urls.length === 0) {
          return []
        }
        const newUrls = urls.map((url, index) =>({
          id: index,
          description: `Imagem aleatória ${index + 1}`,
          url: url as string
        }));
       return newUrls
      }).then((newUrls) =>  setImages([...newUrls]));
    }

      getImages();
    
  }, []);

  return (
    <div className="h-screen w-screen flex gap-10 items-center justify-center">
      <Reorder.Group axis="y" onReorder={setImages} values={images} className="mt-10 flex flex-col gap-5">
        {images.map((image) => (
          // <Item key={image.id} className="border border-zinc-500 p-2 rounded-lg">
          <Item key={image.id} item={image} />
            
        
        ))}
      </Reorder.Group>
      <div className="w-full max-w-[560px] border border-gray-600 rounded-lg p-2">
      {/* <div className="w-full max-w-[560px] border border-gray-600 rounded-lg p-2"> */}
        {/* <SwipeCarousel images={images}/> */}
        <SwipeCarouselThumbOrder images={images.slice(0,11)}/>
      </div>
  
    </div>
  );
}
