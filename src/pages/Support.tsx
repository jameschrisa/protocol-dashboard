import React from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BookOpen, HelpCircle, FileText, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export const Support = () => {
  const navigate = useNavigate();

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
