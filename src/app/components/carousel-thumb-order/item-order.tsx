import * as React from "react";
import { useMotionValue, Reorder,animate, MotionValue, } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type fileType = {
  id: number,
  file: File,
  name: string,
}

interface Props {
  item: {id: number, url: string, description: string};
  children?: React.ReactNode;
  handleSelectFile: (file:fileType) => void;
}



const inactiveShadow = "0px 0px 0px rgba(0,0,0,0.8)";

export function useRaisedShadow(value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow);

  React.useEffect(() => {
    let isActive = false;
    value.onChange((latest) => {
      const wasActive = isActive;
      if (latest !== 0) {
        isActive = true;
        if (isActive !== wasActive) {
          animate(boxShadow, "5px 5px 10px rgba(0,0,0,0.3)");
        }
      } else {
        isActive = false;
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow);
        }
      }
    });
  }, [value, boxShadow]);

  return boxShadow;
}


export const Item = ({ item, children, handleSelectFile }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item value={item} id={`${item.id}`} style={{ boxShadow, y }} className="border border-zinc-30000 p-2 rounded-lg shadow-lg flex items-center justify-between" >
      {/* <span >{item.description}</span> */}
      <span >{item?.name?? ''}</span> 
      <Button variant="outline" size="icon" onClick={() => handleSelectFile(item as fileType)}>
        <ChevronRight className="h-4 w-4" />
      </Button> 
    </Reorder.Item>
  );
};
