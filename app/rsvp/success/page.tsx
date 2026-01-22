'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { QRCodeDisplay } from '../../../components/QRCodeDisplay';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function RSVPSuccessContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const searchParams = useSearchParams();
  
  // Get registration details from URL params (in real app, this would come from API)
  const attendeeName = searchParams.get('name') || 'Guest';
  const hasGuest = searchParams.get('guest') === 'true';
  const isWaitlisted = searchParams.get('waitlisted') === 'true';

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleAddToCalendar = () => {
    // Generate Google Calendar URL
    const eventData = {
      title: 'LEM Ventures Official Launch',
      start: '20260221T190000',
      end: '20260221T230000',
      location: 'The Ritz Carlton, 900 W Olympic Blvd, Los Angeles, CA 90015',
      description: 'Join us for the official launch of LEM Ventures - an exclusive evening of networking, innovation, and celebration.'
    };

    // Create Google Calendar URL
    const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
    googleCalendarUrl.searchParams.set('action', 'TEMPLATE');
    googleCalendarUrl.searchParams.set('text', eventData.title);
    googleCalendarUrl.searchParams.set('dates', `${eventData.start}/${eventData.end}`);
    googleCalendarUrl.searchParams.set('location', eventData.location);
    googleCalendarUrl.searchParams.set('details', eventData.description);
    googleCalendarUrl.searchParams.set('ctz', 'America/Los_Angeles');

    // Open Google Calendar in new tab
    window.open(googleCalendarUrl.toString(), '_blank');
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/6 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/8 rounded-full blur-3xl"></div>
          <div className="absolute top-2/3 left-1/6 w-24 h-24 bg-amber-500/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/6 right-1/5 w-64 h-64 bg-orange-400/4 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/6 left-2/3 w-40 h-40 bg-amber-600/6 rounded-full blur-2xl"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-6 md:py-8">
          <div className={`flex items-center justify-between ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Logo */}
            <div className="w-24 h-8 sm:w-28 sm:h-10 md:w-32 md:h-12 lg:w-36 lg:h-14 relative flex-shrink-0">
              <Image
                src="/lemmm-removebg-preview.png"
                alt="LEM Ventures Logo"
                fill
                className="object-contain"
              />
            </div>

            {/* Home Button */}
            <a href="/">
              <button className="premium-button bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 flex-shrink-0">
                ← Home
              </button>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-8 md:py-16">
          <div className="max-w-4xl mx-auto w-full text-center">
            
            {/* Success Icon */}
            <div className={`mb-8 ${isLoaded ? 'animate-fade-in-scale delay-200' : 'opacity-0'}`}>
              <div className={`w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full flex items-center justify-center mb-8 ${
                isWaitlisted ? 'bg-amber-500/20 border-2 border-amber-500' : 'bg-green-500/20 border-2 border-green-500'
              }`}>
                {isWaitlisted ? (
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>

            {/* Title */}
            <div className={`mb-6 md:mb-8 ${isLoaded ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extralight leading-tight tracking-tight mb-4 md:mb-6">
                {isWaitlisted ? (
                  <span className="block premium-text-gradient">You're on the List!</span>
                ) : (
                  <span className="block premium-text-gradient">You're All Set!</span>
                )}
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed px-4">
                {isWaitlisted ? (
                  <>Thank you for your interest, {attendeeName}. You've been added to our waitlist and we'll notify you if spots become available.</>
                ) : (
                  <>Thank you for registering, {attendeeName}. We're excited to see you at the LEM Ventures Official Launch!</>
                )}
              </p>
            </div>

            {/* Registration Details */}
            <div className={`mb-8 md:mb-12 ${isLoaded ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
              <div className="premium-glass rounded-3xl p-6 md:p-8 lg:p-12 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-light mb-6 premium-text-gradient">
                  Registration Details
                </h2>
                
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-300">Status:</span>
                    <span className={`font-medium ${isWaitlisted ? 'text-amber-400' : 'text-green-400'}`}>
                      {isWaitlisted ? 'Waitlisted' : 'Confirmed'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-300">Attendees:</span>
                    <span className="text-white font-medium">
                      {hasGuest ? '2 (You + 1 Guest)' : '1 (Just You)'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-300">Event Date:</span>
                    <span className="text-white font-medium">Saturday, February 21, 2026</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-300">Time:</span>
                    <span className="text-white font-medium">7:00 PM - 11:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`space-y-6 ${isLoaded ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
              {!isWaitlisted && (
                <div className="space-y-4">
                  <button 
                    onClick={handleAddToCalendar}
                    className="premium-button bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:via-amber-500 hover:to-amber-400 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-medium tracking-wide mx-2"
                  >
                    📅 Add to Google Calendar
                  </button>
                  <div className="text-sm text-gray-400">
                    Check your email for your unique QR code and event details
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <a href="/">
                  <button className="premium-button bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-medium tracking-wide w-full sm:w-auto">
                    Back to Home
                  </button>
                </a>
                <button className="text-amber-400 hover:text-amber-300 font-medium transition-colors duration-300 px-6 py-3 sm:px-8 sm:py-4 w-full sm:w-auto">
                  Share Event
                </button>
              </div>
            </div>

            {/* QR Code Display - Only show if not waitlisted */}
            {!isWaitlisted && (
              <div className={`mt-12 ${isLoaded ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
                <QRCodeDisplay 
                  attendeeName={attendeeName}
                  registrationId={`REG-${Date.now().toString().slice(-8)}`}
                  eventId="lem-ventures-launch-2026"
                />
              </div>
            )}

            {/* Email Confirmation Note */}
            <div className={`mt-12 ${isLoaded ? 'animate-fade-in-up delay-700' : 'opacity-0'}`}>
              <div className="premium-glass rounded-2xl p-6 max-w-xl mx-auto">
                <div className="flex items-center space-x-3 text-amber-300 mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Email Confirmation</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {isWaitlisted ? (
                    'You\'ll receive an email confirmation of your waitlist status. We\'ll notify you immediately if spots become available.'
                  ) : (
                    'You\'ll receive a confirmation email with your QR code, event details, and directions within the next few minutes.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function RSVPSuccessPage() {
  return (
    <Suspense fallback={
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    }>
      <RSVPSuccessContent />
    </Suspense>
  );
}