import { motion } from "framer-motion"
import { ForgotPasswordForm, ForgotPasswordFormValues } from "../components/forgotPasswordForm"
import Logo from "@/assets/logo.svg?react"

export default function ForgotPasswordPage() {
  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    // Handle password reset logic here
    console.log(values)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md space-y-8 p-8 bg-card rounded-[--radius] shadow-lg"
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <Logo className="w-16 h-16" />
            <h1 className="text-3xl font-bold text-secondary">SpePas</h1>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-3xl font-bold text-foreground"
          >
            Reset Password
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-2 text-sm text-muted-foreground text-center"
          >
            Don't worry! It happens. Please enter the email address associated with your account.
          </motion.p>
        </div>

        <ForgotPasswordForm onSubmit={handleSubmit} />
      </motion.div>
    </div>
  )
}
