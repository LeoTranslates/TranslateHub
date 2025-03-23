import { create } from 'zustand';
import { fine } from '@/lib/fine';

export type DocumentType = {
  id: string;
  name: {
    en: string;
    fr: string;
    ka: string;
  };
  basePrice: number;
};

export type DeliveryMethod = 'online' | 'postal' | 'pickup';
export type UrgencyLevel = 'standard' | 'urgent';

export type Order = {
  id?: string;
  userId: string;
  documentTypeId: string;
  documentType?: DocumentType;
  urgency: UrgencyLevel;
  deliveryMethod: DeliveryMethod;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalPrice: number;
  documentUrl?: string;
  translatedDocumentUrl?: string;
  createdAt: string;
  updatedAt?: string;
};

type DocumentServiceStore = {
  documentTypes: DocumentType[];
  isLoading: boolean;
  error: string | null;
  selectedType: DocumentType | null;
  urgency: UrgencyLevel;
  deliveryMethod: DeliveryMethod;
  documentFile: File | null;
  totalPrice: number;
  fetchDocumentTypes: () => Promise<void>;
  setSelectedType: (type: DocumentType | null) => void;
  setUrgency: (urgency: UrgencyLevel) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  setDocumentFile: (file: File | null) => void;
  calculatePrice: () => number;
  submitOrder: (userId: string) => Promise<Order | null>;
  reset: () => void;
};

export const useDocumentService = create<DocumentServiceStore>((set, get) => ({
  documentTypes: [],
  isLoading: false,
  error: null,
  selectedType: null,
  urgency: 'standard',
  deliveryMethod: 'online',
  documentFile: null,
  totalPrice: 0,
  
  fetchDocumentTypes: async () => {
    set({ isLoading: true, error: null });
    try {
      const types = await fine.db.getDocumentTypes();
      set({ documentTypes: types, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch document types", isLoading: false });
    }
  },
  
  setSelectedType: (type) => {
    set({ selectedType: type });
    set({ totalPrice: get().calculatePrice() });
  },
  
  setUrgency: (urgency) => {
    set({ urgency });
    set({ totalPrice: get().calculatePrice() });
  },
  
  setDeliveryMethod: (method) => {
    set({ deliveryMethod: method });
    set({ totalPrice: get().calculatePrice() });
  },
  
  setDocumentFile: (file) => {
    set({ documentFile: file });
  },
  
  calculatePrice: () => {
    const { selectedType, urgency, deliveryMethod } = get();
    
    if (!selectedType) return 0;
    
    let price = selectedType.basePrice;
    
    // Apply urgency multiplier
    if (urgency === 'urgent') {
      price *= 1.5; // 50% more for urgent
    }
    
    // Apply delivery method fee
    if (deliveryMethod === 'postal') {
      price += 10; // $10 for postal delivery
    } else if (deliveryMethod === 'pickup') {
      price += 5; // $5 for pickup
    }
    
    return price;
  },
  
  submitOrder: async (userId) => {
    const { selectedType, urgency, deliveryMethod, documentFile, totalPrice } = get();
    
    if (!selectedType || !documentFile) {
      set({ error: "Missing required information" });
      return null;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      // In a real app, we would upload the file to storage here
      // const documentUrl = await uploadFile(documentFile);
      
      const order: Order = {
        userId,
        documentTypeId: selectedType.id,
        documentType: selectedType,
        urgency,
        deliveryMethod,
        status: 'pending',
        totalPrice,
        documentUrl: 'mock-url-for-demo',
        createdAt: new Date().toISOString(),
      };
      
      const savedOrder = await fine.db.saveOrder(order);
      set({ isLoading: false });
      get().reset();
      return savedOrder;
    } catch (error) {
      set({ error: "Failed to submit order", isLoading: false });
      return null;
    }
  },
  
  reset: () => {
    set({
      selectedType: null,
      urgency: 'standard',
      deliveryMethod: 'online',
      documentFile: null,
      totalPrice: 0,
      error: null,
    });
  },
}));