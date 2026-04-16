
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { storage } from '@/lib/storage';
import { ChevronLeft, Wallet, Calendar, Tag, Type } from 'lucide-react';
import { toast } from 'sonner';

export default function AddIncomeScreen() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && category) {
      storage.saveTransaction({
        id: crypto.randomUUID(),
        amount: parseFloat(amount),
        category,
        note,
        date,
        type: 'income'
      });
      toast.success('Income added successfully');
      navigate('/home');
    } else {
      toast.error('Please fill in required fields');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-slate-950 pb-24">
      <header className="bg-[#5D5FEF] p-6 pt-12 pb-24 flex items-center gap-4 rounded-b-[3rem] shadow-lg">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20 rounded-xl transition-all active:scale-90"
          onClick={() => navigate('/home')}
        >
          <ChevronLeft size={24} />
        </Button>
        <h1 className="text-2xl font-bold text-white">Add Income</h1>
      </header>

      <main className="px-6 -mt-16">
        <form onSubmit={handleAdd} className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6 border border-white/50 dark:border-slate-800/50">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 px-1">Amount</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5D5FEF]">
                  <Wallet size={20} />
                </div>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-16 pl-12 pr-6 rounded-3xl border-none bg-slate-50 dark:bg-slate-800 text-lg font-bold shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 px-1">Category</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5D5FEF]">
                  <Tag size={20} />
                </div>
                <Input
                  type="text"
                  placeholder="Salary, Bonus, etc."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-16 pl-12 pr-6 rounded-3xl border-none bg-slate-50 dark:bg-slate-800 text-lg shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 px-1">Date</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5D5FEF]">
                  <Calendar size={20} />
                </div>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-16 pl-12 pr-6 rounded-3xl border-none bg-slate-50 dark:bg-slate-800 text-lg shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 px-1">Note (Optional)</label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-[#5D5FEF]">
                  <Type size={20} />
                </div>
                <textarea
                  placeholder="Add a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full min-h-32 pl-12 pr-6 py-4 rounded-3xl border-none bg-slate-50 dark:bg-slate-800 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/20 shadow-inner"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-16 rounded-full bg-green-500 hover:bg-green-600 text-xl font-bold shadow-[0_8px_25px_rgba(34,197,94,0.25)] transition-all active:scale-95">
            Save Income
          </Button>
        </form>
      </main>
    </div>
  );
}

