import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import VehicleGallery from '@/components/vehicle/VehicleGallery';
import VehicleSpecs from '@/components/vehicle/VehicleSpecs';
import VehicleReviews from '@/components/vehicle/VehicleReviews';
import BookingCard from '@/components/vehicle/BookingCard';
import type { VehicleData } from '@/types/vehicle';

const vehicleData: VehicleData = {
  id: '1',
  make: 'Tata',
  model: 'BE 6',
  year: 2024,
  description: 'Experience the future of driving with this all-electric Tata BE 6. Featuring autopilot, long-range battery, and premium interior, this vehicle offers both luxury and eco-friendliness in one package.',
  images: [
    'https://imgd.aeplcdn.com/370x208/n/cw/ec/131825/be-6e-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80',
    'https://imgd.aeplcdn.com/370x208/n/cw/ec/124027/urban-cruiser-hyryder-exterior-right-front-three-quarter-72.jpeg?isig=0&q=80',
    'https://imgd.aeplcdn.com/370x208/n/cw/ec/39345/tiago-exterior-right-front-three-quarter-31.jpeg?isig=0&q=80',
    'https://imgd.aeplcdn.com/370x208/n/cw/ec/139651/curvv-exterior-right-front-three-quarter.jpeg?isig=0&q=80'
  ],
  pricePerDay: 120,
  location: 'Kolkota',
  rating: 4.9,
  reviewCount: 45,
  features: [
    'All-Electric',
    'Autopilot',
    'Premium Sound System',
    'Heated Seats',
    'Long Range Battery',
    'Supercharging Access'
  ],
  specs: {
    range: '315 miles',
    topSpeed: '145 mph',
    acceleration: '0-60 in 3.1s',
    seats: 5,
    doors: 4,
    transmission: 'Automatic',
    category: 'Electric'
  },
  owner: {
    name: 'Nirmit ',
    joined: 'January 2024',
    responseRate: '95%',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  reviews: [
    {
      id: 1,
      user: 'Varsha',
      date: '2023-05-15',
      rating: 5,
      comment: 'Amazing car and super clean! Michael was very responsive and helpful. Will definitely rent again.',
      userImage: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      user: 'Rahul Sipligunj',
      date: '2023-04-02',
      rating: 5,
      comment: 'Perfect experience from start to finish. The car was in excellent condition and so much fun to drive!',
      userImage: 'https://randomuser.me/api/portraits/men/46.jpg'
    }
  ]
};

const VehicleDetail = () => {
  const { id } = useParams();
  
  return (
    <main className="pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center mb-6 animate-slide-down">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/vehicles" className="flex items-center">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to search
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6 mx-2" />
          <div className="text-sm text-muted-foreground">
            {vehicleData.location}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{`${vehicleData.year} ${vehicleData.make} ${vehicleData.model}`}</h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{vehicleData.rating}</span>
                  <span className="text-muted-foreground ml-1">({vehicleData.reviewCount} reviews)</span>
                </div>
                <Badge variant="outline" className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {vehicleData.location}
                </Badge>
              </div>
            </div>
            
            <VehicleGallery 
              images={vehicleData.images}
              make={vehicleData.make}
              model={vehicleData.model}
            />
            
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6 pt-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{vehicleData.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Specifications</h3>
                  <VehicleSpecs specs={vehicleData.specs} />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Owner</h3>
                  <div className="flex items-center">
                    <img 
                      src={vehicleData.owner.profileImage} 
                      alt={vehicleData.owner.name}
                      className="h-12 w-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-medium">{vehicleData.owner.name}</p>
                      <p className="text-sm text-muted-foreground">Member since {vehicleData.owner.joined}</p>
                      <p className="text-sm text-muted-foreground">Response rate: {vehicleData.owner.responseRate}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="pt-4">
                <h3 className="text-lg font-medium mb-4">Vehicle Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {vehicleData.features.map((feature, index) => (
                    <div key={index} className="flex items-center p-2">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-4">
                <VehicleReviews 
                  reviews={vehicleData.reviews}
                  rating={vehicleData.rating}
                  reviewCount={vehicleData.reviewCount}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="animate-slide-up">
            <BookingCard 
              pricePerDay={vehicleData.pricePerDay}
              rating={vehicleData.rating}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default VehicleDetail;
