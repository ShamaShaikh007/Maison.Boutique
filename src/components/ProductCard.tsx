import React from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onAddToCart: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  onQuickView: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isFavorite,
  onToggleFavorite
}: ProductCardProps) {
  const { id, title, category, price, rating, reviewCount, imageUrl, badge, colors, inStock } = product;

  // Visual helper for rendering star ratings gracefully
  const renderStars = (ratingValue: number) => {
    const stars = [];
    const floor = Math.floor(ratingValue);
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<Star key={i} size={13} className="fill-[#D39E82] text-[#D39E82]" />);
      } else if (i - 0.5 <= ratingValue) {
        stars.push(
          <div key={i} className="relative inline-block">
            <Star size={13} className="text-[#ECE8E1]" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star size={13} className="fill-[#D39E82] text-[#D39E82]" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={13} className="text-[#ECE8E1] fill-[#ECE8E1]" />);
      }
    }
    return stars;
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inStock) return;
    // Default to first color and size if available
    const defaultColor = colors && colors.length > 0 ? colors[0].name : undefined;
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
    onAddToCart(product, defaultColor, defaultSize);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(id);
  };

  return (
    <article
      id={`product-card-${id}`}
      className="group bg-[#FDFBF7] rounded-2xl overflow-hidden border border-[#1A1A1A]/5 transition-all duration-300 hover:shadow-sm flex flex-col h-full"
    >
      {/* Product Image and Overlay */}
      <div className="relative aspect-[4/5] bg-[#F0EEEA] rounded-2xl overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        
        {/* Badge Tag */}
        {badge && (
          <span className="absolute top-4 left-4 z-10 bg-[#D39E82] text-[#FDFBF7] text-[10px] font-sans font-medium tracking-widest uppercase px-2.5 py-1 rounded-sm shadow-sm">
            {badge}
          </span>
        )}

        {/* Favorite Switch */}
        <button
          id={`favorite-btn-${id}`}
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md bg-[#FDFBF7]/85 text-[#1A1A1A] hover:text-[#D39E82] hover:scale-105 active:scale-95 shadow-sm transition-all duration-300`}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} className={`transition-all duration-300 ${isFavorite ? 'fill-[#D39E82] text-[#D39E82]' : 'text-[#1A1A1A]'}`} />
        </button>

        {/* The ZOOM Hover Product Image */}
        <img
          id={`product-img-${id}`}
          src={imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-[800ms] cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-105 motion-reduce:group-hover:scale-100"
          loading="lazy"
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-[#1A1A1A]/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 pointer-events-none md:pointer-events-auto">
          <button
            id={`quick-view-btn-${id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex items-center gap-1.5 bg-[#FDFBF7] text-[#1A1A1A] text-xs font-sans tracking-widest uppercase px-4 py-2.5 rounded-sm shadow-md hover:bg-[#1A1A1A] hover:text-[#FDFBF7] transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>
        </div>

        {/* Out of Stock banner */}
        {!inStock && (
          <div className="absolute inset-x-0 bottom-0 bg-[#1A1A1A]/85 text-[#FDFBF7] py-2 text-center text-xs font-sans tracking-wider uppercase font-semibold">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Category Label */}
        <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-1 block">
          {category}
        </span>

        {/* Product Title */}
        <h3 
          className="text-base font-medium text-[#1A1A1A] tracking-tight hover:text-[#8A9A86] transition-colors cursor-pointer mb-1.5 h-12 flex items-center line-clamp-2"
          onClick={() => onQuickView(product)}
        >
          {title}
        </h3>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center text-[#D39E82]">
            {renderStars(rating)}
          </div>
          <span className="text-[10px] font-mono text-[#1A1A1A]/40">({reviewCount})</span>
        </div>

        {/* Footer info: Color Dots, Price and Cart button */}
        <div className="mt-auto space-y-4 pt-3 border-t border-[#1A1A1A]/5">
          
          <div className="flex items-center justify-between">
            {/* Price Tag */}
            <span className="text-base font-medium text-[#1A1A1A]">
              ${price.toFixed(2)}
            </span>

            {/* Colors Preview */}
            {colors && colors.length > 0 && (
              <div className="flex -space-x-1" aria-label="Available Colors">
                {colors.map((c) => (
                  <span
                    key={c.name}
                    className={`w-3.5 h-3.5 rounded-full border border-[#1A1A1A]/5 shadow-xs ${c.bgClass}`}
                    title={c.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Micro-interactive Add to Cart button */}
          <button
            id={`add-to-cart-btn-${id}`}
            onClick={handleCartClick}
            disabled={!inStock}
            className={`
              w-full relative overflow-hidden group/btn px-4 py-3 rounded-xl text-xs font-sans tracking-widest uppercase font-semibold shadow-xs
              flex items-center justify-center select-none
              transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${inStock 
                ? 'bg-[#8A9A86] text-white hover:bg-[#748570] hover:scale-[1.03] active:scale-[0.98]' 
                : 'bg-[#D6D3CE] text-[#1A1A1A]/40 cursor-not-allowed'
              }
              motion-reduce:hover:scale-100 motion-reduce:active:scale-100
              motion-reduce:transition-[background-color] motion-reduce:duration-100
            `}
          >
            {/* Sliding Container that holds cart icon and text */}
            <div className={`
              flex items-center justify-center gap-1.5
              transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${inStock ? 'group-hover/btn:translate-x-1.5' : ''}
              motion-reduce:transform-none
            `}>
              {/* Fade / Slide-in Shopping Cart Icon */}
              <span className={`
                inline-flex items-center justify-center
                transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                opacity-0 -translate-x-3 w-0 scale-70
                ${inStock ? 'group-hover/btn:opacity-100 group-hover/btn:translate-x-0 group-hover/btn:w-4 group-hover/btn:scale-100' : ''}
                motion-reduce:hidden
              `}>
                <ShoppingCart size={13} className="text-white" />
              </span>

              {/* Instant static icon instead of sliding animation on prefers-reduced-motion */}
              <span className="hidden motion-reduce:inline mr-1">
                {inStock && <ShoppingCart size={11} className="text-white" />}
              </span>

              <span className="relative z-10">
                {inStock ? 'Add to Cart' : 'Waitlist Me'}
              </span>
            </div>
          </button>

        </div>
      </div>
    </article>
  );
}
