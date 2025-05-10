import { create } from 'zustand';
import { Order } from '@/hooks/use-document-service';
import { Appointment } from '@/hooks/use-appointments';

type OrdersStore = {
  orders: Order[];
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  
  // Mock data for demo purposes
  fetchUserOrders: (userId: string) => void;
  fetchUserAppointments: (userId: string) => void;
  fetchAllOrders: () => void;
  fetchAllAppointments: () => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateAppointmentStatus: (appointmentId: string, status: Appointment['status']) => void;
  addOrder: (order: Order) => void;
  addAppointment: (appointment: Appointment) => void;
};

// Mock data
const mockOrders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    documentTypeId: '1',
    documentType: {
      id: '1',
      name: {
        en: 'Birth Certificate',
        fr: 'Certificat de naissance',
        ka: 'დაბადების მოწმობა'
      },
      basePrice: 25
    },
    urgency: 'standard',
    deliveryMethod: 'online',
    status: 'completed',
    totalPrice: 25,
    documentUrls: ['mock-url-1'],
    translatedDocumentUrls: ['mock-translated-url-1'],
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-16T14:20:00Z'
  },
  {
    id: 'order-2',
    userId: 'user-1',
    documentTypeId: '3',
    documentType: {
      id: '3',
      name: {
        en: 'Diploma',
        fr: 'Diplôme',
        ka: 'დიპლომი'
      },
      basePrice: 35
    },
    urgency: 'urgent',
    deliveryMethod: 'postal',
    status: 'processing',
    totalPrice: 115, // (35 * 1.5 * 2) + 10
    documentUrls: ['mock-url-2-1', 'mock-url-2-2'],
    createdAt: '2023-03-20T09:15:00Z',
    updatedAt: '2023-03-20T11:45:00Z'
  }
];

const mockAppointments: Appointment[] = [
  {
    id: 'appointment-1',
    userId: 'user-1',
    date: '2023-04-10T00:00:00Z',
    timeSlot: '10:00',
    status: 'confirmed',
    locationType: 'office',
    location: {
      id: '1',
      name: 'Downtown Office',
      address: '123 Main St, City Center'
    },
    createdAt: '2023-04-01T14:30:00Z'
  },
  {
    id: 'appointment-2',
    userId: 'user-1',
    date: '2023-05-15T00:00:00Z',
    timeSlot: '14:00',
    status: 'pending',
    locationType: 'custom',
    customAddress: '789 Client St, Apartment 4B',
    message: 'Please bring Georgian-English dictionary',
    createdAt: '2023-05-05T11:20:00Z'
  }
];

export const useOrders = create<OrdersStore>((set, get) => ({
  orders: [],
  appointments: [],
  isLoading: false,
  error: null,
  
  fetchUserOrders: (userId) => {
    set({ isLoading: true });
    
    // Mock API call
    setTimeout(() => {
      const userOrders = mockOrders.filter(order => order.userId === userId);
      set({ orders: userOrders, isLoading: false });
    }, 500);
  },
  
  fetchUserAppointments: (userId) => {
    set({ isLoading: true });
    
    // Mock API call
    setTimeout(() => {
      const userAppointments = mockAppointments.filter(appointment => appointment.userId === userId);
      set({ appointments: userAppointments, isLoading: false });
    }, 500);
  },
  
  fetchAllOrders: () => {
    set({ isLoading: true });
    
    // Mock API call
    setTimeout(() => {
      set({ orders: mockOrders, isLoading: false });
    }, 500);
  },
  
  fetchAllAppointments: () => {
    set({ isLoading: true });
    
    // Mock API call
    setTimeout(() => {
      set({ appointments: mockAppointments, isLoading: false });
    }, 500);
  },
  
  updateOrderStatus: (orderId, status) => {
    set(state => ({
      orders: state.orders.map(order => 
        order.id === orderId 
          ? { ...order, status, updatedAt: new Date().toISOString() } 
          : order
      )
    }));
  },
  
  updateAppointmentStatus: (appointmentId, status) => {
    set(state => ({
      appointments: state.appointments.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status } 
          : appointment
      )
    }));
  },
  
  addOrder: (order) => {
    set(state => ({
      orders: [...state.orders, order]
    }));
  },
  
  addAppointment: (appointment) => {
    set(state => ({
      appointments: [...state.appointments, appointment]
    }));
  }
}));