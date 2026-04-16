
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { storage } from '@/lib/storage';
import { Transaction } from '@/types';
import { toast } from 'sonner';
import { ChevronLeft, Save, Trash2, Wallet, Calendar, Tag, Type } from 'lucide-react';

export default function EditTransactionScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const found = storage.getTransactions().find(t => t.id === id);
    if (found) {
      setTransaction(found);
    } else {
      toast.error('Transaction not found');
      navigate('/home');
    }
  }, [id, navigate]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction) return;
    
    if (!transaction.amount || isNaN(Number(transaction.amount))) {
      toast.error('Please enter a valid amount');
      return;
    }

    storage.saveTransaction(transaction);
    toast.success('Transaction updated successfully');
    navigate('/home');
  };

  const handleDelete = () => {
    if (id) {
      storage.deleteTransaction(id);
      toast.success('Transaction deleted');
      navigate('/home');
    }
  };

  if (!transaction) return null;

  const isIncome = transaction.type === 'income';

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-slate-950 pb-24">
      <header className="bg-[#5D5FEF] p-6 pt-12 pb-24 flex items-center justify-between rounded-b-[3rem] shadow-lg">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 rounded-xl transition-all active:scale-90"
            onClick={() => navigate('/home')}
          >
            <ChevronLeft size={24} />
          </Button>
          <h1 className="text-2xl font-bold text-white">Edit {isIncome ? 'Income' : 'Expense'}</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleDelete} 
          className="text-white hover:bg-red-500/20 rounded-xl transition-all active:scale-90"
        >
          <Trash2 size={24} />
        </Button>
      </header>

      <main className="px-6 -mt-16">
        <form onSubmit={handleSave} className="space-y-6">
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
                  value={transaction.amount}
                  onChange={(e) => setTransaction({...transaction, amount: Number(e.target.value)})}
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
                  placeholder="Category"
                  value={transaction.category}
                  onChange={(e) => setTransaction({...transaction, category: e.target.value})}
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
                  value={transaction.date}
                  onChange={(e) => setTransaction({...transaction, date: e.target.value})}
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
                  value={transaction.note || ''}
                  onChange={(e) => setTransaction({...transaction, note: e.target.value})}
                  className="w-full min-h-32 pl-12 pr-6 py-4 rounded-3xl border-none bg-slate-50 dark:bg-slate-800 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/20 shadow-inner"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-16 rounded-full bg-[#5D5FEF] hover:bg-[#4d4fcf] text-xl font-bold shadow-[0_8px_25px_rgba(93,95,239,0.25)] transition-all active:scale-95">
            Update Transaction
          </Button>
        </form>
      </main>
    </div>
  );
}

