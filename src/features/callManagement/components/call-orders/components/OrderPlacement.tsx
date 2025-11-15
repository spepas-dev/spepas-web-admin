import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Car, CheckCircle, Clock, Package, Phone, Smartphone, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

import { CallOrderBuyer, Manufacturer, CarBrand, CarModel, Category } from '../../../types/call-orders.types';

// Mock data - replace with actual API calls
const mockManufacturers: Manufacturer[] = [
  { id: 1, Manufacturer_ID: 'man1', name: 'Toyota', country: 'Japan', status: 1, createdAt: '2025-01-01' },
  { id: 2, Manufacturer_ID: 'man2', name: 'Honda', country: 'Japan', status: 1, createdAt: '2025-01-01' },
  { id: 3, Manufacturer_ID: 'man3', name: 'Ford', country: 'USA', status: 1, createdAt: '2025-01-01' }
];

const mockCarBrands: CarBrand[] = [
  {
    id: 1,
    CarBrand_ID: 'brand1',
    name: 'Camry',
    status: 1,
    manufacturer_ID: 'man1',
    createdAt: '2025-01-01',
    type: 'CAR',
    manufacturer: mockManufacturers[0]
  },
  {
    id: 2,
    CarBrand_ID: 'brand2',
    name: 'Accord',
    status: 1,
    manufacturer_ID: 'man2',
    createdAt: '2025-01-01',
    type: 'CAR',
    manufacturer: mockManufacturers[1]
  },
  {
    id: 3,
    CarBrand_ID: 'brand3',
    name: 'F-150',
    status: 1,
    manufacturer_ID: 'man3',
    createdAt: '2025-01-01',
    type: 'TRUCK',
    manufacturer: mockManufacturers[2]
  }
];

const mockCarModels: CarModel[] = [
  {
    id: 1,
    CarModel_ID: 'model1',
    name: 'Camry LE',
    yearOfMake: 2020,
    carBrand_ID: 'brand1',
    status: 1,
    createdAt: '2025-01-01',
    carBrand: mockCarBrands[0]
  },
  {
    id: 2,
    CarModel_ID: 'model2',
    name: 'Camry XLE',
    yearOfMake: 2021,
    carBrand_ID: 'brand1',
    status: 1,
    createdAt: '2025-01-01',
    carBrand: mockCarBrands[0]
  },
  {
    id: 3,
    CarModel_ID: 'model3',
    name: 'Accord LX',
    yearOfMake: 2020,
    carBrand_ID: 'brand2',
    status: 1,
    createdAt: '2025-01-01',
    carBrand: mockCarBrands[1]
  }
];

const mockCategories: Category[] = [
  { id: 1, Category_ID: 'cat1', name: 'Engine Parts', description: 'Engine components and parts', status: 1, createdAt: '2025-01-01' },
  {
    id: 2,
    Category_ID: 'cat2',
    name: 'Braking System',
    description: 'Brake pads, discs, and components',
    status: 1,
    createdAt: '2025-01-01'
  },
  { id: 3, Category_ID: 'cat3', name: 'Electrical', description: 'Electrical components and wiring', status: 1, createdAt: '2025-01-01' },
  { id: 4, Category_ID: 'cat4', name: 'Suspension', description: 'Suspension and steering parts', status: 1, createdAt: '2025-01-01' }
];

const orderPlacementSchema = z.object({
  call_type: z.enum(['PHONE', 'USSD']),
  call_duration: z.string().optional(),
  sparePart: z.object({
    name: z.string().min(2, 'Part name is required'),
    category_ID: z.string().min(1, 'Category is required'),
    manufacturer_ID: z.string().min(1, 'Manufacturer is required'),
    carBrand_ID: z.string().min(1, 'Car brand is required'),
    carModel_ID: z.string().min(1, 'Car model is required'),
    yearOfMake: z.string().min(4, 'Year is required'),
    description: z.string().optional()
  }),
  quantity: z.string().min(1, 'Quantity is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  require_image: z.enum(['0', '1']),
  notes: z.string().optional()
});

type OrderPlacementForm = z.infer<typeof orderPlacementSchema>;

interface OrderPlacementProps {
  buyer: CallOrderBuyer;
  onComplete: () => void;
  onBack: () => void;
}

export default function OrderPlacement({ buyer, onComplete, onBack }: OrderPlacementProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState<CarBrand[]>([]);
  const [filteredModels, setFilteredModels] = useState<CarModel[]>([]);

  const form = useForm<OrderPlacementForm>({
    resolver: zodResolver(orderPlacementSchema),
    defaultValues: {
      call_type: 'PHONE',
      call_duration: '',
      sparePart: {
        name: '',
        category_ID: '',
        manufacturer_ID: '',
        carBrand_ID: '',
        carModel_ID: '',
        yearOfMake: '',
        description: ''
      },
      quantity: '1',
      priority: 'MEDIUM',
      require_image: '0',
      notes: ''
    }
  });

  const watchedManufacturer = form.watch('sparePart.manufacturer_ID');
  const watchedBrand = form.watch('sparePart.carBrand_ID');

  useEffect(() => {
    if (watchedManufacturer) {
      const brands = mockCarBrands.filter((brand) => brand.manufacturer_ID === watchedManufacturer);
      setFilteredBrands(brands);
      form.setValue('sparePart.carBrand_ID', '');
      form.setValue('sparePart.carModel_ID', '');
    }
  }, [watchedManufacturer, form]);

  useEffect(() => {
    if (watchedBrand) {
      const models = mockCarModels.filter((model) => model.carBrand_ID === watchedBrand);
      setFilteredModels(models);
      form.setValue('sparePart.carModel_ID', '');
    }
  }, [watchedBrand, form]);

  const onSubmit = async (data: OrderPlacementForm) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Order placement data:', {
        buyer_ID: buyer.User_ID,
        admin_ID: 'current-admin-id', // Get from auth context
        ...data,
        sparePart: {
          ...data.sparePart,
          yearOfMake: parseInt(data.sparePart.yearOfMake)
        },
        quantity: parseInt(data.quantity),
        require_image: parseInt(data.require_image),
        call_duration: data.call_duration ? parseInt(data.call_duration) : undefined
      });

      toast.success('Order placed successfully!');
      setIsSubmitting(false);
      onComplete();
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="border-[#6B7280] text-[#6B7280] hover:bg-[#6B7280] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div>
              <CardTitle className="text-lg font-semibold text-[#4A36EC] flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Place Order for {buyer.name}
              </CardTitle>
              <CardDescription>Fill in the spare part details to place an order on behalf of the customer</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            Phone: {buyer.phoneNumber}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Call Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="call_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Call Type</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="PHONE" id="phone" />
                          <Label htmlFor="phone" className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            Phone Call
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="USSD" id="ussd" />
                          <Label htmlFor="ussd" className="flex items-center">
                            <Smartphone className="h-4 w-4 mr-1" />
                            USSD
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="call_duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Call Duration (minutes)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="number" placeholder="5" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Spare Part Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-[#4A36EC] border-b pb-2 flex items-center">
                <Car className="h-4 w-4 mr-2" />
                Spare Part Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sparePart.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Part Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Brake Pad Set" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sparePart.category_ID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockCategories.map((category) => (
                            <SelectItem key={category.id} value={category.Category_ID}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sparePart.manufacturer_ID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select manufacturer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockManufacturers.map((manufacturer) => (
                            <SelectItem key={manufacturer.id} value={manufacturer.Manufacturer_ID}>
                              {manufacturer.name} ({manufacturer.country})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sparePart.carBrand_ID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Brand</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select car brand" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredBrands.map((brand) => (
                            <SelectItem key={brand.id} value={brand.CarBrand_ID}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sparePart.carModel_ID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Model</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select car model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredModels.map((model) => (
                            <SelectItem key={model.id} value={model.CarModel_ID}>
                              {model.name} ({model.yearOfMake})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sparePart.yearOfMake"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of Make</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2020" min="1990" max="2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="sparePart.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Part Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Additional details about the spare part..." className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-[#4A36EC] border-b pb-2 flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Order Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="LOW">Low</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HIGH">High</SelectItem>
                          <SelectItem value="URGENT">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="require_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Require Image</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Image required?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">No</SelectItem>
                          <SelectItem value="1">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any additional notes or special instructions..." className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={isSubmitting}
                className="border-[#6B7280] text-[#6B7280] hover:bg-[#6B7280] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-[#10B981] hover:bg-[#10B981]/90">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Placing Order...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Place Order
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
