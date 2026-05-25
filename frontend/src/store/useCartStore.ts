import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string; // Unique ID for cart item (product._id + variant.sku)
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    variant: {
        sku: string;
        size: number;
        color: string;
    };
}

interface CartState {
    items: CartItem[];
    sessionId: string;
    setSessionId: (id: string) => void;
    addItem: (item: Omit<CartItem, 'id'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    syncWithBackend: () => Promise<void>;
    fetchCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            sessionId: typeof window !== 'undefined' ? localStorage.getItem('sessionId') || Math.random().toString(36).substring(7) : '',
            
            setSessionId: (id) => set({ sessionId: id }),

            addItem: (item) => {
                const id = `${item.productId}-${item.variant.sku}`;
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === id);
                    if (existingItem) {
                        return {
                            items: state.items.map((i) => 
                                i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
                            )
                        };
                    }
                    return { items: [...state.items, { ...item, id }] };
                });
                get().syncWithBackend();
            },

            removeItem: (id) => {
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id)
                }));
                get().syncWithBackend();
            },

            updateQuantity: (id, quantity) => {
                set((state) => ({
                    items: state.items.map((i) => i.id === id ? { ...i, quantity } : i)
                }));
                get().syncWithBackend();
            },

            clearCart: () => {
                set({ items: [] });
                get().syncWithBackend();
            },

            fetchCart: async () => {
                const { sessionId } = get();
                const token = typeof window !== 'undefined' ? localStorage.getItem('stepper_token') : null;
                try {
                    const headers: HeadersInit = { 'Content-Type': 'application/json' };
                    if (token) {
                        headers['Authorization'] = `Bearer ${token}`;
                    }
                    const API_URL = 'http://localhost:5000/api/v1';
                    const url = token ? `${API_URL}/cart` : `${API_URL}/cart?sessionId=${sessionId}`;
                    
                    const res = await fetch(url, { headers });
                    if (res.ok) {
                        const data = await res.json();
                        set({ items: data.items || [] });
                    }
                } catch (error) {
                    console.error('Failed to fetch cart from backend:', error);
                }
            },

            syncWithBackend: async () => {
                const { items, sessionId } = get();
                const token = typeof window !== 'undefined' ? localStorage.getItem('stepper_token') : null;
                try {
                    const headers: HeadersInit = { 'Content-Type': 'application/json' };
                    if (token) {
                        headers['Authorization'] = `Bearer ${token}`;
                    }
                    const API_URL = 'http://localhost:5000/api/v1';
                    await fetch(`${API_URL}/cart`, {
                        method: 'POST',
                        headers,
                        body: JSON.stringify({ items, sessionId })
                    });
                } catch (error) {
                    console.error('Failed to sync cart with backend:', error);
                }
            }
        }),
        {
            name: 'stepper-cart',
            onRehydrateStorage: () => (state) => {
                // When storage is rehydrated, save the sessionId back to localStorage if it's there
                if (state) {
                    if (!localStorage.getItem('sessionId')) {
                        localStorage.setItem('sessionId', state.sessionId);
                    }
                    state.fetchCart();
                }
            }
        }
    )
);
