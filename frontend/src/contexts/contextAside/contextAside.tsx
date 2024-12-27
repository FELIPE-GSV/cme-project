"use client"
import { User } from '@/types/models';
import React, { createContext, useContext, useState } from 'react';

interface AsideContextProps {
    isAsideVisible: boolean;
    toggleAside: () => void;
    user: User
    editUser: (user: User) => void
}

export const AsideContext = createContext<AsideContextProps>({} as AsideContextProps);

export const AsideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAsideVisible, setIsAsideVisible] = useState(true);

    const [user, setUser] = useState<User>({
        username: "",
        email: "",
        id: 0,
        is_admin: true
    })

    const editUser = (user: User) => {
        setUser(user)
    }


    const toggleAside = () => setIsAsideVisible(prev => !prev);

    return (
        <AsideContext.Provider value={{
            isAsideVisible,
            toggleAside,
            editUser,
            user
        }}
        >
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
