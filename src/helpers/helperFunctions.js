import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
};

export const relativeDays = (timestamp) => {
  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });
  const oneDayInHs = 1000 * 60 * 60;
  const oneDayinMs = 1000 * 60 * 60 * 24;
  const hoursDifference = Math.round(
    (timestamp - new Date().getTime()) / oneDayInHs
  );
  const daysDifference = Math.round(
    (timestamp - new Date().getTime()) / oneDayinMs
  );

   return (hoursDifference > -24) 
  ? rtf.format(hoursDifference, "hour")
  : rtf.format(daysDifference, "day")

};

export const makeDate = (data) => {
  return new Date(data * 1000);
};

export const numFormatter = (num) => {
  return Math.abs(num) > 999999
    ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + "m"
    : Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};
