import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";

interface Section {
  title: string;
  content: string;
}

const healthAnalyticsSections: Section[] = [
  {
    title: "Health Informatics",
    content: "The integration of healthcare sciences, computer science, and information science to manage and analyze health data. This interdisciplinary field combines healthcare expertise with modern technology to improve patient care and outcomes."
  },
  {
    title: "Medical Analytics",
    content: "The use of mathematical and computational methods to analyze medical data and improve healthcare outcomes. This includes statistical analysis, pattern recognition, and predictive modeling to derive actionable insights from healthcare data."
  },
  {
    title: "Clinical Data Analytics",
    content: "The analysis of clinical data to identify trends, patterns, and insights that can inform healthcare decisions. This involves processing and analyzing patient records, treatment outcomes, and clinical trial data to improve medical decision-making."
  },
  {
    title: "Predictive Analytics in Healthcare",
    content: "The use of statistical models and machine learning algorithms to predict patient outcomes, disease progression, and treatment responses. This helps healthcare providers make proactive decisions and implement preventive measures."
  }
];

const aiTermsSections: Section[] = [
  {
    title: "AI-Powered Health Analytics",
    content: "The use of artificial intelligence and machine learning to analyze health data and gain insights. This technology can process vast amounts of health data to identify patterns and make predictions that might not be apparent through traditional analysis."
  },
  {
    title: "Machine Learning in Healthcare",
    content: "The application of machine learning algorithms to analyze health data and improve healthcare outcomes. These algorithms can learn from historical data to make predictions and recommendations for patient care."
  },
  {
    title: "Deep Learning in Healthcare",
    content: "The use of deep learning algorithms to analyze complex health data, such as medical images and genomic data. This advanced form of machine learning can identify subtle patterns in complex medical data to assist in diagnosis and treatment planning."
  }
];

const HealthPilot = () => {
  const [consentChecked, setConsentChecked] = useState({
    dataAccess: false,
    privacyPolicy: false,
    hipaaCompliance: false,
    aiUsage: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleConsent = (key: keyof typeof consentChecked) => {
    setConsentChecked(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const allConsentsChecked = Object.values(consentChecked).every(value => value);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Consent and Disclaimers</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="dataAccess"
                  checked={consentChecked.dataAccess}
                  onCheckedChange={() => handleConsent('dataAccess')}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="dataAccess">
                    Data Access and Usage
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I consent to Protocol Health accessing and analyzing my health data to provide personalized insights and recommendations.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacyPolicy"
                  checked={consentChecked.privacyPolicy}
                  onCheckedChange={() => handleConsent('privacyPolicy')}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="privacyPolicy">
                    Privacy Policy
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I have read and agree to the Privacy Policy regarding the collection, storage, and processing of my health data.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="hipaaCompliance"
                  checked={consentChecked.hipaaCompliance}
                  onCheckedChange={() => handleConsent('hipaaCompliance')}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="hipaaCompliance">
                    HIPAA Compliance
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I understand that my health data is protected under HIPAA regulations and will be handled accordingly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="aiUsage"
                  checked={consentChecked.aiUsage}
                  onCheckedChange={() => handleConsent('aiUsage')}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="aiUsage">
                    AI Technology Usage
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I understand that AI and machine learning technologies will be used to analyze my health data and provide insights.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Health Analytics</h2>
            {healthAnalyticsSections.map((section, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-muted-foreground">{section.content}</p>
              </Card>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">AI in Healthcare</h2>
            {aiTermsSections.map((section, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-muted-foreground">{section.content}</p>
              </Card>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Health Pilot Overview</h1>
        
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-1/3 h-2 rounded-full ${
                  i + 1 <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Consent</span>
            <span>Health Analytics</span>
            <span>AI Technology</span>
          </div>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
            disabled={currentStep === 1 && !allConsentsChecked || currentStep === totalSteps}
          >
            {currentStep === totalSteps ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthPilot;
