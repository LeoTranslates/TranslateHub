import { create } from 'zustand';
import { fine } from '@/lib/fine';

export type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

export type OfficeLocation = {
  id: string;
  name: string;
  address: string;
};

export type LocationType = 'office' | 'custom';

export type Appointment = {
  id?: string;
  userId: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  locationType: LocationType;
  location?: OfficeLocation;
  customAddress?: string;
  message?: string;
  createdAt: string;
};

type AppointmentsStore = {
  availableDates: Date[];
  availableTimeSlots: TimeSlot[];
  officeLocations: OfficeLocation[];
  selectedDate: Date | null;
  selectedTimeSlot: TimeSlot | null;
  locationType: LocationType;
  selectedLocation: OfficeLocation | null;
  customAddress: string;
  message: string;
  isLoading: boolean;
  error: string | null;
  
  fetchAvailableDates: () => void;
  fetchAvailableTimeSlots: (date: Date) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTimeSlot: (slot: TimeSlot | null) => void;
  setLocationType: (type: LocationType) => void;
  setSelectedLocation: (location: OfficeLocation | null) => void;
  setCustomAddress: (address: string) => void;
  setMessage: (message: string) => void;
  bookAppointment: (userId: string) => Promise<Appointment | null>;
  reset: () => void;
};

export const useAppointments = create<AppointmentsStore>((set, get) => ({
  availableDates: [],
  availableTimeSlots: [],
  officeLocations: [
    { id: '1', name: 'Downtown Office', address: '123 Main St, City Center' },
    { id: '2', name: 'Westside Office', address: '456 West Ave, Westside District' },
    { id: '3', name: 'Eastside Office', address: '789 East Blvd, Eastside Area' },
  ],
  selectedDate: null,
  selectedTimeSlot: null,
  locationType: 'office',
  selectedLocation: null,
  customAddress: '',
  message: '',
  isLoading: false,
  error: null,
  
  fetchAvailableDates: () => {
    set({ isLoading: true });
    
    // Mock data - in a real app, this would come from the backend
    const today = new Date();
    const dates = [];
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    
    set({ availableDates: dates, isLoading: false });
  },
  
  fetchAvailableTimeSlots: (date) => {
    set({ isLoading: true });
    
    // Mock data - in a real app, this would come from the backend
    const slots: TimeSlot[] = [
      { id: '1', time: '09:00', available: true },
      { id: '2', time: '10:00', available: true },
      { id: '3', time: '11:00', available: true },
      { id: '4', time: '13:00', available: true },
      { id: '5', time: '14:00', available: true },
      { id: '6', time: '15:00', available: true },
      { id: '7', time: '16:00', available: true },
    ];
    
    // Randomly make some slots unavailable for demo purposes
    slots.forEach(slot => {
      if (Math.random() > 0.7) {
        slot.available = false;
      }
    });
    
    set({ availableTimeSlots: slots, isLoading: false });
  },
  
  setSelectedDate: (date) => {
    set({ selectedDate: date });
    if (date) {
      get().fetchAvailableTimeSlots(date);
    } else {
      set({ availableTimeSlots: [], selectedTimeSlot: null });
    }
  },
  
  setSelectedTimeSlot: (slot) => {
    set({ selectedTimeSlot: slot });
  },
  
  setLocationType: (type) => {
    set({ locationType: type });
    if (type === 'office') {
      set({ customAddress: '' });
    } else {
      set({ selectedLocation: null });
    }
  },
  
  setSelectedLocation: (location) => {
    set({ selectedLocation: location });
  },
  
  setCustomAddress: (address) => {
    set({ customAddress: address });
  },
  
  setMessage: (message) => {
    set({ message });
  },
  
  bookAppointment: async (userId) => {
    const { 
      selectedDate, 
      selectedTimeSlot, 
      locationType, 
      selectedLocation, 
      customAddress,
      message
    } = get();
    
    if (!selectedDate || !selectedTimeSlot) {
      set({ error: "Please select a date and time" });
      return null;
    }
    
    if (locationType === 'office' && !selectedLocation) {
      set({ error: "Please select an office location" });
      return null;
    }
    
    if (locationType === 'custom' && !customAddress) {
      set({ error: "Please enter your address" });
      return null;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      const appointment: Appointment = {
        userId,
        date: selectedDate.toISOString(),
        timeSlot: selectedTimeSlot.time,
        status: 'pending',
        locationType,
        location: locationType === 'office' ? selectedLocation : undefined,
        customAddress: locationType === 'custom' ? customAddress : undefined,
        message: message || undefined,
        createdAt: new Date().toISOString(),
      };
      
      const savedAppointment = await fine.db.saveAppointment(appointment);
      set({ isLoading: false });
      get().reset();
      return savedAppointment;
    } catch (error) {
      set({ error: "Failed to book appointment", isLoading: false });
      return null;
    }
  },
  
  reset: () => {
    set({
      selectedDate: null,
      selectedTimeSlot: null,
      locationType: 'office',
      selectedLocation: null,
      customAddress: '',
      message: '',
      error: null,
    });
  },
}));