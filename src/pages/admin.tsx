import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { OrderCard } from "@/components/ui/order-card";
import { AppointmentCard } from "@/components/ui/appointment-card";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/use-auth";
import { useOrders } from "@/hooks/use-orders";
import { useAdmin } from "@/hooks/use-admin";
import { FileText, Calendar, Settings, CreditCard, CircleDollarSign } from "lucide-react";

export default function AdminPage() {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { orders, appointments, fetchAllOrders, fetchAllAppointments, updateOrderStatus, updateAppointmentStatus } = useOrders();
  const { paymentMethods, togglePaymentMethod } = useAdmin();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth?mode=login");
      return;
    }
    
    if (user?.role !== 'admin') {
      navigate("/dashboard");
      return;
    }
    
    fetchAllOrders();
    fetchAllAppointments();
  }, [isAuthenticated, user]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('admin.title')}</h1>
        </div>
        
        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="orders">
              <FileText className="mr-2 h-4 w-4" />
              {t('admin.orders.title')}
            </TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="mr-2 h-4 w-4" />
              {t('admin.appointments.title')}
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              {t('admin.settings.title')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            {orders.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {orders.map((order) => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    isAdmin={true}
                    onStatusChange={updateOrderStatus}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.orders.empty')}</CardTitle>
                  <CardDescription>
                    There are no translation orders yet.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="appointments">
            {appointments.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {appointments.map((appointment) => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                    isAdmin={true}
                    onStatusChange={updateAppointmentStatus}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.appointments.empty')}</CardTitle>
                  <CardDescription>
                    There are no in-person translation appointments yet.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.settings.payment')}</CardTitle>
                <CardDescription>
                  Enable or disable payment methods for your clients
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <Label htmlFor="card-payment">{t('payment.card')}</Label>
                  </div>
                  <Switch 
                    id="card-payment" 
                    checked={paymentMethods.card}
                    onCheckedChange={() => togglePaymentMethod('card')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CircleDollarSign className="h-5 w-5" />
                    <Label htmlFor="paypal-payment">{t('payment.paypal')}</Label>
                  </div>
                  <Switch 
                    id="paypal-payment" 
                    checked={paymentMethods.paypal}
                    onCheckedChange={() => togglePaymentMethod('paypal')}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}