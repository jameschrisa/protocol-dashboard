import React, { useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  duration: number;
}

const messages: Message[] = [
  { id: 1, text: "Securing private data...", duration: 2000 },
  { id: 2, text: "Training on personal data...", duration: 2000 },
  { id: 3, text: "Health Pilot Activated!", duration: 2000 }
];

const HealthPilotActivation = () => {
  const controls = useAnimation();
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = React.useState<Message>(messages[0]);

  useEffect(() => {
    const sequence = async () => {
      // Initial SVG animation
      await controls.start({
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5 }
      });

      // Message sequence
      for (let i = 0; i < messages.length; i++) {
        setCurrentMessage(messages[i]);
        await new Promise(resolve => setTimeout(resolve, messages[i].duration));
      }

      // After final message, wait a moment then redirect
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/");
    };

    sequence();
  }, [controls, navigate]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={controls}
          className="mb-8"
        >
          <img src="/component.svg" alt="Health Pilot" className="w-32 h-32 mx-auto" />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-8 relative"
          >
            <p className="text-xl font-semibold absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
              {currentMessage.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HealthPilotActivation;
