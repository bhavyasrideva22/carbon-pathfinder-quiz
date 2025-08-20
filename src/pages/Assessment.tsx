import { useState, useEffect } from 'react';
import { AssessmentIntro } from '@/components/assessment/AssessmentIntro';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { ResultsPage } from '@/components/assessment/ResultsPage';
import { ProgressIndicator } from '@/components/ui/progress-indicator';
import { AssessmentProgress, AssessmentResponse, AssessmentResult } from '@/types/assessment';
import { allQuestions } from '@/data/assessmentData';
import { calculateAssessmentResults } from '@/utils/assessmentScoring';

const SECTION_STEPS = ['Introduction', 'Psychometric', 'Technical', 'WISCAR', 'Results'];

export default function Assessment() {
  const [progress, setProgress] = useState<AssessmentProgress>({
    currentSection: 'intro',
    currentQuestion: 0,
    totalQuestions: allQuestions.length,
    responses: []
  });

  const [results, setResults] = useState<AssessmentResult | null>(null);

  const handleStart = () => {
    setProgress(prev => ({
      ...prev,
      currentSection: 'psychometric',
      currentQuestion: 0
    }));
  };

  const handleAnswer = (answer: string | number) => {
    const currentQuestion = allQuestions[progress.currentQuestion];
    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      answer,
      timeSpent: 0
    };

    setProgress(prev => ({
      ...prev,
      responses: [
        ...prev.responses.filter(r => r.questionId !== currentQuestion.id),
        newResponse
      ]
    }));
  };

  const handleNext = () => {
    if (progress.currentQuestion < allQuestions.length - 1) {
      const nextQuestion = progress.currentQuestion + 1;
      const nextQuestionData = allQuestions[nextQuestion];
      
      let nextSection = progress.currentSection;
      if (nextQuestionData.category === 'technical' && progress.currentSection === 'psychometric') {
        nextSection = 'technical';
      } else if (nextQuestionData.category === 'wiscar' && progress.currentSection === 'technical') {
        nextSection = 'wiscar';
      }

      setProgress(prev => ({
        ...prev,
        currentQuestion: nextQuestion,
        currentSection: nextSection
      }));
    } else {
      // Assessment complete - calculate results
      const assessmentResults = calculateAssessmentResults(progress.responses);
      setResults(assessmentResults);
      setProgress(prev => ({
        ...prev,
        currentSection: 'results'
      }));
    }
  };

  const handleRestart = () => {
    setProgress({
      currentSection: 'intro',
      currentQuestion: 0,
      totalQuestions: allQuestions.length,
      responses: []
    });
    setResults(null);
  };

  const getCurrentStepIndex = () => {
    switch (progress.currentSection) {
      case 'intro': return 1;
      case 'psychometric': return 2;
      case 'technical': return 3;
      case 'wiscar': return 4;
      case 'results': return 5;
      default: return 1;
    }
  };

  const getCurrentAnswer = () => {
    const currentQuestion = allQuestions[progress.currentQuestion];
    const response = progress.responses.find(r => r.questionId === currentQuestion?.id);
    return response?.answer;
  };

  if (progress.currentSection === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30 py-8 px-4">
        <AssessmentIntro onStart={handleStart} />
      </div>
    );
  }

  if (progress.currentSection === 'results' && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30 py-8 px-4">
        <ResultsPage results={results} onRestart={handleRestart} />
      </div>
    );
  }

  const currentQuestion = allQuestions[progress.currentQuestion];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProgressIndicator
          currentStep={getCurrentStepIndex()}
          totalSteps={SECTION_STEPS.length}
          steps={SECTION_STEPS}
          className="mb-8"
        />
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {progress.currentSection.charAt(0).toUpperCase() + progress.currentSection.slice(1)} Assessment
          </h2>
          <p className="text-muted-foreground">
            Question {progress.currentQuestion + 1} of {progress.totalQuestions}
          </p>
        </div>

        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            onNext={handleNext}
            currentAnswer={getCurrentAnswer()}
            isLast={progress.currentQuestion === allQuestions.length - 1}
          />
        )}
      </div>
    </div>
  );
}