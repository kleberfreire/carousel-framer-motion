import { Button } from '@/components/ui/button';
import { MotionProps, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import * as React from 'react';

type ButtonFullImageProps = {
  onClick?: () => void;
  testHandle: () => void;
};

type Props = React.ForwardRefExoticComponent<
  ButtonFullImageProps & MotionProps & React.RefAttributes<HTMLButtonElement>
>;
// type Props = React.ForwardRefExoticComponent<ButtonFullImageProps & MotionProps & React.RefAttributes<HTMLButtonElement>>

const buttonNextImage = React.forwardRef(function buttonNextImage(
  props: any,
  ref: React.LegacyRef<HTMLButtonElement> | undefined
) {
  return (
    <Button ref={ref} variant="outline" size="icon" {...props}>
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
});

export const ButtonNextImageCarrousel = motion(buttonNextImage);
