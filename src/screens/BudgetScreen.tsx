
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { storage } from '@/lib/storage';
import { Budget, Transaction } from '@/types';
import { toast } from 'sonner';
import { Target, AlertTriangle, CheckCircle2, ChevronLeft, TrendingUp, Wallet } from 'lucide-react';
import { format } from 'date-fns';

export default function BudgetScreen() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState('');
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const currentMonth = format(new Date(), 'yyyy-MM');

  useEffect(() => {
    const budgets = storage.getBudgets();
    const found = budgets.find(b => b.month === currentMonth);
    if (found) {
      setCurrentBudget(found);
      setLimit(found.limit.toString());
    }
    setTransactions(storage.getTransactions());
  }, [currentMonth]);

  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
    .reduce((acc, t) => acc + t.amount, 0);

  const handleSaveBudget = () => {
    if (!limit || isNaN(Number(limit))) {
      toast.error('Please enter a valid amount');
      return;
    }

    const newBudget: Budget = {
      id: currentBudget?.id || crypto.randomUUID(),
      month: currentMonth,
      limit: Number(limit)
    };

    storage.saveBudget(newBudget);
    setCurrentBudget(newBudget);
    toast.success('Budget updated successfully');
  };

  const progress = currentBudget ? (monthlyExpenses / currentBudget.limit) * 100 : 0;
  const remaining = currentBudget ? currentBudget.limit - monthlyExpenses : 0;

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
        <h1 className="text-2xl font-bold text-white">Monthly Budget</h1>
      </header>

      <main className="px-6 -mt-16 space-y-6">
        {/* Set Budget Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6 border border-white/50 dark:border-slate-800/50">
          <div className="flex items-center gap-3 text-[#5D5FEF]">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
              <Target size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Set Monthly Limit</h2>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</div>
              <Input
                type="number"
                placeholder="0.00"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="h-16 pl-10 pr-6 rounded-3xl border-none bg-slate-50 dark:bg-slate-800 text-xl font-bold shadow-inner"
              />
            </div>
            <Button 
              onClick={handleSaveBudget}
              className="w-full h-16 rounded-full bg-[#5D5FEF] hover:bg-[#4d4fcf] text-xl font-bold shadow-[0_8px_25px_rgba(93,95,239,0.25)] transition-all active:scale-95"
            >
              Update Budget
            </Button>
          </div>
        </div>

        {/* Progress Card */}
        {currentBudget && (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6 border border-white/50 dark:border-slate-800/50">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Monthly Spending</p>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-white">₹{monthlyExpenses.toFixed(1)}</h3>
              </div>
              <div className="text-right space-y-1">
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Remaining</p>
                <p className={cn(
                  "text-xl font-bold",
                  remaining < 0 ? "text-red-500" : "text-green-500"
                )}>
                  ₹{remaining.toFixed(1)}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-600 dark:text-slate-400">{progress.toFixed(1)}% used</span>
                <span className="text-slate-400">Limit: ₹{currentBudget.limit}</span>
              </div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-50 dark:border-slate-700 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  className={cn(
                    "h-full transition-all duration-500 rounded-full",
                    progress > 90 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" : progress > 70 ? "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]" : "bg-[#5D5FEF] shadow-[0_0_10px_rgba(93,95,239,0.3)]"
                  )}
                />
              </div>
            </div>

            <div className={cn(
              "flex items-center gap-3 p-4 rounded-2xl border",
              progress > 100 
                ? "bg-red-50 border-red-100 text-red-600" 
                : progress > 80 
                  ? "bg-yellow-50 border-yellow-100 text-yellow-600"
                  : "bg-green-50 border-green-100 text-green-600"
            )}>
              {progress > 100 ? (
                <>
                  <AlertTriangle size={20} />
                  <p className="text-sm font-bold">Limit Exceeded!</p>
                </>
              ) : progress > 80 ? (
                <>
                  <AlertTriangle size={20} />
                  <p className="text-sm font-bold">Approaching Limit</p>
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  <p className="text-sm font-bold">Within Budget</p>
                </>
              )}
            </div>
          </div>
        )}

        {!currentBudget && (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <TrendingUp size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500 font-medium">No budget set for this month</p>
          </div>
        )}
      </main>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

