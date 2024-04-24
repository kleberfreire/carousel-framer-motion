import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Fullscreen } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'

type Props = {
  url: string
  alt: string
  width: number
  height: number
}

const imageCarousel = React.forwardRef(function imageCarousel(props: Props, ref:React.LegacyRef<HTMLDivElement> | undefined)  {
  return (
  <div {...props} ref={ref} className="aspect-square overflow-hidden w-full shrink-0 rounded-xl object-cover relative bg-red-400">
    <Image  src={props.url} alt={props.url ?? ''}width={props.width} height={props.height}/>
  </div>
  )

  
})



export const ImageCarousel = motion(imageCarousel)