'use client'

import * as React from "react";
import { SwipeCarousel } from "./components/carousel";

const numberOfImages = 5;

const width = 1200;
const height = 1200;


export default function Home() {
  const [images, setImages] = React.useState<string[]>([]);


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
        console.log(urls)
        if(urls.length === 0) {
          return
        }
        setImages([...urls as string[]]);
      });
    }
    getImages();
  }, []);
  console.log(images)
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <SwipeCarousel images={images}/>
    </div>
  );
}
