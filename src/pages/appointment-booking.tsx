import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check } from "lucide-react";

export function AppointmentBookingPage() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Book an Interpreter</h1>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Service Type</CardTitle>
              <CardDescription>
                Choose the type of interpretation service you need.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Select
                      value={serviceType}
                      onValueChange={setServiceType}
                    >
                      <SelectTrigger id="serviceType">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">In-Person Interpretation</SelectItem>
                        <SelectItem value="virtual">Virtual Interpretation</SelectItem>
                        <SelectItem value="phone">Phone Interpretation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={language}
                      onValueChange={setLanguage}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-es">English - Spanish</SelectItem>
                        <SelectItem value="en-fr">English - French</SelectItem>
                        <SelectItem value="en-de">English - German</SelectItem>
                        <SelectItem value="en-it">English - Italian</SelectItem>
                        <SelectItem value="en-pt">English - Portuguese</SelectItem>
                        <SelectItem value="en-ru">English - Russian</SelectItem>
                        <SelectItem value="en-zh">English - Chinese</SelectItem>
                        <SelectItem value="en-ja">English - Japanese</SelectItem>
                        <SelectItem value="en-ko">English - Korean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <CardFooter className="flex justify-end px-0 pt-6">
                  <Button type="submit" disabled={!serviceType || !language}>
                    Continue
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Date and Time</CardTitle>
              <CardDescription>
                Choose your preferred date and time for the interpretation service.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Select
                      value={time}
                      onValueChange={setTime}
                      disabled={!date}
                    >
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTimes.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <CardFooter className="flex justify-between px-0 pt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" disabled={!date || !time}>
                    Continue
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                Please provide your contact information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(123) 456-7890" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Input id="notes" placeholder="Any specific requirements or context" />
                  </div>
                </div>
                <CardFooter className="flex justify-between px-0 pt-6">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button type="submit">
                    Book Appointment
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Appointment Confirmed</CardTitle>
              <CardDescription>
                Your interpreter appointment has been booked successfully.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Thank You!</h3>
              <p className="mt-2 text-center text-muted-foreground">
                We have confirmed your appointment for {date && format(date, "PPP")} at {time}.
                You will receive a confirmation email with all the details.
              </p>
              <Button className="mt-6" onClick={() => window.location.href = "/"}>
                Return to Home
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}