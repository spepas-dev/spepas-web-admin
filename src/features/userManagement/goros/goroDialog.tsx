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
import { Plus, Trash2, Wrench } from "lucide-react"
import { Goro } from "."
import { MultiSelect } from "@/components/ui/multi-select"

const goroSchema = z.object({
  User_ID: z.string().min(1, "Please select a user"),
  Specialties: z.array(z.array(z.string())).min(1, "Add at least one specialty group"),
})

const formSchema = z.object({
  goros: z.array(goroSchema).min(1, "Add at least one mechanic"),
})

type FormValues = z.infer<typeof formSchema>

interface GoroDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (goros: Goro[]) => void
}

// Mock data - replace with actual data from your API
const availableUsers = [
  { 
    value: "user1", 
    label: "John Doe",
    icon: Wrench
  },
  { 
    value: "user2", 
    label: "Jane Smith",
    icon: Wrench
  },
]

const availableSpecialties = [
  { value: "TYRES", label: "Tyres", icon: Wrench },
  { value: "FAN_BELT", label: "Fan Belt", icon: Wrench },
  { value: "ENGINE", label: "Engine", icon: Wrench },
  { value: "BRAKES", label: "Brakes", icon: Wrench },
  { value: "TRANSMISSION", label: "Transmission", icon: Wrench },
  { value: "ELECTRICAL", label: "Electrical", icon: Wrench },
  { value: "AC_SYSTEM", label: "AC System", icon: Wrench },
  { value: "SUSPENSION", label: "Suspension", icon: Wrench },
]

export function GoroDialog({ open, onOpenChange, onSubmit }: GoroDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goros: [{ User_ID: "", Specialties: [[]] }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "goros",
  })

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.goros)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#4A36EC] text-xl font-bold">Add Mechanics</DialogTitle>
          <DialogDescription className="text-gray-600">
            Assign specialties to mechanics
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`goros.${index}.User_ID`}
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
                    name={`goros.${index}.Specialties.0`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Specialties</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={availableSpecialties}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Select specialties"
                            variant="secondary"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

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
                onClick={() => append({ User_ID: "", Specialties: [[]] })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another
              </Button>
              <Button 
                type="submit"
                className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
              >
                Save Mechanics
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 