import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, MessageSquare } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { formatDate, formatTime } from "@/lib/utils";
import { Appointment } from "@/hooks/use-appointments";
import { Tooltip } from "@/components/ui/tooltip";

interface AppointmentCardProps {
  appointment: Appointment;
  isAdmin?: boolean;
  onStatusChange?: (appointmentId: string, status: Appointment['status']) => void;
}

export function AppointmentCard({ appointment, isAdmin = false, onStatusChange }: AppointmentCardProps) {
  const { t } = useLanguage();
  
  const getStatusBadgeVariant = (status: Appointment['status']) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'success';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  const getLocationDisplay = () => {
    if (appointment.locationType === 'office' && appointment.location) {
      return (
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
          <div>
            <div>{appointment.location.name}</div>
            <div className="text-xs text-muted-foreground">{appointment.location.address}</div>
          </div>
        </div>
      );
    } else if (appointment.locationType === 'custom' && appointment.customAddress) {
      return (
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
          <div>
            <div>Custom Address</div>
            <div className="text-xs text-muted-foreground">{appointment.customAddress}</div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {formatDate(appointment.date)}
          </CardTitle>
          <Badge variant={getStatusBadgeVariant(appointment.status)}>
            {t(`status.${appointment.status}`)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 space-y-3">
        <div className="text-lg font-medium">
          {formatTime(new Date(`${appointment.date.split('T')[0]}T${appointment.timeSlot}:00`))}
        </div>
        
        {getLocationDisplay()}
        
        {appointment.message && (
          <div className="flex items-start gap-2">
            <MessageSquare className="h-4 w-4 mt-0.5 shrink-0" />
            <div className="text-sm">
              {isAdmin ? (
                <Tooltip content={appointment.message}>
                  <div className="line-clamp-2">{appointment.message}</div>
                </Tooltip>
              ) : (
                <div>{appointment.message}</div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      {isAdmin && onStatusChange && (
        <CardFooter className="pt-2">
          <div className="flex gap-2 w-full">
            {appointment.status === 'pending' && (
              <Button 
                size="sm" 
                variant="outline"
                className="flex-1"
                onClick={() => onStatusChange(appointment.id!, 'confirmed')}
              >
                Confirm
              </Button>
            )}
            {appointment.status !== 'cancelled' && (
              <Button 
                size="sm" 
                variant="outline"
                className="flex-1 text-destructive hover:text-destructive"
                onClick={() => onStatusChange(appointment.id!, 'cancelled')}
              >
                Cancel
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}