import React from 'react';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface DetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function DetailModal({
  product,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite
}: DetailModalProps) {
  if (!product) return null;

  const { id, title, category, price, rating, reviewCount, description, imageUrl, badge, colors, sizes, inStock } = product;

  const [selectedColor, setSelectedColor] = React.useState(colors && colors.length > 0 ? colors[0].name : '');
  const [selectedSize, setSelectedSize] = React.useState(sizes && sizes.length > 0 ? sizes[0] : '');

  const renderStars = (ratingValue: number) => {
    const stars = [];
    const floor = Math.floor(ratingValue);
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<Star key={i} size={15} className="fill-[#D39E82] text-[#D39E82]" />);
      } else if (i - 0.5 <= ratingValue) {
        stars.push(
          <div key={i} className="relative inline-block" style={{ width: '15px', height: '15.5px' }}>
            <Star size={15} className="text-[#ECE8E1]" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star size={15} className="fill-[#D39E82] text-[#D39E82]" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={15} className="text-[#ECE8E1] fill-[#ECE8E1]" />);
      }
    }
    return stars;
  };

  const handleAdd = () => {
    if (!inStock) return;
    onAddToCart(product, selectedColor || undefined, selectedSize || undefined);
    onClose();
  };

  return (
    <div id="detail-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-xs transition-opacity duration-300" onClick={onClose} />

      {/* Modal Container */}
      <div id="detail-modal-card" className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-2xl shadow-2xl overflow-hidden border border-[#ECE8E1] z-10 flex flex-col md:flex-row animate-scale-up max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
        
        {/* Close Button */}
        <button
          id="close-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-[#1A1A1A]/60 hover:text-[#1A1A1A] p-1.5 rounded-full bg-[#FDFBF7]/80 hover:bg-[#F5F2EB] shadow-xs cursor-pointer transition-colors"
          aria-label="Close details"
        >
          <X size={18} />
        </button>

        {/* Product Image Section */}
        <div className="w-full md:w-1/2 relative bg-[#F5F2EB]">
          {badge && (
            <span className="absolute top-6 left-6 z-10 bg-[#D39E82] text-[#FDFBF7] text-[10px] font-sans font-medium tracking-widest uppercase px-3 py-1 rounded-sm shadow-sm">
              {badge}
            </span>
          )}
          <div className="aspect-[4/5] w-full">
            <img
              src={imageUrl}
              alt={title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Category */}
            <span className="text-[10px] font-sans tracking-[0.2em] text-[#8A9A86] uppercase font-bold mb-1.5 block">
              {category}
            </span>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] font-semibold tracking-wide mb-2">
              {title}
            </h2>

            {/* Stars & Stock */}
            <div className="flex items-center gap-3 mb-5 border-b border-[#ECE8E1]/80 pb-4">
              <div className="flex items-center gap-1">
                {renderStars(rating)}
              </div>
              <span className="text-xs font-mono text-[#1A1A1A]/50">({reviewCount} reviews)</span>

              <span className="text-xs text-[#1A1A1A]/40">|</span>

              <span className={`text-xs font-sans font-medium ${inStock ? 'text-[#8A9A86]' : 'text-[#D39E82]'}`}>
                {inStock ? 'In Stock' : 'Temporarily Out of Stock'}
              </span>
            </div>

            {/* Price tag */}
            <div className="text-2xl font-mono font-bold text-[#1A1A1A] mb-5">
              ${price.toFixed(2)}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/70 leading-relaxed mb-6">
              {description}
            </p>

            {/* Configuration Selectors */}
            <div className="space-y-4 mb-6">
              
              {/* Colors Option */}
              {colors && colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs font-sans font-semibold tracking-wider text-[#1A1A1A]/70 uppercase">Color Selection</span>
                    <span className="text-xs font-mono text-[#8A9A86]">{selectedColor}</span>
                  </div>
                  <div className="flex gap-2.5">
                    {colors.map((c) => {
                      const active = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            active 
                              ? 'border-[#1A1A1A] ring-2 ring-[#8A9A86]/20 scale-105' 
                              : 'border-[#ECE8E1] hover:border-[#1A1A1A]/50'
                          }`}
                          title={c.name}
                        >
                          <span className={`w-5 h-5 rounded-full ${c.bgClass}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sizes Option */}
              {sizes && sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs font-sans font-semibold tracking-wider text-[#1A1A1A]/70 uppercase">Size Options</span>
                    <span className="text-xs font-mono text-[#8A9A86]">{selectedSize}</span>
                  </div>
                  <div className="flex gap-2">
                    {sizes.map((s) => {
                      const active = selectedSize === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`text-xs font-sans px-3.5 py-1.5 rounded-sm border transition-all duration-300 ${
                            active 
                              ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFBF7] font-semibold' 
                              : 'bg-transparent border-[#ECE8E1] text-[#1A1A1A]/70 hover:border-[#1A1A1A]/50'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Action Footer */}
          <div className="space-y-4 pt-4 border-t border-[#ECE8E1]/80">
            <div className="flex gap-3">
              
              {/* Add to Cart button */}
              <button
                id="modal-add-to-cart-btn"
                onClick={handleAdd}
                disabled={!inStock}
                className={`
                  flex-1 relative overflow-hidden group/mbtn px-5 py-3.5 rounded-lg text-xs font-sans tracking-widest uppercase font-semibold
                  flex items-center justify-center select-none shadow-sm
                  transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${inStock 
                    ? 'bg-[#8A9A86] text-[#FDFBF7] hover:bg-[#1A1A1A] hover:scale-[1.02] active:scale-[0.98]' 
                    : 'bg-[#ECE8E1] text-[#1A1A1A]/40 cursor-not-allowed'
                  }
                  motion-reduce:hover:scale-100 motion-reduce:active:scale-100
                  motion-reduce:transition-[background-color] motion-reduce:duration-100
                `}
              >
                <div className={`
                  flex items-center justify-center gap-1.5
                  transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${inStock ? 'group-hover/mbtn:translate-x-1.5' : ''}
                  motion-reduce:transform-none
                `}>
                  {/* Sliding icon */}
                  <span className={`
                    inline-flex items-center justify-center
                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    opacity-0 -translate-x-2.5 w-0 scale-70
                    ${inStock ? 'group-hover/mbtn:opacity-100 group-hover/mbtn:translate-x-0 group-hover/mbtn:w-4 group-hover/mbtn:scale-100' : ''}
                    motion-reduce:hidden
                  `}>
                    <ShoppingCart size={13} className="text-[#FDFBF7]" />
                  </span>

                  {/* Fallback reduced motion icon link */}
                  <span className="hidden motion-reduce:inline mr-1">
                    {inStock && <ShoppingCart size={11} className="text-[#FDFBF7]" />}
                  </span>

                  <span>{inStock ? 'Confirm & Add to Bag' : 'Out of Stock'}</span>
                </div>
              </button>

              {/* Wishlist Button */}
              <button
                id="modal-favorite-btn"
                onClick={() => onToggleFavorite(id)}
                className={`p-3.5 rounded-lg border border-[#ECE8E1] hover:border-[#D39E82] transition-colors focus:outline-none`}
                aria-label="Toggle favorite"
              >
                <Heart size={16} className={`transition-all duration-300 ${isFavorite ? 'fill-[#D39E82] text-[#D39E82]' : 'text-[#1A1A1A]'}`} />
              </button>

            </div>

            {/* Trust points */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-[10px] text-[#1A1A1A]/50 font-sans tracking-wide uppercase text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck size={14} className="text-[#8A9A86]" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={14} className="text-[#8A9A86]" />
                <span>Secure Payments</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw size={14} className="text-[#8A9A86]" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
