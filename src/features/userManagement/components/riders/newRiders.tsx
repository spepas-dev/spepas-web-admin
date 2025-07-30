import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleMap, Libraries, Marker, useLoadScript } from '@react-google-maps/api';
import { Bike } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';

import { CreateRiderDTO } from '../../types/riders.types';

const riderSchema = z.object({
  licenseNumber: z.string().min(1, 'License number is required'),
  longitude: z.number(),
  latitude: z.number(),
  User_ID: z.string().min(1, 'Please select a user')
});

type FormValues = z.infer<typeof riderSchema>;

interface NewRidersProps {
  onSubmit: (rider: CreateRiderDTO) => void;
  loading?: boolean;
  selectedLocation?: { lat: number; lng: number } | null;
}

// Mock data - replace with actual API data
const availableUsers = [
  {
    value: 'user1',
    label: 'John Doe',
    icon: Bike
  },
  {
    value: 'user2',
    label: 'Jane Smith',
    icon: Bike
  }
];

const libraries: Libraries = ['places'];

export function NewRiders({ onSubmit, loading = false, selectedLocation }: NewRidersProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  const center = useMemo(() => ({ lat: 5.6037, lng: -0.187 }), []);

  const form = useForm<FormValues>({
    resolver: zodResolver(riderSchema),
    defaultValues: {
      licenseNumber: '',
      longitude: selectedLocation?.lng || center.lng,
      latitude: selectedLocation?.lat || center.lat,
      User_ID: ''
    }
  });

  const handleSubmit = (values: FormValues) => {
    const riderData: CreateRiderDTO = {
      licenseNumber: values.licenseNumber,
      User_ID: values.User_ID,
      location: {
        type: 'Point',
        coordinates: [values.longitude, values.latitude]
      }
    };
    onSubmit(riderData);
    form.reset();
  };

  if (loadError) {
    return <div>Error loading map</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="User_ID"
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
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">License Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter license number"
                        className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                        disabled={loading}
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
                      form.setValue('latitude', e.latLng.lat());
                      form.setValue('longitude', e.latLng.lng());
                    }
                  }}
                >
                  <Marker
                    position={{
                      lat: form.watch('latitude'),
                      lng: form.watch('longitude')
                    }}
                  />
                </GoogleMap>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading}>
            {loading ? 'Saving...' : 'Save Rider'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NewRiders;
