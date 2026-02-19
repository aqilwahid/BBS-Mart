import { createContext, useContext, useState, type ReactNode } from 'react';

type PaymentStatus = 'idle' | 'pending' | 'success';

interface SimulationContextType {
    paymentStatus: PaymentStatus;
    setPaymentStatus: (status: PaymentStatus) => void;
    resetSimulation: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');

    const resetSimulation = () => setPaymentStatus('idle');

    return (
        <SimulationContext.Provider value={{ paymentStatus, setPaymentStatus, resetSimulation }}>
            {children}
        </SimulationContext.Provider>
    );
};

export const useSimulation = () => {
    const context = useContext(SimulationContext);
    if (!context) {
        throw new Error('useSimulation must be used within a SimulationProvider');
    }
    return context;
};
