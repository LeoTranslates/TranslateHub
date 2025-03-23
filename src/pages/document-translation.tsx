import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUploader } from "@/components/ui/file-uploader";
import { PricingCalculator } from "@/components/ui/pricing-calculator";
import { PaymentMethodSelector } from "@/components/ui/payment-method-selector";
import { useLanguage } from "@/hooks/use-language";
import { useDocumentService } from "@/hooks/use-document-service";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export default function DocumentTranslationPage() {
  const { t, language } = useLanguage();
  const { 
    documentTypes, 
    selectedType, 
    urgency, 
    deliveryMethod, 
    documentFile,
    totalPrice,
    isLoading,
    error,
    fetchDocumentTypes,
    setSelectedType,
    setUrgency,
    setDeliveryMethod,
    setDocumentFile,
    submitOrder
  } = useDocumentService();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  const handleNext = () => {
    if (step === 'details') {
      if (!selectedType) {
        toast({
          title: "Missing information",
          description: "Please select a document type",
          variant: "destructive",
        });
        return;
      }
      
      if (!documentFile) {
        toast({
          title: "Missing document",
          description: "Please upload a document for translation",
          variant: "destructive",
        });
        return;
      }
      
      setStep('payment');
    } else if (step === 'payment') {
      handleSubmitOrder();
    }
  };

  const handleBack = () => {
    if (step === 'payment') {
      setStep('details');
    }
  };

  const handleSubmitOrder = async () => {
    if (!isAuthenticated) {
      // Save current state and redirect to login
      toast({
        title: "Authentication required",
        description: "Please log in to submit your order",
      });
      navigate("/auth?mode=login&redirect=/document-translation");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const order = await submitOrder(user!.id);
      if (order) {
        setStep('confirmation');
        toast({
          title: "Order submitted successfully",
          description: "Your translation order has been received",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className={`flex items-center ${step === 'details' ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step === 'details' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
            1
          </div>
          <span className="ml-2">Details</span>
        </div>
        <div className={`w-12 h-0.5 mx-2 ${step === 'details' ? 'bg-muted-foreground' : 'bg-primary'}`}></div>
        <div className={`flex items-center ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step === 'payment' ? 'border-primary bg-primary text-primary-foreground' : step === 'confirmation' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
            2
          </div>
          <span className="ml-2">Payment</span>
        </div>
        <div className={`w-12 h-0.5 mx-2 ${step === 'confirmation' ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
        <div className={`flex items-center ${step === 'confirmation' ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step === 'confirmation' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
            3
          </div>
          <span className="ml-2">Confirmation</span>
        </div>
      </div>
    );
  };

  const renderDetailsStep = () => {
    return (
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="document-type">{t('document.type')}</Label>
            <Select
              value={selectedType?.id || ''}
              onValueChange={(value) => {
                const type = documentTypes.find(t => t.id === value);
                setSelectedType(type || null);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name[language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>{t('document.urgency')}</Label>
            <RadioGroup
              value={urgency}
              onValueChange={(value) => setUrgency(value as 'standard' | 'urgent')}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard">{t('document.urgency.standard')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="urgent" id="urgent" />
                <Label htmlFor="urgent">{t('document.urgency.urgent')}</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>{t('document.delivery')}</Label>
            <RadioGroup
              value={deliveryMethod}
              onValueChange={(value) => setDeliveryMethod(value as 'online' | 'postal' | 'pickup')}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online">{t('document.delivery.online')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="postal" id="postal" />
                <Label htmlFor="postal">{t('document.delivery.postal')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup">{t('document.delivery.pickup')}</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>{t('document.upload')}</Label>
            <FileUploader onFileChange={setDocumentFile} />
          </div>
        </div>
        
        <div>
          {selectedType && (
            <PricingCalculator
              selectedType={selectedType}
              urgency={urgency}
              deliveryMethod={deliveryMethod}
              totalPrice={totalPrice}
            />
          )}
        </div>
      </div>
    );
  };

  const renderPaymentStep = () => {
    return (
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentMethodSelector
                selectedMethod={paymentMethod}
                onSelect={setPaymentMethod}
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          {selectedType && (
            <PricingCalculator
              selectedType={selectedType}
              urgency={urgency}
              deliveryMethod={deliveryMethod}
              totalPrice={totalPrice}
            />
          )}
        </div>
      </div>
    );
  };

  const renderConfirmationStep = () => {
    return (
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold">Order Submitted Successfully</h2>
        
        <p className="text-muted-foreground max-w-md mx-auto">
          Thank you for your order. We have received your document and will begin the translation process.
          You can track the status of your order in your dashboard.
        </p>
        
        <div className="pt-6">
          <Button onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{t('document.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('document.subtitle')}</p>
        </div>
        
        {renderStepIndicator()}
        
        <div className="mt-8">
          {step === 'details' && renderDetailsStep()}
          {step === 'payment' && renderPaymentStep()}
          {step === 'confirmation' && renderConfirmationStep()}
          
          {step !== 'confirmation' && (
            <div className="flex justify-between mt-8">
              {step === 'payment' && (
                <Button variant="outline" onClick={handleBack}>
                  {t('button.back')}
                </Button>
              )}
              {step === 'details' && <div></div>}
              
              <Button onClick={handleNext} disabled={isSubmitting}>
                {step === 'details' ? t('button.next') : t('document.submit')}
                {isSubmitting && (
                  <svg className="animate-spin ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}