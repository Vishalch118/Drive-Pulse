
import React from 'react';
import { ArrowRight, Calendar, Car, CheckCircle, CreditCard, HelpCircle, Map, Search, Shield, ThumbsUp, User } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      title: "Browse & Search",
      description: "Search for the perfect vehicle based on your location, dates, and preferences.",
      icon: <Search className="h-8 w-8 text-primary" />,
    },
    {
      title: "Book Instantly",
      description: "Reserve your vehicle with our secure booking system. No waiting for confirmations.",
      icon: <Calendar className="h-8 w-8 text-primary" />,
    },
    {
      title: "Pick Up & Go",
      description: "Meet the owner, pick up your vehicle, and start your journey with ease.",
      icon: <Car className="h-8 w-8 text-primary" />,
    },
    {
      title: "Return & Review",
      description: "Return the vehicle and share your experience with the DrivePulse community.",
      icon: <ThumbsUp className="h-8 w-8 text-primary" />,
    },
  ];

  const faqs = [
    {
      question: "How do I book a vehicle?",
      answer: "Booking a vehicle is simple. Search for available cars in your desired location, select your dates, and complete the booking process. You'll receive a confirmation email with all the details."
    },
    {
      question: "What do I need to rent a car?",
      answer: "To rent a car, you need a valid driver's license, a credit or debit card for payment, and to be at least 21 years old (25 for some luxury or specialty vehicles)."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking. Most rentals offer free cancellation up to 24 hours before the scheduled pickup time. Check the specific rental terms for your booking."
    },
    {
      question: "How does insurance work?",
      answer: "All rentals include basic insurance coverage. You can choose to purchase additional coverage during the booking process for extra peace of mind."
    },
    {
      question: "What if the car breaks down?",
      answer: "In the rare event of a breakdown, contact our 24/7 support team immediately. We'll arrange assistance and, if necessary, a replacement vehicle as quickly as possible."
    },
    {
      question: "How do I list my own car?",
      answer: "To list your car, create an account, complete your profile, and follow the prompts to add your vehicle details, photos, and availability. Our team will review and approve your listing."
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16">
      <section className="py-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How DrivePulse Works</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Renting a car should be simple. We've streamlined the process to make your experience fast, secure, and enjoyable.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm border border-border animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-muted-foreground mt-4 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">For Renters</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect vehicle for your needs, whether it's a weekend getaway or a month-long adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <div className="mb-4 text-primary">
                <Search className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-muted-foreground">
                Choose from thousands of vehicles, from economy cars to luxury SUVs, all privately owned and well-maintained.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <div className="mb-4 text-primary">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Bookings</h3>
              <p className="text-muted-foreground">
                Our secure platform handles payments and protects your personal information with industry-leading security.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <div className="mb-4 text-primary">
                <Map className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Locations</h3>
              <p className="text-muted-foreground">
                Find vehicles near you or at your destination, with convenient pickup and return options.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link to="/vehicles">Browse Vehicles</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">For Car Owners</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Turn your vehicle into a source of income by listing it on DrivePulse when you're not using it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <div className="mb-4 text-primary">
                <CreditCard className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Money</h3>
              <p className="text-muted-foreground">
                Set your own rental rates and availability. Earn up to $1,000 or more per month depending on your vehicle.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <div className="mb-4 text-primary">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Full Control</h3>
              <p className="text-muted-foreground">
                You decide when your car is available, who can rent it, and set your own rental rules and requirements.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <div className="mb-4 text-primary">
                <User className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Renters</h3>
              <p className="text-muted-foreground">
                All renters undergo a comprehensive verification process before they can book your vehicle.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link to="/list-vehicle">List Your Vehicle</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Got questions? We've got answers. If you don't see your question here, reach out to our support team.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;
