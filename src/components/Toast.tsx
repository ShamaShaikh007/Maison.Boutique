import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface ToastProps {
  key?: React.Key;
  id: string;
  message: string;
  type?: 'success' | 'info';
  onClose: (id: string) => void;
}

export default function Toast({ id, message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div
      id={`toast-${id}`}
      className="flex items-center gap-3 bg-[#1A1A1A] text-[#FDFBF7] px-4 py-3 rounded-md shadow-lg border border-[#3E3E3E] max-w-sm w-full transition-all duration-300 transform animate-slide-in"
    >
      <div className={`p-1 rounded-full ${type === 'success' ? 'bg-[#8A9A86] text-[#FDFBF7]' : 'bg-[#D39E82] text-[#FDFBF7]'}`}>
        <Check size={14} />
      </div>
      <p className="text-sm font-sans flex-1 text-[#FDFBF7]">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="text-[#A8A8A8] hover:text-[#FDFBF7] transition-colors p-1"
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
