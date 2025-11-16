import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                  step.id < currentStep
                    ? 'bg-[#10B981] text-white' // Completed
                    : step.id === currentStep
                      ? 'bg-[#4A36EC] text-white' // Current
                      : 'bg-gray-200 text-gray-500' // Upcoming
                )}
              >
                {step.id < currentStep ? <Check className="h-5 w-5" /> : step.id}
              </div>

              {/* Step Info */}
              <div className="mt-2 text-center">
                <div className={cn('text-sm font-medium', step.id <= currentStep ? 'text-gray-900' : 'text-gray-500')}>{step.title}</div>
                <div className={cn('text-xs mt-1', step.id <= currentStep ? 'text-gray-600' : 'text-gray-400')}>{step.description}</div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 mt-[-2rem]">
                <div className={cn('h-0.5 transition-colors', step.id < currentStep ? 'bg-[#10B981]' : 'bg-gray-200')} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
