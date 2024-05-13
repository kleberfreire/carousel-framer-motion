import * as React from "react";
import { useMotionValue, Reorder,animate, MotionValue, } from "framer-motion";

interface Props {
  item: {id: number, url: string, description: string};
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


export const Item = ({ item }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item value={item} id={`${item.id}`} style={{ boxShadow, y }} className="border border-zinc-30000 p-2 rounded-lg shadow-lg">
      <span >{item.description}</span>
    </Reorder.Item>
  );
};
