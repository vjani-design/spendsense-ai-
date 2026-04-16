
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';
import { Settings, Save, Bell, Globe, Shield, ChevronLeft } from 'lucide-react';

export default function SettingsScreen() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(storage.getProfile());

  const handleSave = () => {
    storage.saveProfile(profile);
    toast.success('Settings updated successfully');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-slate-950 pb-24">
      <header className="bg-[#5D5FEF] p-6 pt-12 pb-24 flex items-center gap-4 rounded-b-[3rem] shadow-lg">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20 rounded-xl transition-all active:scale-90"
          onClick={() => navigate('/profile')}
        >
          <ChevronLeft size={24} />
        </Button>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </header>

      <main className="px-6 -mt-16 space-y-6">
        {/* Localization Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6 border border-white/50 dark:border-slate-800/50">
          <div className="flex items-center gap-3 text-[#5D5FEF]">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
              <Globe size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Localization</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 px-1">Currency Symbol</label>
              <Select 
                value={profile.currency} 
                onValueChange={(val) => setProfile({...profile, currency: val})}
              >
                <SelectTrigger className="h-16 rounded-3xl border-none bg-slate-50 dark:bg-slate-800 text-lg font-bold shadow-inner">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none shadow-xl">
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 px-1">Income Range</label>
              <Select 
                value={profile.incomeRange} 
                onValueChange={(val) => setProfile({...profile, incomeRange: val})}
              >
                <SelectTrigger className="h-16 rounded-3xl border-none bg-slate-50 dark:bg-slate-800 text-lg font-bold shadow-inner">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none shadow-xl">
                  <SelectItem value="0-50k">0 - 50,000</SelectItem>
                  <SelectItem value="50k-100k">50,000 - 100,000</SelectItem>
                  <SelectItem value="100k+">100,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6 border border-white/50 dark:border-slate-800/50">
          <div className="flex items-center gap-3 text-[#5D5FEF]">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
              <Bell size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl shadow-inner">
              <span className="font-bold text-slate-700 dark:text-slate-200">Budget Alerts</span>
              <Button variant="ghost" className="text-[#5D5FEF] font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl">Enabled</Button>
            </div>
            <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl shadow-inner">
              <span className="font-bold text-slate-700 dark:text-slate-200">Weekly Reports</span>
              <Button variant="ghost" className="text-[#5D5FEF] font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl">Enabled</Button>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleSave}
          className="w-full h-16 rounded-full bg-[#5D5FEF] hover:bg-[#4d4fcf] text-xl font-bold shadow-[0_8px_25px_rgba(93,95,239,0.25)] transition-all active:scale-95"
        >
          <Save size={24} className="mr-2" />
          Save Settings
        </Button>
      </main>
    </div>
  );
}

