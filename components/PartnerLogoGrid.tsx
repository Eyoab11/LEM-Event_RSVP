'use client';

import Image from 'next/image';

export interface PartnerLogo {
  id: string;
  name: string;
  logoUrl: string;
  tier: 'title' | 'gold' | 'silver';
  websiteUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

interface PartnerLogoGridProps {
  partners: PartnerLogo[];
  displayTiers: boolean;
}

export function PartnerLogoGrid({ partners, displayTiers }: PartnerLogoGridProps) {
  const activePartners = partners.filter(partner => partner.isActive);
  
  const partnersByTier = {
    title: activePartners.filter(p => p.tier === 'title').sort((a, b) => a.displayOrder - b.displayOrder),
    gold: activePartners.filter(p => p.tier === 'gold').sort((a, b) => a.displayOrder - b.displayOrder),
    silver: activePartners.filter(p => p.tier === 'silver').sort((a, b) => a.displayOrder - b.displayOrder)
  };

  const getTierTitle = (tier: string) => {
    switch (tier) {
      case 'title': return 'Title Sponsor';
      case 'gold': return 'Gold Partners';
      case 'silver': return 'Silver Partners';
      default: return '';
    }
  };

  const getTierSize = (tier: string) => {
    switch (tier) {
      case 'title': return 'w-40 h-24 md:w-48 md:h-28 lg:w-52 lg:h-32';
      case 'gold': return 'w-32 h-20 md:w-36 md:h-22 lg:w-40 lg:h-24';
      case 'silver': return 'w-28 h-16 md:w-32 md:h-18 lg:w-36 lg:h-20';
      default: return 'w-32 h-20';
    }
  };

  const PartnerLogo = ({ partner }: { partner: PartnerLogo }) => {
    const logoElement = (
      <div className={`${getTierSize(partner.tier)} relative group cursor-pointer`}>
        <div className="w-full h-full bg-gradient-to-br from-white/15 via-white/10 to-white/5 rounded-2xl border border-white/30 flex items-center justify-center p-6 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-amber-400/20 group-hover:via-amber-500/15 group-hover:to-amber-600/10 group-hover:border-amber-400/60 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-amber-500/20 backdrop-blur-sm">
          <div className="w-full h-full relative">
            <Image
              src={partner.logoUrl}
              alt={partner.name}
              fill
              className="object-contain filter brightness-0 invert transition-all duration-500 group-hover:brightness-110 group-hover:drop-shadow-lg"
            />
          </div>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 via-amber-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-amber-500/3 group-hover:to-amber-600/5 transition-all duration-500"></div>
        </div>
      </div>
    );

    return logoElement;
  };

  if (activePartners.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-amber-800/5 rounded-3xl"></div>
      <div className="absolute top-4 right-4 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-4 left-4 w-24 h-24 bg-amber-600/8 rounded-full blur-xl"></div>
      
      <div className="premium-glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
        {/* Subtle top border accent */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-amber-600"></div>
            <div className="mx-4">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
            <div className="w-12 h-px bg-gradient-to-r from-amber-600 via-amber-400 to-transparent"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-light mb-4 premium-text-gradient tracking-wide">
            Event Partners
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg font-light tracking-wide">
            Proudly supported by our distinguished partners
          </p>
          
          {/* Decorative underline */}
          <div className="flex items-center justify-center mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
          </div>
        </div>

        <div className="space-y-16">
          {displayTiers ? (
            // Display by tiers
            <>
              {partnersByTier.title.length > 0 && (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
                    <h3 className="text-amber-300 text-sm uppercase tracking-[0.2em] mx-4 font-medium">
                      {getTierTitle('title')}
                    </h3>
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
                  </div>
                  <div className="flex justify-center">
                    <PartnerLogo partner={partnersByTier.title[0]} />
                  </div>
                </div>
              )}

              {partnersByTier.gold.length > 0 && (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
                    <h3 className="text-amber-300 text-sm uppercase tracking-[0.2em] mx-4 font-medium">
                      {getTierTitle('gold')}
                    </h3>
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-8">
                    {partnersByTier.gold.map(partner => (
                      <PartnerLogo key={partner.id} partner={partner} />
                    ))}
                  </div>
                </div>
              )}

              {partnersByTier.silver.length > 0 && (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
                    <h3 className="text-amber-300 text-sm uppercase tracking-[0.2em] mx-4 font-medium">
                      {getTierTitle('silver')}
                    </h3>
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-6">
                    {partnersByTier.silver.map(partner => (
                      <PartnerLogo key={partner.id} partner={partner} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            // Display all partners together
            <div className="flex flex-wrap justify-center gap-8">
              {activePartners.map(partner => (
                <PartnerLogo key={partner.id} partner={partner} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}