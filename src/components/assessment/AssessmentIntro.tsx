import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Target, Briefcase } from 'lucide-react';

interface AssessmentIntroProps {
  onStart: () => void;
}

export function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Carbon Auditor Readiness Assessment
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover your potential for a career in carbon auditing through our comprehensive evaluation of your interests, skills, and aptitude.
        </p>
      </div>

      {/* Key Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2">
          <CardHeader className="text-center pb-3">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">20-30 Minutes</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Complete assessment duration with thoughtful consideration
            </p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="text-center pb-3">
            <Target className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">WISCAR Framework</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Comprehensive evaluation across 6 key dimensions
            </p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="text-center pb-3">
            <Briefcase className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Career Guidance</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Personalized recommendations and learning pathways
            </p>
          </CardContent>
        </Card>
      </div>

      {/* About Carbon Auditing */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            About Carbon Auditing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Carbon Auditing involves measuring, verifying, and reporting greenhouse gas emissions by organizations or projects, 
            ensuring compliance with environmental regulations and standards. It is critical for businesses aiming to reduce 
            their carbon footprint and meet sustainability goals.
          </p>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Typical Career Paths:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Carbon Auditor',
                'Environmental Auditor', 
                'Sustainability Consultant',
                'Environmental Compliance Specialist',
                'Climate Change Analyst',
                'CSR Officer'
              ].map((career) => (
                <Badge key={career} variant="secondary" className="text-xs">
                  {career}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Key Success Traits:</h4>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li>• Attention to detail</li>
              <li>• Analytical thinking</li>
              <li>• Strong ethical standards</li>
              <li>• Environmental knowledge</li>
              <li>• Data analysis proficiency</li>
              <li>• Regulatory compliance understanding</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Sections */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Assessment Structure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-info/5 rounded-lg border border-info/20">
              <h4 className="font-semibold text-info mb-2">Psychometric Evaluation</h4>
              <p className="text-sm text-muted-foreground">
                Personality compatibility, interests, motivation, and cognitive style assessment
              </p>
            </div>
            
            <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
              <h4 className="font-semibold text-warning mb-2">Technical Aptitude</h4>
              <p className="text-sm text-muted-foreground">
                Domain knowledge, calculation skills, and problem-solving scenarios
              </p>
            </div>
            
            <div className="p-4 bg-success/5 rounded-lg border border-success/20">
              <h4 className="font-semibold text-success mb-2">WISCAR Framework</h4>
              <p className="text-sm text-muted-foreground">
                Will, Interest, Skill, Cognitive readiness, Ability to learn, Real-world alignment
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="text-center">
        <Button 
          onClick={onStart}
          size="lg"
          className="px-12 py-6 text-lg font-semibold shadow-medium hover:shadow-large transition-all duration-300"
        >
          Start Assessment
        </Button>
        <p className="text-sm text-muted-foreground mt-3">
          Your responses will be analyzed to provide personalized career guidance
        </p>
      </div>
    </div>
  );
}