'use client';

import { ReactNode } from 'react';

interface ResponsiveLayoutProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  className?: string;
}

export function ResponsiveLayout({ 
  children, 
  maxWidth = 'xl', 
  padding = true, 
  className = '' 
}: ResponsiveLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full'
  };

  const paddingClasses = padding ? 'px-4 sm:px-6 lg:px-8' : '';

  return (
    <div className={`w-full ${maxWidthClasses[maxWidth]} mx-auto ${paddingClasses} ${className}`}>
      {children}
    </div>
  );
}

// Container for full-width sections
export function SectionContainer({ 
  children, 
  className = '',
  background = 'transparent' 
}: { 
  children: ReactNode; 
  className?: string;
  background?: 'transparent' | 'glass' | 'dark';
}) {
  const backgroundClasses = {
    transparent: '',
    glass: 'premium-glass',
    dark: 'bg-gray-900/50'
  };

  return (
    <section className={`w-full ${backgroundClasses[background]} ${className}`}>
      <ResponsiveLayout>
        {children}
      </ResponsiveLayout>
    </section>
  );
}

// Grid layout for responsive cards
export function ResponsiveGrid({ 
  children, 
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 6,
  className = '' 
}: { 
  children: ReactNode;
  columns?: { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number;
  className?: string;
}) {
  const gridClasses = [
    `grid`,
    `gap-${gap}`,
    columns.sm && `grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
}