import React from 'react';
import { Calendar, Map, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50" />
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-20">
        <div className="max-w-3xl mx-auto space-y-8 animate-slide-up text-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Find your perfect drive <span className="text-gradient">anywhere</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Rent vehicles from trusted local owners. Experience the freedom of the road with our premium selection.
            </p>
          </div>

          <div className="w-full max-w-3xl mx-auto">
            <SearchBar />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 max-w-3xl mx-auto">
            <div className="glass p-4 rounded-lg flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Easy Search</h3>
                <p className="text-sm text-muted-foreground">Find the perfect vehicle</p>
              </div>
            </div>
            <div className="glass p-4 rounded-lg flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Flexible Booking</h3>
                <p className="text-sm text-muted-foreground">Book by hour or day</p>
              </div>
            </div>
            <div className="glass p-4 rounded-lg flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Map className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Convenient Pickup</h3>
                <p className="text-sm text-muted-foreground">Multiple locations</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="btn-hover-effect">
              <Link to="/vehicles" className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Vehicles
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-hover-effect">
              <Link to="/list-vehicle" className="flex items-center gap-2">
                Share Your Vehicle
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
