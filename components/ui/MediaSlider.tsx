"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface Media {
  resource_type: "image" | "video";
  resource_value: string;
  thumbnail_url?: string;
}

interface MediaSliderProps {
  media: Media[];
}

export default function MediaSlider({ media }: MediaSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % media.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [media.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [media.length, isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 300);
    },
    [currentIndex, isTransitioning]
  );

  // Smooth auto-scroll thumbnails to keep active one centered
  useEffect(() => {
    if (!thumbnailContainerRef.current || media.length <= 1) return;

    const container = thumbnailContainerRef.current;
    const activeThumbnail = container.children[currentIndex] as HTMLElement;

    if (activeThumbnail) {
      const containerRect = container.getBoundingClientRect();
      const thumbnailRect = activeThumbnail.getBoundingClientRect();
      const scrollLeft = container.scrollLeft;

      const targetScrollLeft =
        scrollLeft +
        thumbnailRect.left -
        containerRect.left -
        (containerRect.width - thumbnailRect.width) / 2;

      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
    }
  }, [currentIndex, media.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (media.length === 0) return null;

  const currentMedia = media[currentIndex];

  return (
    <div className="p-1 bg-transparent border border-gray-200 rounded md:bg-white">
      {/* Main media display */}
      <div className="relative overflow-hidden bg-gray-100 rounded aspect-video group">
        <div
          className={`w-full h-full transition-opacity duration-300 ease-in-out ${
            isTransitioning ? "opacity-75" : "opacity-100"
          }`}
        >
          {currentMedia.resource_type === "video" ? (
            <iframe
              src={`https://www.youtube.com/embed/${currentMedia.resource_value}`}
              title="Course Media"
              className="w-full h-full"
              allowFullScreen
            />
          ) : (
            <Image
              src={currentMedia.resource_value || "/placeholder.svg"}
              alt="Course Media"
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              priority={currentIndex === 0}
            />
          )}
        </div>

        {/* Navigation arrows with improved hover effects */}
        {media.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="absolute p-2 text-white transition-all duration-200 ease-in-out -translate-y-1/2 rounded-full opacity-0 left-2 top-1/2 bg-black/40 hover:bg-black/70 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <FaAngleLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="absolute p-2 text-white transition-all duration-200 ease-in-out -translate-y-1/2 rounded-full opacity-0 right-2 top-1/2 bg-black/40 hover:bg-black/70 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group-hover:opacity-100"
              aria-label="Next slide"
            >
              <FaAngleRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Counter with smooth transitions */}
        {media.length > 1 && (
          <div className="absolute px-3 py-1 text-sm font-medium text-white transition-all duration-200 rounded-full bottom-2 right-2 bg-black/60 backdrop-blur-sm">
            <span className="transition-all duration-300">
              {currentIndex + 1} / {media.length}
            </span>
          </div>
        )}

        {/* Progress indicators */}
        {media.length > 1 && (
          <div className="absolute flex gap-1 bottom-2 left-2">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail navigation with hidden scrollbar */}
      {media.length > 1 && (
        <div className="p-4">
          <div
            ref={thumbnailContainerRef}
            className="flex gap-3 overflow-x-auto scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {media.map((item, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  index === currentIndex
                    ? "border-green-500 ring-2 ring-green-200 shadow-lg scale-105"
                    : "border-gray-200 hover:border-gray-400 hover:shadow-md"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    index === currentIndex
                      ? "opacity-100"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {item.thumbnail_url ? (
                    <Image
                      src={item.thumbnail_url || "/placeholder.svg"}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : item.resource_type === "video" ? (
                    <div className="flex items-center justify-center w-full h-full bg-gray-800">
                      <span className="text-lg text-white">▶️</span>
                    </div>
                  ) : (
                    <Image
                      src={item.resource_value || "/placeholder.svg"}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  )}
                </div>

                {/* Active indicator */}
                {index === currentIndex && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
        div {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        button:focus-visible {
          outline: 2px solid #10b981;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
