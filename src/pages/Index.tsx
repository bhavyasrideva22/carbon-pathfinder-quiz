import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Target, Users, TrendingUp, Leaf, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30">
      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge className="px-4 py-2 text-sm font-medium">
              Professional Career Assessment
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent leading-tight">
              Carbon Auditor
              <br />
              Readiness Assessment
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover your potential for a rewarding career in carbon auditing through our comprehensive, 
              scientifically-validated assessment platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleStartAssessment}
              size="lg" 
              className="px-8 py-6 text-lg font-semibold shadow-large hover:shadow-xl transition-all duration-300"
            >
              Start Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground">
              Takes 20-30 minutes • Get instant results
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Assessment?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our assessment combines psychometric evaluation, technical aptitude testing, 
              and the proven WISCAR framework for comprehensive career analysis.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 shadow-medium hover:shadow-large transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">WISCAR Framework</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-muted-foreground">
                  Comprehensive evaluation across Will, Interest, Skill, Cognitive readiness, 
                  Ability to learn, and Real-world alignment.
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <Badge variant="outline" className="text-xs">Will</Badge>
                  <Badge variant="outline" className="text-xs">Interest</Badge>
                  <Badge variant="outline" className="text-xs">Skill</Badge>
                  <Badge variant="outline" className="text-xs">Cognitive</Badge>
                  <Badge variant="outline" className="text-xs">Ability</Badge>
                  <Badge variant="outline" className="text-xs">Real-world</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-medium hover:shadow-large transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <CardTitle className="text-xl">Validated Methods</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-muted-foreground">
                  Built on scientifically proven psychometric instruments and 
                  domain expert-reviewed technical assessments.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Big Five Personality Model</li>
                  <li>• Holland Career Codes</li>
                  <li>• Industry-standard technical evaluation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-medium hover:shadow-large transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <TrendingUp className="w-12 h-12 text-info mx-auto mb-4" />
                <CardTitle className="text-xl">Personalized Results</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-muted-foreground">
                  Receive detailed feedback, career alignment scores, and 
                  customized learning pathways based on your unique profile.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Confidence scoring</li>
                  <li>• Learning recommendations</li>
                  <li>• Alternative career paths</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Carbon Auditing Info Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Leaf className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">
                  About Carbon Auditing
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Carbon auditing is a critical field focused on measuring, verifying, and reporting 
                greenhouse gas emissions. As organizations worldwide commit to net-zero targets, 
                skilled carbon auditors are in high demand.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Career Opportunities</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Carbon Auditor',
                    'Environmental Auditor',
                    'Sustainability Consultant', 
                    'Climate Change Analyst',
                    'ESG Specialist',
                    'Environmental Compliance Officer'
                  ].map((career) => (
                    <div key={career} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{career}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Card className="shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Key Success Traits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {[
                    { trait: 'Attention to Detail', desc: 'Precision in data collection and analysis' },
                    { trait: 'Analytical Thinking', desc: 'Problem-solving and pattern recognition' },
                    { trait: 'Ethical Standards', desc: 'Integrity in reporting and verification' },
                    { trait: 'Technical Proficiency', desc: 'Understanding of GHG protocols and standards' }
                  ].map(({ trait, desc }) => (
                    <div key={trait} className="p-3 bg-accent/30 rounded-lg">
                      <h4 className="font-semibold text-sm text-foreground">{trait}</h4>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Discover Your Potential?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take the first step toward a meaningful career in carbon auditing. 
            Our comprehensive assessment will provide you with valuable insights 
            and personalized guidance for your professional journey.
          </p>
          <Button 
            onClick={handleStartAssessment}
            size="lg" 
            className="px-12 py-6 text-lg font-semibold shadow-large hover:shadow-xl transition-all duration-300"
          >
            Begin Your Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
