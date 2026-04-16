
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      storage.setAuthenticated(true);
      toast.success('Welcome back!');
      navigate('/home');
    } else {
      toast.error('Please enter your credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-20 h-20 bg-[#5D5FEF] rounded-3xl flex items-center justify-center shadow-xl mb-2">
            <span className="text-4xl">👋</span>
          </div>
          <h1 className="text-4xl font-bold text-[#0a192f] dark:text-white tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Login to your account to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-16 px-6 rounded-3xl border-none shadow-[0_4px_15px_rgba(0,0,0,0.03)] bg-white dark:bg-slate-800 text-lg"
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-16 px-6 rounded-3xl border-none shadow-[0_4px_15px_rgba(0,0,0,0.03)] bg-white dark:bg-slate-800 text-lg"
            />
          </div>

          <div className="flex items-center space-x-2 px-4">
            <Checkbox 
              id="show-password" 
              checked={showPassword}
              onCheckedChange={(checked) => setShowPassword(checked as boolean)}
              className="rounded-lg border-slate-300 data-[state=checked]:bg-[#5D5FEF] data-[state=checked]:border-[#5D5FEF]"
            />
            <label
              htmlFor="show-password"
              className="text-sm font-bold text-slate-500 dark:text-slate-400 cursor-pointer"
            >
              Show Password
            </label>
          </div>

          <Button type="submit" className="w-full h-16 text-xl font-bold rounded-full bg-[#5D5FEF] hover:bg-[#4d4fcf] transition-all shadow-[0_8px_25px_rgba(93,95,239,0.25)] active:scale-95">
            Login
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-slate-500 font-medium">
            Don't have an account? <Link to="/signup" className="text-[#5D5FEF] hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

