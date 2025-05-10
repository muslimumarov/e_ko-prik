import { useState, useEffect } from "react";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // 3 soniyadan so'ng loaderni yashirish
    }, 900);

    return () => clearTimeout(timer); // Cleanup function
  }, []);

  if (!isLoading) return null; // Agar loading tugasa, loaderni ko'rsatmaymiz

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="absolute h-12 w-12 animate-flip bg-blue-500"></div>
    </div>
  );
};

export default Loader;
