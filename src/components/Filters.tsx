import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';
import { FilterState, Product } from '../types';
import { CATEGORIES } from '../data';

interface FiltersProps {
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
  products: Product[];
  onReset: () => void;
}

export default function Filters({ filters, onChangeFilters, products, onReset }: FiltersProps) {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  // Derive maximum product price dynamically for the slider
  const maxAvailPrice = React.useMemo(() => {
    if (products.length === 0) return 200;
    return Math.max(...products.map(p => p.price));
  }, [products]);

  const handleCategoryChange = (category: string) => {
    onChangeFilters({ ...filters, category });
  };

  const handleSearchChange = (query: string) => {
    onChangeFilters({ ...filters, searchQuery: query });
  };

  const handleSortChange = (sortBy: string) => {
    onChangeFilters({ ...filters, sortBy });
  };

  const handlePriceChange = (maxPrice: number) => {
    onChangeFilters({ ...filters, maxPrice });
  };

  return (
    <div id="filter-wrapper" className="space-y-6 bg-[#FDFBF7] p-6 rounded-xl border border-[#ECE8E1] shadow-sm max-w-7xl mx-auto">
      
      {/* Category Pills & Advanced Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Category Pill Buttons */}
        <div className="flex flex-wrap items-center gap-2" id="category-pills">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                id={`cat-pill-${cat.toLowerCase()}`}
                onClick={() => handleCategoryChange(cat)}
                className={`text-xs font-sans tracking-widest uppercase px-4 py-2.5 rounded-full transition-all duration-300 pointer-events-auto border ${
                  isSelected
                    ? 'bg-[#8A9A86] border-[#8A9A86] text-[#FDFBF7] shadow-sm font-medium'
                    : 'bg-transparent border-[#ECE8E1] text-[#1A1A1A]/70 hover:border-[#8A9A86] hover:text-[#1A1A1A]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Advanced toggle button */}
          <button
            id="advanced-filters-btn"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 text-xs font-sans tracking-widest uppercase px-4 py-2.5 rounded-full border transition-all duration-300 ${
              showAdvanced || filters.maxPrice < maxAvailPrice
                ? 'bg-[#E2ECE4] border-[#8A9A86] text-[#8A9A86]'
                : 'border-[#ECE8E1] text-[#1A1A1A]/70 hover:border-[#8A9A86] hover:text-[#1A1A1A]'
            }`}
          >
            <SlidersHorizontal size={13} />
            <span>Refine</span>
          </button>

          {/* Quick Clear */}
          {(filters.category !== 'All' || filters.searchQuery || filters.sortBy !== 'featured' || filters.maxPrice < maxAvailPrice) && (
            <button
              id="reset-filters-btn"
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs font-sans tracking-widest uppercase px-3 py-2 text-[#D39E82] hover:text-[#c48c70] transition-colors"
              title="Reset all filters"
            >
              <RotateCcw size={12} />
              <span>Clear</span>
            </button>
          )}

          {/* Basic sorting input for quick clean use */}
          <div className="relative flex items-center bg-[#FDFBF7] border border-[#ECE8E1] rounded-full px-3.5 py-2 hover:border-[#8A9A86] transition-colors duration-300">
            <ArrowUpDown size={12} className="text-[#1A1A1A]/50 mr-2" />
            <select
              id="sort-select-quick"
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-transparent text-xs font-sans tracking-wider text-[#1A1A1A] outline-none pr-6 cursor-pointer border-none py-0.5 focus:ring-0"
            >
              <option value="featured">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

        </div>
      </div>

      {/* Advanced Filter Drawer (Slide out or Fold down gracefully) */}
      {showAdvanced && (
        <div id="advanced-filter-panel" className="pt-5 border-t border-[#ECE8E1] grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          
          {/* Dynamic Price Range Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/70 font-semibold">Max Price</span>
              <span className="text-sm font-mono text-[#8A9A86] font-semibold">${filters.maxPrice}</span>
            </div>
            <input
              id="price-range-slider"
              type="range"
              min="0"
              max={maxAvailPrice}
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full accent-[#8A9A86] cursor-pointer bg-[#ECE8E1] h-1 rounded-lg outline-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#1A1A1A]/40">
              <span>$0</span>
              <span>${maxAvailPrice}</span>
            </div>
          </div>

          {/* Search Query within Refine panel */}
          <div className="space-y-3">
            <span className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/70 font-semibold block">Keyword Match</span>
            <div className="relative">
              <input
                id="refine-search-input"
                type="text"
                placeholder="Ex. lavender, ceramic, wool..."
                value={filters.searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-[#FDFBF7] text-xs font-sans tracking-wide rounded-md py-2.5 pl-9 pr-4 border border-[#ECE8E1] focus:outline-none focus:ring-1 focus:ring-[#8A9A86] focus:border-[#8A9A86] transition-all"
              />
              <Search size={14} className="absolute left-3 top-3.5 text-[#1A1A1A]/40" />
            </div>
          </div>

          {/* Descriptive helper or Quick selections */}
          <div className="space-y-3 flex flex-col justify-center">
            <div className="bg-[#F5F2EB] p-3.5 rounded-lg border border-[#ECE8E1]/60 text-center">
              <p className="text-[11px] font-sans text-[#1A1A1A]/70 leading-relaxed">
                Handcrafted goods curated intentionally. Perfect for cozy spaces, sustainable styling, and everyday rituals.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
