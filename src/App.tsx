
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import { storage } from './lib/storage';
import { motion, AnimatePresence } from 'motion/react';

// Screens (to be created)
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import AddIncomeScreen from './screens/AddIncomeScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import BudgetScreen from './screens/BudgetScreen';
import EditTransactionScreen from './screens/EditTransactionScreen';
import ReportsScreen from './screens/ReportsScreen';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!storage.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen relative overflow-hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};


export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <PageTransition>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            
            <Route path="/home" element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsScreen />
              </ProtectedRoute>
            } />
            <Route path="/add-income" element={
              <ProtectedRoute>
                <AddIncomeScreen />
              </ProtectedRoute>
            } />
            <Route path="/add-expense" element={
              <ProtectedRoute>
                <AddExpenseScreen />
              </ProtectedRoute>
            } />
            <Route path="/budget" element={
              <ProtectedRoute>
                <BudgetScreen />
              </ProtectedRoute>
            } />
            <Route path="/edit-transaction/:id" element={
              <ProtectedRoute>
                <EditTransactionScreen />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <ReportsScreen />
              </ProtectedRoute>
            } />
          </Routes>
        </PageTransition>
      </Router>
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}
