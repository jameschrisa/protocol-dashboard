import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { NextUIProvider } from "@nextui-org/react";
import { AuthenticatedLayout } from "./components/ui/authenticated-layout";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import { GeneralHealth } from "./pages/GeneralHealth";
import { MentalHealth } from "./pages/MentalHealth";
import { Nutrition } from "./pages/Nutrition";
import { Fitness } from "./pages/Fitness";
import { Sleep } from "./pages/Sleep";
import { Social } from "./pages/Social";
import { Lifestyle } from "./pages/Lifestyle";
import { Login } from "./pages/Login";
import { Preferences } from "./pages/Preferences";
import { RxCabinet } from "./pages/RxCabinet";
import { Devices } from "./pages/Devices";
import { HealthWallet } from "./pages/HealthWallet";
import { Calendar } from "./pages/Calendar";
import { LongevityIndex } from "./pages/LongevityIndex";
import HealthPilot from "./pages/HealthPilot";
import HealthPilotActivation from "./pages/HealthPilotActivation";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// AnimatedRoutes component to handle page transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Home />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/longevity-index" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <LongevityIndex />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/calendar" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Calendar />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/general-health" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <GeneralHealth />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/mental-health" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <MentalHealth />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/nutrition" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Nutrition />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/fitness" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Fitness />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/sleep" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Sleep />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/social" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Social />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/lifestyle" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Lifestyle />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/preferences" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Preferences />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/rx-cabinet" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <RxCabinet />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/devices" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Devices />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/health-wallet" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <HealthWallet />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/health-pilot" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <HealthPilot />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/health-pilot-activation" element={
          <ProtectedRoute>
            <HealthPilotActivation />
          </ProtectedRoute>
        } />
        <Route path="/support" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Support />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/contact" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Contact />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Settings />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <NextUIProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#0B0D14]">
          <Router>
            <AnimatedRoutes />
          </Router>
        </div>
      </ThemeProvider>
    </NextUIProvider>
  );
}

export default App;
