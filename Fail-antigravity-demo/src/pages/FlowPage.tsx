import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, QrCode, Smartphone, MessageSquare, Truck, CheckCircle } from 'lucide-react';

const FlowPage: React.FC = () => {
    const steps = [
        { icon: MessageSquare, title: 'Command Trigger', desc: 'UMKM types "!tagih 50K"', actor: 'UMKM' },
        { icon: QrCode, title: 'Dynamic QR Generation', desc: 'System creates unique Payment ID', actor: 'System' },
        { icon: Smartphone, title: 'Customer Scan', desc: 'User pays via favourite E-Wallet', actor: 'Customer' },
        { icon: CheckCircle, title: 'Instant Verification', desc: 'Webhook confirms payment success', actor: 'Bank' },
        { icon: Truck, title: 'Dispatch Service', desc: 'Courier auto-assigned to location', actor: 'Logistics' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">The Trust Protocol</h1>
                    <p className="text-lg text-slate-600">Standardizing how informal transactions become formal records.</p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -z-10" />

                    <div className="space-y-12">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Icon */}
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white border-4 border-primary/10 shadow-lg flex items-center justify-center relative z-10">
                                    <step.icon className="w-8 h-8 text-primary" />
                                </div>

                                {/* Content */}
                                <div className={`bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex-1 ${idx % 2 === 0 ? 'text-left' : 'md:text-right text-left'
                                    }`}>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">{step.actor}</span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                    <p className="text-slate-600">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-6 mt-20"
                >
                    {[
                        { label: 'No Manual QR', desc: 'Prevents fraud & wrong inputs' },
                        { label: 'No Off-System Payment', desc: '100% Volume Recorded' },
                        { label: 'Full Traceability', desc: 'Audit trail for every Reg' }
                    ].map((badge, idx) => (
                        <div key={idx} className="bg-primary-dark text-white p-6 rounded-xl flex flex-col items-center text-center">
                            <ShieldCheck className="w-8 h-8 text-green-400 mb-3" />
                            <h4 className="font-bold text-lg mb-1">{badge.label}</h4>
                            <p className="text-green-100 text-sm">{badge.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default FlowPage;
