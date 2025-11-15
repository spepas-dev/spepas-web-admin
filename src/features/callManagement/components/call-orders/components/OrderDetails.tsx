import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Car, Clock, Package, Phone, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';
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
import { Switch } from '@/components/ui/switch';

import { CallOrderBuyer, CarManufacturer, CarBrand, CarModel, SparePartCategory } from '../../../types/call-orders.types';
import { OrderFormData } from './BuyerSearch';

// Mock data - replace with actual API calls
const mockManufacturers: CarManufacturer[] = [
  { id: 1, Manufacturer_ID: 'man1', name: 'Toyota', status: 1, createdAt: '2025-01-01' },
  { id: 2, Manufacturer_ID: 'man2', name: 'Honda', status: 1, createdAt: '2025-01-01' },
  { id: 3, Manufacturer_ID: 'man3', name: 'Ford', status: 1, createdAt: '2025-01-01' }
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

const mockCategories: SparePartCategory[] = [
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

const orderDetailsSchema = z.object({
  call_type: z.enum(['PHONE', 'USSD']),
  call_duration: z.string().optional(),
  sparePart: z.object({
    name: z.string().min(1, 'Spare part name is required'),
    category_ID: z.string().min(1, 'Category is required'),
    manufacturer_ID: z.string().min(1, 'Manufacturer is required'),
    carBrand_ID: z.string().min(1, 'Car brand is required'),
    carModel_ID: z.string().min(1, 'Car model is required'),
    yearOfMake: z.number().min(1990).max(2025),
    description: z.string().optional()
  }),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  require_image: z.boolean(),
  notes: z.string().optional()
});

type OrderDetailsForm = z.infer<typeof orderDetailsSchema>;

interface OrderDetailsProps {
  buyer: CallOrderBuyer;
  onComplete: (data: OrderFormData) => void;
  onBack: () => void;
}

export default function OrderDetails({ buyer, onComplete, onBack }: OrderDetailsProps) {
  const [filteredBrands, setFilteredBrands] = useState<CarBrand[]>([]);
  const [filteredModels, setFilteredModels] = useState<CarModel[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OrderDetailsForm>({
    resolver: zodResolver(orderDetailsSchema),
    defaultValues: {
      call_type: 'PHONE',
      sparePart: {
        name: '',
        category_ID: '',
        manufacturer_ID: '',
        carBrand_ID: '',
        carModel_ID: '',
        yearOfMake: 2024,
        description: ''
      },
      quantity: 1,
      priority: 'MEDIUM',
      require_image: false,
      notes: ''
    }
  });

  const watchedManufacturer = form.watch('sparePart.manufacturer_ID');
  const watchedBrand = form.watch('sparePart.carBrand_ID');

  // Filter brands based on selected manufacturer
  useEffect(() => {
    if (watchedManufacturer) {
      const brands = mockCarBrands.filter((brand) => brand.manufacturer_ID === watchedManufacturer);
      setFilteredBrands(brands);
      form.setValue('sparePart.carBrand_ID', '');
      form.setValue('sparePart.carModel_ID', '');
      setFilteredModels([]);
    }
  }, [watchedManufacturer, form]);

  // Filter models based on selected brand
  useEffect(() => {
    if (watchedBrand) {
      const models = mockCarModels.filter((model) => model.carBrand_ID === watchedBrand);
      setFilteredModels(models);
      form.setValue('sparePart.carModel_ID', '');
    }
  }, [watchedBrand, form]);

  const onSubmit = async (data: OrderDetailsForm) => {
    setIsSubmitting(true);

    // Transform the data to match OrderFormData interface
    const orderData: OrderFormData = {
      call_type: data.call_type,
      call_duration: data.call_duration ? parseInt(data.call_duration) : undefined,
      sparePart: {
        ...data.sparePart,
        yearOfMake: data.sparePart.yearOfMake
      },
      quantity: data.quantity,
      priority: data.priority,
      require_image: data.require_image ? 1 : 0,
      notes: data.notes
    };

    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete(orderData);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#4A36EC] flex items-center">
          <Package className="h-5 w-5 mr-2" />
          Step 3: Order Information
        </CardTitle>
        <CardDescription>Enter the spare part details and order information for {buyer.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Call Information */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900 border-b pb-2">Call Information</h3>

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
            </div>

            {/* Spare Part Details */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900 border-b pb-2 flex items-center">
                <Car className="h-4 w-4 mr-2" />
                Spare Part Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sparePart.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Spare Part Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Brake Pads, Oil Filter" {...field} />
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
                            <SelectItem key={category.Category_ID} value={category.Category_ID}>
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
                            <SelectItem key={manufacturer.Manufacturer_ID} value={manufacturer.Manufacturer_ID}>
                              {manufacturer.name}
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
                      <FormLabel>Car Brand/Model</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!watchedManufacturer}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select car brand" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredBrands.map((brand) => (
                            <SelectItem key={brand.CarBrand_ID} value={brand.CarBrand_ID}>
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
                      <FormLabel>Car Model Variant</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!watchedBrand}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select model variant" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredModels.map((model) => (
                            <SelectItem key={model.CarModel_ID} value={model.CarModel_ID}>
                              {model.name}
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
                        <Input
                          type="number"
                          placeholder="2020"
                          min="1990"
                          max="2025"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
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
                    <FormLabel>Additional Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any additional details about the spare part..." className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900 border-b pb-2">Order Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          min="1"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
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
                      <FormLabel>Priority Level</FormLabel>
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
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Require Image</FormLabel>
                        <div className="text-xs text-muted-foreground">Customer must provide part image</div>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
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
            <div className="flex justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="border-[#6B7280] text-[#6B7280] hover:bg-[#6B7280] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Customer
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-[#4A36EC] hover:bg-[#4A36EC]/90">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to Review
                    <ArrowRight className="h-4 w-4 ml-2" />
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
