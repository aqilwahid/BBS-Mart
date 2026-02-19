import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area
} from 'recharts';
import { LayoutDashboard, Building2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, trend, trendGood = true }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-sm text-slate-500 mb-1">{title}</p>
        <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            <span className={`text-sm font-bold ${trendGood ? 'text-green-500' : 'text-red-500'}`}>{trend}</span>
        </div>
    </div>
);

const ModelCard = ({ title, price, desc, recommended }: any) => (
    <div className={`p-8 rounded-2xl border ${recommended ? 'bg-slate-900 text-white border-slate-900 ring-4 ring-slate-100' : 'bg-white border-slate-100 text-slate-900'}`}>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className="text-3xl font-bold mb-4">{price}</div>
        <p className={`text-sm ${recommended ? 'text-slate-300' : 'text-slate-500'}`}>{desc}</p>
    </div>
);

const dataUMKM = [
    { name: 'Mon', sales: 400000 },
    { name: 'Tue', sales: 300000 },
    { name: 'Wed', sales: 600000 },
    { name: 'Thu', sales: 550000 },
    { name: 'Fri', sales: 800000 },
    { name: 'Sat', sales: 1200000 },
    { name: 'Sun', sales: 1000000 },
];

const dataBank = [
    { name: 'Jan', risk: 20, volume: 100 },
    { name: 'Feb', risk: 18, volume: 200 },
    { name: 'Mar', risk: 15, volume: 400 },
    { name: 'Apr', risk: 12, volume: 800 },
    { name: 'May', risk: 10, volume: 1500 },
];

const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'umkm' | 'bank' | 'admin'>('umkm');

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Live Insights</h1>
                        <p className="text-slate-500">Real-time data visibility for all stakeholders.</p>
                    </div>

                    <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                        {['umkm', 'bank', 'admin'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-slate-500 hover:text-primary hover:bg-slate-50'
                                    }`}
                            >
                                {tab === 'umkm' ? 'UMKM Owner' : tab === 'bank' ? 'Bank Analyst' : 'Platform God Mode'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="grid lg:grid-cols-3 gap-8 mb-20">

                    {/* Main Chart Area */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            {activeTab === 'umkm' && <><LayoutDashboard className="w-5 h-5 text-primary" /> Weekly Revenue</>}
                            {activeTab === 'bank' && <><Building2 className="w-5 h-5 text-primary" /> Portfolio Growth & Risk</>}
                            {activeTab === 'admin' && <><ShieldAlert className="w-5 h-5 text-primary" /> System Health & Fraud Check</>}
                        </h3>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                {activeTab === 'umkm' ? (
                                    <BarChart data={dataUMKM}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `Rp${val / 1000}k`} />
                                        <Tooltip formatter={(value: any) => `Rp ${Number(value).toLocaleString()}`} />
                                        <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                ) : activeTab === 'bank' ? (
                                    <AreaChart data={dataBank}>
                                        <defs>
                                            <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="volume" stroke="#8884d8" fillOpacity={1} fill="url(#colorVol)" />
                                        <Line type="monotone" dataKey="risk" stroke="#ff7300" strokeWidth={2} />
                                    </AreaChart>
                                ) : (
                                    <LineChart data={dataBank}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={3} />
                                    </LineChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="space-y-6">
                        <StatsCard title={activeTab === 'umkm' ? "Total Omzet" : "Active Loans"} value={activeTab === 'umkm' ? "Rp 4.850.000" : "$2.4M"} trend="+12%" />
                        <StatsCard title={activeTab === 'umkm' ? "Orders" : "NPL Rate"} value={activeTab === 'umkm' ? "142" : "0.4%"} trend={activeTab === 'umkm' ? "+8%" : "-2%"} trendGood={activeTab !== 'bank'} />
                        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                            <h4 className="text-slate-400 text-xs uppercase font-bold mb-4">AI Insight</h4>
                            <p className="text-sm font-medium leading-relaxed">
                                {activeTab === 'umkm'
                                    ? "Suggestion: Stock up on 'Keripik Pedas' for Friday. Demand projected to spike +40%."
                                    : activeTab === 'bank'
                                        ? "Alert: 3 UMKM clusters showing high growth. Recommended for Micro-KUR eligibility."
                                        : "System: All gateways operational. 99.98% uptime."}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Business Model */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-t border-slate-200 pt-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">Sustainable Business Model</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ModelCard title="Transaction Fee" price="1.5%" desc="Per successful transaction. Charged to UMKM." />
                        <ModelCard title="SaaS Premium" price="Rp 49k/mo" desc="For advanced analytics & broadcast features." recommended />
                        <ModelCard title="Bank API Access" price="Enterprise" desc="Scoring data access for financial institutions." />
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default DashboardPage;
