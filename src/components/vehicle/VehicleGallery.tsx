
import { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

interface VehicleGalleryProps {
  images: string[];
  make: string;
  model: string;
}

const VehicleGallery = ({ images, make, model }: VehicleGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
        <img 
          src={mainImage} 
          alt={`${make} ${model}`}
          className="object-cover w-full h-full"
        />
      </AspectRatio>
      
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <AspectRatio key={index} ratio={16 / 9} className="bg-muted rounded-md overflow-hidden cursor-pointer">
            <img 
              src={image} 
              alt={`${make} ${model} image ${index + 1}`}
              className={cn(
                "object-cover w-full h-full transition-opacity",
                image === mainImage ? "ring-2 ring-primary" : "hover:opacity-80"
              )}
              onClick={() => setMainImage(image)}
            />
          </AspectRatio>
        ))}
      </div>
    </div>
  );
};

export default VehicleGallery;
