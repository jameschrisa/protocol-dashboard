import { useEffect } from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AnalysisResult {
  category: string;
  score: number;
  insights: string[];
  recommendations: string[];
}

export default function AnalysisResults() {
  const navigate = useNavigate();
  const results: AnalysisResult[] = [
    {
      category: "Physical Health",
      score: 85,
      insights: [
        "Above average cardiovascular health",
        "Regular exercise routine maintained",
        "Good sleep patterns observed"
      ],
      recommendations: [
        "Consider increasing strength training",
        "Maintain current cardio routine",
        "Continue prioritizing sleep quality"
      ]
    },
    {
      category: "Mental Wellbeing",
      score: 78,
      insights: [
        "Stress levels within normal range",
        "Consistent meditation practice",
        "Good work-life balance"
      ],
      recommendations: [
        "Explore stress reduction techniques",
        "Consider increasing mindfulness sessions",
        "Maintain regular breaks during work"
      ]
    },
    {
      category: "Nutrition",
      score: 82,
      insights: [
        "Balanced macro-nutrient intake",
        "Regular meal timing",
        "Good hydration levels"
      ],
      recommendations: [
        "Consider increasing protein intake",
        "Add more variety to vegetable consumption",
        "Maintain current hydration habits"
      ]
    }
  ];

  useEffect(() => {
    // In a real app, you would fetch the analysis results here
    // For now, we're using static data
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-blue-500";
    return "text-yellow-500";
  };

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Analysis Results</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <Card key={result.category} className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{result.category}</h3>
                  <span className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                    {result.score}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Key Insights</h4>
                  <ul className="space-y-1">
                    {result.insights.map((insight, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                  <ul className="space-y-1">
                    {result.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
