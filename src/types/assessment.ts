export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'likert' | 'scenario' | 'technical';
  options?: string[];
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory?: string;
  weight?: number;
}

export interface AssessmentResponse {
  questionId: string;
  answer: string | number;
  timeSpent?: number;
}

export interface WISCARScore {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WISCARScore;
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  feedback: string;
  suggestedPath: string[];
  alternativeCareers: string[];
}

export interface AssessmentProgress {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestion: number;
  totalQuestions: number;
  responses: AssessmentResponse[];
}