
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { storage } from '@/lib/storage';
import { useTheme } from '@/components/ThemeProvider';
import { 
  ChevronLeft, 
  LogOut, 
  Settings, 
  Moon,
  Sun
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [profile] = useState(storage.getProfile());

  const handleLogout = () => {
    storage.setAuthenticated(false);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const firstInitial = profile.name ? profile.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-slate-950 pb-24">
      <header className="bg-[#5D5FEF] p-6 pt-12 pb-24 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20 rounded-xl transition-all active:scale-90"
          onClick={() => navigate('/home')}
        >
          <ChevronLeft size={24} />
        </Button>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
      </header>

      <main className="px-6 -mt-16 space-y-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-[#5D5FEF]/10 flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-lg">
            <span className="text-4xl font-bold text-[#5D5FEF]">{firstInitial}</span>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{profile.name}</h2>
            <p className="text-slate-500 font-medium">vsjani79@gmail.com</p>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-[#5D5FEF]">
              {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
            </div>
            <span className="text-lg font-bold text-slate-700 dark:text-slate-200">Dark Mode</span>
          </div>
          <Switch 
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            className="data-[state=checked]:bg-[#5D5FEF] scale-110"
          />
        </div>

        {/* Settings Link */}
        <button
          onClick={() => navigate('/settings')}
          className="w-full bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500">
              <Settings size={24} />
            </div>
            <span className="text-lg font-bold text-slate-700 dark:text-slate-200">Settings</span>
          </div>
          <ChevronLeft size={24} className="text-slate-300 rotate-180" />
        </button>

        {/* Logout Button */}
        <Button 
          onClick={handleLogout}
          variant="ghost"
          className="w-full h-16 rounded-3xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 font-bold text-xl transition-all active:scale-95 mt-4"
        >
          <LogOut size={24} className="mr-3" />
          Logout
        </Button>
      </main>
    </div>
  );
}


