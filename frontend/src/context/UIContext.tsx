'use client';

import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    isAuthOpen: boolean;
    openAuth: () => void;
    closeAuth: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const openAuth = () => setIsAuthOpen(true);
    const closeAuth = () => setIsAuthOpen(false);

    return (
        <UIContext.Provider value={{ isCartOpen, openCart, closeCart, isAuthOpen, openAuth, closeAuth }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}
