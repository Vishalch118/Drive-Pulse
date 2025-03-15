
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

const SearchBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create query params
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (dateRange?.from) params.append('from', dateRange.from.toISOString());
    if (dateRange?.to) params.append('to', dateRange.to.toISOString());
    
    // Navigate to search results page
    navigate(`/vehicles?${params.toString()}`);
  };

  return (
    <div className="w-full bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-stretch gap-4">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Where do you need a car?"
            className="pl-10 h-12"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left h-12 min-w-64",
                !dateRange?.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-5 w-5" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                "Select dates"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        
        <Button type="submit" className="h-12 px-6">
          <Search className="mr-2 h-5 w-5" />
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
