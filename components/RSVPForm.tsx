'use client';

import { useState } from 'react';
import { AttendeeForm } from './AttendeeForm';
import { ConfirmationStep } from './ConfirmationStep';
import { MobileNavigation, DesktopStepIndicator } from './MobileNavigation';

import { API_ENDPOINTS, apiCall } from '../lib/api';

export interface AttendeeData {
  name: string;
  company: string;
  title: string;
  email: string;
}

export interface EventData {
  id: string;
  eventName: string;
  eventDate: Date;
  eventStartTime: string;
  eventEndTime: string;
  venue: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  capacity: number;
  currentRegistrations: number;
  waitlistEnabled: boolean;
  registrationOpen: boolean;
  dressCode: string;
  description: string;
}

export interface RSVPFormProps {
  eventData: EventData;
  linkToken: string;
}

export enum RegistrationStep {
  ATTENDEE_INFO = 'attendee_info',
  PLUS_ONE = 'plus_one',
  CONFIRMATION = 'confirmation'
}

export function RSVPForm({ eventData, linkToken }: RSVPFormProps) {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(RegistrationStep.ATTENDEE_INFO);
  const [primaryAttendee, setPrimaryAttendee] = useState<AttendeeData>({
    name: '',
    company: '',
    title: '',
    email: ''
  });
  const [plusOne, setPlusOne] = useState<AttendeeData | null>(null);
  const [includePlusOne, setIncludePlusOne] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handlePrimaryAttendeeSubmit = (data: AttendeeData) => {
    setPrimaryAttendee(data);
    setCurrentStep(RegistrationStep.PLUS_ONE);
  };

  const handlePlusOneSubmit = (data: AttendeeData | null) => {
    setPlusOne(data);
    setCurrentStep(RegistrationStep.CONFIRMATION);
  };

  const stepTitles = ['Your Information', 'Guest Information', 'Confirmation'];
  const currentStepNumber = currentStep === RegistrationStep.ATTENDEE_INFO ? 1 : 
                           currentStep === RegistrationStep.PLUS_ONE ? 2 : 3;

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare the RSVP data
      const rsvpData = {
        token: linkToken,
        name: primaryAttendee.name,
        company: primaryAttendee.company,
        title: primaryAttendee.title,
        email: primaryAttendee.email,
        plusOne: plusOne ? {
          name: plusOne.name,
          company: plusOne.company,
          title: plusOne.title,
          email: plusOne.email,
        } : undefined,
      };

      // Submit to backend API
      const result = await apiCall<any>(API_ENDPOINTS.submitRSVP(), {
        method: 'POST',
        body: JSON.stringify(rsvpData),
      });
      
      // Redirect to success page with registration details
      window.location.href = `/rsvp/success/${result.attendee.id}`;
    } catch (error) {
      console.error('Registration failed:', error);
      alert(error instanceof Error ? error.message : 'Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep === RegistrationStep.PLUS_ONE) {
      setCurrentStep(RegistrationStep.ATTENDEE_INFO);
    } else if (currentStep === RegistrationStep.CONFIRMATION) {
      setCurrentStep(RegistrationStep.PLUS_ONE);
    }
  };

  if (registrationComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="premium-glass rounded-3xl p-8 md:p-12 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-light mb-4 premium-text-gradient">
              You're All Set!
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Your registration has been confirmed. You'll receive a confirmation email with your QR code and event details shortly.
            </p>
          </div>
          
          <div className="space-y-4">
            <button className="premium-button bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:via-amber-500 hover:to-amber-400 text-white px-8 py-4 rounded-full text-lg font-medium tracking-wide w-full md:w-auto">
              Add to Calendar
            </button>
            <div className="text-sm text-gray-400">
              Check your email for your unique QR code
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Mobile Navigation */}
      <MobileNavigation
        currentStep={currentStepNumber}
        totalSteps={3}
        stepTitles={stepTitles}
        canNavigateBack={false}
      />

      {/* Desktop Step Indicator */}
      <DesktopStepIndicator
        currentStep={currentStepNumber}
        totalSteps={3}
        stepTitles={stepTitles}
      />

      {/* Form Steps */}
      {currentStep === RegistrationStep.ATTENDEE_INFO && (
        <AttendeeForm
          title="Your Information"
          subtitle="Please provide your details for the event registration"
          initialData={primaryAttendee}
          onSubmit={handlePrimaryAttendeeSubmit}
          showBackButton={false}
        />
      )}

      {currentStep === RegistrationStep.PLUS_ONE && (
        <div className="space-y-8">
          {/* Plus One Selection */}
          <div className="premium-glass rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-center premium-text-gradient">
              Bringing a Guest?
            </h2>
            <p className="text-gray-300 text-center mb-8 leading-relaxed">
              You may bring one additional guest to the event. Please provide their information below.
            </p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <button
                onClick={() => setIncludePlusOne(false)}
                className={`px-8 py-4 rounded-full font-medium transition-all duration-300 ${
                  !includePlusOne 
                    ? 'bg-amber-500 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Just Me
              </button>
              <button
                onClick={() => setIncludePlusOne(true)}
                className={`px-8 py-4 rounded-full font-medium transition-all duration-300 ${
                  includePlusOne 
                    ? 'bg-amber-500 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Bring a Guest
              </button>
            </div>

            {!includePlusOne && (
              <div className="text-center">
                <button
                  onClick={() => handlePlusOneSubmit(null)}
                  className="premium-button bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:via-amber-500 hover:to-amber-400 text-white px-8 py-4 rounded-full text-lg font-medium tracking-wide"
                >
                  Continue
                </button>
              </div>
            )}
          </div>

          {/* Plus One Form */}
          {includePlusOne && (
            <AttendeeForm
              title="Guest Information"
              subtitle="Please provide your guest's details"
              initialData={plusOne || { name: '', company: '', title: '', email: '' }}
              onSubmit={handlePlusOneSubmit}
              showBackButton={true}
              onBack={handleBack}
            />
          )}
        </div>
      )}

      {currentStep === RegistrationStep.CONFIRMATION && (
        <ConfirmationStep
          primaryAttendee={primaryAttendee}
          plusOne={plusOne}
          eventData={eventData}
          onSubmit={handleFinalSubmit}
          onBack={handleBack}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}