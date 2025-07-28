import { AboutValue, Section } from "@/types/api/product";
import Card from "../ui/Card";
import { FaAngleDown } from "react-icons/fa6";

interface CourseDetailsSectionProps {
  section: Section;
}

export default function CourseDetailsSection({
  section,
}: CourseDetailsSectionProps) {
  if (!section?.values.length) return null;

  return (
    <>
      <h3 className="mb-2 text-lg font-semibold md:text-xl">{section.name}</h3>

      <Card>
        <div className="space-y-4">
          {section.values.map((value, index) => {
            const about = value as AboutValue;

            return (
              <details
                key={about.id || index}
                className="border-b border-gray-200 group last:border-b-0"
              >
                <summary className="flex items-center justify-between px-4 py-3 list-none cursor-pointer ">
                  <div dangerouslySetInnerHTML={{ __html: about.title }} />
                  <FaAngleDown className="flex-shrink-0 w-5 h-5 ml-4 text-gray-500 transition-transform duration-200 group-open:rotate-180" />
                </summary>

                <div className="px-6 pb-6 border-t border-gray-100">
                  <div
                    className="pt-4 prose-sm prose text-gray-700 max-w-none"
                    dangerouslySetInnerHTML={{ __html: about.description }}
                  />
                </div>
              </details>
            );
          })}
        </div>
      </Card>
    </>
  );
}
