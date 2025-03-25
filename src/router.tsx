import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import { HomePage } from "@/pages/index";
import { DocumentTranslationPage } from "@/pages/document-translation";
import { AppointmentBookingPage } from "@/pages/appointment-booking";
import { AuthPage } from "@/pages/auth";
import { DashboardPage } from "@/pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "document-translation",
        element: <DocumentTranslationPage />,
      },
      {
        path: "appointment-booking",
        element: <AppointmentBookingPage />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);