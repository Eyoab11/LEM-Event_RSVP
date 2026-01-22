'use client';

import { AttendeeData, EventData } from './RSVPForm';

interface ConfirmationStepProps {
  primaryAttendee: AttendeeData;
  plusOne: AttendeeData | null;
  eventData: EventData;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function ConfirmationStep({
  primaryAttendee,
  plusOne,
  eventData,
  onSubmit,
  onBack,
  isSubmitting
}: ConfirmationStepProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const attendeeCount = plusOne ? 2 : 1;
  const spotsRemaining = eventData.capacity - eventData.currentRegistrations;
  const willBeWaitlisted = spotsRemaining < attendeeCount;

  return (
    <div className="space-y-8">
      {/* Event Summary */}
      <div className="premium-glass rounded-3xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-light mb-8 text-center premium-text-gradient">
          Confirm Your Registration
        </h2>

        {/* Event Details */}
        <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-xl font-medium mb-4 text-amber-300">Event Details</h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between">
              <span>Event:</span>
              <span className="text-white font-medium">{eventData.eventName}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="text-white font-medium">{formatDate(eventData.eventDate)}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span className="text-white font-medium">
                {formatTime(eventData.eventStartTime)} - {formatTime(eventData.eventEndTime)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Venue:</span>
              <span className="text-white font-medium">{eventData.venue.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Address:</span>
              <span className="text-white font-medium text-right">
                {eventData.venue.address}<br />
                {eventData.venue.city}, {eventData.venue.state} {eventData.venue.zipCode}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Dress Code:</span>
              <span className="text-white font-medium">{eventData.dressCode}</span>
            </div>
          </div>
        </div>

        {/* Attendee Information */}
        <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-xl font-medium mb-4 text-amber-300">Attendee Information</h3>
          
          {/* Primary Attendee */}
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-3 text-white">Primary Attendee</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Name:</span>
                <span className="text-white font-medium">{primaryAttendee.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Company:</span>
                <span className="text-white font-medium">{primaryAttendee.company}</span>
              </div>
              <div className="flex justify-between">
                <span>Title:</span>
                <span className="text-white font-medium">{primaryAttendee.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="text-white font-medium">{primaryAttendee.email}</span>
              </div>
            </div>
          </div>

          {/* Plus One */}
          {plusOne && (
            <div>
              <h4 className="text-lg font-medium mb-3 text-white">Guest</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="text-white font-medium">{plusOne.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Company:</span>
                  <span className="text-white font-medium">{plusOne.company}</span>
                </div>
                <div className="flex justify-between">
                  <span>Title:</span>
                  <span className="text-white font-medium">{plusOne.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="text-white font-medium">{plusOne.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Capacity Status */}
        <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-xl font-medium mb-4 text-amber-300">Registration Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-300">
              <span>Total Attendees:</span>
              <span className="text-white font-medium">{attendeeCount}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Current Registrations:</span>
              <span className="text-white font-medium">{eventData.currentRegistrations}/{eventData.capacity}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Spots Remaining:</span>
              <span className="text-white font-medium">{Math.max(0, spotsRemaining)}</span>
            </div>
            
            {willBeWaitlisted && (
              <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <div className="flex items-center space-x-2 text-amber-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="font-medium">Waitlist Registration</span>
                </div>
                <p className="text-amber-200 text-sm mt-2">
                  The event is at capacity. You will be added to the waitlist and notified if spots become available.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onBack}
            className="premium-button bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 text-white px-8 py-4 rounded-full text-lg font-medium tracking-wide transition-all duration-300"
          >
            Back
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="premium-button bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:via-amber-500 hover:to-amber-400 text-white px-8 py-4 rounded-full text-lg font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Submitting Registration...</span>
              </div>
            ) : (
              willBeWaitlisted ? 'Join Waitlist' : 'Confirm Registration'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}