import React, { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BookOpen, HelpCircle, FileText, MessageSquare, Bot, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";

interface SupportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  onClick: () => void;
}

const SupportCard = ({ title, description, icon, buttonText, onClick }: SupportCardProps) => (
  <Card className="p-6 hover:bg-accent/50 transition-colors">
    <div className="flex items-start space-x-4">
      <div className="p-2 rounded-lg bg-primary/10">
        {icon}
      </div>
      <div className="flex-1 space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  </Card>
);

const HealthPilotBanner = ({ onDismiss }: { onDismiss: () => void }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleDismiss = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideHealthPilotBanner', 'true');
    }
    onDismiss();
  };

  return (
    <div className="relative mb-8 overflow-hidden rounded-lg bg-gradient-to-r from-[#C81E78] to-[#8E44AD] text-white">
      <div className="absolute inset-0 bg-[url('/src/assets/pattern.svg')] opacity-10" />
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 text-white hover:bg-white/20"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="relative p-6 flex items-center gap-6">
        <div className="hidden md:block">
          <Bot className="h-16 w-16 text-white" />
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">
            Meet Health Pilot - Your AI Support Assistant
          </h2>
          <p className="text-white/90 mb-4">
            Get instant answers to your questions and resolve issues faster with our AI-powered Health Pilot. 
            Available 24/7 to provide personalized support and guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Button 
              className="bg-white text-[#C81E78] hover:bg-white/90"
              onClick={() => window.location.href = '/health-pilot'}
            >
              Try Health Pilot
            </Button>
            
            <div className="flex items-center gap-2">
              <Checkbox 
                id="dont-show"
                checked={dontShowAgain}
                onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
              />
              <Label 
                htmlFor="dont-show"
                className="text-sm text-white cursor-pointer"
              >
                Don't show this again
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Support = () => {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const hideHealthPilotBanner = localStorage.getItem('hideHealthPilotBanner');
    if (hideHealthPilotBanner === 'true') {
      setShowBanner(false);
    }
  }, []);

  const handleUserGuide = () => {
    window.open('https://protocol.health/guide', '_blank');
  };

  const handleFAQs = () => {
    window.open('https://protocol.health/faqs', '_blank');
  };

  const handleDocumentation = () => {
    window.open('https://protocol.health/docs', '_blank');
  };

  const handleContactSupport = () => {
    navigate('/contact');
  };

  return (
    <div className="container mx-auto py-6">
      {showBanner && <HealthPilotBanner onDismiss={() => setShowBanner(false)} />}
      
      <h1 className="text-2xl font-bold mb-6">Support Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SupportCard
          title="User Guide"
          description="Learn how to use Protocol Health effectively with our comprehensive user guide."
          icon={<BookOpen className="h-6 w-6 text-primary" />}
          buttonText="View Guide"
          onClick={handleUserGuide}
        />
        <SupportCard
          title="FAQs"
          description="Find answers to commonly asked questions about Protocol Health features and services."
          icon={<HelpCircle className="h-6 w-6 text-primary" />}
          buttonText="Browse FAQs"
          onClick={handleFAQs}
        />
        <SupportCard
          title="Documentation"
          description="Access detailed technical documentation and API references for developers."
          icon={<FileText className="h-6 w-6 text-primary" />}
          buttonText="View Docs"
          onClick={handleDocumentation}
        />
        <SupportCard
          title="Contact Support"
          description="Get in touch with our support team for personalized assistance with your issues."
          icon={<MessageSquare className="h-6 w-6 text-primary" />}
          buttonText="Contact Us"
          onClick={handleContactSupport}
        />
      </div>
    </div>
  );
};

export default Support;
