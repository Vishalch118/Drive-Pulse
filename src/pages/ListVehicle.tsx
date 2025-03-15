
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Car, ImagePlus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  model: z.string().min(1, {
    message: "Model is required",
  }),
  year: z.coerce.number().min(1990, {
    message: "Year must be 1990 or later",
  }).max(new Date().getFullYear() + 1, {
    message: `Year cannot be later than ${new Date().getFullYear() + 1}`,
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  seats: z.coerce.number().min(1, {
    message: "Vehicle must have at least 1 seat",
  }).max(15, {
    message: "Vehicle cannot have more than 15 seats",
  }),
  doors: z.coerce.number().min(1, {
    message: "Vehicle must have at least 1 door",
  }).max(6, {
    message: "Vehicle cannot have more than 6 doors",
  }),
  pricePerDay: z.coerce.number().min(10, {
    message: "Price must be at least ₹10 per day",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  licensePlate: z.string().min(1, {
    message: "License plate is required",
  }),
  availabilityRange: z.object({
    from: z.date({
      required_error: "Start date is required",
    }),
    to: z.date({
      required_error: "End date is required",
    }),
  }),
});

const ListVehiclePage = () => {
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setMonth(new Date().getMonth() + 1))
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "",
      year: new Date().getFullYear(),
      description: "",
      seats: 5,
      doors: 4,
      pricePerDay: 3500,
      location: "",
      licensePlate: "",
      availabilityRange: {
        from: new Date(),
        to: new Date(new Date().setMonth(new Date().getMonth() + 1))
      },
    },
  });

  // Update the form value when dateRange changes
  React.useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      form.setValue("availabilityRange", {
        from: dateRange.from,
        to: dateRange.to
      });
    }
  }, [dateRange, form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviewImages: string[] = [];
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          newPreviewImages.push(reader.result.toString());
          if (newPreviewImages.length === files.length) {
            setPreviewImages(prev => [...prev, ...newPreviewImages]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form data:", data);
    console.log("Images:", previewImages);
    
    toast({
      title: "Vehicle listing submitted",
      description: "Your vehicle has been listed successfully!",
    });
    
    // Navigate to vehicles page after submission
    setTimeout(() => {
      navigate('/vehicles');
    }, 2000);
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">List Your Vehicle</h1>
            <p className="text-muted-foreground">
              Rent out your vehicle when you're not using it and earn extra income
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Car className="mr-2 h-5 w-5" />
                  Vehicle Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Model */}
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Camry, Civic" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the model of your vehicle
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Year */}
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input type="number" min={1990} max={new Date().getFullYear() + 1} {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the manufacturing year
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Seats */}
                  <FormField
                    control={form.control}
                    name="seats"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Seats</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} max={15} {...field} />
                        </FormControl>
                        <FormDescription>
                          How many seats does your vehicle have?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Doors */}
                  <FormField
                    control={form.control}
                    name="doors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Doors</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} max={6} {...field} />
                        </FormControl>
                        <FormDescription>
                          How many doors does your vehicle have?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator className="my-6" />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your vehicle, including special features, condition, etc." 
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a detailed description of your vehicle
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <ImagePlus className="mr-2 h-5 w-5" />
                  Vehicle Images
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Upload Images</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG or WEBP (MAX. 5MB each)
                        </p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        multiple 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>

                {previewImages.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Uploaded Images</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {previewImages.map((image, index) => (
                        <div key={index} className="relative">
                          <AspectRatio ratio={4/3} className="bg-muted rounded-md overflow-hidden">
                            <img 
                              src={image} 
                              alt={`Vehicle preview ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                          </AspectRatio>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold mb-4">Rental Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price per day */}
                  <FormField
                    control={form.control}
                    name="pricePerDay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per Day (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" min={500} {...field} />
                        </FormControl>
                        <FormDescription>
                          Set your daily rental price
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Mumbai, Delhi" {...field} />
                        </FormControl>
                        <FormDescription>
                          Where is your vehicle located?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* License Plate */}
                  <FormField
                    control={form.control}
                    name="licensePlate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Plate</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., MH01AB1234" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter your vehicle's license plate number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormLabel>Availability</FormLabel>
                  <FormDescription className="mb-2">
                    Select the date range when your vehicle will be available for rent
                  </FormDescription>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                      <span className="text-sm">
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, yyyy")} -{" "}
                              {format(dateRange.to, "LLL dd, yyyy")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, yyyy")
                          )
                        ) : (
                          "Select date range"
                        )}
                      </span>
                    </div>
                    <Calendar
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={{ before: new Date() }}
                      className="p-0 pointer-events-auto"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate('/vehicles')}>
                  Cancel
                </Button>
                <Button type="submit">List Vehicle</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default ListVehiclePage;
