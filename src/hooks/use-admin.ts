import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PaymentMethods = {
  card: boolean;
  paypal: boolean;
};

type AdminStore = {
  paymentMethods: PaymentMethods;
  togglePaymentMethod: (method: keyof PaymentMethods) => void;
};

export const useAdmin = create<AdminStore>()(
  persist(
    (set) => ({
      paymentMethods: {
        card: true,
        paypal: true,
      },
      togglePaymentMethod: (method) => {
        set((state) => ({
          paymentMethods: {
            ...state.paymentMethods,
            [method]: !state.paymentMethods[method],
          },
        }));
      },
    }),
    {
      name: 'admin-store',
    }
  )
);