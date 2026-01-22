'use client';

import { useState } from 'react';

interface MobileNavigationProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onStepChange?: (step: number) => void;
  canNavigateBack?: boolean;
}

export function MobileNavigation({ 
  currentStep, 
  totalSteps, 
  stepTitles, 
  onStepChange,
  canNavigateBack = true 
}: MobileNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="md:hidden">
      {/* Mobile Progress Bar */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">
            Step {currentStep} of {totalSteps}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-amber-400 text-sm font-medium"
          >
            {isExpanded ? 'Hide' : 'Show'} Steps
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Current Step Title */}
        <div className="text-white font-medium text-sm">
          {stepTitles[currentStep - 1]}
        </div>
      </div>

      {/* Expandable Step List */}
      {isExpanded && (
        <div className="bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-3">
          <div className="space-y-2">
            {stepTitles.map((title, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              const isClickable = canNavigateBack && stepNumber < currentStep && onStepChange;

              return (
                <button
                  key={stepNumber}
                  onClick={() => isClickable ? onStepChange!(stepNumber) : undefined}
                  disabled={!isClickable}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                    isCurrent 
                      ? 'bg-amber-500/20 border border-amber-500/30' 
                      : isCompleted 
                        ? 'bg-green-500/10 border border-green-500/20' 
                        : 'bg-gray-800/50 border border-gray-600/30'
                  } ${isClickable ? 'hover:bg-amber-500/10' : ''}`}
                >
                  {/* Step Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isCurrent 
                      ? 'bg-amber-500 text-white' 
                      : isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-600 text-gray-300'
                  }`}>
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      stepNumber
                    )}
                  </div>
                  
                  {/* Step Title */}
                  <div className="flex-1 text-left">
                    <div className={`font-medium ${
                      isCurrent ? 'text-amber-300' : isCompleted ? 'text-green-300' : 'text-gray-400'
                    }`}>
                      {title}
                    </div>
                  </div>
                  
                  {/* Navigation Arrow */}
                  {isClickable && (
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Desktop Step Indicator Component
interface DesktopStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export function DesktopStepIndicator({ currentStep, totalSteps, stepTitles }: DesktopStepIndicatorProps) {
  return (
    <div className="hidden md:block">
      <div className="flex items-center justify-center space-x-8 mb-8">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300 ${
                  isCurrent 
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' 
                    : isCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-700 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <div className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                  isCurrent ? 'text-amber-300' : isCompleted ? 'text-green-300' : 'text-gray-500'
                }`}>
                  {title}
                </div>
              </div>
              
              {/* Connector Line */}
              {stepNumber < totalSteps && (
                <div className={`w-24 h-px mx-4 transition-colors duration-300 ${
                  stepNumber < currentStep ? 'bg-green-500' : 'bg-gray-600'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}