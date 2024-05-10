import { Button } from '@/components/ui/button'
import { MotionProps, motion } from 'framer-motion'
import { Fullscreen } from 'lucide-react'
import * as React from 'react'

type ButtonFullImageProps = {
  onClick?: () => void
  testHandle: () => void
}

type Props = React.ForwardRefExoticComponent<ButtonFullImageProps & MotionProps & React.RefAttributes<HTMLButtonElement>> 
// type Props = React.ForwardRefExoticComponent<ButtonFullImageProps & MotionProps & React.RefAttributes<HTMLButtonElement>> 

const ButtonFullImage = React.forwardRef(function buttonFullImage(props: any, ref:React.LegacyRef<HTMLButtonElement> | undefined)  {
  return (
    <Button ref={ref} variant="outline" size="icon" {...props} >
      <Fullscreen className="w-4 h-4"/>
    </Button>
    // <Button ref={ref} variant="outline" size="icon" onClick={props.} className="rounded-full absolute bottom-5 right-5 z-[60]" {...rest} >
    //   <Fullscreen className="w-4 h-4"/>
    // </Button>
  )

  
})



export const ButtonFullImageCarrousel = motion(ButtonFullImage)