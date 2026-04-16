
import { Transaction, Budget, UserProfile } from '../types';

const STORAGE_KEYS = {
  TRANSACTIONS: 'spendsense_transactions',
  BUDGETS: 'spendsense_budgets',
  PROFILE: 'spendsense_profile',
  AUTH: 'spendsense_auth'
};

export const storage = {
  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
  },
  saveTransaction: (transaction: Transaction) => {
    const transactions = storage.getTransactions();
    const index = transactions.findIndex(t => t.id === transaction.id);
    if (index > -1) {
      transactions[index] = transaction;
    } else {
      transactions.push(transaction);
    }
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },
  deleteTransaction: (id: string) => {
    const transactions = storage.getTransactions();
    const filtered = transactions.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(filtered));
  },
  getBudgets: (): Budget[] => {
    const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
    return data ? JSON.parse(data) : [];
  },
  saveBudget: (budget: Budget) => {
    const budgets = storage.getBudgets();
    const index = budgets.findIndex(b => b.month === budget.month && b.category === budget.category);
    if (index > -1) {
      budgets[index] = budget;
    } else {
      budgets.push(budget);
    }
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  },
  getProfile: (): UserProfile => {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : {
      name: 'User',
      incomeRange: '0-50k',
      currency: 'USD',
      theme: 'light'
    };
  },
  saveProfile: (profile: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },
  isAuthenticated: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  },
  setAuthenticated: (val: boolean) => {
    localStorage.setItem(STORAGE_KEYS.AUTH, val.toString());
  }
};
