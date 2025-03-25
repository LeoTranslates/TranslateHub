import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'fr' | 'ka';

type LanguageStore = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, Record<Language, string>>;
  t: (key: string) => string;
};

export const useLanguage = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
      translations: {
        // Common
        'app.name': {
          en: 'TranslateHub',
          fr: 'TranslateHub',
          ka: 'TranslateHub',
        },
        'app.tagline': {
          en: 'Professional Translation Services',
          fr: 'Services de Traduction Professionnels',
          ka: 'პროფესიონალური თარგმანის სერვისები',
        },
        
        // Navigation
        'nav.home': {
          en: 'Home',
          fr: 'Accueil',
          ka: 'მთავარი',
        },
        'nav.document': {
          en: 'Document Translation',
          fr: 'Traduction de Documents',
          ka: 'დოკუმენტების თარგმანი',
        },
        'nav.appointment': {
          en: 'Book Appointment',
          fr: 'Prendre Rendez-vous',
          ka: 'დაჯავშნა',
        },
        'nav.dashboard': {
          en: 'Dashboard',
          fr: 'Tableau de Bord',
          ka: 'პანელი',
        },
        'nav.admin': {
          en: 'Admin',
          fr: 'Admin',
          ka: 'ადმინი',
        },
        'nav.login': {
          en: 'Login',
          fr: 'Connexion',
          ka: 'შესვლა',
        },
        'nav.logout': {
          en: 'Logout',
          fr: 'Déconnexion',
          ka: 'გასვლა',
        },
        'nav.register': {
          en: 'Register',
          fr: 'S\'inscrire',
          ka: 'რეგისტრაცია',
        },
        
        // Home page
        'home.hero.title': {
          en: 'Professional Translation Services',
          fr: 'Services de Traduction Professionnels',
          ka: 'პროფესიონალური თარგმანის სერვისები',
        },
        'home.hero.subtitle': {
          en: 'Fast, accurate translations for all your needs',
          fr: 'Traductions rapides et précises pour tous vos besoins',
          ka: 'სწრაფი, ზუსტი თარგმანები ყველა თქვენი საჭიროებისთვის',
        },
        'home.services.title': {
          en: 'Our Services',
          fr: 'Nos Services',
          ka: 'ჩვენი სერვისები',
        },
        'home.services.document.title': {
          en: 'Document Translation',
          fr: 'Traduction de Documents',
          ka: 'დოკუმენტების თარგმანი',
        },
        'home.services.document.description': {
          en: 'Professional translation of official documents, certificates, and more',
          fr: 'Traduction professionnelle de documents officiels, certificats et plus',
          ka: 'ოფიციალური დოკუმენტების, სერტიფიკატების და სხვა მასალების პროფესიონალური თარგმანი',
        },
        'home.services.appointment.title': {
          en: 'In-Person Translation',
          fr: 'Traduction en Personne',
          ka: 'პირადი თარგმანი',
        },
        'home.services.appointment.description': {
          en: 'Book an appointment for in-person translation services',
          fr: 'Prenez rendez-vous pour des services de traduction en personne',
          ka: 'დაჯავშნეთ შეხვედრა პირადი თარგმანის სერვისებისთვის',
        },
        'home.cta.document': {
          en: 'Translate Documents',
          fr: 'Traduire des Documents',
          ka: 'დოკუმენტების თარგმანი',
        },
        'home.cta.appointment': {
          en: 'Book Appointment',
          fr: 'Prendre Rendez-vous',
          ka: 'დაჯავშნა',
        },
        
        // Document translation
        'document.title': {
          en: 'Document Translation',
          fr: 'Traduction de Documents',
          ka: 'დოკუმენტების თარგმანი',
        },
        'document.subtitle': {
          en: 'Upload your documents for professional translation',
          fr: 'Téléchargez vos documents pour une traduction professionnelle',
          ka: 'ატვირთეთ თქვენი დოკუმენტები პროფესიონალური თარგმანისთვის',
        },
        'document.type': {
          en: 'Document Type',
          fr: 'Type de Document',
          ka: 'დოკუმენტის ტიპი',
        },
        'document.urgency': {
          en: 'Urgency',
          fr: 'Urgence',
          ka: 'სასწრაფო',
        },
        'document.urgency.standard': {
          en: 'Standard (24 hours)',
          fr: 'Standard (24 heures)',
          ka: 'სტანდარტული (24 საათი)',
        },
        'document.urgency.urgent': {
          en: 'Urgent (4 hours)',
          fr: 'Urgent (4 heures)',
          ka: 'სასწრაფო (4 საათი)',
        },
        'document.delivery': {
          en: 'Delivery Method',
          fr: 'Méthode de Livraison',
          ka: 'მიწოდების მეთოდი',
        },
        'document.delivery.online': {
          en: 'Online Delivery',
          fr: 'Livraison en Ligne',
          ka: 'ონლაინ მიწოდება',
        },
        'document.delivery.postal': {
          en: 'Postal Delivery',
          fr: 'Livraison Postale',
          ka: 'საფოსტო მიწოდება',
        },
        'document.delivery.pickup': {
          en: 'Hand-to-Hand Pickup',
          fr: 'Récupération en Personne',
          ka: 'პირადი გადაცემა',
        },
        'document.upload': {
          en: 'Upload Document',
          fr: 'Télécharger le Document',
          ka: 'დოკუმენტის ატვირთვა',
        },
        'document.price': {
          en: 'Total Price',
          fr: 'Prix Total',
          ka: 'ჯამური ფასი',
        },
        'document.submit': {
          en: 'Submit Order',
          fr: 'Soumettre la Commande',
          ka: 'შეკვეთის გაგზავნა',
        },
        'document.multipleFiles': {
          en: 'You can upload multiple files',
          fr: 'Vous pouvez télécharger plusieurs fichiers',
          ka: 'შეგიძლიათ ატვირთოთ რამდენიმე ფაილი',
        },
        'document.addMore': {
          en: 'Add More Files',
          fr: 'Ajouter Plus de Fichiers',
          ka: 'მეტი ფაილის დამატება',
        },
        'document.filesSelected': {
          en: 'document selected',
          fr: 'document sélectionné',
          ka: 'არჩეული დოკუმენტი',
        },
        'document.filesSelectedPlural': {
          en: 'documents selected',
          fr: 'documents sélectionnés',
          ka: 'არჩეული დოკუმენტები',
        },
        'document.numberOfDocuments': {
          en: 'Number of Documents',
          fr: 'Nombre de Documents',
          ka: 'დოკუმენტების რაოდენობა',
        },
        
        // Appointment booking
        'appointment.title': {
          en: 'Book an Appointment',
          fr: 'Prendre Rendez-vous',
          ka: 'დაჯავშნეთ შეხვედრა',
        },
        'appointment.subtitle': {
          en: 'Schedule an in-person translation session',
          fr: 'Planifiez une session de traduction en personne',
          ka: 'დაგეგმეთ პირადი თარგმანის სესია',
        },
        'appointment.date': {
          en: 'Select Date',
          fr: 'Sélectionner la Date',
          ka: 'აირჩიეთ თარიღი',
        },
        'appointment.time': {
          en: 'Select Time',
          fr: 'Sélectionner l\'Heure',
          ka: 'აირჩიეთ დრო',
        },
        'appointment.location': {
          en: 'Location',
          fr: 'Emplacement',
          ka: 'ადგილმდებარეობა',
        },
        'appointment.location.type': {
          en: 'Location Type',
          fr: 'Type d\'Emplacement',
          ka: 'ადგილმდებარეობის ტიპი',
        },
        'appointment.location.office': {
          en: 'Office Location',
          fr: 'Bureau',
          ka: 'ოფისი',
        },
        'appointment.location.custom': {
          en: 'Custom Address',
          fr: 'Adresse Personnalisée',
          ka: 'მისამართი',
        },
        'appointment.address': {
          en: 'Address',
          fr: 'Adresse',
          ka: 'მისამართი',
        },
        'appointment.message': {
          en: 'Additional Information',
          fr: 'Informations Supplémentaires',
          ka: 'დამატებითი ინფორმაცია',
        },
        'appointment.message.placeholder': {
          en: 'Any special requests or additional details about your appointment',
          fr: 'Demandes spéciales ou détails supplémentaires concernant votre rendez-vous',
          ka: 'ნებისმიერი სპეციალური მოთხოვნა ან დამატებითი დეტალები თქვენი შეხვედრის შესახებ',
        },
        'appointment.submit': {
          en: 'Book Appointment',
          fr: 'Réserver le Rendez-vous',
          ka: 'შეხვედრის დაჯავშნა',
        },
        
        // Auth
        'auth.login.title': {
          en: 'Login',
          fr: 'Connexion',
          ka: 'შესვლა',
        },
        'auth.login.subtitle': {
          en: 'Welcome back! Please login to your account',
          fr: 'Bienvenue! Veuillez vous connecter à votre compte',
          ka: 'მოგესალმებით! გთხოვთ შეხვიდეთ თქვენს ანგარიშზე',
        },
        'auth.register.title': {
          en: 'Register',
          fr: 'S\'inscrire',
          ka: 'რეგისტრაცია',
        },
        'auth.register.subtitle': {
          en: 'Create a new account',
          fr: 'Créer un nouveau compte',
          ka: 'შექმენით ახალი ანგარიში',
        },
        'auth.email': {
          en: 'Email',
          fr: 'Email',
          ka: 'ელ-ფოსტა',
        },
        'auth.password': {
          en: 'Password',
          fr: 'Mot de passe',
          ka: 'პაროლი',
        },
        'auth.login.button': {
          en: 'Login',
          fr: 'Se connecter',
          ka: 'შესვლა',
        },
        'auth.register.button': {
          en: 'Register',
          fr: 'S\'inscrire',
          ka: 'რეგისტრაცია',
        },
        'auth.switch.login': {
          en: 'Already have an account? Login',
          fr: 'Vous avez déjà un compte? Connectez-vous',
          ka: 'უკვე გაქვთ ანგარიში? შესვლა',
        },
        'auth.switch.register': {
          en: 'Don\'t have an account? Register',
          fr: 'Vous n\'avez pas de compte? Inscrivez-vous',
          ka: 'არ გაქვთ ანგარიში? რეგისტრაცია',
        },
        
        // Dashboard
        'dashboard.title': {
          en: 'Dashboard',
          fr: 'Tableau de Bord',
          ka: 'პანელი',
        },
        'dashboard.welcome': {
          en: 'Welcome',
          fr: 'Bienvenue',
          ka: 'მოგესალმებით',
        },
        'dashboard.orders.title': {
          en: 'Your Orders',
          fr: 'Vos Commandes',
          ka: 'თქვენი შეკვეთები',
        },
        'dashboard.orders.empty': {
          en: 'No orders yet',
          fr: 'Pas encore de commandes',
          ka: 'შეკვეთები არ არის',
        },
        'dashboard.appointments.title': {
          en: 'Your Appointments',
          fr: 'Vos Rendez-vous',
          ka: 'თქვენი შეხვედრები',
        },
        'dashboard.appointments.empty': {
          en: 'No appointments yet',
          fr: 'Pas encore de rendez-vous',
          ka: 'შეხვედრები არ არის',
        },
        
        // Admin
        'admin.title': {
          en: 'Admin Dashboard',
          fr: 'Tableau de Bord Admin',
          ka: 'ადმინის პანელი',
        },
        'admin.orders.title': {
          en: 'All Orders',
          fr: 'Toutes les Commandes',
          ka: 'ყველა შეკვეთა',
        },
        'admin.orders.empty': {
          en: 'No orders yet',
          fr: 'Pas encore de commandes',
          ka: 'შეკვეთები არ არის',
        },
        'admin.appointments.title': {
          en: 'All Appointments',
          fr: 'Tous les Rendez-vous',
          ka: 'ყველა შეხვედრა',
        },
        'admin.appointments.empty': {
          en: 'No appointments yet',
          fr: 'Pas encore de rendez-vous',
          ka: 'შეხვედრები არ არის',
        },
        'admin.settings.title': {
          en: 'Settings',
          fr: 'Paramètres',
          ka: 'პარამეტრები',
        },
        'admin.settings.payment': {
          en: 'Payment Methods',
          fr: 'Méthodes de Paiement',
          ka: 'გადახდის მეთოდები',
        },
        
        // Common components
        'status.pending': {
          en: 'Pending',
          fr: 'En attente',
          ka: 'მიმდინარე',
        },
        'status.processing': {
          en: 'Processing',
          fr: 'En cours',
          ka: 'დამუშავებაში',
        },
        'status.completed': {
          en: 'Completed',
          fr: 'Terminé',
          ka: 'დასრულებული',
        },
        'status.cancelled': {
          en: 'Cancelled',
          fr: 'Annulé',
          ka: 'გაუქმებული',
        },
        'status.confirmed': {
          en: 'Confirmed',
          fr: 'Confirmé',
          ka: 'დადასტურებული',
        },
        'payment.card': {
          en: 'Credit Card',
          fr: 'Carte de Crédit',
          ka: 'საკრედიტო ბარათი',
        },
        'payment.paypal': {
          en: 'PayPal',
          fr: 'PayPal',
          ka: 'PayPal',
        },
        'button.save': {
          en: 'Save',
          fr: 'Enregistrer',
          ka: 'შენახვა',
        },
        'button.cancel': {
          en: 'Cancel',
          fr: 'Annuler',
          ka: 'გაუქმება',
        },
        'button.confirm': {
          en: 'Confirm',
          fr: 'Confirmer',
          ka: 'დადასტურება',
        },
        'button.back': {
          en: 'Back',
          fr: 'Retour',
          ka: 'უკან',
        },
        'button.next': {
          en: 'Next',
          fr: 'Suivant',
          ka: 'შემდეგი',
        },
        'error.required': {
          en: 'This field is required',
          fr: 'Ce champ est obligatoire',
          ka: 'ეს ველი აუცილებელია',
        },
        'error.fileSize': {
          en: 'File size exceeds limit',
          fr: 'La taille du fichier dépasse la limite',
          ka: 'ფაილის ზომა აღემატება ლიმიტს',
        },
      },
      t: (key) => {
        const language = get().language;
        return get().translations[key]?.[language] || key;
      },
    }),
    {
      name: 'language-store',
    }
  )
);