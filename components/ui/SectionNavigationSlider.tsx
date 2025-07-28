"use client";

import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface Section {
  type: string;
  title?: string;
}

interface SectionNavigationSliderProps {
  sections: Section[];
}

const SECTION_DISPLAY_NAMES: Record<string, string> = {
  instructors: "Instructors",
  features: "Features",
  pointers: "Learning Points",
  feature_explanations: "Exclusive Features",
  about: "Course Details",
};

const SECTION_ORDER = [
  "instructors",
  "features",
  "pointers",
  "feature_explanations",
  "about",
];

export default function SectionNavigationSlider({
  sections,
}: SectionNavigationSliderProps) {
  const [activeSection, setActiveSection] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const navigableSections = sections
    .filter((s) => SECTION_ORDER.includes(s.type))
    .sort(
      (a, b) => SECTION_ORDER.indexOf(a.type) - SECTION_ORDER.indexOf(b.type)
    );

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 270);

      for (const { type } of navigableSections) {
        const element = document.getElementById(`section-${type}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(type);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigableSections]);

  // Check if scroll buttons should be visible
  useEffect(() => {
    const checkScroll = () => {
      const el = scrollContainerRef.current;
      if (el) {
        setShowScrollButtons(el.scrollWidth > el.clientWidth);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  if (navigableSections.length === 0) return null;

  const scrollToSection = (type: string) => {
    const element = document.getElementById(`section-${type}`);
    if (element) {
      const elementTop =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetTop = elementTop - 130;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(type);
    }
  };

  const scrollByOffset = (offset: number) => {
    scrollContainerRef.current?.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`sticky top-32 z-30 transition-all duration-200 ${
        isSticky
          ? "bg-white px-4 py-3 border-b border-gray-200"
          : "px-4 py-2 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="relative ml-[-14px]">
        {/* Left scroll button (conditionally rendered) */}
        {showScrollButtons && (
          <button
            onClick={() => scrollByOffset(-200)}
            className="absolute left-0 z-10 p-2 text-white -translate-y-1/2 rounded-full top-1/2 bg-black/50 hover:bg-black/70"
          >
            <FaAngleLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right scroll button (conditionally rendered) */}
        {showScrollButtons && (
          <button
            onClick={() => scrollByOffset(200)}
            className="absolute right-0 z-10 p-2 text-white -translate-y-1/2 rounded-full top-1/2 bg-black/50 hover:bg-black/70"
          >
            <FaAngleRight className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable container */}
        <div
          className="px-10 overflow-x-auto scroll-smooth scrollbar-hide"
          ref={scrollContainerRef}
        >
          <div className="flex gap-2">
            {navigableSections.map(({ type }) => (
              <button
                key={type}
                onClick={() => scrollToSection(type)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  activeSection === type
                    ? "text-green-500 border-b-[1px]"
                    : "text-gray-800 hover:bg-gray-200"
                }`}
              >
                {SECTION_DISPLAY_NAMES[type] || type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
