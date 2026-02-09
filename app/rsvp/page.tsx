'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { RSVPForm } from '../../components/RSVPForm';
import { EventDetails } from '../../components/EventDetails';

import { API_ENDPOINTS, apiCall } from '../../lib/api';

export default function RSVPPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  useEffect(() => {
    const fetchEventData = async () => {
      if (!token) {
        setError('No invitation token provided');
        setLoading(false);
        return;
      }

      try {
        // Validate token and get event data
        const inviteData = await apiCall<any>(API_ENDPOINTS.validateInvite(token));
        
        // The invite validation already includes the event data
        const event = inviteData.invite.event;
        
        // Transform backend data to frontend format
        setEventData({
          id: event.id,
          eventName: event.eventName,
          eventDate: new Date(event.eventDate),
          eventStartTime: event.eventStartTime,
          eventEndTime: event.eventEndTime,
          venue: {
            name: event.venueName,
            address: event.venueAddress,
            city: event.venueCity,
            state: event.venueState,
            zipCode: event.venueZipCode,
            coordinates: event.venueLatitude && event.venueLongitude ? {
              latitude: event.venueLatitude,
              longitude: event.venueLongitude,
            } : undefined,
          },
          capacity: event.capacity,
          currentRegistrations: event.currentRegistrations,
          waitlistEnabled: event.waitlistEnabled,
          registrationOpen: event.registrationOpen,
          dressCode: event.dressCode,
          description: event.description || '',
        });
        
        setIsLoaded(true);
      } catch (err) {
        console.error('Error fetching event data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [token]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !eventData) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-light mb-4 text-red-400">Invalid Invitation</h2>
          <p className="text-gray-400 mb-6">{error || 'This invitation link is invalid or has expired'}</p>
          <a href="/">
            <button className="premium-button bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-full text-sm font-medium">
              Back to Home
            </button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background with subtle parallax */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/8 rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 left-1/6 w-32 h-32 bg-orange-500/6 rounded-full blur-2xl"></div>
          <div className="absolute top-1/6 right-1/3 w-48 h-48 bg-amber-500/4 rounded-full blur-3xl"></div>
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

            {/* Back Button */}
            <button 
              onClick={() => window.history.back()}
              className="premium-button bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 flex-shrink-0"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-8 md:py-16">
          <div className="max-w-6xl mx-auto w-full">
            {/* Title */}
            <div className={`text-center mb-8 md:mb-12 ${isLoaded ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extralight leading-tight tracking-tight mb-4 md:mb-6">
                <span className="block premium-text-gradient">Reserve Your</span>
                <span className="block premium-text-gradient">Spot</span>
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed px-4">
                Join us for an exclusive evening of networking, innovation, and celebration at the LEM Ventures Official Launch
              </p>
            </div>

            {/* Event Details */}
            <div className={`mb-8 md:mb-12 ${isLoaded ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
              <EventDetails eventData={eventData} />
            </div>

            {/* RSVP Form */}
            <div className={`mb-8 md:mb-12 ${isLoaded ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
              <RSVPForm 
                eventData={eventData}
                linkToken={token || ''}
              />
            </div>


          </div>
        </div>
      </section>
    </div>
  );
}