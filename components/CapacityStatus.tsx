'use client';

import { useState, useEffect } from 'react';

interface CapacityStatusProps {
  currentRegistrations: number;
  capacity: number;
  className?: string;
}

export function CapacityStatus({ currentRegistrations, capacity, className = '' }: CapacityStatusProps) {
  const [animatedCount, setAnimatedCount] = useState(0);
  
  const spotsRemaining = capacity - currentRegistrations;
  const capacityPercentage = (currentRegistrations / capacity) * 100;
  
  // Animate the counter
  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const increment = currentRegistrations / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= currentRegistrations) {
        setAnimatedCount(currentRegistrations);
        clearInterval(timer);
      } else {
        setAnimatedCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [currentRegistrations]);

  const getStatusColor = () => {
    if (spotsRemaining <= 0) return 'text-red-400';
    if (spotsRemaining <= 10) return 'text-amber-400';
    return 'text-green-400';
  };

  const getStatusIcon = () => {
    if (spotsRemaining <= 0) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    if (spotsRemaining <= 10) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  const getStatusMessage = () => {
    if (spotsRemaining <= 0) return 'Event Full - Waitlist Available';
    if (spotsRemaining <= 10) return `Limited Spots Remaining (${spotsRemaining})`;
    return 'Spots Available';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Capacity Numbers */}
      <div className="flex justify-between items-center">
        <span className="text-gray-300 text-sm">Event Capacity</span>
        <span className="text-white font-medium">
          <span className="text-2xl font-light">{animatedCount}</span>
          <span className="text-gray-400"> / {capacity}</span>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        {/* Capacity markers */}
        <div className="absolute top-0 left-0 w-full h-3 flex">
          {[25, 50, 75].map(marker => (
            <div
              key={marker}
              className="absolute top-0 w-px h-3 bg-black/30"
              style={{ left: `${marker}%` }}
            />
          ))}
        </div>
      </div>

      {/* Status Message */}
      <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
        {getStatusIcon()}
        <span className="font-medium text-sm">{getStatusMessage()}</span>
      </div>

      {/* Additional Info */}
      {spotsRemaining > 0 && spotsRemaining <= 20 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
          <p className="text-amber-200 text-sm">
            ⚡ High demand! Only {spotsRemaining} spots left. Register now to secure your place.
          </p>
        </div>
      )}

      {spotsRemaining <= 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
          <p className="text-red-200 text-sm">
            📋 This event has reached capacity. Join our waitlist to be notified if spots become available.
          </p>
        </div>
      )}
    </div>
  );
}