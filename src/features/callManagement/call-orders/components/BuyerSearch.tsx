import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Phone, Search, ShoppingBag, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useBuyerSearch } from '../hooks/useCallOrders';
import { CallOrderBuyer, OrderFormData } from '../types/call-orders.types';
import BuyerConfirmation from './BuyerConfirmation';
import OrderDetails from './OrderDetails';
import OrderSummary from './OrderSummary';
import StepIndicator from './StepIndicator';

const phoneSearchSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\+?[0-9\s\-()]+$/, 'Please enter a valid phone number')
});

type PhoneSearchForm = z.infer<typeof phoneSearchSchema>;

export default function CallOrderWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchResults, setSearchResults] = useState<CallOrderBuyer[]>([]);
  const [selectedBuyer, setSelectedBuyer] = useState<CallOrderBuyer | null>(null);
  const [orderData, setOrderData] = useState<OrderFormData | null>(null);

  const form = useForm<PhoneSearchForm>({
    resolver: zodResolver(phoneSearchSchema),
    defaultValues: {
      phoneNumber: ''
    }
  });

  const steps = [
    { id: 1, title: 'Search Buyer', description: 'Find customer by phone number' },
    { id: 2, title: 'Confirm Buyer', description: 'Verify customer details' },
    { id: 3, title: 'Order Details', description: 'Enter spare part information' },
    { id: 4, title: 'Review & Submit', description: 'Confirm and place order' }
  ];

  // Use real API for buyer search
  const { refetch: searchBuyers, isFetching: isSearching } = useBuyerSearch(form.watch('phoneNumber'), false);

  const onSearch = async () => {
    try {
      const result = await searchBuyers();
      if (result.data?.data) {
        setSearchResults(result.data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    }
  };

  const handleSelectBuyer = (buyer: CallOrderBuyer) => {
    setSelectedBuyer(buyer);
    setCurrentStep(2);
  };

  const handleBuyerConfirmed = () => {
    setCurrentStep(3);
  };

  const handleOrderDetailsComplete = (data: OrderFormData) => {
    setOrderData(data);
    setCurrentStep(4);
  };

  const handleOrderComplete = () => {
    // Reset the entire wizard
    setCurrentStep(1);
    setSelectedBuyer(null);
    setOrderData(null);
    setSearchResults([]);
    form.reset();
  };

  const handleBackToStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Step 1: Search Buyer */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#4A36EC] flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Step 1: Search Customer
            </CardTitle>
            <CardDescription>Enter the customer's phone number to find their account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSearch)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Phone Number</FormLabel>
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
                      Search Customer
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-[#10B981] mb-3">Search Results ({searchResults.length} found)</h3>
                  <div className="space-y-3">
                    {searchResults.map((buyer) => (
                      <div
                        key={buyer.id}
                        className="border rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition-colors hover:border-[#4A36EC]"
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
                </div>
              </div>
            )}

            {/* No Results */}
            {searchResults.length === 0 && form.formState.isSubmitted && !isSearching && (
              <div className="border-t pt-4">
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No Customer Found</h3>
                  <p className="text-sm text-muted-foreground">
                    No customer found with the provided phone number. Please check the number and try again.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 2: Buyer Confirmation */}
      {currentStep === 2 && selectedBuyer && (
        <BuyerConfirmation buyer={selectedBuyer} onConfirm={handleBuyerConfirmed} onBack={() => handleBackToStep(1)} />
      )}

      {/* Step 3: Order Details */}
      {currentStep === 3 && selectedBuyer && (
        <OrderDetails buyer={selectedBuyer} onComplete={handleOrderDetailsComplete} onBack={() => handleBackToStep(2)} />
      )}

      {/* Step 4: Order Summary */}
      {currentStep === 4 && selectedBuyer && orderData && (
        <OrderSummary buyer={selectedBuyer} orderData={orderData} onComplete={handleOrderComplete} onBack={() => handleBackToStep(3)} />
      )}
    </div>
  );
}
