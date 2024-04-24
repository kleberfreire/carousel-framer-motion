'use client'

import * as React from "react";
import { SwipeCarousel } from "./components/carousel";

const numberOfImages = 10;

const width = 600;
const height = 600;


export default function Home() {
  const [images, setImages] = React.useState<{id: number, url: string}[]>([]);


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
          return
        }
        console.log('urls', urls);
        const newUrls = urls.map((url, index) =>({
          id: index,
          url: url as string
        }));
        setImages([...newUrls]);
      });
    }
    getImages();
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full max-w-[560px] border border-gray-600 rounded-lg p-2">
        <SwipeCarousel images={images}/>
      </div>
    </div>
  );
}
