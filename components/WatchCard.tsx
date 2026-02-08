
import React from 'react';
import { Watch } from '../types';

interface WatchCardProps {
  watch: Watch;
  onSelect: (watch: Watch) => void;
  onAddToCart: (watch: Watch) => void;
}

export const WatchCard: React.FC<WatchCardProps> = ({ watch, onSelect, onAddToCart }) => {
  return (
    <div className="group bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]">
      <div 
        className="relative h-64 overflow-hidden cursor-pointer"
        onClick={() => onSelect(watch)}
      >
        <img 
          src={watch.image} 
          alt={watch.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-amber-500 border border-amber-500/30">
          {watch.category}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">{watch.brand}</p>
            <h3 className="text-lg font-serif font-semibold text-zinc-100">{watch.name}</h3>
          </div>
          <p className="text-amber-500 font-medium">${watch.price.toLocaleString()}</p>
        </div>
        
        <p className="text-zinc-400 text-sm line-clamp-2 mb-6">
          {watch.description}
        </p>
        
        <div className="flex gap-3">
          <button 
            onClick={() => onSelect(watch)}
            className="flex-1 px-4 py-2 border border-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            Details
          </button>
          <button 
            onClick={() => onAddToCart(watch)}
            className="flex-1 px-4 py-2 bg-amber-600 rounded-lg text-sm font-medium text-white hover:bg-amber-500 transition-colors"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};
