import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  className?: string;
}

export function ProgressIndicator({ currentStep, totalSteps, steps, className }: ProgressIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      
      <div className="w-full bg-secondary rounded-full h-2 mb-4">
        <div 
          className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        {steps.map((step, index) => (
          <span 
            key={index}
            className={cn(
              "transition-colors duration-200",
              index < currentStep ? "text-primary font-medium" : "",
              index === currentStep - 1 ? "text-foreground font-medium" : ""
            )}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}