import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { NextUIProvider } from "@nextui-org/react";
import { TopNav } from "./components/ui/top-nav";
import { Sidebar } from "./components/ui/sidebar";
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
import { cn } from "./lib/utils";

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Layout component for authenticated pages
const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <TopNav />
      <div className="flex pt-16">
        <Sidebar 
          isVisible={isSidebarVisible} 
          onToggle={handleSidebarToggle}
        />
        <main className={cn(
          "flex-1 p-6 transition-all duration-300",
          isSidebarVisible ? "ml-60" : "ml-16"
        )}>
          {children}
        </main>
      </div>
    </>
  );
};

function App() {
  return (
    <NextUIProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#0B0D14]">
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <Home />
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
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </NextUIProvider>
  );
}

export default App;
