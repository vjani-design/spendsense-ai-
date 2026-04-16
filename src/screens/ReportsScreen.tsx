
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import { Transaction } from '@/types';
import { 
  ChevronLeft, 
  Share2, 
  FileText, 
  Download,
  Mail,
  MessageSquare,
  MoreHorizontal,
  X,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function ReportsScreen() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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

  const categoryExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const mostSpentCategory = Object.entries(categoryExpenses).sort((a, b) => (b[1] as number) - (a[1] as number))[0]?.[0] || 'No Data';

  const chartData = [
    { name: 'Income', value: totalIncome, color: '#22c55e' },
    { name: 'Expense', value: totalExpense, color: '#ef4444' }
  ];

  const COLORS = ['#22c55e', '#ef4444'];

  const shareOptions = [
    { icon: Mail, label: 'Gmail', color: 'text-red-500' },
    { icon: Download, label: 'Drive', subLabel: 'Save to Drive', color: 'text-green-600' },
    { icon: MessageSquare, label: 'WhatsApp', color: 'text-green-500' },
    { icon: MoreHorizontal, label: 'More', color: 'text-slate-500' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-slate-950 pb-24">
      <header className="p-6 pt-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Reports</h1>
      </header>

      <main className="px-6 space-y-6">
        {/* Stats Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 dark:border-slate-800/50">
          <div className="space-y-4">
            <p className="text-slate-800 dark:text-slate-200 font-bold">Total Transactions: {transactions.length}</p>
            <div className="space-y-1">
              <p className="text-blue-600 font-bold">Income: ₹{totalIncome.toFixed(1)}</p>
              <p className="text-red-500 font-bold">Expense: ₹{totalExpense.toFixed(1)}</p>
              <p className="text-slate-800 dark:text-slate-200 font-bold">Balance: ₹{balance.toFixed(1)}</p>
            </div>
            <p className="text-red-500 font-bold">Most Spent: {mostSpentCategory}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <PieChartIcon size={20} className="text-[#5D5FEF]" />
            Income vs Expense
          </h2>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.some(d => d.value > 0) ? chartData : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                  {!chartData.some(d => d.value > 0) && <Cell fill="#e2e8f0" stroke="none" />}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          <Button 
            onClick={() => setIsShareModalOpen(true)}
            className="w-full h-16 rounded-full bg-[#5D5FEF] hover:bg-[#4d4fcf] text-xl font-bold shadow-[0_8px_25px_rgba(93,95,239,0.25)] transition-all active:scale-95"
          >
            Share Report
          </Button>
          
          <Button 
            onClick={() => navigate('/home')}
            className="w-full h-16 rounded-full bg-[#00BCD4] hover:bg-[#00acc1] text-xl font-bold shadow-[0_8px_25px_rgba(0,188,212,0.25)] transition-all active:scale-95 text-white"
          >
            Back
          </Button>
        </div>
      </main>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-[3rem] p-8 z-[70] shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-8" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-500">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">spendsense_report.csv</h3>
                  <p className="text-sm text-slate-500">Ready to share</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-auto rounded-full"
                  onClick={() => setIsShareModalOpen(false)}
                >
                  <X size={20} />
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-6 mb-8">
                {shareOptions.map((option, index) => (
                  <button key={index} className="flex flex-col items-center gap-2 group">
                    <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <option.icon size={28} className={option.color} />
                    </div>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{option.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-center mb-4">
                <Button variant="outline" className="rounded-full px-8 h-12 font-bold border-slate-200 dark:border-slate-800">
                  Nearby Share
                </Button>
              </div>
              
              <p className="text-center text-slate-400 text-sm font-medium">No recommended people to share with</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
