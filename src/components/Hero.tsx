import React from 'react';
import { ArrowRight, Flame, Leaf, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <div id="hero-banner" className="relative bg-[#FDFBF7] pt-4 pb-12 sm:pb-16 lg:pb-24">
      {/* Decorative Warm Backgound Elements */}
      <div className="absolute top-1/4 right-[10%] w-72 h-72 bg-[#D39E82]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-[5%] w-80 h-80 bg-[#8A9A86]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero text descriptor */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#E2ECE4] border border-[#8A9A86]/20 px-3 py-1 rounded-full text-[#8A9A86]">
              <Sparkles size={11} />
              <span className="text-[10px] font-sans font-semibold tracking-widest uppercase">The Summer Equinox Solstice Set</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] tracking-tight leading-[1.1]">
                Refined essentials for your <span className="italic text-[#8A9A86]">slow living</span> ritual.
              </h1>
              <p className="text-sm sm:text-base font-sans text-[#1A1A1A]/70 leading-relaxed max-w-xl">
                Curated stoneware, hand-poured botanical fragrances, and Belgian linen. Intentionally designed to simplify your everyday spaces and elevate your quiet moments. Handcrafted in limited batches.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="bg-[#1A1A1A] hover:bg-[#8A9A86] text-[#FDFBF7] text-xs font-sans font-semibold tracking-widest uppercase py-4 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-2 group"
              >
                <span>Explore Collection</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1 duration-200" />
              </button>

              <button
                id="hero-story-btn"
                onClick={() => {
                  const el = document.getElementById('story-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-transparent border border-[#ECE8E1] hover:border-[#1A1A1A] text-[#1A1A1A] text-xs font-sans tracking-widest uppercase py-4 px-8 rounded-lg transition-all duration-300 text-center"
              >
                Our Story
              </button>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-3 gap-6 pt-6 sm:pt-10 border-t border-[#ECE8E1] max-w-lg">
              <div className="space-y-1">
                <span className="text-xs font-sans font-semibold tracking-widest uppercase text-[#8A9A86] block">100% Organic</span>
                <span className="text-[11px] text-[#1A1A1A]/60 font-sans block leading-tight">Certified flax and cotton materials</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-sans font-semibold tracking-widest uppercase text-[#8A9A86] block">Direct Sourced</span>
                <span className="text-[11px] text-[#1A1A1A]/60 font-sans block leading-tight">Partnered with independent potters</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-sans font-semibold tracking-widest uppercase text-[#8A9A86] block">Carbon Neutral</span>
                <span className="text-[11px] text-[#1A1A1A]/60 font-sans block leading-tight">Shipped in fully compostable mailers</span>
              </div>
            </div>

          </div>

          {/* Hero premium graphics layout */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative aspect-[4/5] max-w-sm sm:max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl border border-[#ECE8E1] bg-[#F5F2EB]">
              
              {/* Product background detail focus */}
              <img
                src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=650"
                alt="Maison stoneware ceramics styling preview"
                className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
              />

              {/* Float badge element */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#FDFBF7]/90 backdrop-blur-md border border-[#ECE8E1] p-4 rounded-xl shadow-lg flex items-center gap-4.5">
                <div className="w-12 h-12 bg-[#E2ECE4] rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=120"
                    alt="Active highlight item teaser"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-left">
                  <span className="text-[9px] font-sans tracking-widest uppercase text-[#8A9A86] font-semibold">In Focus</span>
                  <h4 className="text-xs font-serif font-bold text-[#1A1A1A] line-clamp-1">Ceramic Arch Incense Burner</h4>
                  <span className="text-xs font-mono text-[#D39E82]">$38.00</span>
                </div>
                <button
                  onClick={onExploreClick}
                  className="bg-[#1A1A1A] hover:bg-[#8A9A86] text-[#FDFBF7] rounded-full p-2.5 transition-colors shadow-xs"
                  aria-label="View focal collection"
                >
                  <ArrowRight size={12} />
                </button>
              </div>

            </div>

            {/* Back offset collage item */}
            <div className="hidden sm:block absolute -bottom-6 -left-10 w-44 aspect-[1/1] rounded-xl overflow-hidden shadow-lg border border-[#ECE8E1] bg-[#F5F2EB]/90 z-0">
              <img
                src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=300"
                alt="Secondary ambient soy candle mockup"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
