import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleMap, Libraries, Marker, useLoadScript } from '@react-google-maps/api';
import { User } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';

import { useGetUserList } from '../../api/queries/users.queries';
import { CreateMepaDTO } from '../../types/mechanics.types';

const mechanicSchema = z.object({
  shop_name: z.string().min(1, 'Shop name is required'),
  address: z.string().min(1, 'Address is required'),
  longitude: z.number(),
  latitude: z.number(),
  User_ID: z.string().min(1, 'Please select a user')
});

type FormValues = z.infer<typeof mechanicSchema>;

interface NewMechanicsProps {
  onSubmit: (mechanic: CreateMepaDTO) => void;
  loading?: boolean;
  selectedLocation?: { lat: number; lng: number } | null;
}

const libraries: Libraries = ['places'];

export function NewMechanics({ onSubmit, loading = false, selectedLocation }: NewMechanicsProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  const center = useMemo(() => ({ lat: 5.6037, lng: -0.187 }), []);

  const { data: users } = useGetUserList();
  const availableUsers = useMemo(() => users?.data.map((user) => ({ value: user.User_ID, label: user.name, icon: User })) || [], [users]);

  const form = useForm<FormValues>({
    resolver: zodResolver(mechanicSchema),
    defaultValues: {
      shop_name: '',
      address: '',
      longitude: selectedLocation?.lng || center.lng,
      latitude: selectedLocation?.lat || center.lat,
      User_ID: ''
    }
  });

  const handleSubmit = (values: FormValues) => {
    const mechanicData: CreateMepaDTO = {
      shop_name: values.shop_name,
      address: values.address,
      longitude: values.longitude,
      latitude: values.latitude,
      User_ID: values.User_ID
    };

    try {
      onSubmit(mechanicData);
    } catch (error) {
      console.error(error);
    } finally {
      form.reset();
    }
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
                name="shop_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Shop Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter shop name"
                        className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter address"
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
            {loading ? 'Saving...' : 'Save Mechanic'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NewMechanics;
