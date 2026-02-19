import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCheck, Play, RotateCcw } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

interface Message {
    id: number;
    sender: 'customer' | 'bot' | 'umkm' | 'system';
    text?: string;
    type: 'text' | 'image' | 'qr' | 'products';
    timestamp: string;
}

const ChatInterface: React.FC = () => {
    const { paymentStatus, setPaymentStatus, resetSimulation: resetContext } = useSimulation();
    const [messages, setMessages] = useState<Message[]>([]);
    const inputValue = '';
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initial Scenario
    const startSimulation = () => {
        setMessages([
            { id: 1, sender: 'customer', text: 'Halo, saya mau pesan Keripik Singkong Pedas 2 bungkus.', type: 'text', timestamp: '10:00' }
        ]);

        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: 2,
                sender: 'bot',
                text: 'Halo! Berikut pilihan keripik yang tersedia:',
                type: 'products',
                timestamp: '10:00'
            }]);
        }, 1000);
    };

    const handleProductSelect = () => {
        setMessages(prev => [...prev,
        { id: 3, sender: 'customer', text: 'Pilih: Keripik Singkong Pedas (Level 5) - 2x', type: 'text', timestamp: '10:01' }
        ]);

        setTimeout(() => {
            setMessages(prev => [...prev,
            { id: 4, sender: 'umkm', text: '!tagih 50000', type: 'text', timestamp: '10:02' }
            ]);

            setTimeout(() => {
                setMessages(prev => [...prev,
                { id: 5, sender: 'bot', text: 'Invoice Created: INV-2024001', type: 'qr', timestamp: '10:02' }
                ]);
                setPaymentStatus('pending');
            }, 1000);
        }, 1000);
    };

    useEffect(() => {
        if (paymentStatus === 'success') {
            setMessages(prev => [...prev,
            { id: 6, sender: 'system', text: 'Pembayaran Diterima! Rp 50.000', type: 'text', timestamp: '10:05' },
            { id: 7, sender: 'bot', text: 'Kurir telah dipanggil. Estimasi: 15 menit.', type: 'text', timestamp: '10:05' }
            ]);
        }
    }, [paymentStatus]);

    const reset = () => {
        setMessages([]);
        resetContext();
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-md mx-auto bg-[#e5ddd5] rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary to-primary-light p-4 flex items-center gap-3 text-white shadow-md border-b-4 border-secondary">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-[#075e54] font-bold">
                    UMKM
                </div>
                <div>
                    <h3 className="font-semibold">Keripik Juara</h3>
                    <p className="text-xs text-green-100">Business Account</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <button onClick={reset} className="p-2 hover:bg-white/10 rounded-full" title="Reset">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]">

                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                        <button
                            onClick={startSimulation}
                            className="flex items-center gap-2 bg-primary hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg"
                        >
                            <Play className="w-4 h-4" fill="currentColor" />
                            Start Demo
                        </button>
                        <p className="mt-4 text-sm">Click to simulate customer chat</p>
                    </div>
                )}

                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-lg shadow-sm relative ${msg.sender === 'customer'
                                    ? 'bg-[#dcf8c6] rounded-tr-none'
                                    : msg.sender === 'system'
                                        ? 'bg-yellow-100 text-center w-full max-w-[90%] mx-auto'
                                        : 'bg-white rounded-tl-none'
                                    }`}
                            >
                                {/* Sender Name for Group Context */}
                                {msg.sender !== 'customer' && msg.sender !== 'system' && (
                                    <p className={`text-xs font-bold mb-1 ${msg.sender === 'bot' ? 'text-primary' : 'text-orange-600'
                                        }`}>
                                        {msg.sender === 'bot' ? '🤖 BBS Mart Bot' : '👨‍🍳 Owner'}
                                    </p>
                                )}

                                {/* Content */}
                                {msg.type === 'image' && <div className="h-32 bg-slate-200 rounded mb-2"></div>}

                                {msg.type === 'products' ? (
                                    <div className="space-y-2">
                                        <p>{msg.text}</p>
                                        <div
                                            onClick={handleProductSelect}
                                            className="bg-yellow-50/50 p-2 rounded border border-yellow-200 cursor-pointer hover:bg-yellow-50 transition-colors flex items-center gap-3"
                                        >
                                            <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center text-xl">🍟</div>
                                            <div>
                                                <p className="font-medium text-sm">Keripik Pedas Lvl 5</p>
                                                <p className="text-xs text-slate-500">Rp 25.000</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : msg.type === 'qr' ? (
                                    <div className="text-center p-2 bg-white rounded-lg">
                                        <p className="mb-2 font-medium">{msg.text}</p>
                                        <div className={`w-36 h-36 mx-auto bg-slate-900 flex items-center justify-center text-white text-xs ${paymentStatus === 'success' ? 'opacity-50' : ''}`}>
                                            {paymentStatus === 'success' ? <CheckCheck className="w-12 h-12 text-green-500" /> : 'QR CODE'}
                                        </div>
                                        <div className="mt-2 text-xs flex items-center justify-center gap-1">
                                            Status:
                                            <span className={`font-bold ${paymentStatus === 'success' ? 'text-green-600' : 'text-orange-500'}`}>
                                                {paymentStatus.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-800">{msg.text}</p>
                                )}

                                <p className="text-[10px] text-slate-500 text-right mt-1 flex items-center justify-end gap-1">
                                    {msg.timestamp}
                                    {msg.sender === 'customer' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area (Mock) */}
            <div className="bg-[#f0f2f5] p-3 flex items-center gap-2">
                <input
                    disabled
                    className="flex-1 bg-white rounded-full py-2 px-4 text-sm focus:outline-none"
                    placeholder="Type a message..."
                    value={inputValue}
                />
                <button className="p-2 bg-[#075e54] text-white rounded-full">
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ChatInterface;
