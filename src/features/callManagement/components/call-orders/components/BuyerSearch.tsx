import { zodResolver } from '@hookform/resolvers/zod';
import { Search, Phone, User, Calendar, ShoppingBag, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { CallOrderBuyer } from '../../../types/call-orders.types';
import BuyerDetails from './BuyerDetails';
import OrderPlacement from './OrderPlacement';

// Mock data for buyer search - replace with actual API call
const mockBuyers: CallOrderBuyer[] = [
  {
    id: 1,
    User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+233241234567',
    verificationStatus: 1,
    status: 1,
    user_type: 'BUYER',
    createdAt: '2025-01-15T10:30:00.000Z',
    updatedAt: '2025-04-20T14:20:00.000Z',
    totalOrders: 12,
    lastOrderDate: '2025-04-18T09:15:00.000Z'
  },
  {
    id: 2,
    User_ID: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '+233241234568',
    verificationStatus: 1,
    status: 1,
    user_type: 'BUYER',
    createdAt: '2025-02-10T08:45:00.000Z',
    updatedAt: '2025-04-19T16:30:00.000Z',
    totalOrders: 8,
    lastOrderDate: '2025-04-15T11:20:00.000Z'
  }
];

const phoneSearchSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\+?[0-9\s\-\(\)]+$/, 'Please enter a valid phone number')
});

type PhoneSearchForm = z.infer<typeof phoneSearchSchema>;

export default function BuyerSearch() {
  const [searchResults, setSearchResults] = useState<CallOrderBuyer[]>([]);
  const [selectedBuyer, setSelectedBuyer] = useState<CallOrderBuyer | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const form = useForm<PhoneSearchForm>({
    resolver: zodResolver(phoneSearchSchema),
    defaultValues: {
      phoneNumber: ''
    }
  });

  const onSearch = async (data: PhoneSearchForm) => {
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      // Mock search logic - filter buyers by phone number
      const results = mockBuyers.filter((buyer) => buyer.phoneNumber.includes(data.phoneNumber.replace(/\s|-|\(|\)/g, '')));
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const handleSelectBuyer = (buyer: CallOrderBuyer) => {
    setSelectedBuyer(buyer);
    setShowOrderForm(false);
  };

  const handlePlaceOrder = () => {
    setShowOrderForm(true);
  };

  const handleOrderComplete = () => {
    // Reset the form after successful order placement
    setSelectedBuyer(null);
    setShowOrderForm(false);
    setSearchResults([]);
    form.reset();
  };

  return (
    <div className="space-y-6">
      {/* Phone Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#4A36EC] flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Search Buyer by Phone Number
          </CardTitle>
          <CardDescription>Enter the customer's phone number to find their account and place an order</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSearch)} className="space-y-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="+233 24 123 4567" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-[#4A36EC] hover:bg-[#4A36EC]/90" disabled={isSearching}>
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search Buyer
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && !selectedBuyer && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#10B981]">Search Results ({searchResults.length} found)</CardTitle>
            <CardDescription>Select a buyer to view their details and place an order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchResults.map((buyer) => (
                <div
                  key={buyer.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleSelectBuyer(buyer)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-[#4A36EC] text-white rounded-full p-2">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{buyer.name}</h4>
                        <p className="text-xs text-muted-foreground">{buyer.phoneNumber}</p>
                        <p className="text-xs text-muted-foreground">{buyer.email}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant={buyer.verificationStatus === 1 ? 'default' : 'secondary'} className="text-xs">
                        {buyer.verificationStatus === 1 ? 'Verified' : 'Unverified'}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <ShoppingBag className="h-3 w-3 mr-1" />
                        {buyer.totalOrders || 0} orders
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {searchResults.length === 0 && form.formState.isSubmitted && !isSearching && (
        <Card>
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No Buyer Found</h3>
            <p className="text-sm text-muted-foreground">
              No buyer found with the provided phone number. Please check the number and try again.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Selected Buyer Details */}
      {selectedBuyer && !showOrderForm && (
        <BuyerDetails buyer={selectedBuyer} onPlaceOrder={handlePlaceOrder} onBack={() => setSelectedBuyer(null)} />
      )}

      {/* Order Placement Form */}
      {selectedBuyer && showOrderForm && (
        <OrderPlacement buyer={selectedBuyer} onComplete={handleOrderComplete} onBack={() => setShowOrderForm(false)} />
      )}
    </div>
  );
}
