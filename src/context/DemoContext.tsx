import React, { createContext, ReactNode, useContext, useState } from 'react';

interface DemoContextType {
    isDemo: boolean;
    setIsDemo: (value: boolean) => void;
    demoUnreviewedCount: number;
    setDemoUnreviewedCount: (count: number) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const useDemo = () => {
    const context = useContext(DemoContext);
    if (!context) {
        throw new Error('useDemo must be used within a DemoProvider');
    }
    return context;
};

interface DemoProviderProps {
    children: ReactNode;
}

export const DemoProvider: React.FC<DemoProviderProps> = ({ children }) => {
    const [isDemo, setIsDemo] = useState(false);
    const [demoUnreviewedCount, setDemoUnreviewedCount] = useState(3);

    return (
        <DemoContext.Provider
            value={{ isDemo, setIsDemo, demoUnreviewedCount, setDemoUnreviewedCount }}
        >
            {children}
        </DemoContext.Provider>
    );
};
