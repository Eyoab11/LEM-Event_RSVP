'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RSVPForm } from '../../components/RSVPForm';
import { PartnerLogoGrid } from '../../components/PartnerLogoGrid';
import { EventDetails } from '../../components/EventDetails';

// Dummy data for the event
const eventData = {
  id: '1',
  eventName: 'LEM Ventures Official Launch',
  eventDate: new Date('2026-02-21T19:00:00-08:00'),
  eventStartTime: '19:00',
  eventEndTime: '23:00',
  venue: {
    name: 'The Ritz Carlton',
    address: '900 W Olympic Blvd',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90015',
    coordinates: {
      latitude: 34.0430,
      longitude: -118.2673
    }
  },
  capacity: 150,
  currentRegistrations: 47,
  waitlistEnabled: true,
  registrationOpen: true,
  dressCode: 'Business Formal',
  description: 'Join us for the official launch of LEM Ventures - an exclusive evening of networking, innovation, and celebration.'
};

// Dummy partner logos data
const partnerLogos = [
  {
    id: '1',
    name: 'Title Sponsor 1',
    logoUrl: '/logo-79.png',
    tier: 'title' as const,
    websiteUrl: undefined,
    displayOrder: 1,
    isActive: true
  },
  {
    id: '2',
    name: 'Title Sponsor 2',
    logoUrl: '/Frame.png',
    tier: 'title' as const,
    websiteUrl: undefined,
    displayOrder: 2,
    isActive: true
  },
  {
    id: '3',
    name: 'Gold Partner 1',
    logoUrl: '/logo-79.png',
    tier: 'gold' as const,
    websiteUrl: undefined,
    displayOrder: 3,
    isActive: true
  },
  {
    id: '4',
    name: 'Gold Partner 2',
    logoUrl: '/Frame.png',
    tier: 'gold' as const,
    websiteUrl: undefined,
    displayOrder: 4,
    isActive: true
  },
  {
    id: '5',
    name: 'Silver Partner 1',
    logoUrl: '/logo-79.png',
    tier: 'silver' as const,
    websiteUrl: undefined,
    displayOrder: 5,
    isActive: true
  }
];

export default function RSVPPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
                linkToken="demo-token-12345"
              />
            </div>

            {/* Partner Logos */}
            <div className={`${isLoaded ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
              <PartnerLogoGrid partners={partnerLogos} displayTiers={true} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}