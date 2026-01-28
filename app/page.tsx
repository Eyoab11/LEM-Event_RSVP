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
      {/* Section 1: Hero with Full-Screen Background Image */}
      <section className="relative h-screen flex flex-col">
        {/* Full-Screen Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/background.jpeg"
            alt="Event Background"
            fill
            className="object-cover"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        
        {/* RSVP Button */}
        <div className={`absolute top-6 right-6 md:top-12 md:right-12 z-20 ${isLoaded ? 'animate-fade-in-scale delay-300' : 'opacity-0'}`}>
          <a href="/rsvp">
            <button className="premium-badge bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-bold tracking-wider shadow-2xl border border-amber-400/30 transition-all duration-300 hover:scale-105 hover:shadow-3xl">
              RSVP
            </button>
          </a>
        </div>

        {/* Centered Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-8 md:px-16 lg:px-24 xl:px-32 py-16 md:py-20">
          {/* Larger Logo */}
          <div className={`mb-8 md:mb-12 ${isLoaded ? 'animate-slide-in-left delay-100' : 'opacity-0'}`}>
            <div className="w-56 h-21 md:w-80 md:h-30 lg:w-96 lg:h-36 xl:w-[28rem] xl:h-42 relative">
              <Image
                src="/lemmm-removebg-preview.png"
                alt="Levy Eromo Media Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Subtitle - Centered */}
          <div className={`mb-8 md:mb-12 ${isLoaded ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
            <p className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wide">
              The Levy Eromo Media Launch
            </p>
          </div>

          {/* Elegant Divider - Centered */}
          <div className={`mb-10 md:mb-14 ${isLoaded ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-24 md:w-40 h-1 bg-gradient-to-r from-transparent via-amber-400 to-amber-600"></div>
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse-glow"></div>
              <div className="w-24 md:w-40 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-transparent"></div>
            </div>
          </div>

          {/* Description - Centered */}
          <div className={`${isLoaded ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
            <p className="text-gray-200 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto font-light">
              We're officially launching Levy Eromo Media and we want you there! Join us for a first look at our upcoming projects and an evening of bold storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Features with Wine Glasses - With added spacing */}
      <section className="relative min-h-[60vh] flex flex-col bg-black py-12 md:py-16">
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black"></div>
          <div className="absolute top-1/3 left-1/4 w-[28rem] h-[28rem] bg-orange-500/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/6 right-1/6 w-40 h-40 bg-orange-400/12 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/6 left-1/3 w-60 h-60 bg-orange-500/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 py-6 md:py-8">
          {/* Premium Content Container */}
          <div className="premium-glass rounded-3xl md:rounded-[3rem] p-6 md:p-8 lg:p-10 xl:p-12 hover-lift-premium max-w-4xl mx-auto">
            {/* Description */}
            <div className="animate-on-scroll mb-6 md:mb-8">
              <p className="text-gray-100 text-lg md:text-xl lg:text-2xl xl:text-2xl leading-relaxed text-center max-w-3xl mx-auto font-light tracking-wide">
                Expect craft cocktails, curated bites, and great company as we toast to new beginnings. We can't wait to celebrate with you!
              </p>
            </div>

            {/* Wine Glasses Image */}
            <div className="animate-on-scroll flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
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

      {/* Section 3: Event Details - Minimized height */}
      <section className="relative min-h-[60vh] flex flex-col bg-black">
        {/* Luxury Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
          <div className="absolute top-1/4 right-1/5 w-80 h-80 bg-orange-500/12 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-orange-600/15 rounded-full blur-2xl"></div>
          <div className="absolute top-2/3 right-1/3 w-32 h-32 bg-orange-400/10 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 py-6 md:py-8 space-y-4 md:space-y-6">
          {/* Where */}
          <div className="animate-on-scroll">
            <div className="text-center">
              <h2 className="text-amber-300/80 text-sm md:text-base uppercase tracking-[0.3em] mb-4 md:mb-6 font-medium">Where</h2>
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-light mb-3 md:mb-4 premium-text-gradient tracking-tight">The Ritz Carlton</h3>
                <p className="text-gray-200 text-base md:text-lg lg:text-xl xl:text-xl leading-relaxed font-light">
                  900 W Olympic Blvd.<br />
                  Los Angeles, CA 90015
                </p>
              </div>
            </div>
          </div>

          {/* Elegant Divider - Between Where and When */}
          <div className="animate-on-scroll">
            <div className="flex items-center justify-center space-x-4 py-4 md:py-6">
              <div className="w-24 md:w-40 h-1 bg-gradient-to-r from-transparent via-amber-400 to-amber-600"></div>
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse-glow"></div>
              <div className="w-24 md:w-40 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-transparent"></div>
            </div>
          </div>

          {/* When */}
          <div className="animate-on-scroll">
            <div className="text-center">
              <h2 className="text-amber-300/80 text-sm md:text-base uppercase tracking-[0.3em] mb-4 md:mb-6 font-medium">When</h2>
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-3xl font-light mb-3 md:mb-4 premium-text-gradient tracking-tight">March 14</h3>
                <p className="text-amber-300 text-lg md:text-xl lg:text-2xl xl:text-2xl font-medium tracking-wide">7:00PM - 11:00PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Final CTA - Minimized height */}
      <section className="relative min-h-[50vh] flex flex-col bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black"></div>
          <div className="absolute top-1/5 left-1/6 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/5 w-48 h-48 bg-orange-600/12 rounded-full blur-2xl"></div>
          <div className="absolute top-3/4 left-2/3 w-56 h-56 bg-orange-400/8 rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 py-6 md:py-8 text-center space-y-6 md:space-y-8">
          {/* Dress Code - Centered between content above and button below */}
          <div className="animate-on-scroll">
            <p className="text-gray-200 text-lg md:text-xl lg:text-2xl xl:text-3xl font-light tracking-wide italic">
              Dress Fabulous!
            </p>
          </div>

          {/* RSVP Button */}
          <div className="animate-on-scroll">
            <a href="/rsvp">
              <button className="premium-button bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:via-amber-500 hover:to-amber-400 text-white px-8 py-4 md:px-12 md:py-6 lg:px-14 lg:py-7 rounded-full text-lg md:text-xl lg:text-2xl font-bold tracking-wider transition-all duration-500 shadow-2xl border border-amber-400/30">
                Count me in
              </button>
            </a>
          </div>

          {/* Footer Logo - Doubled in size */}
          <div className="animate-on-scroll">
            <div className="flex justify-center">
              <div className="w-48 h-16 md:w-64 md:h-20 lg:w-80 lg:h-24 relative opacity-40 hover:opacity-60 transition-opacity duration-300">
                <Image
                  src="/lemmm-removebg-preview.png"
                  alt="Levy Eromo Media Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
