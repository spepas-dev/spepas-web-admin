import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Bike, MapPin, Plus, Trash2 } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';

import { Rider } from '.';

const riderSchema = z.object({
  licenseNumber: z
    .string()
    .min(1, 'License number is required')
    .regex(/^[A-Z]{2}-\d{6}-\d{2}$/, 'License number format should be XX-123456-YY'),
  longitude: z.number(),
  latitude: z.number(),
  User_ID: z.string().min(1, 'Please select a user')
});

const formSchema = z.object({
  riders: z.array(riderSchema).min(1, 'Add at least one rider')
});

type FormValues = z.infer<typeof formSchema>;

interface RiderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (riders: Rider[]) => void;
  selectedLocation: { lat: number; lng: number } | null;
}

// Mock data - replace with actual API data
const availableUsers = [
  {
    value: '8c66228b-9527-490b-a174-b15cb557100b',
    label: 'John Rider',
    icon: Bike
  },
  {
    value: '9c66228b-9527-490b-a174-b15cb557100c',
    label: 'Jane Rider',
    icon: Bike
  }
];

const libraries = ['places'];

export function RiderDialog({ open, onOpenChange, onSubmit, selectedLocation }: RiderDialogProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries as any
  });

  const center = useMemo(() => ({ lat: 5.6037, lng: -0.187 }), []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      riders: [
        {
          licenseNumber: '',
          longitude: selectedLocation?.lng || center.lng,
          latitude: selectedLocation?.lat || center.lat,
          User_ID: ''
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'riders'
  });

  useEffect(() => {
    if (!open) {
      form.reset({
        riders: [
          {
            licenseNumber: '',
            longitude: selectedLocation?.lng || center.lng,
            latitude: selectedLocation?.lat || center.lat,
            User_ID: ''
          }
        ]
      });
    }
  }, [open, selectedLocation, center]);

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.riders);
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
          <DialogTitle className="text-[#4A36EC] text-xl font-bold">Add Rider</DialogTitle>
          <DialogDescription className="text-gray-600">Register new delivery riders and their locations</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`riders.${index}.User_ID`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Select User</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={availableUsers}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            placeholder="Select a user"
                            maxCount={1}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`riders.${index}.licenseNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">License Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="GA-123456-24"
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
                          form.setValue(`riders.${index}.latitude`, e.latLng.lat());
                          form.setValue(`riders.${index}.longitude`, e.latLng.lng());
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
                    licenseNumber: '',
                    longitude: center.lng,
                    latitude: center.lat,
                    User_ID: ''
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another
              </Button>
              <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
                Save Riders
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
