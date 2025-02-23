import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, MapPin, Store } from "lucide-react"
import { Mechanic } from "."
import { MultiSelect } from "@/components/ui/multi-select"
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api"
import { useMemo, useEffect } from "react"

const mechanicSchema = z.object({
  shop_name: z.string().min(1, "Shop name is required"),
  longitude: z.number(),
  latitude: z.number(),
  address: z.string().min(1, "Address is required"),
  User_ID: z.string().min(1, "Please select a user"),
})

const formSchema = z.object({
  mechanics: z.array(mechanicSchema).min(1, "Add at least one mechanic shop"),
})

type FormValues = z.infer<typeof formSchema>

interface MechanicDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (mechanics: Mechanic[]) => void
  selectedLocation: { lat: number; lng: number } | null
}

// Mock data - replace with actual data from your API
const availableUsers = [
  { 
    value: "user1", 
    label: "John Doe",
    icon: Store
  },
  { 
    value: "user2", 
    label: "Jane Smith",
    icon: Store
  },
]

const libraries = ["places"]

export function MechanicDialog({ 
  open, 
  onOpenChange, 
  onSubmit,
  selectedLocation 
}: MechanicDialogProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries as any,
  })

  const center = useMemo(() => ({ lat: 5.6037, lng: -0.1870 }), [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mechanics: [{
        shop_name: "",
        longitude: selectedLocation?.lng || center.lng,
        latitude: selectedLocation?.lat || center.lat,
        address: "",
        User_ID: "",
      }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "mechanics",
  })

  useEffect(() => {
    if (!open) {
      form.reset({
        mechanics: [{
          shop_name: "",
          longitude: selectedLocation?.lng || center.lng,
          latitude: selectedLocation?.lat || center.lat,
          address: "",
          User_ID: "",
        }]
      })
    }
  }, [open, selectedLocation, center])

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.mechanics)
    form.reset()
  }

  if (loadError) {
    return <div>Error loading map. Please check your API key.</div>
  }

  if (!isLoaded) return <div>Loading...</div>

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#4A36EC] text-xl font-bold">Add Mechanic Shop</DialogTitle>
          <DialogDescription className="text-gray-600">
            Register new mechanic shops and their locations
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`mechanics.${index}.User_ID`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Select Mechanic</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={availableUsers}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            placeholder="Select a mechanic"
                            maxCount={1}
                            variant="default"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`mechanics.${index}.shop_name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Shop Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter shop name"
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
                    name={`mechanics.${index}.address`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter shop address"
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
                          form.setValue(`mechanics.${index}.latitude`, e.latLng.lat())
                          form.setValue(`mechanics.${index}.longitude`, e.latLng.lng())
                        }
                      }}
                    >
                      <Marker
                        position={{
                          lat: field.latitude,
                          lng: field.longitude,
                        }}
                      />
                    </GoogleMap>
                  </div>

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="hover:bg-gray-100"
                      onClick={() => remove(index)}
                    >
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
                onClick={() => append({
                  shop_name: "",
                  longitude: center.lng,
                  latitude: center.lat,
                  address: "",
                  User_ID: "",
                })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another
              </Button>
              <Button 
                type="submit"
                className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
              >
                Save Shops
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 