'use client'

import * as React from "react";
import { SwipeCarousel } from "./components/carousel";
import { SwipeCarouselThumb } from "./components/carousel-thumb";
import { SwipeCarouselThumbOrder } from "./components/carousel-thumb-order";
import { Reorder } from "framer-motion";
import { Item } from "./components/carousel-thumb-order/item-order";
import { EditingImage } from "./components/editing-image.ts";
import { DropZoneUpload } from "./components/editing-image.ts/dropzone";
import { resizeAndCropImage } from "@/ultils/resize-and-crop-image";



const numberOfImages = 10;

const width = 1200;
const height = 1200;

const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

type fileType = {
  id: number,
  file: File,
  name: string,
  description: string
  croppedImage: string | null
}


export default function Home() {
  const [images, setImages] = React.useState<{id: number, url: string, description: string}[]>([]);
  const [files, setFiles] = React.useState<fileType[]>([])
  const [fileSelected, setFileSelected] = React.useState<fileType | null>(null);
  const [processedImageList, setProcessedImageList] = React.useState<String[] | []>([]);

  



  function handleSelectFile(file: fileType) {
    setFileSelected(file)
  }

 async function handleImageUpload (filesValue: File[]) {
  const listList = await Promise.all(filesValue.map(async (file) => {
    const result = await resizeAndCropImage(file, 900)
    return result
  }))
  setProcessedImageList(listList)
 
    setFiles(filesValue.map((item,index) => ({
      id: index + 1,
      file: item,
      name: item.name,
      description: `${item.name}`,
      croppedImage: null
    })))

  
    // const result = await generateBlurHash(filesValue[0])
    
    // console.log(result)
  }

  // React.useEffect(() => {

  //   async function getRandomImage() {
  //     try {
  //       try {
  //         const response = await fetch(`https://source.unsplash.com/${width}x${height}/?random`);
  
  //         if (!response.ok) {
  //           throw new Error('Não foi possível obter a imagem.');
  //         }
  
       
  //         const randomImageUrl = response.url;
  //         return randomImageUrl;

  //       } catch (error) {
  //         console.error('Ocorreu um erro ao obter a imagem:', error);
  //       }
  //     } catch (error) {
  //       console.error('Ocorreu um erro ao obter a imagem:', error);
  //       return null;
  //     }
  //   }
    
  //   async function getImages() {
     
  //     const promises = Array.from({ length: numberOfImages }, () => getRandomImage());
  //     await Promise.all(promises).then((urls) => {
  //       if(urls.length === 0) {
  //         return []
  //       }
  //       const newUrls = urls.map((url, index) =>({
  //         id: index,
  //         description: `Imagem aleatória ${index + 1}`,
  //         url: url as string
  //       }));
  //      return newUrls
  //     }).then((newUrls) =>  setImages([...newUrls]));
  //   }

  //     getImages();
    
  // }, []);

  console.log(files)

  return (
    <div className="md:h-screen w-screen flex flex-col gap-10 items-center justify-center">
      {/* <Reorder.Group axis="y" onReorder={setImages} values={images} className="mt-10 flex flex-col gap-5">
        {images.map((image) => (
          // <Item key={image.id} className="border border-zinc-500 p-2 rounded-lg">
          <Item key={image.id} item={image} />
            
        
        ))}
      </Reorder.Group> */}
      <div className="md:h-screen w-screen flex md:flex-row flex-col-reverse gap-10 items-center justify-center">
        <div className="w-full max-w-[560px] border border-gray-600 rounded-lg p-2 h-[560px] gap-2">
          <DropZoneUpload handleImageUpload={handleImageUpload}/>
        
          <Reorder.Group 
            axis="y" 
            onReorder={setFiles} 
            values={files} 
            // style={{ height: 250, border: "1px solid black", overflowY: "auto" }}
            layoutScroll
            className="mt-10 flex flex-col gap-2 p-2 overflow-y-auto border border-gray-600 rounded-lg h-[400px]">
            {files.map((i) => (
              // <Item key={image.id} className="border border-zinc-500 p-2 rounded-lg">
              <Item key={i.id} item={i} handleSelectFile={handleSelectFile}/>
            ))}
          </Reorder.Group>
             {/* {files && files.map((file, index) => {
              return (
                <Item key={index} item={files} >
               
                  <img src={URL.createObjectURL(file)} alt="image" />
                </Item>
              )
            })} */}
      
          <div className="flex flex-col gap-2">
           
          </div>
        </div>
      <div className="w-full max-w-[560px] border border-gray-600 rounded-lg p-2 relative h-[560px] overflow-hidden">
      {/* <div className="w-full max-w-[560px] border border-gray-600 rounded-lg p-2"> */}
        {/* <SwipeCarousel images={images}/> */}
        {/* <SwipeCarouselThumbOrder images={images.slice(0,11)}/> */}
        
        <EditingImage image={fileSelected}/>

      </div>

      </div>
      <div className="flex flex-col gap-5 overflow-auto">
  
        {/* { processedImageList?.length > 0 && processedImageList.map((processedImage, index) => (
          <img key={index} src={processedImage} alt="Processed" style={{ maxWidth: '100%' }} />
        ))} */}
      </div>
      
    </div>
    
  );
}
