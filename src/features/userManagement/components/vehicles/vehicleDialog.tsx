import { zodResolver } from '@hookform/resolvers/zod';
import { Car, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Vehicle } from '.';

const vehicleSchema = z.object({
  User_ID: z.string().min(1, 'Please select a user'),
  Deliver_ID: z.string().min(1, 'Please select a rider'),
  type: z.enum(['CAR', 'MOTORCYCLE', 'BICYCLE', 'VAN'], {
    required_error: 'Please select a vehicle type'
  }),
  model: z.string().min(1, 'Model is required'),
  color: z.string().min(1, 'Please select a color'),
  registrationNumber: z
    .string()
    .min(1, 'Registration number is required')
    .regex(/^[A-Z]{2}-\d{8}-\d{2}$/, 'Registration number format should be XX-12345678-YY')
});

const formSchema = z.object({
  vehicles: z.array(vehicleSchema).min(1, 'Add at least one vehicle')
});

type FormValues = z.infer<typeof formSchema>;

interface VehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (vehicles: Vehicle[]) => void;
}

// Mock data - replace with actual API data
const availableUsers = [
  {
    value: '8c66228b-9527-490b-a174-b15cb557100b',
    label: 'John Rider',
    icon: Car
  }
];

const availableRiders = [
  {
    value: '8731e725-2b11-4c40-a828-b8408e35fe19',
    label: 'John Delivery',
    icon: Car
  }
];

const vehicleTypes = ['CAR', 'MOTORCYCLE', 'BICYCLE', 'VAN'];

const vehicleColors = ['RED', 'BLUE', 'GREEN', 'BLACK', 'WHITE', 'SILVER', 'GRAY'];

export function VehicleDialog({ open, onOpenChange, onSubmit }: VehicleDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicles: [
        {
          User_ID: '',
          Deliver_ID: '',
          type: 'CAR',
          model: '',
          color: '',
          registrationNumber: ''
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'vehicles'
  });

  useEffect(() => {
    if (!open) {
      form.reset({
        vehicles: [
          {
            User_ID: '',
            Deliver_ID: '',
            type: 'CAR',
            model: '',
            color: '',
            registrationNumber: ''
          }
        ]
      });
    }
  }, [open]);

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.vehicles);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#4A36EC] text-xl font-bold">Register Vehicle</DialogTitle>
          <DialogDescription className="text-gray-600">Register new vehicles for delivery riders</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`vehicles.${index}.User_ID`}
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
                    name={`vehicles.${index}.Deliver_ID`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Select Rider</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={availableRiders}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            placeholder="Select a rider"
                            maxCount={1}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`vehicles.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Vehicle Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vehicleTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`vehicles.${index}.model`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Vehicle Model</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter vehicle model"
                            className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`vehicles.${index}.color`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Vehicle Color</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select vehicle color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vehicleColors.map((color) => (
                              <SelectItem key={color} value={color}>
                                {color}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`vehicles.${index}.registrationNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Registration Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="GW-12345678-18"
                            className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

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
                    User_ID: '',
                    Deliver_ID: '',
                    type: 'CAR',
                    model: '',
                    color: '',
                    registrationNumber: ''
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another
              </Button>
              <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
                Register Vehicles
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
