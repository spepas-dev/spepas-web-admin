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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2, Wallet } from "lucide-react"
import { PaymentAccount } from "."
import { MultiSelect } from "@/components/ui/multi-select"
import { useEffect } from "react"

const paymentSchema = z.object({
  mode: z.enum(['WALLET', 'BANK', 'CARD'], {
    required_error: "Please select a payment mode",
  }),
  accountNumber: z.string()
    .min(1, "Account number is required")
    .regex(/^\d+$/, "Account number must contain only numbers"),
  provider: z.string().min(1, "Please select a provider"),
  User_ID: z.string().min(1, "Please select a user"),
  name: z.string().min(1, "Account holder name is required"),
})

const formSchema = z.object({
  accounts: z.array(paymentSchema).min(1, "Add at least one payment account"),
})

type FormValues = z.infer<typeof formSchema>

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (accounts: PaymentAccount[]) => void
}

// Mock data - replace with actual API data
const availableUsers = [
  { 
    value: "4298e2e3-4215-4884-9bb1-3fc7d9695e49", 
    label: "James Baako",
    icon: Wallet
  },
]

const paymentModes = [
  'WALLET',
  'BANK',
  'CARD'
]

const providers = {
  WALLET: ['MTN', 'VODAFONE', 'AIRTELTIGO'],
  BANK: ['GCB', 'ECOBANK', 'ABSA', 'FIDELITY'],
  CARD: ['VISA', 'MASTERCARD', 'AMEX']
}

export function PaymentDialog({ 
  open, 
  onOpenChange, 
  onSubmit,
}: PaymentDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accounts: [{
        mode: 'WALLET',
        accountNumber: "",
        provider: "",
        User_ID: "",
        name: "",
      }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "accounts",
  })

  useEffect(() => {
    if (!open) {
      form.reset({
        accounts: [{
          mode: 'WALLET',
          accountNumber: "",
          provider: "",
          User_ID: "",
          name: "",
        }]
      })
    }
  }, [open])

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.accounts)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#4A36EC] text-xl font-bold">Add Payment Account</DialogTitle>
          <DialogDescription className="text-gray-600">
            Register new payment accounts for users
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              {fields.map((field, index) => {
                const currentMode = form.watch(`accounts.${index}.mode`)
                
                return (
                  <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                    <FormField
                      control={form.control}
                      name={`accounts.${index}.User_ID`}
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
                      name={`accounts.${index}.mode`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Payment Mode</FormLabel>
                          <Select onValueChange={(value: 'WALLET' | 'BANK' | 'CARD') => {
                            field.onChange(value)
                            // Reset provider when mode changes
                            form.setValue(`accounts.${index}.provider`, '')
                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment mode" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {paymentModes.map((mode) => (
                                <SelectItem key={mode} value={mode}>
                                  {mode}
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
                      name={`accounts.${index}.provider`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Provider</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select provider" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {providers[currentMode as keyof typeof providers]?.map((provider) => (
                                <SelectItem key={provider} value={provider}>
                                  {provider}
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
                      name={`accounts.${index}.accountNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Account Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter account number"
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
                      name={`accounts.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Account Holder Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter account holder name"
                              className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                              {...field}
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
                )
              })}
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                className="hover:bg-gray-100"
                onClick={() => append({
                  mode: 'WALLET',
                  accountNumber: "",
                  provider: "",
                  User_ID: "",
                  name: "",
                })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another
              </Button>
              <Button 
                type="submit"
                className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
              >
                Save Accounts
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 