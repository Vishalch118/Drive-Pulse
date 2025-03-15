import React from 'react';
import Hero from '@/components/home/Hero';
import SearchBar from '@/components/home/SearchBar';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Search & Compare',
      description: 'Search for vehicles in your area and filter by your preferences.',
      icon: '🔍',
    },
    {
      number: '02',
      title: 'Book Instantly',
      description: 'Reserve your chosen vehicle directly through our secure booking system.',
      icon: '✅',
    },
    {
      number: '03',
      title: 'Drive & Enjoy',
      description: 'Pick up your rental and enjoy the freedom of the open road.',
      icon: '🚗',
    },
  ];

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="text-muted-foreground mt-2">
            Renting a car has never been easier
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative p-6 rounded-lg bg-background shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="absolute top-4 right-4 font-bold text-primary/10 text-4xl">{step.number}</div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/how-it-works" className="flex items-center">
              Learn More
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-indigo-500/5" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070')] bg-cover bg-center opacity-10" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Own a car? Turn it into income
          </h2>
          <p className="text-lg text-muted-foreground">
            List your vehicle on our platform and start earning money when you're not using it.
            Join thousands of car owners who have discovered a new source of income.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link to="/list-vehicle">List Your Vehicle</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedVehicles />
      <HowItWorks />
      <CTASection />
    </main>
  );
};

export default Index;
