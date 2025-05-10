import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { CreditCard, CircleDollarSign } from "lucide-react";
import { useAdmin } from "@/hooks/use-admin";

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

export function PaymentMethodSelector({ selectedMethod, onSelect }: PaymentMethodSelectorProps) {
  const { t } = useLanguage();
  const { paymentMethods } = useAdmin();
  
  const availableMethods = [
    { id: 'card', name: t('payment.card'), icon: CreditCard, enabled: paymentMethods.card },
    { id: 'paypal', name: t('payment.paypal'), icon: CircleDollarSign, enabled: paymentMethods.paypal }
  ].filter(method => method.enabled);

  if (availableMethods.length === 0) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No payment methods available
      </div>
    );
  }

  return (
    <RadioGroup
      value={selectedMethod}
      onValueChange={onSelect}
      className="grid gap-4"
    >
      {availableMethods.map((method) => {
        const Icon = method.icon;
        return (
          <div key={method.id}>
            <RadioGroupItem
              value={method.id}
              id={`payment-${method.id}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`payment-${method.id}`}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <span>{method.name}</span>
                </div>
              </div>
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}