import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onAddToast: (message: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddToast
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = React.useState('');
  const [discount, setDiscount] = React.useState(0);
  const [promoApplied, setPromoApplied] = React.useState(false);
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [orderComplete, setOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState('');

  // Calculations
  const subtotal = React.useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  const discountAmount = React.useMemo(() => {
    return subtotal * discount;
  }, [subtotal, discount]);

  // Shipping logic: free shipping over $99, otherwise $8.00
  const shippingCost = React.useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 99 ? 0 : 8.00;
  }, [subtotal]);

  const taxRate = 0.0825; // 8.25%
  const estimatedTax = React.useMemo(() => {
    return (subtotal - discountAmount) * taxRate;
  }, [subtotal, discountAmount]);

  const total = React.useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);
  }, [subtotal, discountAmount, shippingCost, estimatedTax]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'MAISON20') {
      setDiscount(0.20);
      setPromoApplied(true);
      onAddToast('Promo code "MAISON20" applied: 20% off your entire order!');
    } else if (cleanCode === 'WELCOME10') {
      setDiscount(0.10);
      setPromoApplied(true);
      onAddToast('Promo code "WELCOME10" applied: 10% off your entire order!');
    } else {
      onAddToast('Invalid coupon code. Try "MAISON20" or "WELCOME10"!');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);
    
    // Simulate payment API/checkout wait
    setTimeout(() => {
      const generatedOrder = `MSN-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedOrder);
      setIsCheckingOut(false);
      setOrderComplete(true);
      onAddToast(`Order ${generatedOrder} placed successfully!`);
    }, 1800);
  };

  const handleResetOrder = () => {
    onClearCart();
    setOrderComplete(false);
    setPromoApplied(false);
    setPromoCode('');
    setDiscount(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => { if (!isCheckingOut && !orderComplete) onClose(); }}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#ECE8E1] transition-transform duration-300 transform translate-x-0"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#ECE8E1] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={18} className="text-[#8A9A86]" />
              <h2 className="text-base font-serif font-semibold tracking-wider text-[#1A1A1A] uppercase">
                Your Bag
              </h2>
              <span className="bg-[#8A9A86]/10 text-[#8A9A86] text-xs font-mono font-medium rounded-full px-2.5 py-0.5 ml-1">
                {cartItems.reduce((acc, current) => acc + current.quantity, 0)}
              </span>
            </div>
            
            {!isCheckingOut && !orderComplete && (
              <button
                id="close-cart-btn"
                onClick={onClose}
                className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] p-1.5 rounded-full hover:bg-[#F5F2EB] transition-colors"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Checkout Success Screen */}
          {orderComplete ? (
            <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#E2ECE4] text-[#8A9A86] flex items-center justify-center mx-auto animate-bounce-short">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-[#1A1A1A] font-semibold">Thank you for your order!</h3>
                <p className="text-xs font-sans text-[#1A1A1A]/60 uppercase tracking-widest">
                  Order ID: {orderId}
                </p>
                <p className="text-sm font-sans text-[#1A1A1A]/70 max-w-xs mx-auto">
                  A verification and tracking link was sent to your email. Your handcrafted items will be prepared immediately.
                </p>
              </div>

              {/* Order summary breakdown for the demo */}
              <div className="w-full bg-[#F5F2EB] border border-[#ECE8E1] rounded-xl p-4 text-left space-y-3.5">
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/80 border-b border-[#ECE8E1] pb-2">
                  Order Summary
                </h4>
                <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs font-sans">
                      <span className="text-[#1A1A1A]/80 line-clamp-1 flex-1 pr-4">
                        {item.product.title} <span className="text-[#1A1A1A]/40">x{item.quantity}</span>
                      </span>
                      <span className="font-mono text-[#1A1A1A] font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#ECE8E1] pt-3.5 flex justify-between items-center text-sm font-sans font-bold">
                  <span className="text-[#1A1A1A]">Total Charged</span>
                  <span className="font-mono text-[#8A9A86]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                id="continue-shopping-success-btn"
                onClick={handleResetOrder}
                className="w-full bg-[#1A1A1A] text-[#FDFBF7] text-xs font-sans font-semibold tracking-widest uppercase py-3.5 hover:bg-[#8A9A86] transition-all rounded-lg shadow-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Main Panel Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                    <div className="w-16 h-16 rounded-full bg-[#F5F2EB] text-[#1A1A1A]/30 flex items-center justify-center">
                      <ShoppingBag size={24} />
                    </div>
                    <div>
                      <h3 className="text-base font-serif font-semibold text-[#1A1A1A]">Your bag is empty</h3>
                      <p className="text-xs font-sans text-[#1A1A1A]/50 mt-1 max-w-[240px]">
                        Add exquisite stoneware, botanical scents, or flax textiles to trigger your rituals.
                      </p>
                    </div>
                    <button
                      id="start-shopping-btn"
                      onClick={onClose}
                      className="border border-[#1A1A1A] text-[#1A1A1A] text-xs font-sans tracking-widest uppercase px-5 py-2.5 hover:bg-[#1A1A1A] hover:text-[#FDFBF7] transition-all duration-300"
                    >
                      Browse Shop
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 bg-[#FDFBF7] border border-[#ECE8E1] rounded-lg relative hover:border-[#8A9A86] transition-all duration-300"
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-24 bg-[#F5F2EB] rounded-md overflow-hidden flex-shrink-0 border border-[#ECE8E1]">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="text-xs font-serif font-semibold text-[#1A1A1A] truncate pr-4">
                                {item.product.title}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-[#1A1A1A]/40 hover:text-[#D39E82] p-0.5 transition-colors"
                                title="Remove item"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>

                            {/* Applied Attributes (Size / Color) */}
                            <div className="flex flex-wrap gap-2 mt-1.5">
                              {item.selectedColor && (
                                <span className="bg-[#F5F2EB] text-[#1A1A1A]/70 text-[9px] font-sans px-2 py-0.5 rounded-sm flex items-center gap-1 border border-[#ECE8E1]">
                                  Color: {item.selectedColor}
                                </span>
                              )}
                              {item.selectedSize && (
                                <span className="bg-[#F5F2EB] text-[#1A1A1A]/70 text-[9px] font-sans px-2 py-0.5 rounded-sm border border-[#ECE8E1]">
                                  Size: {item.selectedSize}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-[#ECE8E1] rounded-md bg-[#FDFBF7]">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="p-1 px-2.5 text-[#1A1A1A] hover:bg-[#F5F2EB] transition-all"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="text-xs font-mono font-semibold px-2 text-[#1A1A1A]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-1 px-2.5 text-[#1A1A1A] hover:bg-[#F5F2EB] transition-all"
                                aria-label="Increase quantity"
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            {/* Total Line Price */}
                            <span className="text-xs font-mono font-bold text-[#1A1A1A]">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cost Summary & Promo Block */}
              {cartItems.length > 0 && (
                <div id="cart-drawer-footer" className="border-t border-[#ECE8E1] bg-[#F5F2EB] px-6 py-5 space-y-4">
                  {/* Free shipping progress indicator */}
                  <div className="bg-[#FDFBF7] p-3 rounded-lg border border-[#ECE8E1] text-center">
                    {subtotal >= 99 ? (
                      <p className="text-[11px] font-sans text-[#8A9A86] font-semibold flex items-center justify-center gap-1.5 animate-pulse">
                        <Sparkles size={11} /> You qualify for free shipping!
                      </p>
                    ) : (
                      <p className="text-[11px] font-sans text-[#1A1A1A]/60">
                        Add <span className="font-semibold text-[#8A9A86]">${(99 - subtotal).toFixed(2)}</span> more to unlock <span className="font-semibold text-[#8A9A86]">Free Shipping</span>!
                      </p>
                    )}
                  </div>

                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      id="promo-code-input"
                      type="text"
                      placeholder="Promo Code (e.g., MAISON20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="bg-[#FDFBF7] text-xs font-sans rounded-md py-2 px-3 flex-1 border border-[#ECE8E1] focus:outline-none focus:ring-1 focus:ring-[#8A9A86]"
                    />
                    <button
                      type="submit"
                      id="apply-promo-btn"
                      disabled={promoApplied || !promoCode}
                      className="bg-[#1A1A1A]/90 text-[#FDFBF7] text-xs font-sans font-semibold tracking-wider uppercase px-4 py-2 hover:bg-[#8A9A86] transition-colors rounded-md disabled:bg-[#ECE8E1] disabled:text-[#1A1A1A]/30"
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </button>
                  </form>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 pt-1.5">
                    <div className="flex justify-between text-xs font-sans text-[#1A1A1A]/70">
                      <span>Subtotal</span>
                      <span className="font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-xs font-sans text-[#D39E82] font-medium">
                        <span>Discount ({(discount * 100)}%)</span>
                        <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs font-sans text-[#1A1A1A]/70">
                      <span>Shipping</span>
                      <span className="font-mono">
                        {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-sans text-[#1A1A1A]/70">
                      <span>Estimated Tax (8.25%)</span>
                      <span className="font-mono">${estimatedTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-sans font-bold text-[#1A1A1A] pt-1 border-t border-[#ECE8E1]/80 mt-1">
                      <span>Total</span>
                      <span className="font-mono text-[#8A9A86] text-base">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Actions */}
                  <button
                    id="checkout-trigger-btn"
                    onClick={handleCheckout}
                    disabled={isCheckingOut || cartItems.length === 0}
                    className="w-full bg-[#1A1A1A] hover:bg-[#8A9A86] disabled:bg-[#ECE8E1] text-[#FDFBF7] text-xs font-sans font-semibold tracking-widest uppercase py-4 rounded-xl shadow-md transition-all duration-300 pointer-events-auto flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#FDFBF7] border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        <span>Secure Checkout</span>
                        <ArrowRight size={13} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
