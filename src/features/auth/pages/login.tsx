import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from '@/assets/logo.svg?react';
import { useAuth } from '@/hooks/use-auth';

import { LoginForm, LoginFormValues } from '../components/loginForm';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password);
      navigate(location.state?.from || '/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

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
            Welcome back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-2 text-sm text-muted-foreground"
          >
            Please sign in to your account
          </motion.p>
        </div>

        <LoginForm onSubmit={handleSubmit} />
      </motion.div>
    </div>
  );
}
