import Arrow from "@/assets/arrow.svg";
import { useEffect } from "react";

export const Test = () => {
  useEffect(() => {
    console.tron.log(process.env.BASE_URL);
  }, []);
  return (
    <>
      <Arrow />
    </>
  );
};
