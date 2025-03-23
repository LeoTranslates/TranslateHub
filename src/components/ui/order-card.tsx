import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { formatDate, formatPrice } from "@/lib/utils";
import { Order } from "@/hooks/use-document-service";

interface OrderCardProps {
  order: Order;
  isAdmin?: boolean;
  onStatusChange?: (orderId: string, status: Order['status']) => void;
}

export function OrderCard({ order, isAdmin = false, onStatusChange }: OrderCardProps) {
  const { t, language } = useLanguage();
  
  const getStatusBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'completed': return 'success';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            {order.documentType?.name[language] || `Document #${order.id?.substring(0, 8)}`}
          </CardTitle>
          <Badge variant={getStatusBadgeVariant(order.status)}>
            {t(`status.${order.status}`)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('document.urgency')}</span>
            <span>{t(`document.urgency.${order.urgency}`)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('document.delivery')}</span>
            <span>{t(`document.delivery.${order.deliveryMethod}`)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('document.price')}</span>
            <span className="font-medium">{formatPrice(order.totalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span>{formatDate(order.createdAt)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {order.translatedDocumentUrl && (
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Download
          </Button>
        )}
        
        {isAdmin && onStatusChange && (
          <div className="flex gap-2">
            {order.status === 'pending' && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onStatusChange(order.id!, 'processing')}
              >
                Start Processing
              </Button>
            )}
            {order.status === 'processing' && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onStatusChange(order.id!, 'completed')}
              >
                Mark Completed
              </Button>
            )}
            {(order.status === 'pending' || order.status === 'processing') && (
              <Button 
                size="sm" 
                variant="outline"
                className="text-destructive hover:text-destructive"
                onClick={() => onStatusChange(order.id!, 'cancelled')}
              >
                Cancel
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}