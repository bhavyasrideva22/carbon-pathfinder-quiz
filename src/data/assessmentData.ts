import { AssessmentQuestion } from '@/types/assessment';

export const psychometricQuestions: AssessmentQuestion[] = [
  {
    id: 'p1',
    text: 'I enjoy working with detailed data and finding patterns in complex information.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    subcategory: 'interest',
    weight: 1
  },
  {
    id: 'p2',
    text: 'Environmental sustainability is personally important to me.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    subcategory: 'interest',
    weight: 1.2
  },
  {
    id: 'p3',
    text: 'I prefer work that requires attention to detail and accuracy.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    subcategory: 'personality',
    weight: 1.1
  },
  {
    id: 'p4',
    text: 'I feel motivated when my work contributes to solving environmental challenges.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'psychometric',
    subcategory: 'motivation',
    weight: 1.3
  },
  {
    id: 'p5',
    text: 'When faced with a complex problem, I prefer to:',
    type: 'multiple-choice',
    options: [
      'Break it down into smaller, manageable parts',
      'Look for creative, innovative solutions',
      'Seek guidance from experts or established methods',
      'Use trial and error to find what works'
    ],
    category: 'psychometric',
    subcategory: 'cognitive',
    weight: 1
  }
];

export const technicalQuestions: AssessmentQuestion[] = [
  {
    id: 't1',
    text: 'What are the three main scopes of greenhouse gas emissions according to the GHG Protocol?',
    type: 'multiple-choice',
    options: [
      'Direct emissions, Indirect emissions, Other emissions',
      'Scope 1 (Direct), Scope 2 (Electricity), Scope 3 (Value chain)',
      'Carbon dioxide, Methane, Nitrous oxide',
      'Manufacturing, Transportation, Disposal'
    ],
    category: 'technical',
    subcategory: 'knowledge',
    weight: 1.2
  },
  {
    id: 't2',
    text: 'If a company uses 1,000 MWh of electricity from the grid with an emission factor of 0.5 kg CO2/kWh, what are the total CO2 emissions?',
    type: 'multiple-choice',
    options: [
      '500 kg CO2',
      '500 tonnes CO2',
      '5,000 kg CO2',
      '50 tonnes CO2'
    ],
    category: 'technical',
    subcategory: 'calculation',
    weight: 1.3
  },
  {
    id: 't3',
    text: 'Which standard is most commonly used for organizational greenhouse gas inventories?',
    type: 'multiple-choice',
    options: [
      'ISO 9001',
      'ISO 14001',
      'ISO 14064-1',
      'ISO 27001'
    ],
    category: 'technical',
    subcategory: 'standards',
    weight: 1.1
  },
  {
    id: 't4',
    text: 'A manufacturing company wants to reduce their carbon footprint. You discover their largest emission source is from purchased electricity. What scope is this and what would you recommend?',
    type: 'scenario',
    options: [
      'Scope 1 - Switch to renewable energy sources',
      'Scope 2 - Purchase renewable electricity or install solar panels',
      'Scope 3 - Improve energy efficiency in manufacturing',
      'Scope 2 - Reduce overall electricity consumption only'
    ],
    category: 'technical',
    subcategory: 'application',
    weight: 1.4
  }
];

export const wiscarQuestions: AssessmentQuestion[] = [
  // Will questions
  {
    id: 'w1',
    text: 'How likely are you to persist through a 6-month certification program even when the material becomes challenging?',
    type: 'likert',
    options: ['Very Unlikely', 'Unlikely', 'Neutral', 'Likely', 'Very Likely'],
    category: 'wiscar',
    subcategory: 'will',
    weight: 1.2
  },
  {
    id: 'w2',
    text: 'I have successfully completed long-term goals that required sustained effort over months or years.',
    type: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    category: 'wiscar',
    subcategory: 'will',
    weight: 1.1
  },
  // Interest questions
  {
    id: 'i1',
    text: 'How interested are you in learning about carbon accounting methodologies and emission calculation techniques?',
    type: 'likert',
    options: ['Not Interested', 'Slightly Interested', 'Moderately Interested', 'Very Interested', 'Extremely Interested'],
    category: 'wiscar',
    subcategory: 'interest',
    weight: 1.3
  },
  {
    id: 'i2',
    text: 'I actively seek information about environmental issues and sustainability practices.',
    type: 'likert',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
    category: 'wiscar',
    subcategory: 'interest',
    weight: 1.1
  },
  // Skill questions
  {
    id: 's1',
    text: 'Rate your current proficiency with data analysis and Excel/spreadsheet applications.',
    type: 'likert',
    options: ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'],
    category: 'wiscar',
    subcategory: 'skill',
    weight: 1.2
  },
  {
    id: 's2',
    text: 'How comfortable are you with reading and interpreting technical documentation and standards?',
    type: 'likert',
    options: ['Very Uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very Comfortable'],
    category: 'wiscar',
    subcategory: 'skill',
    weight: 1.1
  },
  // Cognitive questions
  {
    id: 'c1',
    text: 'When reviewing a company\'s emission data, you notice inconsistencies. What is your first approach?',
    type: 'multiple-choice',
    options: [
      'Flag the inconsistencies and request clarification',
      'Try to correct the data based on similar companies',
      'Ignore minor inconsistencies if the overall trend looks right',
      'Research industry standards to understand acceptable variance'
    ],
    category: 'wiscar',
    subcategory: 'cognitive',
    weight: 1.3
  },
  // Ability to Learn questions
  {
    id: 'a1',
    text: 'How do you typically respond when receiving feedback on your work?',
    type: 'multiple-choice',
    options: [
      'I appreciate feedback and actively seek ways to improve',
      'I listen to feedback but prefer to implement changes my way',
      'I find feedback helpful but sometimes feel defensive',
      'I prefer to figure things out independently'
    ],
    category: 'wiscar',
    subcategory: 'ability',
    weight: 1.2
  },
  // Real-world Alignment questions
  {
    id: 'r1',
    text: 'Carbon auditors often work with strict deadlines and regulatory requirements. How comfortable are you with this type of work environment?',
    type: 'likert',
    options: ['Very Uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very Comfortable'],
    category: 'wiscar',
    subcategory: 'realWorld',
    weight: 1.3
  }
];

export const allQuestions = [...psychometricQuestions, ...technicalQuestions, ...wiscarQuestions];