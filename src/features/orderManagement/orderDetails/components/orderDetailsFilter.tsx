import { format } from 'date-fns';
import { CalendarIcon, FilterIcon, Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface OrderDetailsFilterProps {
  filters: {
    brand: string;
    seller: string;
    gopa: string;
    date: string;
  };
  onFilterChange: (filters: { brand: string; seller: string; gopa: string; date: string }) => void;
}

export function OrderDetailsFilter({ filters, onFilterChange }: OrderDetailsFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (field: keyof typeof filters, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setLocalFilters((prev) => ({ ...prev, date: date.toISOString() }));
    }
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const resetFilters = {
      brand: '',
      seller: '',
      gopa: '',
      date: ''
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-10 px-4 py-2">
              <FilterIcon className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  placeholder="Filter by brand"
                  value={localFilters.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seller">Seller</Label>
                <Input
                  id="seller"
                  placeholder="Filter by seller"
                  value={localFilters.seller}
                  onChange={(e) => handleInputChange('seller', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gopa">Gopa</Label>
                <Input
                  id="gopa"
                  placeholder="Filter by gopa"
                  value={localFilters.gopa}
                  onChange={(e) => handleInputChange('gopa', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {localFilters.date ? format(new Date(localFilters.date), 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={localFilters.date ? new Date(localFilters.date) : undefined}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={resetFilters}>
                  Reset
                </Button>
                <Button onClick={applyFilters}>Apply</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={localFilters.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
