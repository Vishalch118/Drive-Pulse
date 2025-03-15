
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import VehicleCard, { VehicleProps } from '../ui/VehicleCard';
import { Button } from '@/components/ui/button';

// Mock data for featured vehicles
const featuredVehicles: VehicleProps[] = [
  {
    id: '1',
    make: 'Thar',
    model: 'ROXX',
    year: 2023,
    imageUrl: 'https://images.unsplash.com/photo-1633867179970-c54688bcfa33?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFoaW5kcmElMjB0aGFyfGVufDB8fDB8fHww',
    pricePerDay: 120000,
    location: 'Mumbai, Mh',
    rating: 4.9,
    reviewCount: 45,
    transmission: 'Automatic',
    category: 'Electric'
  },
  {
    id: '2',
    make: 'Mahindra',
    model: 'XUV 700',
    year: 2022,
    imageUrl: 'https://images.unsplash.com/photo-1706879186587-e5692ad352bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFoaW5kcmElMjB4dXYlMjA3MDB8ZW58MHx8MHx8fDA%3D',
    pricePerDay: 95,
    location: 'Chennai',
    rating: 4.7,
    reviewCount: 38,
    transmission: 'Automatic',
    category: 'Luxury'
  },
  {
    id: '3',
    make: 'Hyundai',
    model: 'Verna',
    year: 2021,
    imageUrl: 'https://images.unsplash.com/photo-1633359279771-804abaf0f0b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8SHl1bmRhaSUyMHZlcm5hfGVufDB8fDB8fHww',
    pricePerDay: 85,
    location: 'Delhi',
    rating: 4.8,
    reviewCount: 52,
    transmission: 'Manual',
    category: 'SUV'
  },
];

const FeaturedVehicles = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Vehicles</h2>
            <p className="text-muted-foreground mt-2">Explore our top-rated selection</p>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex">
            <Link to="/vehicles" className="flex items-center">
              View all vehicles
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button asChild>
            <Link to="/vehicles">Browse All Vehicles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
