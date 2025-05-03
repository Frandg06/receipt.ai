import { create } from 'zustand';
import { Product, Receipt as Ticket } from '../types/ticket';
import { persist } from 'zustand/middleware';

interface TicketStore {
  ticket: Ticket | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setTicket: (ticket: Ticket) => void;
  removeProduct: (productId: string) => void;
  addProduct: (product: Product) => void;
}

export const useTicketStore = create<TicketStore>()(
  persist(
    (set) => ({
      ticket: {
        nombre: '',
        total: 0,
        products: [],
      },
      loading: false,
      setLoading: (loading) => set({ loading }),
      setTicket: (ticket) => set({ ticket }),
      removeProduct: (productId) =>
        set((state) => ({
          ticket: {
            ...state.ticket!,
            products: state.ticket!.products.filter((product) => product.id !== productId),
          },
        })),
      addProduct: (product) => {
        set((state) => ({
          ticket: {
            ...state.ticket!,
            products: [...state.ticket!.products, product],
          },
        }));
      },
    }),
    {
      name: 'ticket-storage',
    }
  )
);
