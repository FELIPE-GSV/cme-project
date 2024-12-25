"use client"
import React, { createContext, useContext, useState } from 'react';

interface AsideContextProps {
    isAsideVisible: boolean;
    toggleAside: () => void;
}

export const AsideContext = createContext<AsideContextProps>({} as any);

export const AsideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAsideVisible, setIsAsideVisible] = useState(true);

    const toggleAside = () => setIsAsideVisible(prev => !prev);

    return (
        <AsideContext.Provider value={{ isAsideVisible, toggleAside }}>
            {children}
        </AsideContext.Provider>
    );
};

export function useAside() {
    const context = useContext(AsideContext);
    if (!context) {
        throw new Error("useAside must be used within an AsideProvider");
    }
    return context;
}
