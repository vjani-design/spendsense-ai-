
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
  type: TransactionType;
  paymentMethod?: string;
}

export interface Budget {
  id: string;
  month: string; // YYYY-MM
  limit: number;
  category?: string;
}

export interface UserProfile {
  name: string;
  incomeRange: string;
  currency: string;
  theme: 'light' | 'dark';
}

export const CATEGORIES = {
  expense: ['Food', 'Travel', 'Shopping', 'Rent', 'Health', 'Others'],
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Others']
};
