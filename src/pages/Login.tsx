import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Lock, Mail, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/protocol_logo.svg";
import { validateCredentials, getUserByEmail } from "../data/auth-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const MotionButton = motion(Button);

// Add CSS for gradient animation
const gradientStyle = `
  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animated-gradient {
    background: linear-gradient(-45deg, 
      #1e3a8a,
      #1e40af,
      #2563eb,
      #3b82f6,
      #1e40af,
      #1e3a8a
    );
    background-size: 300% 300%;
    animation: gradientAnimation 10s ease infinite;
  }
`;

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Add the gradient animation styles to the document
    const styleSheet = document.createElement("style");
    styleSheet.innerText = gradientStyle;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const from = location.state?.from?.pathname || "/";

  const playLoginSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create oscillator for the main tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Create oscillator for the harmony
    const harmonyOsc = audioContext.createOscillator();
    const harmonyGain = audioContext.createGain();

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    harmonyOsc.connect(harmonyGain);
    harmonyGain.connect(audioContext.destination);

    // Main tone settings
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5 note
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    // Harmony settings
    harmonyOsc.type = 'sine';
    harmonyOsc.frequency.setValueAtTime(1100, audioContext.currentTime); // C#6 note
    harmonyGain.gain.setValueAtTime(0.1, audioContext.currentTime);
    harmonyGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

    // Start and stop the oscillators
    oscillator.start(audioContext.currentTime);
    harmonyOsc.start(audioContext.currentTime + 0.1);
    oscillator.stop(audioContext.currentTime + 0.5);
    harmonyOsc.stop(audioContext.currentTime + 0.4);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (validateCredentials(email, password)) {
        const user = getUserByEmail(email);
        if (user) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify({
            email: user.email,
            name: user.name,
            role: user.role
          }));

          playLoginSound();
          
          // Start exit animation
          setIsExiting(true);
          
          // Wait for exit animation to complete before navigating
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 800);
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const logoVariants = {
    initial: { 
      scale: 0.5, 
      opacity: 0, 
      rotateY: 180 
    },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99],
        rotateY: { duration: 1.5 }
      }
    },
    hover: { 
      scale: 1.05,
      rotateY: 10,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      rotateY: -180,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="login-page"
        initial="initial"
        animate={isExiting ? "exit" : "animate"}
        exit="exit"
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 animated-gradient opacity-95"
          variants={{
            exit: {
              opacity: 0,
              transition: { duration: 0.8 }
            }
          }}
        />
        
        {/* Content with backdrop blur */}
        <div className="relative w-full max-w-lg space-y-6 z-10">
          <Card className="p-8 space-y-6 bg-background/95 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                variants={logoVariants}
                className="perspective-1000"
              >
                <img
                  src={logo}
                  alt="Protocol Health"
                  className="h-16 w-auto"
                />
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-2xl font-bold"
              >
                Welcome Back
              </motion.h1>
            </div>

            <motion.div
              variants={containerVariants}
              className="space-y-4"
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-9"
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-9"
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionButton 
                  className="w-full"
                  onClick={handleLogin}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </MotionButton>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center text-sm">
                <a href="#" className="text-primary hover:underline">
                  Forgot password?
                </a>
              </motion.div>
            </motion.div>
          </Card>

          <motion.div
            variants={containerVariants}
            className="space-y-4"
          >
            <Card className="p-6 bg-background/95 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground leading-relaxed">
                The AI-powered health tools and services provided are for informational purposes only and are not a substitute for using Protocol Health's complementary human medical advice, diagnosis, or treatment services. Always consult the assigned qualified healthcare professional for personalized advice and care. If you have a medical emergency, please call your local emergency services or visit the nearest emergency room. Always consult a qualified healthcare professional for personalized advice and care.
              </p>
            </Card>

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2 bg-background/95 backdrop-blur-sm"
                >
                  <FileText className="h-4 w-4" />
                  Terms of Use
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Terms of Use</DialogTitle>
                  <DialogDescription>
                    By using Protocol Health's services, you agree to these terms.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">1. Service Description</h3>
                    <p className="text-sm text-muted-foreground">
                      Protocol Health provides AI-powered health tools and services complemented by human medical professionals. These services are designed to support, not replace, traditional healthcare services.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">2. Medical Disclaimer</h3>
                    <p className="text-sm text-muted-foreground">
                      Information provided through our services is for general informational purposes only. It is not medical advice and should not be treated as such.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">3. Emergency Services</h3>
                    <p className="text-sm text-muted-foreground">
                      If you are experiencing a medical emergency, immediately call your local emergency services or visit the nearest emergency room.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">4. Privacy & Data</h3>
                    <p className="text-sm text-muted-foreground">
                      We are committed to protecting your privacy and handling your health data securely. See our Privacy Policy for details.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
