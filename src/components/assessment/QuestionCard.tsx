import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AssessmentQuestion } from '@/types/assessment';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: AssessmentQuestion;
  onAnswer: (answer: string | number) => void;
  onNext: () => void;
  currentAnswer?: string | number;
  isLast?: boolean;
}

export function QuestionCard({ question, onAnswer, onNext, currentAnswer, isLast }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>(currentAnswer?.toString() || '');

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);
    if (question.type === 'likert') {
      const likertValue = question.options?.indexOf(value) || 0;
      onAnswer(likertValue);
    } else {
      onAnswer(value);
    }
  };

  const handleNext = () => {
    if (selectedAnswer) {
      onNext();
    }
  };

  const getCategoryBadge = () => {
    const categoryColors = {
      psychometric: 'bg-info/10 text-info',
      technical: 'bg-warning/10 text-warning',
      wiscar: 'bg-success/10 text-success'
    };
    
    return (
      <span className={cn(
        'px-2 py-1 rounded-full text-xs font-medium',
        categoryColors[question.category]
      )}>
        {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
        {question.subcategory && ` - ${question.subcategory}`}
      </span>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl leading-relaxed pr-4">
            {question.text}
          </CardTitle>
          {getCategoryBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <RadioGroup 
          value={selectedAnswer} 
          onValueChange={handleAnswerChange}
          className="space-y-3"
        >
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <RadioGroupItem 
                value={option} 
                id={`option-${index}`}
                className="border-2"
              />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-1 cursor-pointer py-2 px-3 rounded-md hover:bg-accent/50 transition-colors"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleNext}
            disabled={!selectedAnswer}
            size="lg"
            className="px-8"
          >
            {isLast ? 'Complete Assessment' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}