import React from "react";
import { Card } from "../components/ui/card";

export const LongevityIndex = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Longevity Index</h1>
      </div>
      
      <Card className="p-6">
        <p className="text-muted-foreground">
          Coming soon: Your personalized longevity metrics and insights.
        </p>
      </Card>
    </div>
  );
};

export default LongevityIndex;
