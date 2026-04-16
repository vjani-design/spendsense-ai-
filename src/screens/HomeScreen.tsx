
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { storage } from '@/lib/storage';
import { Transaction } from '@/types';
import { 
  Plus, 
  Wallet, 
  TrendingUp, 
  History, 
  PieChart as PieChartIcon, 
  BarChart as BarChartIcon,
  PlusCircle,
  ArrowUpCircle,
  Target,
  FileText
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [chartType, setChartType] = useState<'pie' | 'bar' | null>(null);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [profile] = useState(storage.getProfile());

  useEffect(() => {
    setTransactions(storage.getTransactions());
  }, []);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: any[], t) => {
      const existing = acc.find(item => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, []);

  const COLORS = ['#5D5FEF', '#64ffda', '#FF5252', '#FFD740', '#7C4DFF', '#00BCD4'];

  const fabItems = [
    { icon: PlusCircle, label: 'Add Expense', onClick: () => navigate('/add-expense'), color: 'bg-red-50 text-red-500' },
    { icon: Wallet, label: 'Add Income', onClick: () => navigate('/add-income'), color: 'bg-green-50 text-green-500' },
    { icon: Target, label: 'Set Budget', onClick: () => navigate('/budget'), color: 'bg-indigo-50 text-indigo-500' },
    { icon: FileText, label: 'Reports', onClick: () => navigate('/reports'), color: 'bg-slate-50 text-slate-500' },
  ];

  const firstInitial = profile.name ? profile.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-slate-950 pb-24">
      <header className="bg-[#5D5FEF] p-6 pt-12 pb-20 flex justify-between items-center rounded-b-[3rem] shadow-lg">
        <h1 className="text-3xl font-bold text-white tracking-tight">SpendSense</h1>
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-2xl w-12 h-12 bg-white/20 text-white hover:bg-white/30 border-none shadow-inner transition-all active:scale-90"
          onClick={() => navigate('/profile')}
        >
          <span className="text-xl font-bold">{firstInitial}</span>
        </Button>
      </header>

      <main className="px-6 -mt-10 space-y-6">
        {/* Balance Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] space-y-6 border border-white/50 dark:border-slate-800/50">
          <div className="space-y-1">
            <p className="text-slate-500 font-medium text-sm">Total Balance</p>
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight">₹{balance.toFixed(1)}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50/50 dark:bg-green-900/10 rounded-3xl p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-green-600">
                <ArrowUpCircle size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Income</span>
              </div>
              <span className="text-lg font-bold text-green-600">₹{totalIncome.toFixed(1)}</span>
            </div>
            <div className="bg-red-50/50 dark:bg-red-900/10 rounded-3xl p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-red-500">
                <PlusCircle size={16} className="rotate-45" />
                <span className="text-xs font-bold uppercase tracking-wider">Expense</span>
              </div>
              <span className="text-lg font-bold text-red-500">₹{totalExpense.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4 px-2">
          <div className="flex items-center gap-2">
            <Checkbox id="healthy" checked disabled className="rounded border-green-500 data-[state=checked]:bg-green-500" />
            <label htmlFor="healthy" className="text-slate-700 dark:text-slate-300 font-medium">Healthy finances</label>
          </div>
          
          <div className="space-y-1">
            <p className="text-slate-800 dark:text-slate-200 font-medium">Top Category: No Data</p>
            <p className="text-slate-800 dark:text-slate-200 font-medium">Budget: ₹0.0</p>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#5D5FEF] w-0" />
            </div>
            <p className="text-slate-500 text-sm">Used: 0.0%</p>
          </div>
        </div>

        {/* Analytics Toggle */}
        <div className="space-y-4">
          <Button 
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="w-full h-14 rounded-full bg-[#5D5FEF] hover:bg-[#4d4fcf] text-lg font-medium shadow-md"
          >
            {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
          </Button>

          {showAnalytics && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="space-y-6 pt-4"
            >
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => setChartType('pie')}
                  className={cn(
                    "rounded-full px-8 h-12 font-medium transition-all",
                    chartType === 'pie' ? "bg-[#5D5FEF]" : "bg-[#5D5FEF]/80"
                  )}
                >
                  Pie Chart
                </Button>
                <Button 
                  onClick={() => setChartType('bar')}
                  className={cn(
                    "rounded-full px-8 h-12 font-medium transition-all",
                    chartType === 'bar' ? "bg-[#5D5FEF]" : "bg-[#5D5FEF]/80"
                  )}
                >
                  Bar Chart
                </Button>
              </div>

              <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                {chartType ? (
                  <div className="w-full h-full">
                     <ResponsiveContainer width="100%" height="100%">
                        {chartType === 'pie' ? (
                          <PieChart>
                            <Pie
                              data={categoryData.length > 0 ? categoryData : [{ name: 'Empty', value: 1 }]}
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                              {categoryData.length === 0 && <Cell fill="#e2e8f0" />}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        ) : (
                          <BarChart data={categoryData}>
                            <XAxis dataKey="name" hide />
                            <YAxis hide />
                            <Tooltip />
                            <Bar dataKey="value" fill="#5D5FEF" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        )}
                     </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="font-medium">Select a chart to view analytics</p>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* FAB Menu */}
      <div className="fixed bottom-10 right-8 flex flex-col items-end gap-4 z-50">
        <AnimatePresence>
          {isFabOpen && (
            <div className="flex flex-col items-end gap-4 mb-2">
              {fabItems.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ scale: 0, opacity: 0, x: 20 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ scale: 0, opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 20 }}
                  onClick={() => {
                    item.onClick();
                    setIsFabOpen(false);
                  }}
                  className="flex items-center gap-4 group"
                >
                  <span className="bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl shadow-lg text-sm font-bold text-slate-700 dark:text-slate-200">
                    {item.label}
                  </span>
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-90", item.color)}>
                    <item.icon size={28} />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>
        
        <Button 
          onClick={() => setIsFabOpen(!isFabOpen)}
          className={cn(
            "w-20 h-20 rounded-full shadow-[0_15px_35px_rgba(93,95,239,0.3)] transition-all duration-500 bg-[#5D5FEF] text-white hover:bg-[#4d4fcf] active:scale-90",
            isFabOpen && "rotate-[135deg] bg-slate-800"
          )}
        >
          <Plus size={40} strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

