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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Shield, Users } from "lucide-react"
import { Role } from "."
import { MultiSelect } from "@/components/ui/multi-select"

const roleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  permissions: z.array(z.string()).min(1, "Select at least one permission"),
  users: z.array(z.string())
})

const formSchema = z.object({
  roles: z.array(roleSchema).min(1, "Add at least one role"),
})

type FormValues = z.infer<typeof formSchema>

interface RoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (roles: Role[]) => void
}

// Mock data - replace with actual data from your API
const availablePermissions = [
  { 
    value: "view_dashboard", 
    label: "View Dashboard",
    icon: Shield
  },
  { 
    value: "manage_users", 
    label: "Manage Users",
    icon: Shield
  },
  { 
    value: "manage_inventory", 
    label: "Manage Inventory",
    icon: Shield
  },
  { 
    value: "generate_reports", 
    label: "Generate Reports",
    icon: Shield
  },
]

const availableUsers = [
  { 
    value: "user1", 
    label: "John Doe",
    icon: Users
  },
  { 
    value: "user2", 
    label: "Jane Smith",
    icon: Users
  },
  { 
    value: "user3", 
    label: "Bob Johnson",
    icon: Users
  },
]

export function RoleDialog({ open, onOpenChange, onSubmit }: RoleDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: [{ name: "", description: "", permissions: [], users: [] }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "roles",
  })

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.roles)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#4A36EC] text-xl font-bold">Add Roles</DialogTitle>
          <DialogDescription className="text-gray-600">
            Create new roles and assign permissions
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
                      name={`roles.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Role Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter role name"
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
                      name={`roles.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter role description"
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
                      name={`roles.${index}.permissions`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Permissions</FormLabel>
                          <FormControl>
                            <MultiSelect
                              options={availablePermissions}
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Select permissions"
                              maxCount={2}
                              animation={0.3}
                              variant="secondary"
                              modalPopover={true}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`roles.${index}.users`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Assign Users</FormLabel>
                          <FormControl>
                            <MultiSelect
                              options={availableUsers}
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Select users"
                              maxCount={3}
                              animation={0.3}
                              variant="default"
                              modalPopover={true}
                            />
                          </FormControl>
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
                onClick={() => append({ name: "", description: "", permissions: [], users: [] })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another
              </Button>
              <Button 
                type="submit"
                className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
              >
                Save Roles
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 