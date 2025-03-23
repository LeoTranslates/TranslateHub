import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderCard } from "@/components/ui/order-card";
import { AppointmentCard } from "@/components/ui/appointment-card";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/use-auth";
import { useOrders } from "@/hooks/use-orders";
import { FileText, Calendar } from "lucide-react";

export default function DashboardPage() {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { orders, appointments, fetchUserOrders, fetchUserAppointments } = useOrders();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth?mode=login&redirect=/dashboard");
      return;
    }
    
    fetchUserOrders(user!.id);
    fetchUserAppointments(user!.id);
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('dashboard.welcome')}, {user.name}
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button asChild>
              <a href="/document-translation">
                <FileText className="mr-2 h-4 w-4" />
                {t('home.cta.document')}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="/appointment-booking">
                <Calendar className="mr-2 h-4 w-4" />
                {t('home.cta.appointment')}
              </a>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="orders">
              <FileText className="mr-2 h-4 w-4" />
              {t('dashboard.orders.title')}
            </TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="mr-2 h-4 w-4" />
              {t('dashboard.appointments.title')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            {orders.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard.orders.empty')}</CardTitle>
                  <CardDescription>
                    You haven't placed any translation orders yet.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <a href="/document-translation">
                      <FileText className="mr-2 h-4 w-4" />
                      {t('home.cta.document')}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="appointments">
            {appointments.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {appointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard.appointments.empty')}</CardTitle>
                  <CardDescription>
                    You haven't booked any in-person translation appointments yet.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <a href="/appointment-booking">
                      <Calendar className="mr-2 h-4 w-4" />
                      {t('home.cta.appointment')}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}