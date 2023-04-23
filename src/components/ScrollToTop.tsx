import { useEffect, useState } from "react";
import { ArrowLongUpIcon } from "@heroicons/react/24/outline";
import { useScrollPosition } from "@/lib/hooks/useScrollPosition";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const scrollPosition = useScrollPosition();

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (scrollPosition > 45) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  }, [scrollPosition]);

  return (
    <div className="relative">
      {showTopBtn && (
        <button
          title="delete"
          type="button"
          className="text-md fixed bottom-3 right-4 rounded-full border border-indigo-500 bg-indigo-300 p-2
        focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 
        active:scale-[97%]"
          onClick={goToTop}
        >
          <ArrowLongUpIcon className="h-6 w-6 font-semibold text-indigo-700 " />
        </button>
      )}
    </div>
  );
};
export default ScrollToTop;
