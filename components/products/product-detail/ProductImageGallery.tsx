import Image from "next/image";
import { VisualGuide } from "@/types/product";

interface ProductImageGalleryProps {
  mainImage: string;
  images: string[];
  visualGuide: VisualGuide[];
  productName: string;
  selectedImage: number;
  onImageSelect: (index: number) => void;
}

export const ProductImageGallery = ({
  mainImage,
  images,
  visualGuide,
  productName,
  selectedImage,
  onImageSelect
}: ProductImageGalleryProps) => {
  const allImages = [
    mainImage,
    ...(images || []),
    ...(visualGuide.map((v) => v.image) || []),
  ].filter(Boolean);

  return (
    <div>
      <div className="w-full rounded-lg mb-4 h-64 sm:h-80 lg:h-[600px] overflow-hidden">
        <Image
          src={allImages[selectedImage]}
          alt={productName}
          width={500}
          height={500}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {allImages.slice(0, 4).map((img, idx) => (
          <div
            key={idx}
            onClick={() => onImageSelect(idx)}
            className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded cursor-pointer border-2 ${
              selectedImage === idx
                ? "border-green-600"
                : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt="thumbnail"
              width={80}
              height={80}
              className="object-cover w-full h-full rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};