import Image from "next/image";
import { ChecklistItem, CTAText } from "@/types/api/product";
import Card from "../ui/Card";

interface CTASectionProps {
  ctaText: CTAText;
  checklist: ChecklistItem[];
  price: number;
}

const CTASection = ({ ctaText, checklist, price }: CTASectionProps) => {
  return (
    <Card>
      <div className="mb-4">
        <div className="mb-1 text-2xl font-semibold">
          ৳{price.toLocaleString()}
        </div>
      </div>

      <button className="w-full px-6 py-2 mb-6 text-lg font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
        {ctaText.name}
      </button>

      <div className="pt-6 space-y-4 border-t border-gray-100">
        <div className="mb-4 font-semibold">Course includes:</div>
        {checklist.map((item) => (
          <div key={item.id} className="flex items-start gap-3 text-sm">
            <Image
              src={item.icon}
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 mt-0.5"
            />
            <span className="text-gray-700">{item.text}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CTASection;
