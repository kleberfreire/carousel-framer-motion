'use client';
import React, { use, useState } from "react";
// import Slider from "@material-ui/core/Slider";
import Cropper,  { Point, Area } from "react-easy-crop";
import "./styles.css";
import { Slider } from "@/components/ui/slider";
import { blurHashToDataUrl } from '../../../ultils/blur-hash-to-data-url';
import { Input } from "@/components/ui/input";


type fileType = {
  id: number,
  file: File,
  name: string,
}

interface Props {
  image: fileType | null
}

export function EditingImage ({image}: Props) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [img, setImg] = useState("")
  // const [img, setImg] = useState("https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000")
  const [rotation, setRotation] = useState(0)
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  console.log(zoom)
  React.useEffect(() => {
    if(image) {
      setImg(URL.createObjectURL(image.file))
    } 
  }, [image])
  // src={URL.createObjectURL(file)} alt="image"
  return (
    <div className="App">
      <div className="crop-container">
        <Cropper
          // image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
          image={img}
          // blurHashToDataUrl={'007:GI'}
          // image={image?.file? URL.createObjectURL(image?.file): 'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls gap-4">
    
      <span>Zoom</span>
        <Slider
          value={[zoom]}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onValueChange={(e) => {
            setZoom(Number(e[0]))
          }}
       
          // onChange={(e, zoom) => setZoom(Number(zoom))}
          
        />
      <span>Rotação</span>
        <Slider
          value={[rotation]}
          min={0}
          max={360}
          step={1}
          aria-labelledby="Zoom"
          onValueChange={(e) => {
            setRotation(Number(e[0]))
          }}   
        />
      {/* <Input placeholder="teste" /> */}
      </div>
    </div>
  );
};







// export function EditingImage() {
//   return (
//     <div>
//       <h1>Editing Image</h1>
//       <p>Editing Image</p>
//     </div>
//   );
// }