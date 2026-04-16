
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Wallet } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-slate-950">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-[#5D5FEF] rounded-3xl flex items-center justify-center shadow-2xl mb-6">
          <Wallet size={48} className="text-white" />
        </div>
        
        <h1 className="text-5xl font-bold text-[#0a192f] dark:text-white tracking-tight">
          Spend<span className="text-[#5D5FEF]">Sense</span>
        </h1>
        
        <p className="text-slate-400 font-medium mt-4 tracking-widest uppercase text-xs">
          Smart Finance Manager
        </p>
      </motion.div>
      
      <div className="absolute bottom-16 w-48 h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-full h-full bg-[#5D5FEF]"
        />
      </div>
    </div>
  );
}

