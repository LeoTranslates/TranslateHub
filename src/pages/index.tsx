import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { FileText, Calendar } from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {t("home.hero.title")}
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {t("home.hero.subtitle")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/document-translation">
                  <FileText className="mr-2 h-5 w-5" />
                  {t("home.cta.document")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/appointment-booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  {t("home.cta.appointment")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("home.services.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Document Translation Card */}
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
              <FileText className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{t("home.services.document.title")}</h3>
              <p className="text-muted-foreground text-center mb-6">
                {t("home.services.document.description")}
              </p>
              <Button asChild className="mt-auto">
                <Link to="/document-translation">{t("home.cta.document")}</Link>
              </Button>
            </div>

            {/* Appointment Booking Card */}
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{t("home.services.appointment.title")}</h3>
              <p className="text-muted-foreground text-center mb-6">
                {t("home.services.appointment.description")}
              </p>
              <Button asChild className="mt-auto">
                <Link to="/appointment-booking">{t("home.cta.appointment")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Languages We Support
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Professional translation services in multiple languages
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["English", "French", "Georgian", "Spanish", "German", "Italian", "Russian", "Chinese", "Japanese", "Arabic", "Portuguese", "Dutch"].map((language) => (
              <div 
                key={language} 
                className="flex items-center justify-center p-4 bg-card rounded-lg border shadow-sm"
              >
                <span className="font-medium">{language}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}