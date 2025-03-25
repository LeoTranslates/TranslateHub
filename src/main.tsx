import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Layout } from "@/components/layout/layout";
import { Toaster } from "@/components/ui/toaster";

// Import pages
import HomePage from "@/pages/index";
import DocumentTranslationPage from "@/pages/document-translation";
import AppointmentBookingPage from "@/pages/appointment-booking";
import AuthPage from "@/pages/auth";
import DashboardPage from "@/pages/dashboard";
import AdminPage from "@/pages/admin";

// Import styles
import "./index.css";

const router = createBrowserRouter([
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
      {
        path: "admin",
        element: <AdminPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="translatehub-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);