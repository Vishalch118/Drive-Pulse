
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star, UserRound } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface VehicleProps {
  id: string;
  make: string;
  model: string;
  year: number;
  imageUrl: string;
  pricePerDay: number;
  location: string;
  rating: number;
  reviewCount: number;
  transmission: 'Automatic' | 'Manual';
  category: string;
}

const VehicleCard = ({ 
  id, 
  make, 
  model, 
  year, 
  imageUrl, 
  pricePerDay, 
  location, 
  rating, 
  reviewCount,
  transmission,
  category
}: VehicleProps) => {
  // Extract only the city from location (removes state/country)
  const city = location.split(',')[0].trim();
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group animate-fade-in">
      <div className="relative overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <img 
            src={imageUrl} 
            alt={`${year} ${make} ${model}`} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
        </AspectRatio>
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge variant="secondary" className="bg-white/90 text-primary shadow-sm">
            {category}
          </Badge>
          <Badge variant="secondary" className="bg-white/90 text-primary shadow-sm">
            {transmission}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="flex items-center bg-white/90 shadow-sm">
            <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-muted-foreground text-xs ml-1">({reviewCount})</span>
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-lg">{`${year} ${make} ${model}`}</h3>
            <p className="text-sm text-muted-foreground">{city}</p>
          </div>
          <div className="text-right">
            <span className="font-bold text-lg">₹{pricePerDay}</span>
            <p className="text-xs text-muted-foreground">per day</p>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mt-2 gap-4">
          <div className="flex items-center">
            <UserRound className="h-4 w-4 mr-1" />
            <span>4 seats</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Available now</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link to={`/vehicle/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
