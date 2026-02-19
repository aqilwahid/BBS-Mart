import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, FileX, TrendingUp } from 'lucide-react';

const ProblemPage: React.FC = () => {
    const problems = [
        {
            icon: Smartphone,
            title: "Manual & Risky",
            desc: "UMKM jualan via WhatsApp, hitung manual, rawan salah input & fraud.",
            color: "text-orange-500",
            bg: "bg-orange-50"
        },
        {
            icon: FileX,
            title: "Untrackable Data",
            desc: "Transaksi tidak tercatat sistem, bank tidak bisa scoring kredit.",
            color: "text-red-500",
            bg: "bg-red-50"
        },
        {
            icon: TrendingUp,
            title: "Stagnant Growth",
            desc: "Tanpa data performa, UMKM sulit dapat modal ekspansi.",
            color: "text-slate-500",
            bg: "bg-slate-50"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-20"
            >
                <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-yellow-700 text-sm font-semibold mb-6 border border-secondary/30">
                    Solusi Belanja Modern
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                    Belanja Harian?<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-secondary drop-shadow-sm">
                        BBS Mart Aja.
                    </span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Pesan lewat WhatsApp, bayar pakai QRIS. Praktis, Cepat, dan Hemat.
                </p>
            </motion.div>

            {/* Visual Pain Points */}
            <div className="grid md:grid-cols-3 gap-8 mb-24">
                {problems.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-green-100 shadow-xl shadow-green-100/50 hover:shadow-2xl hover:shadow-yellow-100/50 hover:scale-105 hover:border-secondary transition-all duration-300"
                    >
                        <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center mb-6`}>
                            <item.icon className={`w-7 h-7 ${item.color}`} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Market Sizing Placeholder */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-slate-900 text-white p-12 text-center"
            >
                <h2 className="text-3xl font-bold mb-12">The Untapped Market</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    <div>
                        <div className="text-5xl font-bold text-primary-light mb-2">64M+</div>
                        <div className="text-slate-400">Total MSMEs in Indonesia</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold text-purple-400 mb-2">83%</div>
                        <div className="text-slate-400">Use WhatsApp for Business</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold text-pink-400 mb-2">$40B</div>
                        <div className="text-slate-400">Est. Unrecorded Volume</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProblemPage;
