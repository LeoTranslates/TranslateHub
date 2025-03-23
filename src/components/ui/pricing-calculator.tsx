import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { formatPrice } from "@/lib/utils";
import { DocumentType, DeliveryMethod, UrgencyLevel } from "@/hooks/use-document-service";

interface PricingCalculatorProps {
  selectedType: DocumentType | null;
  urgency: UrgencyLevel;
  deliveryMethod: DeliveryMethod;
  totalPrice: number;
}

export function PricingCalculator({
  selectedType,
  urgency,
  deliveryMethod,
  totalPrice
}: PricingCalculatorProps) {
  const { t, language } = useLanguage();

  if (!selectedType) {
    return null;
  }

  const getUrgencyMultiplier = () => {
    return urgency === 'urgent' ? 1.5 : 1;
  };

  const getDeliveryFee = () => {
    if (deliveryMethod === 'postal') return 10;
    if (deliveryMethod === 'pickup') return 5;
    return 0;
  };

  const basePrice = selectedType.basePrice;
  const urgencyMultiplier = getUrgencyMultiplier();
  const deliveryFee = getDeliveryFee();
  const subtotal = basePrice * urgencyMultiplier;

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">{t('document.price')}</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{selectedType.name[language]}</span>
            <span>{formatPrice(basePrice)}</span>
          </div>
          
          {urgency === 'urgent' && (
            <div className="flex justify-between text-sm">
              <span>{t('document.urgency.urgent')}</span>
              <span>+{formatPrice(basePrice * 0.5)}</span>
            </div>
          )}
          
          {deliveryMethod !== 'online' && (
            <div className="flex justify-between text-sm">
              <span>
                {deliveryMethod === 'postal' 
                  ? t('document.delivery.postal') 
                  : t('document.delivery.pickup')}
              </span>
              <span>+{formatPrice(deliveryFee)}</span>
            </div>
          )}
          
          <div className="border-t border-gray-200 dark:border-gray-800 my-2"></div>
          
          <div className="flex justify-between font-semibold">
            <span>{t('document.price')}</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}