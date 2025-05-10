import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/use-language";
import { useAppointments, TimeSlot, OfficeLocation } from "@/hooks/use-appointments";
import { formatDate } from "@/lib/utils";

interface AppointmentCalendarProps {
  onComplete: () => void;
}

export function AppointmentCalendar({ onComplete }: AppointmentCalendarProps) {
  const { t } = useLanguage();
  const {
    availableDates,
    availableTimeSlots,
    officeLocations,
    selectedDate,
    selectedTimeSlot,
    locationType,
    selectedLocation,
    customAddress,
    message,
    fetchAvailableDates,
    setSelectedDate,
    setSelectedTimeSlot,
    setLocationType,
    setSelectedLocation,
    setCustomAddress,
    setMessage
  } = useAppointments();

  const [step, setStep] = useState<'date' | 'time' | 'location'>('date');

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep('time');
  };

  const handleTimeSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setStep('location');
  };

  const handleBack = () => {
    if (step === 'time') {
      setStep('date');
    } else if (step === 'location') {
      setStep('time');
    }
  };

  const handleComplete = () => {
    if (locationType === 'office' && !selectedLocation) {
      return;
    }
    if (locationType === 'custom' && !customAddress) {
      return;
    }
    onComplete();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          {step === 'date' && t('appointment.date')}
          {step === 'time' && t('appointment.time')}
          {step === 'location' && t('appointment.location')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step === 'date' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {availableDates.map((date) => (
                <Button
                  key={date.toISOString()}
                  variant={selectedDate?.toDateString() === date.toDateString() ? "default" : "outline"}
                  className="h-20 flex flex-col"
                  onClick={() => handleDateSelect(date)}
                >
                  <span className="text-xs">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span className="text-lg font-bold">{date.getDate()}</span>
                  <span className="text-xs">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 'time' && selectedDate && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              {formatDate(selectedDate)}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {availableTimeSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                  className="h-12"
                  disabled={!slot.available}
                  onClick={() => slot.available && handleTimeSelect(slot)}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={handleBack}>
                {t('button.back')}
              </Button>
            </div>
          </div>
        )}

        {step === 'location' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              {formatDate(selectedDate!)} at {selectedTimeSlot?.time}
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t('appointment.location.type')}</Label>
                <RadioGroup 
                  value={locationType} 
                  onValueChange={(value) => setLocationType(value as 'office' | 'custom')}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="office" id="office" />
                    <Label htmlFor="office">{t('appointment.location.office')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom">{t('appointment.location.custom')}</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {locationType === 'office' && (
                <div className="space-y-2">
                  <Label htmlFor="location">{t('appointment.location')}</Label>
                  <Select 
                    value={selectedLocation?.id || ''} 
                    onValueChange={(value) => {
                      const location = officeLocations.find(loc => loc.id === value);
                      setSelectedLocation(location || null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an office location" />
                    </SelectTrigger>
                    <SelectContent>
                      {officeLocations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedLocation && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedLocation.address}
                    </p>
                  )}
                </div>
              )}
              
              {locationType === 'custom' && (
                <div className="space-y-2">
                  <Label htmlFor="address">{t('appointment.address')}</Label>
                  <Input
                    id="address"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    placeholder="Enter your address"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="message">{t('appointment.message')}</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('appointment.message.placeholder')}
                />
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={handleBack}>
                {t('button.back')}
              </Button>
              <Button 
                onClick={handleComplete}
                disabled={(locationType === 'office' && !selectedLocation) || 
                         (locationType === 'custom' && !customAddress)}
              >
                {t('appointment.submit')}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}