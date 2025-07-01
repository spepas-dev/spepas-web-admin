import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { MapPin, Plus, Store, Trash2 } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';

import { Seller } from '.';

const sellerSchema = z.object({
  storeName: z.string().min(1, 'Store name is required'),
  longitude: z.number(),
  latitude: z.number(),
  Gopa_ID: z.string().min(1, 'Please select a Gopo'),
  User_ID: z.string().min(1, 'Please select a user')
});

const formSchema = z.object({
  sellers: z.array(sellerSchema).min(1, 'Add at least one seller store')
});

type FormValues = z.infer<typeof formSchema>;

interface SellerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (sellers: Seller[]) => void;
  selectedLocation: { lat: number; lng: number } | null;
}

// Mock data - replace with actual API data
const availableGopos = [
  {
    value: '528008c6-d9fd-4590-ad84-6b9a42b84197',
    label: 'John Doe',
    icon: Store
  },
  {
    value: '628008c6-d9fd-4590-ad84-6b9a42b84198',
    label: 'Jane Smith',
    icon: Store
  }
];

const libraries = ['places'];

export function SellerDialog({ open, onOpenChange, onSubmit, selectedLocation }: SellerDialogProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries as any
  });

  const center = useMemo(() => ({ lat: 5.6037, lng: -0.187 }), []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sellers: [
        {
          storeName: '',
          longitude: selectedLocation?.lng || center.lng,
          latitude: selectedLocation?.lat || center.lat,
          Gopa_ID: '',
          User_ID: ''
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sellers'
  });

  useEffect(() => {
    if (!open) {
      form.reset({
        sellers: [
          {
            storeName: '',
            longitude: selectedLocation?.lng || center.lng,
            latitude: selectedLocation?.lat || center.lat,
            Gopa_ID: '',
            User_ID: ''
          }
        ]
      });
    }
  }, [open, selectedLocation, center]);

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.sellers);
    form.reset();
  };

  if (loadError) {
    return <div>Error loading map</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#4A36EC] text-xl font-bold">Add Seller Store</DialogTitle>
          <DialogDescription className="text-gray-600">Register new seller stores and their locations</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`sellers.${index}.Gopa_ID`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Select Gopo</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={availableGopos}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            placeholder="Select a Gopo"
                            maxCount={1}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`sellers.${index}.storeName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Store Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter store name"
                            className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div className="h-[200px] rounded-lg overflow-hidden">
                    <GoogleMap
                      zoom={13}
                      center={center}
                      mapContainerClassName="w-full h-full"
                      onClick={(e) => {
                        if (e.latLng) {
                          form.setValue(`sellers.${index}.latitude`, e.latLng.lat());
                          form.setValue(`sellers.${index}.longitude`, e.latLng.lng());
                        }
                      }}
                    >
                      <Marker
                        position={{
                          lat: field.latitude,
                          lng: field.longitude
                        }}
                      />
                    </GoogleMap>
                  </div>

                  {fields.length > 1 && (
                    <Button type="button" variant="outline" size="icon" className="hover:bg-gray-100" onClick={() => remove(index)}>
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                className="hover:bg-gray-100"
                onClick={() =>
                  append({
                    storeName: '',
                    longitude: center.lng,
                    latitude: center.lat,
                    Gopa_ID: '',
                    User_ID: ''
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another
              </Button>
              <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
                Save Stores
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
