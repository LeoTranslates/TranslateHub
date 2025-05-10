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
  documentUrls?: string[];
  translatedDocumentUrls?: string[];
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
  documentFiles: File[];
  totalPrice: number;
  fetchDocumentTypes: () => Promise<void>;
  setSelectedType: (type: DocumentType | null) => void;
  setUrgency: (urgency: UrgencyLevel) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  setDocumentFiles: (files: File[]) => void;
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
  documentFiles: [],
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
  
  setDocumentFiles: (files) => {
    set({ documentFiles: files });
    set({ totalPrice: get().calculatePrice() });
  },
  
  calculatePrice: () => {
    const { selectedType, urgency, deliveryMethod, documentFiles } = get();
    
    if (!selectedType) return 0;
    
    // Base price per document
    let pricePerDocument = selectedType.basePrice;
    
    // Apply urgency multiplier
    if (urgency === 'urgent') {
      pricePerDocument *= 1.5; // 50% more for urgent
    }
    
    // Calculate total for all documents
    let totalDocumentsPrice = pricePerDocument * Math.max(1, documentFiles.length);
    
    // Apply delivery method fee (only once, not per document)
    if (deliveryMethod === 'postal') {
      totalDocumentsPrice += 10; // $10 for postal delivery
    } else if (deliveryMethod === 'pickup') {
      totalDocumentsPrice += 5; // $5 for pickup
    }
    
    return totalDocumentsPrice;
  },
  
  submitOrder: async (userId) => {
    const { selectedType, urgency, deliveryMethod, documentFiles, totalPrice } = get();
    
    if (!selectedType || documentFiles.length === 0) {
      set({ error: "Missing required information" });
      return null;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      // In a real app, we would upload the files to storage here
      // const documentUrls = await Promise.all(documentFiles.map(file => uploadFile(file)));
      
      const order: Order = {
        userId,
        documentTypeId: selectedType.id,
        documentType: selectedType,
        urgency,
        deliveryMethod,
        status: 'pending',
        totalPrice,
        documentUrls: documentFiles.map((_, i) => `mock-url-for-demo-${i}`),
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
      documentFiles: [],
      totalPrice: 0,
      error: null,
    });
  },
}));