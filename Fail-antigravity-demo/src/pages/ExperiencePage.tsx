import React from 'react';
import ChatInterface from '../components/ChatInterface';
import { useSimulation } from '../context/SimulationContext';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ExperiencePage: React.FC = () => {
    const { paymentStatus, setPaymentStatus } = useSimulation();

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

                {/* Left Side: Simulation Controls & Context */}
                <div className="flex-1 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl font-bold text-slate-900 mb-6">
                            Seamless Experience. <br />
                            <span className="text-primary">Zero Friction.</span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-8">
                            Experience how a chaotic manual order turns into a structured, trackable transaction in seconds.
                        </p>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                Live Control Center
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <span className="text-sm text-slate-600">Transaction Status</span>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${paymentStatus === 'success' ? 'bg-green-100 text-green-700' :
                                        paymentStatus === 'pending' ? 'bg-orange-100 text-orange-700' :
                                            'bg-slate-200 text-slate-600'
                                        }`}>
                                        {paymentStatus.toUpperCase()}
                                    </span>
                                </div>

                                <button
                                    onClick={() => setPaymentStatus('success')}
                                    disabled={paymentStatus !== 'pending'}
                                    className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${paymentStatus === 'pending'
                                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200'
                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        }`}
                                >
                                    {paymentStatus === 'success' ? (
                                        <>
                                            <CheckCircle className="w-5 h-5" /> Payment Verified
                                        </>
                                    ) : (
                                        <>
                                            Simulate Customer Payment <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-slate-400 text-center">
                                    *Click button when QR appears in chat
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Phone / Chat Interface */}
                <div className="flex-1 w-full flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full max-w-md"
                    >
                        <ChatInterface />
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default ExperiencePage;
