import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopNav } from "./top-nav";
import { Sidebar } from "./sidebar";
import { cn } from "../../lib/utils";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const layoutVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const contentVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="authenticated-layout"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={layoutVariants}
      >
        <TopNav />
        <div className="flex pt-16">
          <Sidebar 
            isVisible={isSidebarVisible} 
            onToggle={handleSidebarToggle}
          />
          <motion.main 
            variants={contentVariants}
            className={cn(
              "flex-1 p-6 transition-all duration-300",
              isSidebarVisible ? "ml-60" : "ml-16"
            )}
          >
            {children}
          </motion.main>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
