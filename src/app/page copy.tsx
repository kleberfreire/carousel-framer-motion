'use client'
import Image from "next/image";
import * as React from "react";

const numberOfImages = 5;

const width = 800;
const height = 800;

export default function Home() {
  const [images, setImages] = React.useState<string[]>([]);
  async function extractRandomImageUrl(html) {
    // Aqui você pode implementar a lógica para extrair a URL da imagem aleatória
    // Vou deixar isso como um exemplo vazio, você precisará implementar essa lógica

    return ''; // Retornar a URL da imagem aleatória
  }


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
    <div className="h-screen w-screen flex items-center justify-center p-4">
    
      <div className="w-full border border-gray-600 p-4 rounded-lg flex">
      {images.map((url, index) => {
        return (
          <div 
            className="aspect-square overflow-hidden w-screen shrink-0"
            key={index} 
            style={{
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: 300,
            height: 300,
            borderRadius: 10,
          }}>

          </div>
        )
      })}
      </div>
    </div>
  );
}
