/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  Sparkles, 
  Compass, 
  Award, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  RefreshCcw, 
  BookOpen,
  Mail,
  Instagram,
  Facebook,
  Leaf
} from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import DetailModal from './components/DetailModal';
import Toast from './components/Toast';
import { Product, CartItem, FilterState } from './types';
import { PRODUCTS } from './data';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('shop'); // 'shop', 'story', 'journal', 'green'

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Favorites (Wishlist) State
  const [favorites, setFavorites] = useState<string[]>([]);
  // Allows user to filter view directly to favorites
  const [viewFavoritesOnly, setViewFavoritesOnly] = useState(false);

  // Quick View Detail Modal State
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    searchQuery: '',
    sortBy: 'featured',
    maxPrice: 200 // default initial high limit, dynamically bounded in the slider
  });

  // Keep filters sync'd with header inline search input
  React.useEffect(() => {
    setFilters(prev => ({ ...prev, searchQuery }));
  }, [searchQuery]);

  // Toast Stack state
  const [toasts, setToasts] = useState<{ id: string; message: string; type?: 'success' | 'info' }[]>([]);

  const handleAddToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const handleRemoveToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      category: 'All',
      searchQuery: '',
      sortBy: 'featured',
      maxPrice: 200
    });
    setViewFavoritesOnly(false);
    handleAddToast('All product filters have been cleared.', 'info');
  };

  // Toggle favorite helper
  const handleToggleFavorite = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setFavorites(prev => {
      const isAlreadyFav = prev.includes(productId);
      if (isAlreadyFav) {
        handleAddToast(`Removed "${product.title}" from your wishlist`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        handleAddToast(`Added "${product.title}" to your wishlist.`, 'success');
        return [...prev, productId];
      }
    });
  };

  // Cart Actions
  const handleAddToCart = (product: Product, selectedColor?: string, selectedSize?: string) => {
    setCartItems(prev => {
      // Create a unique item key using selected option suffixes
      const colorSuffix = selectedColor ? `-${selectedColor.replace(/\s+/g, '').toLowerCase()}` : '';
      const sizeSuffix = selectedSize ? `-${selectedSize.replace(/\s+/g, '').toLowerCase()}` : '';
      const cartItemId = `${product.id}${colorSuffix}${sizeSuffix}`;

      const existingIndex = prev.findIndex(item => item.id === cartItemId);
      
      let newCart = [...prev];
      if (existingIndex > -1) {
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + 1
        };
      } else {
        newCart.push({
          id: cartItemId,
          product,
          quantity: 1,
          selectedColor,
          selectedSize
        });
      }

      const attributesDesc = [selectedColor, selectedSize].filter(Boolean).join(', ');
      const desc = attributesDesc ? ` (${attributesDesc})` : '';
      handleAddToast(`Added "${product.title}"${desc} to your bag!`);
      return newCart;
    });
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === cartItemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    const item = cartItems.find(i => i.id === cartItemId);
    setCartItems(prev => prev.filter(i => i.id !== cartItemId));
    if (item) {
      handleAddToast(`"${item.product.title}" removed from bag.`, 'info');
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Filter and Sort calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // 1. Wishlist Only check
      if (viewFavoritesOnly && !favorites.includes(product.id)) {
        return false;
      }

      // 2. Category selection check
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // 3. Price boundary check
      if (product.price > filters.maxPrice) {
        return false;
      }

      // 4. Search text keyword match
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        return matchesTitle || matchesCategory || matchesDesc;
      }

      return true;
    }).sort((a, b) => {
      // Sorting strategies
      if (filters.sortBy === 'price-low-high') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price-high-low') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // 'featured' defaults to original mock ordering
      return 0;
    });
  }, [filters, favorites, viewFavoritesOnly]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] selection:bg-[#E2ECE4] selection:text-[#8A9A86] flex flex-col relative transition-all duration-300">
      
      {/* Top Banner Message */}
      <div className="bg-[#1A1A1A] text-[#FDFBF7] py-2 px-4 text-center text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase font-medium">
        Free ground shipping on all domestic orders of $99+ | Use code <span className="text-[#8A9A86] font-bold">WELCOME10</span>
      </div>

      {/* Main Sticky Header */}
      <Header
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        onCartToggle={() => setIsCartOpen(true)}
        favoritesCount={favorites.length}
        onFavoritesToggle={() => {
          setViewFavoritesOnly(!viewFavoritesOnly);
          setActiveTab('shop'); // Direct user back to the visual shelf if in about or blog tabs
          document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Primary Routing Render Slot */}
      <main className="flex-grow flex flex-col">
        {activeTab === 'shop' && (
          <div className="flex flex-col">
            {/* Elegant Hero Banner */}
            <Hero onExploreClick={() => {
              document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
            }} />

            {/* Catalog Section anchor */}
            <section id="catalog-section" className="py-12 sm:py-16 bg-[#FDFBF7] border-t border-[#ECE8E1]/80 scroll-mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                
                {/* Catalog headers */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-1.5 text-left">
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-wide font-semibold">
                      {viewFavoritesOnly ? 'Your Hearted Collection' : 'The Everyday Essentials'}
                    </h2>
                    <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/60 max-w-xl">
                      {viewFavoritesOnly 
                        ? 'Items you’ve marked to incorporate in subsequent slow mornings.' 
                        : 'Meticulously crafted items focused on raw texture, organic longevity, and quiet visual aesthetics.'
                      }
                    </p>
                  </div>
                  
                  {viewFavoritesOnly && (
                    <button
                      onClick={() => setViewFavoritesOnly(false)}
                      className="self-start md:self-auto text-xs font-sans tracking-widest uppercase text-[#8A9A86] border-b border-[#8A9A86] pb-1 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                    >
                      Return to Full Store
                    </button>
                  )}
                </div>

                {/* Filters Row */}
                <Filters 
                  filters={filters} 
                  onChangeFilters={setFilters} 
                  products={PRODUCTS}
                  onReset={handleResetFilters}
                />

                {/* Product Grid Results */}
                {filteredProducts.length === 0 ? (
                  <div className="py-20 text-center space-y-4 max-w-md mx-auto">
                    <p className="text-sm font-sans text-[#1A1A1A]/50">
                      No beautiful ceramics, apothecary, or linens matched your refinement values.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="inline-flex items-center gap-1.5 bg-[#1A1A1A] text-[#FDFBF7] text-xs font-sans font-semibold tracking-widest uppercase px-5 py-3 rounded-lg hover:bg-[#8A9A86] transition-colors shadow-sm"
                    >
                      <RefreshCcw size={13} />
                      <span>Reset Filters</span>
                    </button>
                  </div>
                ) : (
                  <div 
                    id="grid-shelf" 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pointer-events-auto"
                  >
                    {filteredProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onAddToCart={handleAddToCart}
                        onQuickView={setSelectedQuickViewProduct}
                        isFavorite={favorites.includes(p.id)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ))}
                  </div>
                )}

              </div>
            </section>
          </div>
        )}

        {/* Story Tab Panel */}
        {activeTab === 'story' && (
          <section id="story-section" className="py-16 sm:py-24 bg-[#FDFBF7] space-y-16 animate-fade-in">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
              <span className="text-[10px] font-sans tracking-[0.3em] text-[#8A9A86] uppercase font-bold">Aesthetic Ethos</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A] leading-tight">
                Objects born of earth, fire, and <span className="italic text-[#8A9A86]">intentional simplicity</span>.
              </h2>
              <p className="text-sm sm:text-base font-sans text-[#1A1A1A]/70 leading-relaxed max-w-2xl mx-auto">
                Founded by a collective of industrial designers and ceramicists in 2021, Maison began as a small clay workshop in Oregon. Our goal remains absolute: design physical items that stand as silent anchors to mindfulness in a hurried digital world.
              </p>
            </div>

            {/* Collage Rows */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#F0EEEA] border border-[#1A1A1A]/5">
                <img
                  src="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=800"
                  alt="Clay artisan hand shaping fresh pottery cups"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6 text-left max-w-xl">
                <div className="inline-flex items-center gap-2 text-[#8A9A86]">
                  <Compass size={16} />
                  <span className="text-xs font-sans tracking-widest uppercase font-semibold">The Clay Wheel Ritual</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] font-semibold">Handcraft over automated extrusion.</h3>
                <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/70 leading-relaxed">
                  Every mug on our shelf starts as a raw block of iron-rich stoneware. Thrown manually, trimmed with wooden ribs, and fired twice inside dynamic reduction kilns. Our glaze formulas are mixed in-house, ensuring safe, lead-free vessels that feature slight organic variations in shade and speckling.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setActiveTab('shop');
                      setTimeout(() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }), 50);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-sans tracking-widest uppercase text-[#8A9A86] border-b border-[#8A9A86] pb-1 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all"
                  >
                    <span>View Stoneware Cups</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Sustainability/Values Bento blocks */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#F0EEEA] py-16 rounded-3xl border border-[#1A1A1A]/5 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-4 space-y-3.5 text-left">
                <Award size={22} className="text-[#8A9A86]" />
                <h4 className="text-base font-serif font-semibold text-[#1A1A1A]">Design for Lifespans</h4>
                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
                  We design our products structurally. Thick stoneware clay, double-reinforced seams, and timeless silhouettes meant to be loved for decades, not seasons.
                </p>
              </div>
              <div className="p-4 space-y-3.5 text-left">
                <MapPin size={22} className="text-[#8A9A86]" />
                <h4 className="text-base font-serif font-semibold text-[#1A1A1A]">Ethical Workshop Ties</h4>
                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
                  Our raw flax linen is sourced directly from historic cooperatives in northern France, and our candles are poured by a multi-generational family business in central Ohio.
                </p>
              </div>
              <div className="p-4 space-y-3.5 text-left">
                <Leaf size={22} className="text-[#8A9A86]" />
                <h4 className="text-base font-serif font-semibold text-[#1A1A1A]">Zero Plastic Commitments</h4>
                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
                  From hemp ties to shredded post-consumer craft pads, our parcel packing is 100% recyclable, biodegradable, and contains absolutely zero synthetic microplastics.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Journal Tab Panel (Blog Style Editorial Columns) */}
        {activeTab === 'journal' && (
          <section id="journal-section" className="py-16 sm:py-24 bg-[#FDFBF7] animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="text-[10px] font-sans tracking-[0.3em] text-[#8A9A86] uppercase font-bold">Maison Journal</span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A]">Notes on Slow Living and Visual Artifacts</h2>
                <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/60">
                  A digital compilation of sensory essays, designer logs, home recipes, and deep chats celebrating local tactile makers.
                </p>
              </div>

              {/* Journal Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Article 1 */}
                <article className="group space-y-4 text-left cursor-pointer">
                  <div className="aspect-[3/2] overflow-hidden rounded-2xl border border-[#1A1A1A]/5 bg-[#F0EEEA]">
                    <img
                      src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=500"
                      alt="Cosy workspace with stoneware mug and notebook"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[10px] font-sans font-semibold text-[#8A9A86] uppercase tracking-wider">
                      <span>Reflections</span>
                      <span className="w-1 h-1 bg-[#1A1A1A]/30 rounded-full" />
                      <span>June 15, 2026</span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-[#1A1A1A] group-hover:text-[#8A9A86] transition-colors line-clamp-2">
                      Quiet Mornings: The Visual Hygiene of Uncluttered Side Tables
                    </h3>
                    <p className="text-xs font-sans text-[#1A1A1A]/60 leading-relaxed line-clamp-3">
                      How we organize our physical objects influences our mental boundaries. Exploring the sensory power of stoneware catchalls, botanical wax candles, and morning light positioning.
                    </p>
                  </div>
                </article>

                {/* Article 2 */}
                <article className="group space-y-4 text-left cursor-pointer">
                  <div className="aspect-[3/2] overflow-hidden rounded-2xl border border-[#1A1A1A]/5 bg-[#F0EEEA]">
                    <img
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=500"
                      alt="French flax linen fabric background closeup"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[10px] font-sans font-semibold text-[#8A9A86] uppercase tracking-wider">
                      <span>Craft</span>
                      <span className="w-1 h-1 bg-[#1A1A1A]/30 rounded-full" />
                      <span>May 29, 2026</span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-[#1A1A1A] group-hover:text-[#8A9A86] transition-colors line-clamp-2">
                      Flax in Normandy: The Unrivaled Lifespan of French Table Linens
                    </h3>
                    <p className="text-xs font-sans text-[#1A1A1A]/60 leading-relaxed line-clamp-3">
                      For generations, French flax linen has been celebrated for its strength, weight, and relaxed drape. We take a journey to our Partner cooperatives under the Normandy coast skies.
                    </p>
                  </div>
                </article>

                {/* Article 3 */}
                <article className="group space-y-4 text-left cursor-pointer">
                  <div className="aspect-[3/2] overflow-hidden rounded-2xl border border-[#1A1A1A]/5 bg-[#F0EEEA]">
                    <img
                      src="https://images.unsplash.com/photo-1505935422859-020b7f130085?auto=format&fit=crop&q=80&w=500"
                      alt="Incense burner with rising delicate smoke"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[10px] font-sans font-semibold text-[#8A9A86] uppercase tracking-wider">
                      <span>Ingredients</span>
                      <span className="w-1 h-1 bg-[#1A1A1A]/30 rounded-full" />
                      <span>April 12, 2026</span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-[#1A1A1A] group-hover:text-[#8A9A86] transition-colors line-clamp-2">
                      Scent Anchors: How Wild Hinoki Wood Recalls Fresh Rain Senses
                    </h3>
                    <p className="text-xs font-sans text-[#1A1A1A]/60 leading-relaxed line-clamp-3">
                      Scent triggers are memory engines. Inside our laboratory, we break down why native hinoki and cedarwood create instant neurological safety loops in small apartments.
                    </p>
                  </div>
                </article>

              </div>
            </div>
          </section>
        )}

        {/* Sustainability Tab Panel */}
        {activeTab === 'green' && (
          <section id="green-section" className="py-16 sm:py-24 bg-[#FDFBF7] animate-fade-in">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              <div className="text-center空间 space-y-4 max-w-xl mx-auto">
                <span className="text-[10px] font-sans tracking-[0.3em] text-[#8A9A86] uppercase font-bold">Carbon & Earth</span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A]">Our Lifecycle Transparency</h2>
                <p className="text-[13px] font-sans text-[#1A1A1A]/60">
                  Every decision we finalize takes local carbon footprints, artisan wages, and packaging degradation curves into account. Here is exactly where our elements end.
                </p>
              </div>

              {/* Progress Flow timeline graphics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                
                {/* Box 1 */}
                <div className="bg-[#F0EEEA] p-6 rounded-2xl border border-[#1A1A1A]/5 text-left space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#8A9A86] text-[#FDFBF7] flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                    01
                  </div>
                  <h3 className="text-sm font-serif font-bold text-[#1A1A1A]">Harvest & Mine</h3>
                  <p className="text-xs font-sans text-[#1A1A1A]/65 leading-relaxed">
                    French flax fields and localized clay veins. We monitor mineral runoff to maintain healthy local streams.
                  </p>
                </div>

                {/* Box 2 */}
                <div className="bg-[#F0EEEA] p-6 rounded-2xl border border-[#1A1A1A]/5 text-left space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#8A9A86] text-[#FDFBF7] flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                    02
                  </div>
                  <h3 className="text-sm font-serif font-bold text-[#1A1A1A]">Artisan Shaping</h3>
                  <p className="text-xs font-sans text-[#1A1A1A]/65 leading-relaxed">
                    Crafted in small-batch studios focused on healthy air indices, fair living wages, and high safety criteria.
                  </p>
                </div>

                {/* Box 3 */}
                <div className="bg-[#F0EEEA] p-6 rounded-2xl border border-[#1A1A1A]/5 text-left space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#8A9A86] text-[#FDFBF7] flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                    03
                  </div>
                  <h3 className="text-sm font-serif font-bold text-[#1A1A1A]">Compostable Pack</h3>
                  <p className="text-xs font-sans text-[#1A1A1A]/65 leading-relaxed">
                    Arrives wrapped in non-bleached starch-dyed tissue and starch padding dissolves under running kitchen faucets.
                  </p>
                </div>

                {/* Box 4 */}
                <div className="bg-[#F0EEEA] p-6 rounded-2xl border border-[#1A1A1A]/5 text-left space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#8A9A86] text-[#FDFBF7] flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                    04
                  </div>
                  <h3 className="text-sm font-serif font-bold text-[#1A1A1A]">Regive Loop</h3>
                  <p className="text-xs font-sans text-[#1A1A1A]/65 leading-relaxed">
                    1% of quarterly profits directly fund reforestation projects across western timber regions devastated by fires.
                  </p>
                </div>

              </div>

              {/* Call to action */}
              <div className="bg-[#E2ECE4] border border-[#8A9A86]/20 p-8 rounded-2xl text-center space-y-4 max-w-2xl mx-auto">
                <p className="text-xs sm:text-sm font-serif text-[#1A1A1A] leading-relaxed italic max-w-xl mx-auto">
                  "Sustainability is not a seasonal campaign; it’s an operational commitment to leave our landscapes cleaner than we discovered them."
                </p>
                <div className="text-[10px] sm:text-xs font-sans font-semibold tracking-widest text-[#8A9A86] uppercase">
                  — Maison Sustainability Council
                </div>
              </div>

            </div>
          </section>
        )}
      </main>

      {/* Modern High-End Footer */}
      <footer className="bg-[#1A1A1A] text-[#FDFBF7] border-t border-[#3E3E3E] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#3E3E3E]/60">
          
          {/* Box 1: Brand Info */}
          <div className="space-y-4 text-left">
            <span className="text-xl font-serif tracking-[0.2em] text-[#FDFBF7] uppercase font-bold">
              Maison
            </span>
            <p className="text-xs font-sans text-[#A8A8A8] leading-relaxed max-w-xs">
              A refined home boutique centering clean natural materials, quiet aesthetics, and slow aesthetic living rituals. Handcrafted by local studio partners.
            </p>
            <div className="flex gap-4.5 pt-2">
              <a href="#instagram" className="text-[#A8A8A8] hover:text-[#8A9A86] transition-colors"><Instagram size={16} /></a>
              <a href="#facebook" className="text-[#A8A8A8] hover:text-[#8A9A86] transition-colors"><Facebook size={16} /></a>
            </div>
          </div>

          {/* Box 2: Quick Links */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-[#8A9A86]">Explore</h4>
            <ul className="space-y-2 text-xs font-sans text-[#A8A8A8]">
              <li><button onClick={() => { setActiveTab('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FDFBF7]">Collection</button></li>
              <li><button onClick={() => { setActiveTab('story'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FDFBF7]">Our Story</button></li>
              <li><button onClick={() => { setActiveTab('journal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FDFBF7]">Maison Journal</button></li>
              <li><button onClick={() => { setActiveTab('green'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FDFBF7]">Ethical Practices</button></li>
            </ul>
          </div>

          {/* Box 3: Customer Care */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-[#8A9A86]">Customer Care</h4>
            <ul className="space-y-2 text-xs font-sans text-[#A8A8A8]">
              <li><a href="#shipping" className="hover:text-[#FDFBF7]">Shipping & Returns</a></li>
              <li><a href="#sustainability" className="hover:text-[#FDFBF7]">Sustainability Pledge</a></li>
              <li><a href="#faq" className="hover:text-[#FDFBF7]">Ritual Guidance & FAQ</a></li>
              <li><a href="#contact" className="hover:text-[#FDFBF7]">Direct Dialogue</a></li>
            </ul>
          </div>

          {/* Box 4: Newsletter Sign-up */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-[#8A9A86]">Journal Sign-up</h4>
            <p className="text-xs font-sans text-[#A8A8A8] leading-relaxed">
              Sign up for quiet alerts, story profiles on independent woodworkers and potters, and early collection releases.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); handleAddToast('Thank you for subscribing to our quiet updates!'); }} className="flex gap-2">
              <input
                id="footer-email-input"
                type="email"
                placeholder="emailaddress@domain.com"
                required
                className="bg-[#2D2D2D] text-[#FDFBF7] text-xs font-sans px-3.5 py-2.5 rounded-md border-none focus:ring-1 focus:ring-[#8A9A86] outline-none flex-1 placeholder-[#A8A8A8]/40"
              />
              <button
                type="submit"
                id="footer-email-submit"
                className="bg-[#8A9A86] hover:bg-[#a3b3a1] text-[#FDFBF7] text-xs font-sans font-bold uppercase tracking-widest px-4 rounded-md transition-colors"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Legal Bottom line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-sans text-[#A8A8A8]/60 uppercase tracking-widest">
            © 2026 Maison Aesthetic & Co. All rights reserved.
          </div>
          <div className="text-[10px] font-sans text-[#A8A8A8]/60 uppercase tracking-widest flex gap-4">
            <a href="#privacy" className="hover:text-[#FDFBF7]">Privacy Privacy</a>
            <a href="#terms" className="hover:text-[#FDFBF7]">Terms of Ritual</a>
          </div>
        </div>
      </footer>

      {/* Sliding Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onAddToast={handleAddToast}
      />

      {/* Quick View Detail Modal */}
      <DetailModal
        product={selectedQuickViewProduct}
        onClose={() => setSelectedQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isFavorite={selectedQuickViewProduct ? favorites.includes(selectedQuickViewProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Staggered Floating Toast Stack Container */}
      <div id="toast-stack-container" className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm w-full px-4 sm:px-0">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={handleRemoveToast}
          />
        ))}
      </div>

    </div>
  );
}
