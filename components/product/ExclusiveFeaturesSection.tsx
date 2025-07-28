import Image from "next/image";
import { FeatureExplanationValue, Section } from "@/types/api/product";
import { FaCheck } from "react-icons/fa6";

interface ExclusiveFeaturesSectionProps {
  section: Section;
}

export default function ExclusiveFeaturesSection({
  section,
}: ExclusiveFeaturesSectionProps) {
  if (!section?.values.length) return null;

  return (
    <>
      <h3 className="mb-2 text-lg font-semibold md:text-xl">{section.name}</h3>

      <div className="flex flex-col">
        {section.values.map((value, index) => {
          const item = value as FeatureExplanationValue;

          return (
            <div
              key={item.id || index}
              className="flex flex-col w-full p-1 border border-gray-200 rounded-md md:flex-row-reverse"
            >
              {/* Image Section */}
              <div className="relative h-[300px] w-full md:w-[300px]">
                <Image
                  src={item.file_url}
                  alt={item.title}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6">
                <div className="mb-3 text-lg font-semibold text-white">
                  {item.title}
                </div>

                <ul className="space-y-3">
                  {item.checklist.map((checkItem, checkIndex) => (
                    <li key={checkIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                        <FaCheck size={12} className="text-emerald-600" />
                      </div>
                      <span className="text-sm text-gray-800">{checkItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
