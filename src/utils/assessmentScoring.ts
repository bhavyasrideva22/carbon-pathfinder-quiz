import { AssessmentResponse, AssessmentResult, WISCARScore } from '@/types/assessment';
import { psychometricQuestions, technicalQuestions, wiscarQuestions } from '@/data/assessmentData';

export function calculateAssessmentResults(responses: AssessmentResponse[]): AssessmentResult {
  const psychometricScore = calculatePsychometricScore(responses);
  const technicalScore = calculateTechnicalScore(responses);
  const wiscarScores = calculateWISCARScores(responses);
  
  const overallScore = Math.round(
    (psychometricScore * 0.3 + technicalScore * 0.3 + getAverageWISCARScore(wiscarScores) * 0.4)
  );

  const recommendation = determineRecommendation(overallScore, psychometricScore, technicalScore);
  const feedback = generateFeedback(recommendation, overallScore, psychometricScore, technicalScore, wiscarScores);
  const suggestedPath = generateLearningPath(recommendation, technicalScore);
  const alternativeCareers = generateAlternativeCareers(recommendation, wiscarScores);

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation,
    feedback,
    suggestedPath,
    alternativeCareers
  };
}

function calculatePsychometricScore(responses: AssessmentResponse[]): number {
  const psychometricResponses = responses.filter(r => 
    psychometricQuestions.some(q => q.id === r.questionId)
  );

  if (psychometricResponses.length === 0) return 0;

  let totalScore = 0;
  let totalWeight = 0;

  psychometricResponses.forEach(response => {
    const question = psychometricQuestions.find(q => q.id === response.questionId);
    if (question) {
      const weight = question.weight || 1;
      let score = 0;
      
      if (question.type === 'likert') {
        score = (Number(response.answer) / 4) * 100; // Convert 0-4 scale to 0-100
      } else if (question.type === 'multiple-choice') {
        // Score based on "correctness" for psychometric questions
        score = getMultipleChoiceScore(question.id, response.answer as string);
      }
      
      totalScore += score * weight;
      totalWeight += weight;
    }
  });

  return Math.round(totalScore / totalWeight);
}

function calculateTechnicalScore(responses: AssessmentResponse[]): number {
  const technicalResponses = responses.filter(r => 
    technicalQuestions.some(q => q.id === r.questionId)
  );

  if (technicalResponses.length === 0) return 0;

  let totalScore = 0;
  let totalWeight = 0;

  technicalResponses.forEach(response => {
    const question = technicalQuestions.find(q => q.id === response.questionId);
    if (question) {
      const weight = question.weight || 1;
      const score = getTechnicalQuestionScore(question.id, response.answer as string);
      
      totalScore += score * weight;
      totalWeight += weight;
    }
  });

  return Math.round(totalScore / totalWeight);
}

function calculateWISCARScores(responses: AssessmentResponse[]): WISCARScore {
  const wiscarResponses = responses.filter(r => 
    wiscarQuestions.some(q => q.id === r.questionId)
  );

  const dimensions = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realWorld'];
  const scores: any = {};

  dimensions.forEach(dimension => {
    const dimensionResponses = wiscarResponses.filter(r => {
      const question = wiscarQuestions.find(q => q.id === r.questionId);
      return question?.subcategory === dimension;
    });

    if (dimensionResponses.length === 0) {
      scores[dimension] = 50; // Default score
      return;
    }

    let totalScore = 0;
    let totalWeight = 0;

    dimensionResponses.forEach(response => {
      const question = wiscarQuestions.find(q => q.id === response.questionId);
      if (question) {
        const weight = question.weight || 1;
        let score = 0;
        
        if (question.type === 'likert') {
          score = (Number(response.answer) / 4) * 100;
        } else if (question.type === 'multiple-choice') {
          score = getWISCARMultipleChoiceScore(question.id, response.answer as string);
        }
        
        totalScore += score * weight;
        totalWeight += weight;
      }
    });

    scores[dimension] = Math.round(totalScore / totalWeight);
  });

  return scores as WISCARScore;
}

function getTechnicalQuestionScore(questionId: string, answer: string): number {
  const correctAnswers: { [key: string]: string } = {
    't1': 'Scope 1 (Direct), Scope 2 (Electricity), Scope 3 (Value chain)',
    't2': '500 tonnes CO2',
    't3': 'ISO 14064-1',
    't4': 'Scope 2 - Purchase renewable electricity or install solar panels'
  };

  return correctAnswers[questionId] === answer ? 100 : 0;
}

function getMultipleChoiceScore(questionId: string, answer: string): number {
  // Scoring logic for psychometric multiple choice questions
  const scoringMap: { [key: string]: { [answer: string]: number } } = {
    'p5': {
      'Break it down into smaller, manageable parts': 100,
      'Seek guidance from experts or established methods': 75,
      'Look for creative, innovative solutions': 50,
      'Use trial and error to find what works': 25
    }
  };

  return scoringMap[questionId]?.[answer] || 50;
}

function getWISCARMultipleChoiceScore(questionId: string, answer: string): number {
  const scoringMap: { [key: string]: { [answer: string]: number } } = {
    'c1': {
      'Flag the inconsistencies and request clarification': 100,
      'Research industry standards to understand acceptable variance': 85,
      'Try to correct the data based on similar companies': 50,
      'Ignore minor inconsistencies if the overall trend looks right': 20
    },
    'a1': {
      'I appreciate feedback and actively seek ways to improve': 100,
      'I find feedback helpful but sometimes feel defensive': 75,
      'I listen to feedback but prefer to implement changes my way': 50,
      'I prefer to figure things out independently': 25
    }
  };

  return scoringMap[questionId]?.[answer] || 50;
}

function getAverageWISCARScore(wiscarScores: WISCARScore): number {
  const scores = Object.values(wiscarScores);
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

function determineRecommendation(overall: number, psychometric: number, technical: number): 'yes' | 'maybe' | 'no' {
  if (overall >= 75 && psychometric >= 70 && technical >= 60) return 'yes';
  if (overall >= 55 && (psychometric >= 60 || technical >= 50)) return 'maybe';
  return 'no';
}

function generateFeedback(
  recommendation: 'yes' | 'maybe' | 'no', 
  overall: number, 
  psychometric: number, 
  technical: number,
  wiscarScores: WISCARScore
): string {
  switch (recommendation) {
    case 'yes':
      return `Excellent! You demonstrate strong alignment with carbon auditing requirements. Your psychological fit (${psychometric}%) and technical readiness (${technical}%) indicate you're well-prepared to pursue this career path. Your analytical mindset and environmental motivation make you an ideal candidate.`;
    
    case 'maybe':
      return `You show solid potential for carbon auditing with room for growth. ${technical < 60 ? 'Focus on building technical knowledge in GHG protocols and environmental standards. ' : ''}${psychometric < 70 ? 'Consider developing stronger analytical and detail-oriented work habits. ' : ''}With targeted learning, you can become well-suited for this field.`;
    
    case 'no':
      return `While carbon auditing may not be the optimal fit currently, don't be discouraged. Your assessment reveals strengths that align with related environmental careers. Consider exploring alternative paths in sustainability that better match your interests and aptitudes while building foundational skills.`;
  }
}

function generateLearningPath(recommendation: 'yes' | 'maybe' | 'no', technicalScore: number): string[] {
  const basePath = [
    'Complete foundational environmental science coursework',
    'Learn GHG Protocol standards and ISO 14064 frameworks',
    'Develop proficiency in Excel and data analysis tools',
    'Practice emission calculation methodologies'
  ];

  const advancedPath = [
    'Pursue GHG Protocol certification',
    'Gain hands-on experience through internships or projects',
    'Specialize in specific sectors (manufacturing, energy, etc.)',
    'Build expertise in verification and assurance processes'
  ];

  const remedialPath = [
    'Strengthen mathematical and analytical foundations',
    'Take introductory courses in environmental regulations',
    'Develop attention to detail through structured exercises',
    'Build familiarity with sustainability reporting frameworks'
  ];

  switch (recommendation) {
    case 'yes':
      return technicalScore >= 70 ? advancedPath : [...basePath, ...advancedPath.slice(0, 2)];
    case 'maybe':
      return technicalScore >= 50 ? basePath : [...remedialPath, ...basePath.slice(0, 2)];
    case 'no':
      return remedialPath;
  }
}

function generateAlternativeCareers(recommendation: 'yes' | 'maybe' | 'no', wiscarScores: WISCARScore): string[] {
  if (recommendation === 'yes') return [];

  const alternatives: string[] = [];
  
  if (wiscarScores.interest >= 70) {
    alternatives.push('Sustainability Reporting Specialist', 'Environmental Policy Analyst');
  }
  
  if (wiscarScores.skill >= 60) {
    alternatives.push('Environmental Data Analyst', 'Regulatory Compliance Officer');
  }
  
  if (wiscarScores.cognitive >= 65) {
    alternatives.push('Environmental Consultant', 'Climate Change Researcher');
  }

  return alternatives.length > 0 ? alternatives : [
    'Environmental Educator',
    'Sustainability Coordinator',
    'Green Building Specialist'
  ];
}