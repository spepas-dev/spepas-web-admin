import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export type ForgotPasswordFormValues = z.infer<typeof formSchema>

interface ForgotPasswordFormProps {
  onSubmit: (values: ForgotPasswordFormValues) => void
}

export function ForgotPasswordForm({ onSubmit }: ForgotPasswordFormProps) {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Email</FormLabel>
                <FormDescription className="text-muted-foreground">
                  Enter your email address and we'll send you a link to reset your password.
                </FormDescription>
                <FormControl>
                  <Input 
                    placeholder="Enter your email" 
                    className="bg-input text-foreground placeholder:text-muted-foreground"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-secondary hover:bg-secondary-light text-secondary-foreground"
            >
              Send Reset Link
            </Button>
            <Button 
              type="button" 
              variant="outline"
              className="w-full hover:bg-muted"
              onClick={() => window.history.back()}
            >
              Back to Login
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}
