'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('animate-on-scroll');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Section 1: Hero with Background Image */}
      <section className="relative h-screen flex flex-col">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          <Image
            src="/Mask group.png"
            alt="Event Background"
            fill
            className="object-cover"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        </div>
        
        {/* RSVP Badge */}
        <div className={`absolute top-6 right-6 md:top-12 md:right-12 z-20 ${isLoaded ? 'animate-fade-in-scale delay-300' : 'opacity-0'}`}>
          <div className="premium-badge bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-bold tracking-wider shadow-2xl border border-amber-400/30">
            RSVP
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 py-16 md:py-20">
          {/* Logo */}
          <div className={`mb-6 md:mb-8 ${isLoaded ? 'animate-slide-in-left delay-100' : 'opacity-0'}`}>
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-lg flex items-center justify-center shadow-2xl">
                <div className="w-9 h-9 md:w-12 md:h-12 bg-black rounded-md flex flex-col justify-center space-y-1 px-1.5">
                  <div className="h-1 bg-white rounded-full"></div>
                  <div className="h-1 bg-white rounded-full"></div>
                  <div className="h-1 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-white font-black text-lg md:text-2xl lg:text-3xl tracking-wider leading-tight">
                LEVY<br />
                EROMA<br />
                MEDIA
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className={`mb-6 md:mb-8 ${isLoaded ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight leading-[0.9] tracking-tight">
              <span className="block premium-text-gradient">Cheers to New</span>
              <span className="block premium-text-gradient">Stories!</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className={`mb-6 md:mb-8 ${isLoaded ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
            <p className="text-amber-300 text-xl md:text-2xl lg:text-3xl font-medium tracking-wide">
              The Levy Eroma Media Launch
            </p>
          </div>

          {/* Elegant Divider */}
          <div className={`mb-8 md:mb-10 ${isLoaded ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
            <div className="flex items-center space-x-4">
              <div className="w-20 md:w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-amber-600"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse-glow"></div>
              <div className="w-20 md:w-32 h-px bg-gradient-to-r from-amber-600 via-amber-400 to-transparent"></div>
            </div>
          </div>

          {/* Description */}
          <div className={`${isLoaded ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
            <p className="text-gray-200 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl font-light">
              We're officially launching Levy Eroma Media and we want you there! Join us for a first look at our upcoming projects and an evening of bold storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Features with Wine Glasses - Reduced height */}
      <section className="relative min-h-[80vh] flex flex-col bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/5 via-transparent to-amber-800/10"></div>
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-600/8 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 py-12 md:py-16">
          {/* Premium Content Container */}
          <div className="premium-glass rounded-3xl md:rounded-[3rem] p-8 md:p-12 lg:p-16 hover-lift-premium">
            {/* Description */}
            <div className="animate-on-scroll mb-8 md:mb-12">
              <p className="text-gray-100 text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed text-center max-w-4xl mx-auto font-light tracking-wide">
                Expect craft cocktails, curated bites, and great company as we toast to new beginnings. We can't wait to celebrate with you!
              </p>
            </div>

            {/* Wine Glasses Image */}
            <div className="animate-on-scroll flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                <Image
                  src="/Wine glasses 1.png"
                  alt="Wine Glasses"
                  fill
                  className="object-contain animate-float drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-400/10 via-transparent to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Event Details - Reduced height */}
      <section className="relative min-h-[90vh] flex flex-col bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Luxury Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/8 via-transparent to-amber-700/5"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 py-12 md:py-16 space-y-12 md:space-y-16">
          {/* Where */}
          <div className="animate-on-scroll">
            <div className="text-center">
              <h2 className="text-amber-300/80 text-sm md:text-base uppercase tracking-[0.3em] mb-6 md:mb-8 font-medium">Where</h2>
              <div className="premium-glass rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 lg:p-12 hover-lift-premium">
                <h3 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight mb-4 md:mb-6 premium-text-gradient tracking-tight">The Ritz Carlton</h3>
                <p className="text-gray-200 text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-light">
                  900 W Olympic Blvd.<br />
                  Los Angeles, CA 90015
                </p>
              </div>
            </div>
          </div>

          {/* When */}
          <div className="animate-on-scroll">
            <div className="text-center">
              <h2 className="text-amber-300/80 text-sm md:text-base uppercase tracking-[0.3em] mb-6 md:mb-8 font-medium">When</h2>
              <div className="premium-glass rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 lg:p-12 hover-lift-premium">
                <h3 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight mb-4 md:mb-6 premium-text-gradient tracking-tight">Saturday February 21, 2026</h3>
                <p className="text-amber-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium tracking-wide">7:00PM - 11:00PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Final CTA - Reduced height */}
      <section className="relative min-h-[80vh] flex flex-col bg-gradient-to-t from-black via-gray-900 to-black">
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 py-12 md:py-16 text-center space-y-12 md:space-y-16">
          {/* Dress Code */}
          <div className="animate-on-scroll">
            <p className="text-gray-200 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-wide">
              <span className="text-amber-300 font-medium">Dress fabulous!</span>
            </p>
          </div>

          {/* RSVP Button */}
          <div className="animate-on-scroll">
            <button className="premium-button bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:via-amber-500 hover:to-amber-400 text-white px-12 py-6 md:px-16 md:py-8 lg:px-20 lg:py-10 rounded-full text-xl md:text-2xl lg:text-3xl font-bold tracking-wider transition-all duration-500 shadow-2xl border border-amber-400/30">
              Count me in
            </button>
          </div>

          {/* Footer Logo */}
          <div className="animate-on-scroll">
            <div className="flex justify-center">
              <div className="flex items-center space-x-4 md:space-x-6 opacity-40 hover:opacity-60 transition-opacity duration-300">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/90 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-black rounded-md flex flex-col justify-center space-y-0.5 px-1">
                    <div className="h-0.5 bg-white rounded-full"></div>
                    <div className="h-0.5 bg-white rounded-full"></div>
                    <div className="h-0.5 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-white font-bold text-base md:text-xl tracking-wider leading-tight">
                  LEVY<br />
                  EROMA<br />
                  MEDIA
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
