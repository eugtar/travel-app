import React from "react";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = React.useState<number>(4);

  React.useEffect(() => {
    const onWinResize = () => {
      const windowSize = document.documentElement.clientWidth;
      if (windowSize >= 991) {
        setBreakpoint(10);
      } else if (windowSize >= 767) {
        setBreakpoint(8);
      } else if (windowSize >= 550) {
        setBreakpoint(6);
      } else if (windowSize >= 375) {
        setBreakpoint(4);
      }
    };
    onWinResize();
    window.addEventListener("resize", onWinResize);
    return () => window.removeEventListener("resize", onWinResize);
  }, []);

  return breakpoint;
};

export default useBreakpoint;
