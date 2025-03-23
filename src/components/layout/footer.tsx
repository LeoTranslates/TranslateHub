import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("app.name")}</h3>
            <p className="text-muted-foreground">
              {t("app.tagline")}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("home.services.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/document-translation" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("home.services.document.title")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/appointment-booking" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("home.services.appointment.title")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>123 Translation Street</p>
              <p>City, Country</p>
              <p className="mt-2">contact@translatehub.com</p>
              <p>+1 234 567 890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} TranslateHub. All rights reserved.
          </p>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link 
              to="/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}