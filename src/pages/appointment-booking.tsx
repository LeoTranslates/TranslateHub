import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppointmentCalendar } from "@/components/ui/appointment-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { useAppointments } from "@/hooks/use-appointments";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { formatDate, formatTime } from "@/lib/utils";

export default function AppointmentBookingPage() {
  const { t } = useLanguage();
  const { 
    selectedDate, 
    selectedTimeSlot, 
    locationType,
    selectedLocation,
    customAddress,
    message,
    bookAppointment 
  } = useAppointments();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'booking' | 'confirmation'>('booking');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async () => {
    if (!isAuthenticated) {
      // Redirect to login
      toast({
        title: "Authentication required",
        description: "Please log in to book an appointment",
      });
      navigate("/auth?mode=login&redirect=/appointment-booking");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const appointment = await bookAppointment(user!.id);
      if (appointment) {
        setStep('confirmation');
        toast({
          title: "Appointment booked successfully",
          description: "Your appointment has been scheduled",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderBookingStep = () => {
    return (
      <AppointmentCalendar onComplete={handleComplete} />
    );
  };

  const renderConfirmationStep = () => {
    if (!selectedDate || !selectedTimeSlot) return null;
    
    const appointmentDate = new Date(selectedDate);
    const locationInfo = locationType === 'office' && selectedLocation 
      ? (
        <div>
          <p className="font-medium">{selectedLocation.name}</p>
          <p className="text-muted-foreground">{selectedLocation.address}</p>
        </div>
      ) 
      : (
        <div>
          <p className="font-medium">Custom Address</p>
          <p className="text-muted-foreground">{customAddress}</p>
        </div>
      );

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Appointment Confirmed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-1">Your appointment is scheduled</h3>
            <p className="text-muted-foreground">
              We look forward to meeting you
            </p>
          </div>
          
          <div className="border rounded-lg p-4 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-medium">
                {formatDate(appointmentDate)}, {selectedTimeSlot.time}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              {locationInfo}
            </div>
            
            {message && (
              <div>
                <p className="text-sm text-muted-foreground">Additional Information</p>
                <p>{message}</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-center pt-4">
            <Button onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{t('appointment.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('appointment.subtitle')}</p>
        </div>
        
        {step === 'booking' && renderBookingStep()}
        {step === 'confirmation' && renderConfirmationStep()}
      </div>
    </div>
  );
}