import React from 'react';
import { ShoppingBag, Search, Heart, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  favoritesCount: number;
  onFavoritesToggle: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  cartCount,
  onCartToggle,
  favoritesCount,
  onFavoritesToggle,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Shop All', value: 'shop' },
    { label: 'Our Story', value: 'story' },
    { label: 'Journal', value: 'journal' },
    { label: 'Sustainability', value: 'green' }
  ];

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#ECE8E1] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#1A1A1A] hover:text-[#8A9A86] p-2 transition-colors duration-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Navigation Links - Left Side */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                id={`nav-link-${item.value}`}
                onClick={() => {
                  setActiveTab(item.value);
                  if (item.value === 'shop') {
                    // Smooth scroll to product catalog if clicked
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`text-sm font-sans tracking-widest uppercase transition-colors duration-300 relative py-2 ${
                  activeTab === item.value 
                    ? 'text-[#8A9A86] font-medium' 
                    : 'text-[#1A1A1A]/80 hover:text-[#1A1A1A]'
                }`}
              >
                {item.label}
                {activeTab === item.value && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#8A9A86] transition-transform duration-300" />
                )}
              </button>
            ))}
          </nav>

          {/* Brand Logo - Center */}
          <div className="flex-1 md:flex-initial flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <button 
              id="logo-button"
              onClick={() => {
                setActiveTab('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col items-center group focus:outline-none"
            >
              <span className="text-2xl sm:text-3xl font-serif tracking-widest text-[#1A1A1A] uppercase transition-colors duration-300 group-hover:text-[#8A9A86]">
                Maison
              </span>
              <span className="text-[10px] font-sans tracking-[0.3em] text-[#8A9A86] uppercase -mt-1 font-medium">
                Aesthetic & Co.
              </span>
            </button>
          </div>

          {/* Search Bar & Icons - Right Side */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            
            {/* Minimal Inline Search for Desktop */}
            <div className="hidden lg:flex items-center relative">
              <input
                id="header-search-input"
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#F5F2EB] text-[#1A1A1A] text-xs font-sans tracking-wide rounded-full py-2 pl-9 pr-4 w-44 focus:w-56 focus:outline-none focus:ring-1 focus:ring-[#8A9A86] transition-all duration-300 placeholder-[#1A1A1A]/40 border-none"
              />
              <Search size={14} className="absolute left-3.5 text-[#1A1A1A]/50" />
            </div>

            {/* Favorite Icon */}
            <button
              id="favorites-btn"
              onClick={onFavoritesToggle}
              className="text-[#1A1A1A] hover:text-[#D39E82] transition-colors duration-200 relative p-2"
              aria-label="Favorites"
            >
              <Heart size={20} className={favoritesCount > 0 ? 'fill-[#D39E82] text-[#D39E82]' : ''} />
              {favoritesCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D39E82] animate-pulse" />
              )}
            </button>

            {/* Shopping Cart Icon */}
            <button
              id="cart-btn"
              onClick={onCartToggle}
              className="text-[#1A1A1A] hover:text-[#8A9A86] transition-all duration-300 relative p-2 group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} className="transition-transform group-hover:scale-105 duration-200" />
              <span className="absolute -top-1 -right-1 bg-[#8A9A86] text-[#FDFBF7] text-[10px] font-sans font-semibold rounded-full min-w-5 h-5 flex items-center justify-center px-1 border-2 border-[#FDFBF7] group-hover:bg-[#1A1A1A] transition-colors duration-300">
                {cartCount}
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-menu" className="md:hidden bg-[#FDFBF7] border-b border-[#ECE8E1] px-4 pt-2 pb-6 space-y-3 shadow-md">
          {/* Mobile Search */}
          <div className="relative mt-2">
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F2EB] text-[#1A1A1A] text-xs font-sans rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#8A9A86] transition-all"
            />
            <Search size={15} className="absolute left-4 top-3 text-[#1A1A1A]/50" />
          </div>

          <div className="flex flex-col space-y-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                id={`mobile-nav-link-${item.value}`}
                onClick={() => {
                  setActiveTab(item.value);
                  setMobileMenuOpen(false);
                  if (item.value === 'shop') {
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`text-left text-sm font-sans tracking-widest uppercase py-2.5 px-3 rounded-md transition-colors ${
                  activeTab === item.value 
                    ? 'bg-[#F2ECE4] text-[#8A9A86] font-medium' 
                    : 'text-[#1A1A1A]/80 hover:bg-[#F5F2EB]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
