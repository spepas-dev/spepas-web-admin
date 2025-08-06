import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleMap, Libraries, Marker, useLoadScript } from '@react-google-maps/api';
import { Store, User } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';

import { useGetGopaList } from '../../api/queries/gopa.queries';
import { useGetUserList } from '../../api/queries/users.queries';
import { CreateSellerDTO } from '../../types/sellers.types';

const sellerSchema = z.object({
  storeName: z.string().min(1, 'Store name is required'),
  longitude: z.number(),
  latitude: z.number(),
  Gopa_ID: z.string().min(1, 'Please select a Gopa'),
  User_ID: z.string().min(1, 'Please select a user')
});

type FormValues = z.infer<typeof sellerSchema>;

interface NewSellersProps {
  onSubmit: (seller: CreateSellerDTO) => void;
  loading?: boolean;
  selectedLocation?: { lat: number; lng: number } | null;
}

const libraries: Libraries = ['places'];

export function NewSellers({ onSubmit, loading = false, selectedLocation }: NewSellersProps) {
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } = useGetUserList();
  const availableUsers = useMemo(() => {
    return (
      users?.data?.map((user) => ({
        value: user.User_ID,
        label: user.name
      })) || []
    );
  }, [users?.data]);

  const { data: gopas, isLoading: isLoadingGopas, isError: isErrorGopas } = useGetGopaList();
  const availableGopas = useMemo(() => {
    return (
      gopas?.data?.map((gopa) => ({
        value: gopa.Gopa_ID,
        label: gopa?.name
      })) || []
    );
  }, [gopas?.data]);

  console.log(gopas);

  console.log(availableGopas);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  const center = useMemo(() => ({ lat: 5.6037, lng: -0.187 }), []);

  const form = useForm<FormValues>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      storeName: '',
      longitude: selectedLocation?.lng || center.lng,
      latitude: selectedLocation?.lat || center.lat,
      Gopa_ID: '',
      User_ID: ''
    }
  });

  const handleSubmit = (values: FormValues) => {
    const sellerData: CreateSellerDTO = {
      storeName: values.storeName,
      Gopa_ID: values.Gopa_ID,
      Location: {
        type: 'Point',
        coordinates: [values.longitude, values.latitude]
      },
      User_ID: values.User_ID
    };
    onSubmit(sellerData);
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
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Store Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter store name"
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
                name="User_ID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Select User</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={availableUsers}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        placeholder="Select a User"
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
                name="Gopa_ID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Select Gopa</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={availableGopas}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        placeholder="Select a Gopa"
                        maxCount={1}
                        disabled={loading}
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
            {loading ? 'Saving...' : 'Save Seller'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NewSellers;
