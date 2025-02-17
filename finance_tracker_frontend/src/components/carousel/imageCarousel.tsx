import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Import images
import authImg1 from "@/assets/auth.jpg";
import authImg2 from "@/assets/auth2.jpg";
import authImg3 from "@/assets/auth3.jpg";

const slides = [
  { image: authImg1, title: "Take Control of Your Finance", text: "Start managing your money smarter. Join now to track expenses, set budgets and achieve your financial goals effortlessy" },
  { image: authImg2, title: "Join The Money-Saving Revolution", text: "Take change of your finances. Join to unlock tools for tracking spending, saving and reaching your money goals" },
  { image: authImg3, title: "Your Financial Journey Starts Here", text: "Begin your path to better money management. Join now to track expenses, set goals and monitor progress with ease." },
];

const ImageCarousel: React.FC = () => {
  const [carouselRef, api] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update text when the slide changes
  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api, onSelect]);

  return (
    <div className="flex flex-col items-center">
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-xl  w-[400px] h-[500px]" ref={carouselRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full">
              <img src={slide.image} alt={`Slide ${index}`} className="w-full h-full object-cover rounded-xl" />
            </div>
          ))}
        </div>

         {/* Dynamic Header & Paragraph */}
      <div className="text-center mt-4">
        <h2 className="text-lg font-bold ">{slides[currentIndex].title}</h2>
        <p className="text-sm text-gray-600">{slides[currentIndex].text}</p>
      </div>
      </div>

     
    </div>
  );
};

export default ImageCarousel;
