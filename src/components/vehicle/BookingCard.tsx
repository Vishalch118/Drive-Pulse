
import { useState } from 'react';
import { Shield, Star } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface BookingCardProps {
  pricePerDay: number;
  rating: number;
}

const BookingCard = ({ pricePerDay, rating }: BookingCardProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const rentalDays = dateRange?.from && dateRange?.to 
    ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0;
  const totalPrice = rentalDays * pricePerDay;

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold">₹{pricePerDay}</p>
            <p className="text-sm text-muted-foreground">per day</p>
          </div>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
            <span>{rating}</span>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-medium mb-2">Select dates</p>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              disabled={{ before: new Date() }}
              className="p-0 pointer-events-auto border rounded-md"
            />
          </div>
        </div>
        
        {dateRange?.from && dateRange?.to && (
          <div className="space-y-4 mb-6">
            <Separator />
            <div className="flex justify-between items-center">
              <span>
                ₹{pricePerDay} x {rentalDays} days
              </span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Service fee</span>
              <span>₹{Math.round(totalPrice * 0.1)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>₹{totalPrice + Math.round(totalPrice * 0.1)}</span>
            </div>
          </div>
        )}
        
        <Button 
          className="w-full mb-4" 
          size="lg"
          disabled={!dateRange?.from || !dateRange?.to}
        >
          {dateRange?.from && dateRange?.to ? 'Book Now' : 'Select Dates to Book'}
        </Button>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>Free cancellation up to 24 hours before pickup</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
