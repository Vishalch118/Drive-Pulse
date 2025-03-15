import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Filter, MapPin } from 'lucide-react';
import { VehicleProps } from '@/components/ui/VehicleCard';
import VehicleCard from '@/components/ui/VehicleCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { DateRange } from 'react-day-picker';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { indianVehicles } from '@/data/indianVehicles';

// Mock vehicle data for the search results page
const vehicleData: VehicleProps[] = [
  {
    id: '1',
    make: 'Tata',
    model: 'BE 6',
    year: 2023,
    imageUrl: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/131825/be-6e-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80',
    pricePerDay: 9500,
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    reviewCount: 45,
    transmission: 'Automatic',
    category: 'Electric'
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Urban Cruiser Hyryder',
    year: 2022,
    imageUrl: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/124027/urban-cruiser-hyryder-exterior-right-front-three-quarter-72.jpeg?isig=0&q=80',
    pricePerDay: 7500,
    location: 'Delhi, NCR',
    rating: 4.7,
    reviewCount: 38,
    transmission: 'Automatic',
    category: 'Luxury'
  },
  {
    id: '3',
    make: 'Tata',
    model: 'Tiago',
    year: 2021,
    imageUrl: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/39345/tiago-exterior-right-front-three-quarter-31.jpeg?isig=0&q=80',
    pricePerDay: 6800,
    location: 'Bangalore, Karnataka',
    rating: 4.8,
    reviewCount: 52,
    transmission: 'Manual',
    category: 'Hashback'
  },
  {
    id: '4',
    make: 'Tata',
    model: 'CURVV',
    year: 2022,
    imageUrl: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/139651/curvv-exterior-right-front-three-quarter.jpeg?isig=0&q=80',
    pricePerDay: 8600,
    location: 'Chennai, Tamil Nadu',
    rating: 4.6,
    reviewCount: 29,
    transmission: 'Automatic',
    category: 'Luxury'
  },
  {
    id: '5',
    make: 'Mahindra ',
    model: 'XUV 3XO',
    year: 2021,
    imageUrl: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/156405/xuv-3xo-exterior-right-front-three-quarter-33.jpeg?isig=0&q=80',
    pricePerDay: 5200,
    location: 'Hyderabad, Telangana',
    rating: 4.5,
    reviewCount: 42,
    transmission: 'Automatic',
    category: 'SUV'
  },
  {
    id: '6',
    make: 'Volkswagen',
    model: 'Virtus',
    year: 2023,
    imageUrl: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/144681/virtus-exterior-right-front-three-quarter-7.jpeg?isig=0&q=80',
    pricePerDay: 4900,
    location: 'Kolkata, West Bengal',
    rating: 4.8,
    reviewCount: 35,
    transmission: 'Manual',
    category: 'Sedan'
  },
];

const VehiclesPage = () => {
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    if (from && to) {
      return {
        from: new Date(from),
        to: new Date(to)
      };
    }
    return undefined;
  });
  const [filteredVehicles, setFilteredVehicles] = useState(vehicleData);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [category, setCategory] = useState<string>('all');
  const [transmission, setTransmission] = useState<string>('all');

  useEffect(() => {
    console.log("Filtering with:", { location, dateRange, priceRange, category, transmission });
    
    let filtered = vehicleData;
    
    if (location) {
      filtered = filtered.filter(v => 
        v.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    filtered = filtered.filter(v => 
      v.pricePerDay >= priceRange[0] && v.pricePerDay <= priceRange[1]
    );
    
    if (category !== 'all') {
      filtered = filtered.filter(v => v.category === category);
    }
    
    if (transmission !== 'all') {
      filtered = filtered.filter(v => v.transmission === transmission);
    }

    if (filtered.length === 0) {
      filtered = getAlternateLocationVehicles();
    }
    
    setFilteredVehicles(filtered);
  }, [location, dateRange, priceRange, category, transmission]);
  
  const getAlternateLocationVehicles = () => {
    return indianVehicles.map(vehicle => ({
      ...vehicle,
      location: vehicle.location.replace(/^[^,]+/, location || 'Your Location')
    }));
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-64 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="City or neighborhood" 
                      className="pl-9"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Price Range</label>
                  <div className="mt-2">
                    <Slider 
                      defaultValue={[0, 10000]} 
                      max={10000} 
                      step={500} 
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Hatchback">Hatchback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Transmission</label>
                  <Select value={transmission} onValueChange={setTransmission}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="All transmissions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All transmissions</SelectItem>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Available Vehicles</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        placeholder="City or neighborhood" 
                        className="pl-9"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Price Range</label>
                    <div className="mt-2">
                      <Slider 
                        defaultValue={[0, 10000]} 
                        max={10000} 
                        step={500} 
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Hatchback">Hatchback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Transmission</label>
                    <Select value={transmission} onValueChange={setTransmission}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="All transmissions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All transmissions</SelectItem>
                        <SelectItem value="Automatic">Automatic</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex-1">
            <div className="hidden lg:flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Available Vehicles</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VehiclesPage;
