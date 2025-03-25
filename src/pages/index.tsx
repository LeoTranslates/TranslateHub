import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, Globe } from "lucide-react";

export function HomePage() {
  return (
    <div className="container py-12">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Professional Translation Services
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Fast, accurate, and affordable translation services for individuals and businesses.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/document-translation">
                <Button size="lg">Translate Documents</Button>
              </Link>
              <Link to="/appointment-booking">
                <Button size="lg" variant="outline">Book an Appointment</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Services
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                We offer a wide range of translation services to meet your needs.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <FileText className="h-12 w-12 text-primary" />
                  <CardTitle>Document Translation</CardTitle>
                  <CardDescription>
                    Professional translation of documents, websites, and more.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our team of expert translators can handle documents of any size and complexity.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/document-translation">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <Calendar className="h-12 w-12 text-primary" />
                  <CardTitle>Interpreter Booking</CardTitle>
                  <CardDescription>
                    Book an interpreter for meetings, events, and conferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our interpreters are available for in-person and virtual meetings.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/appointment-booking">
                    <Button variant="outline">Book Now</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <Globe className="h-12 w-12 text-primary" />
                  <CardTitle>Website Localization</CardTitle>
                  <CardDescription>
                    Adapt your website for international audiences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    We help you reach global customers with culturally appropriate content.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/contact">
                    <Button variant="outline">Contact Us</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Choose Us
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                We are committed to providing the highest quality translation services.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Expert Translators</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Our translators are native speakers with expertise in various fields.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Fast Turnaround</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  We deliver high-quality translations within your timeframe.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Competitive Pricing</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  We offer affordable rates without compromising on quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}