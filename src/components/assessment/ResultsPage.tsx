import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResult } from '@/types/assessment';
import { CheckCircle, AlertCircle, XCircle, BookOpen, Users, Lightbulb, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsPageProps {
  results: AssessmentResult;
  onRestart: () => void;
}

export function ResultsPage({ results, onRestart }: ResultsPageProps) {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'maybe':
        return <AlertCircle className="w-6 h-6 text-warning" />;
      case 'no':
        return <XCircle className="w-6 h-6 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'border-success bg-success/5';
      case 'maybe':
        return 'border-warning bg-warning/5';
      case 'no':
        return 'border-destructive bg-destructive/5';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const wiscarLabels = {
    will: 'Will & Persistence',
    interest: 'Interest & Motivation',
    skill: 'Current Skills',
    cognitive: 'Cognitive Readiness',
    ability: 'Ability to Learn',
    realWorld: 'Real-World Alignment'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Your Assessment Results
        </h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive analysis of your carbon auditor readiness
        </p>
      </div>

      {/* Overall Recommendation */}
      <Card className={cn("border-2 shadow-large", getRecommendationColor())}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            {getRecommendationIcon()}
            Overall Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Confidence Score</span>
            <span className={cn("text-2xl font-bold", getScoreColor(results.overallScore))}>
              {results.overallScore}%
            </span>
          </div>
          <Progress value={results.overallScore} className="h-3" />
          <p className="text-foreground text-lg leading-relaxed">
            {results.feedback}
          </p>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Psychometric & Technical Scores */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Core Assessment Scores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Psychometric Fit</span>
                <span className={cn("font-bold", getScoreColor(results.psychometricScore))}>
                  {results.psychometricScore}%
                </span>
              </div>
              <Progress value={results.psychometricScore} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Technical Readiness</span>
                <span className={cn("font-bold", getScoreColor(results.technicalScore))}>
                  {results.technicalScore}%
                </span>
              </div>
              <Progress value={results.technicalScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* WISCAR Breakdown */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>WISCAR Framework Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(results.wiscarScores).map(([key, score]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {wiscarLabels[key as keyof typeof wiscarLabels]}
                  </span>
                  <span className={cn("font-bold text-sm", getScoreColor(score))}>
                    {score}%
                  </span>
                </div>
                <Progress value={score} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Learning Path & Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Recommended Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.suggestedPath.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Alternative Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.alternativeCareers.map((career, index) => (
              <div key={index} className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <Badge variant="outline" className="text-xs">
                  {career}
                </Badge>
              </div>
            ))}
            {results.alternativeCareers.length === 0 && (
              <p className="text-sm text-muted-foreground italic">
                You're well-aligned with carbon auditing! Focus on the recommended learning path above.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="shadow-medium border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            What's Next?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Based on your assessment results, we recommend taking these immediate actions to advance your carbon auditing career:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
              Research carbon auditing certifications (GHG Protocol, ISO 14064)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
              Join professional networks and sustainability communities
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
              Consider entry-level roles in environmental consulting
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
              Develop technical skills in data analysis and GHG calculations
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button onClick={onRestart} variant="outline" size="lg">
          Retake Assessment
        </Button>
        <Button size="lg" className="px-8">
          Download Results
        </Button>
      </div>
    </div>
  );
}