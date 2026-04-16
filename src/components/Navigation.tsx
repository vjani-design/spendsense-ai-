
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PieChart, User, Settings, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: PieChart, label: 'Budget', path: '/budget' },
    { icon: PlusCircle, label: 'Add', path: '/add-expense', primary: true },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-200",
              isActive ? "text-primary" : "text-muted-foreground",
              item.primary && "bg-primary text-primary-foreground p-3 -mt-12 rounded-full shadow-lg border-4 border-background glitch-hover"
            )}
          >
            <Icon size={item.primary ? 28 : 24} />
            {!item.primary && <span className="text-[10px] uppercase font-bold">{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
