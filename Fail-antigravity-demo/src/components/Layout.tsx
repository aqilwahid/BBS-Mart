import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertCircle, MessageSquare, Cpu, Activity, BarChart3 } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Problem', icon: AlertCircle },
        { path: '/experience', label: 'Experience', icon: MessageSquare },
        { path: '/system', label: 'System', icon: Cpu },
        { path: '/flow', label: 'Flow', icon: Activity },
        { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <img src="/logo.jpeg" alt="BBS Mart" className="h-10 w-auto rounded-lg object-contain" />
                    <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">BBS Mart</span>
                </div>

                <div className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-primary-light/10 text-primary shadow-sm ring-1 ring-primary/20'
                                    : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <main className="pt-16 min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default Layout;
