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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"
import { Brand } from "../../types"

const brandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  manufacturer_ID: z.string().uuid("Invalid manufacturer ID"),
  type: z.enum(["CAR", "TRUCK", "MOTORCYCLE"], {
    required_error: "Brand type is required",
  }),
})

const formSchema = z.object({
  brands: z.array(brandSchema).min(1, "Add at least one brand"),
})

type FormValues = z.infer<typeof formSchema>

interface BrandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (brands: Brand[]) => void
}

export function BrandDialog({ open, onOpenChange, onSubmit }: BrandDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brands: [{ name: "", manufacturer_ID: "", type: "CAR" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "brands",
  })

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.brands)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#4A36EC] text-xl font-bold">Add Vehicle Brands</DialogTitle>
          <DialogDescription className="text-gray-600">
            Add one or more vehicle brands to the system
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start">
                  <div className="flex-1 space-y-4">
                    <FormField
                      control={form.control}
                      name={`brands.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Brand Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter brand name"
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
                      name={`brands.${index}.manufacturer_ID`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Manufacturer ID</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter manufacturer ID"
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
                      name={`brands.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Brand Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]">
                                <SelectValue placeholder="Select brand type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="CAR">Car</SelectItem>
                              <SelectItem value="TRUCK">Truck</SelectItem>
                              <SelectItem value="MOTORCYCLE">Motorcycle</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="mt-8 hover:bg-gray-100"
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
                onClick={() => append({ name: "", manufacturer_ID: "", type: "CAR" })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another
              </Button>
              <Button 
                type="submit"
                className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
              >
                Save Brands
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 