import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Brain, Database, Layers, CreditCard, BarChart } from 'lucide-react';

const SystemBlock: React.FC<{ item: any, delay: number, isCore?: boolean }> = ({ item, delay, isCore }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        className={`
      relative p-6 rounded-2xl bg-white border shadow-lg flex flex-col items-center gap-4 w-64
      ${isCore ? 'border-primary/100 shadow-primary/20 ring-4 ring-indigo-50' : 'border-slate-100 shadow-slate-200'}
    `}
    >
        <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center`}>
            <item.icon className={`w-8 h-8 ${item.color}`} />
        </div>
        <h3 className="font-bold text-slate-900">{item.title}</h3>
    </motion.div>
);

const SystemPage: React.FC = () => {
    const systems = [
        { title: 'WhatsApp Gateway', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-50', id: 'wa' },
        { title: 'AI Intent Engine', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-50', id: 'ai' },
        { title: 'Orchestration', icon: Layers, color: 'text-primary', bg: 'bg-primary-light/10', id: 'orch' },
        { title: 'UMKM Database', icon: Database, color: 'text-blue-500', bg: 'bg-blue-50', id: 'db' },
        { title: 'Payment Gateway', icon: CreditCard, color: 'text-orange-500', bg: 'bg-orange-50', id: 'pay' },
        { title: 'Analytics', icon: BarChart, color: 'text-pink-500', bg: 'bg-pink-50', id: 'ana' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">The Engine Behind The Chat</h1>
                <p className="text-lg text-slate-600">
                    How we turn unstructured chat into structured banking data.
                </p>
            </div>

            <div className="max-w-5xl mx-auto relative">
                {/* Connection Lines (SVG) - Simplified Visuals */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block" style={{ top: '50px' }}>
                    {/* WA to AI */}
                    <motion.path
                        d="M 200 100 L 500 100"
                        stroke="#cbd5e1" strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }}
                    />
                    {/* AI to Orch */}
                    <motion.path
                        d="M 500 150 L 500 250"
                        stroke="#cbd5e1" strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }}
                    />
                    {/* Orch to Others */}
                    <motion.path
                        d="M 500 250 L 200 400"
                        stroke="#cbd5e1" strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.5 }}
                    />
                    <motion.path
                        d="M 500 250 L 500 400"
                        stroke="#cbd5e1" strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.5 }}
                    />
                    <motion.path
                        d="M 500 250 L 800 400"
                        stroke="#cbd5e1" strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.5 }}
                    />
                </svg>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                    {/* Row 1 */}
                    <div className="md:col-start-1 md:col-span-1 flex justify-center">
                        <SystemBlock item={systems[0]} delay={0} />
                    </div>

                    <div className="md:col-start-2 md:col-span-1 flex justify-center">
                        <SystemBlock item={systems[1]} delay={0.2} />
                    </div>

                    <div className="md:col-start-3 md:col-span-1 flex items-center justify-center">
                        <div className="p-6 bg-slate-800 text-white rounded-xl shadow-lg">
                            <p className="font-mono text-xs mb-2">Metadata Extracted:</p>
                            <code className="text-green-400 text-xs text-left block">
                                {`{
  "intent": "buy",
  "item": "keripik",
  "qty": 2,
  "confidence": 0.98
}`}
                            </code>
                        </div>
                    </div>

                    {/* Row 2 - Center Orchestrator */}
                    <div className="md:col-start-2 md:col-span-1 flex justify-center">
                        <SystemBlock item={systems[2]} delay={0.4} isCore />
                    </div>

                    {/* Row 3 - Outputs */}
                    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <div className="flex justify-center"><SystemBlock item={systems[3]} delay={0.6} /></div>
                        <div className="flex justify-center"><SystemBlock item={systems[4]} delay={0.7} /></div>
                        <div className="flex justify-center"><SystemBlock item={systems[5]} delay={0.8} /></div>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-20 bg-primary-light/10 border border-primary-light/20 rounded-2xl p-8 max-w-3xl mx-auto text-center"
            >
                <h3 className="text-xl font-bold text-primary-dark mb-2">Single Bot as Transaction Authority</h3>
                <p className="text-primary-dark">
                    Unlike P2P transfers, BBS Mart acts as the escrow and ledger.
                    Every "deal" in chat is instantly a recorded financial event.
                </p>
            </motion.div>
        </div>
    );
};

export default SystemPage;
