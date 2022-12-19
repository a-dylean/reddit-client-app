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
  if (hoursDifference > -24) {
    return rtf.format(hoursDifference, "hour");
  } else {
    return rtf.format(daysDifference, "day");
  }
};
