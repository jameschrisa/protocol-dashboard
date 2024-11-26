import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Lock, Mail, User } from "lucide-react";
import { useTheme } from "../components/theme-provider";
import logo from "../assets/protocol_logo.svg";

interface LoginCredentials {
  email: string;
  password: string;
}

const DEMO_USERS = {
  admin: {
    email: "admin@health.com",
    password: "admin123",
    role: "admin"
  },
  guest: {
    email: "guest@health.com",
    password: "guest123",
    role: "guest"
  }
};

export const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [credentials, setCredentials] = React.useState<LoginCredentials>({
    email: "",
    password: ""
  });

  React.useEffect(() => {
    // Clear any existing auth state on login page load
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Clear any previous errors
  };

  const validateCredentials = (email: string, password: string) => {
    // Check against demo users
    return Object.values(DEMO_USERS).find(
      user => user.email === email && user.password === password
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = validateCredentials(credentials.email, credentials.password);
      
      if (user) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userEmail", user.email);
        navigate("/general-health");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "guest");
      localStorage.setItem("userEmail", "guest@health.com");
      navigate("/general-health");
    } catch (error) {
      setError("Failed to login as guest");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            src={logo}
            alt="Protocol Logo"
            className={`h-24 mb-6 ${theme === 'dark' ? 'invert' : ''}`}
          />
          <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                required
                value={credentials.email}
                onChange={handleInputChange}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
                required
                value={credentials.password}
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleGuestLogin}
            disabled={isLoading}
          >
            <User className="mr-2 h-4 w-4" />
            Continue as Guest
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Demo Accounts:</p>
          <p className="mt-1">Admin: admin@health.com / admin123</p>
          <p>Guest: guest@health.com / guest123</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
