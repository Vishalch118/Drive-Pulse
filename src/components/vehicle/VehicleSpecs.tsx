
import { Car, Users, Settings, Fuel } from 'lucide-react';
import type { VehicleSpec } from '@/types/vehicle';

interface VehicleSpecsProps {
  specs: VehicleSpec;
}

const VehicleSpecs = ({ specs }: VehicleSpecsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="flex items-center">
        <Car className="h-5 w-5 mr-2 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Category</p>
          <p className="text-sm text-muted-foreground">{specs.category}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Users className="h-5 w-5 mr-2 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Passengers</p>
          <p className="text-sm text-muted-foreground">{specs.seats} seats</p>
        </div>
      </div>
      <div className="flex items-center">
        <Settings className="h-5 w-5 mr-2 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Transmission</p>
          <p className="text-sm text-muted-foreground">{specs.transmission}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Fuel className="h-5 w-5 mr-2 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Range</p>
          <p className="text-sm text-muted-foreground">{specs.range}</p>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecs;
