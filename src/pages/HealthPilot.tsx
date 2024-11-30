import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";

interface Section {
  title: string;
  content: string;
}

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

const dataAccessPolicy = `
Data Access and Usage

Authorization:
Protocol Health is authorized to access, analyze, and store health data for the purpose of providing personalized insights and recommendations.

Data Sharing:
Health data may be shared with third-party providers for the purpose of providing additional services or insights.

Data Retention:
Health data will be retained for a period determined by the user and may be deleted thereafter.

Privacy Policy:
- Data Protection: Protocol Health will protect health data in accordance with applicable laws and regulations.
- Data Breach: In the event of a data breach, Protocol Health will notify users promptly and take reasonable steps to mitigate the breach.
- Data Subject Rights: Users have the right to access, correct, or delete their health data, and to opt-out of certain data processing activities.

HIPAA Compliance:
- Protected Health Information (PHI): Health data is considered Protected Health Information (PHI) under HIPAA regulations.
- Business Associate Agreement (BAA): Protocol Health has entered into a Business Associate Agreement (BAA) with its third-party providers to ensure compliance with HIPAA regulations.
`;

const aiUsagePolicy = `
AI Technology Usage and Disclaimers

AI Technology Usage:
- AI-Generated Insights: The insights and recommendations provided by Protocol Health are generated using AI and machine learning technologies.
- Limitations of AI: AI-generated insights are not a substitute for professional medical advice and may have limitations and biases.
- Transparency and Explainability: Protocol Health will provide transparent and explainable insights and recommendations, including information about the data used to generate them.

Disclaimers:
- Medical Disclaimer: The insights and recommendations provided by Protocol Health are for informational purposes only and should not be considered medical advice.
- Liability Disclaimer: Protocol Health is not liable for any damages or losses resulting from the use of its services or insights.
- Warranty Disclaimer: Protocol Health does not warrant the accuracy, completeness, or fitness for purpose of its services or insights.
`;

const consentAgreement = `
Consent and Agreement

I, the undersigned user, acknowledge that I have read, understand, and agree to the terms and conditions outlined in the "Protocol Health Privacy Policy" and "Terms of Service"

Acknowledgement of Understanding
I acknowledge that I understand the following:
- The purpose and scope of the collection, use, and disclosure of my personal and health information.
- The risks and benefits associated with the use of AI and machine learning technologies to analyze my health data.
- The measures in place to protect my personal and health information from unauthorized access, use, or disclosure.
- My rights and responsibilities under Health Insurance Portability and Accountability Act (HIPAA)

Agreement to Terms:
I agree to the terms and conditions outlined above, including:
- The collection, use, and disclosure of my personal and health information for the purposes outlined in the policy.
- The use of AI and machine learning technologies to analyze my health data and provide insights and recommendations.
- The measures in place to protect my personal and health information from unauthorized access, use, or disclosure.

By providing my digital signature below, I signify that I have read, understand, and agree to the terms and conditions outlined above. I acknowledge that I am providing my consent voluntarily and that I am aware of my rights and responsibilities under the applicable laws and regulations.
`;

interface TerminalCommand {
  command: string;
  output: string;
  timestamp: string;
}

const PolicyText = ({ content }: { content: string }) => (
  <ScrollArea className="h-[400px] w-full rounded-md border p-4">
    <div className="text-sm whitespace-pre-wrap">{content}</div>
  </ScrollArea>
);

const HealthPilot = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [consents, setConsents] = useState({
    dataAccess: false,
    aiUsage: false,
    finalConsent: false
  });
  const [signature, setSignature] = useState("");
  const [signatureDate, setSignatureDate] = useState("");
  const [verificationHash, setVerificationHash] = useState("");

  const generateHash = () => {
    if (signature && signatureDate) {
      const hash = `${signature}-${signatureDate}-${Date.now()}`;
      setVerificationHash(hash);
    }
  };

  useEffect(() => {
    if (signature && signatureDate) {
      generateHash();
    }
  }, [signature, signatureDate]);

  const handleComplete = () => {
    navigate("/health-pilot-activation");
  };

  const handleExit = () => {
    navigate("/");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true; // Information only
      case 2:
        return consents.dataAccess;
      case 3:
        return consents.aiUsage;
      case 4:
        return consents.finalConsent && signature && signatureDate;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Section 1: How Protocol Health Pilot Uses AI</h2>
            {aiTermsSections.map((section: Section, index: number) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-muted-foreground">{section.content}</p>
              </Card>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Section 2: Data Access and Privacy Policy</h2>
            <Card className="p-6">
              <PolicyText content={dataAccessPolicy} />
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="dataAccess"
                  checked={consents.dataAccess}
                  onCheckedChange={(checked: boolean) => 
                    setConsents(prev => ({ ...prev, dataAccess: checked }))
                  }
                />
                <Label htmlFor="dataAccess">
                  I have read and understand the policies set forth
                </Label>
              </div>
            </Card>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Section 3: AI Technology Usage and Disclaimers</h2>
            <Card className="p-6">
              <PolicyText content={aiUsagePolicy} />
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="aiUsage"
                  checked={consents.aiUsage}
                  onCheckedChange={(checked: boolean) => 
                    setConsents(prev => ({ ...prev, aiUsage: checked }))
                  }
                />
                <Label htmlFor="aiUsage">
                  I have read and understand the policies set forth
                </Label>
              </div>
            </Card>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Section 4: Consent and Agreement</h2>
            <Card className="p-6">
              <PolicyText content={consentAgreement} />
              <div className="space-y-6 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="finalConsent"
                    checked={consents.finalConsent}
                    onCheckedChange={(checked: boolean) => 
                      setConsents(prev => ({ ...prev, finalConsent: checked }))
                    }
                  />
                  <Label htmlFor="finalConsent">
                    I have read and agree to all terms and conditions
                  </Label>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="signature">Digital Signature</Label>
                    <Input
                      id="signature"
                      placeholder="Type your full name"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Date and Time</Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      value={signatureDate}
                      onChange={(e) => setSignatureDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {verificationHash && (
                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <Label>Verification Hash</Label>
                      <p className="text-xs font-mono break-all mt-1">{verificationHash}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
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
                className={`w-1/4 h-2 rounded-full ${
                  i + 1 <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>AI Technology</span>
            <span>Data & Privacy</span>
            <span>AI Usage</span>
            <span>Agreement</span>
          </div>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          {currentStep === 1 ? (
            <Button
              onClick={handleExit}
              variant="outline"
            >
              Exit
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              variant="outline"
            >
              Previous
            </Button>
          )}
          {currentStep === totalSteps ? (
            <Button
              onClick={handleComplete}
              disabled={!verificationHash}
            >
              Complete
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
              disabled={!canProceed()}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthPilot;
