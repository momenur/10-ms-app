"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { SUPPORTED_LANGUAGES } from "@/constants";

const languageOptions = Object.values(SUPPORTED_LANGUAGES);

export default function Navbar() {
  const { language, setLanguage } = useLanguage();

  // Toggle to the next language in the list
  const toggleLanguage = () => {
    const currentIndex = languageOptions.findIndex(
      (lang) => lang.code === language
    );
    const nextIndex = (currentIndex + 1) % languageOptions.length;
    setLanguage(languageOptions[nextIndex].code);
  };

  const currentLanguage = languageOptions.find(
    (lang) => lang.code === language
  );

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* logo section */}
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-green-500">Navbar</h1>
          </div>

          {/* right side navigation */}
          <div className="flex items-center gap-6">
            {/* Language switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100"
            >
              {currentLanguage?.nativeName}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
