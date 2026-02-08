
import React, { useState, useMemo } from 'react';
import { WATCHES } from './constants';
import { Watch, CartItem } from './types';
import { WatchCard } from './components/WatchCard';
import { AIStylist } from './components/AIStylist';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);

  // Placeholder for user's GitHub URL - change this to your actual repo
  const GITHUB_REPO_URL = "https://github.com/username/horology-elite";

  const filteredWatches = useMemo(() => {
    if (selectedCategory === 'All') return WATCHES;
    return WATCHES.filter(w => w.category === selectedCategory);
  }, [selectedCategory]);

  const addToCart = (watch: Watch) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === watch.id);
      if (existing) {
        return prev.map(item => 
          item.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...watch, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const categories = ['All', 'Luxury', 'Sport', 'Classic', 'Minimalist'];

  return (
    <div className="min-h-screen pb-20">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-2xl font-serif font-bold tracking-tighter text-amber-500">HOROLOGY<span className="text-white">ELITE</span></span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Home</a>
              <a href="#collection" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Collection</a>
              <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Our Story</a>
              <a 
                href={GITHUB_REPO_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all border border-zinc-700"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                GitHub Repo
              </a>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-zinc-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute top-1 right-1 bg-amber-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 scale-105"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-amber-500 uppercase tracking-[0.3em] text-xs font-semibold mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-700">Engineering Time</span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            A Legacy of <br /> Precision
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Discover our curated collection of masterfully crafted timepieces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <a href="#collection" className="px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-500 transition-all transform hover:scale-105 flex items-center justify-center">
              Explore Collection
            </a>
            <a 
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/20 text-white backdrop-blur-md rounded-full font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              View Source on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-serif font-bold text-white mb-2">Our Collection</h2>
            <p className="text-zinc-500">Exceptional designs for every journey.</p>
          </div>
          
          <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  selectedCategory === cat 
                    ? 'bg-amber-600 text-white shadow-lg' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWatches.map(watch => (
            <WatchCard 
              key={watch.id} 
              watch={watch} 
              onSelect={setSelectedWatch} 
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-zinc-900 shadow-2xl animate-in slide-in-from-right duration-300">
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                  <h2 className="text-xl font-serif font-bold text-white">Your Selection</h2>
                  <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                      <svg className="w-12 h-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <p>Your bag is currently empty.</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <img src={item.image} className="w-20 h-20 object-cover rounded-lg" alt={item.name} />
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <p className="text-zinc-500 text-sm">{item.brand}</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-amber-500">${item.price.toLocaleString()}</p>
                            <button onClick={() => removeFromCart(item.id)} className="text-xs text-zinc-600 hover:text-red-500 transition-colors">Remove</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 border-t border-zinc-800 bg-zinc-800/50">
                    <div className="flex justify-between mb-4">
                      <span className="text-zinc-400">Subtotal</span>
                      <span className="text-white font-bold">${cartTotal.toLocaleString()}</span>
                    </div>
                    <button className="w-full py-4 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-500 transition-all">
                      Proceed to Checkout
                    </button>
                    <p className="text-center text-xs text-zinc-500 mt-4">Complimentary express shipping included.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedWatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedWatch(null)} />
          <div className="relative bg-zinc-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedWatch(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-full text-white hover:bg-black"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="md:w-1/2 h-80 md:h-auto">
              <img src={selectedWatch.image} className="w-full h-full object-cover" alt={selectedWatch.name} />
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <p className="text-amber-500 uppercase tracking-widest text-xs font-semibold mb-2">{selectedWatch.brand}</p>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">{selectedWatch.name}</h2>
              <p className="text-2xl text-zinc-100 mb-6">${selectedWatch.price.toLocaleString()}</p>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-zinc-500 uppercase tracking-tighter text-[10px] font-bold mb-2">Description</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">{selectedWatch.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-zinc-500 uppercase tracking-tighter text-[10px] font-bold mb-1">Movement</h4>
                    <p className="text-white text-xs">{selectedWatch.specs.movement}</p>
                  </div>
                  <div>
                    <h4 className="text-zinc-500 uppercase tracking-tighter text-[10px] font-bold mb-1">Diameter</h4>
                    <p className="text-white text-xs">{selectedWatch.specs.diameter}</p>
                  </div>
                  <div>
                    <h4 className="text-zinc-500 uppercase tracking-tighter text-[10px] font-bold mb-1">Case</h4>
                    <p className="text-white text-xs">{selectedWatch.specs.case}</p>
                  </div>
                  <div>
                    <h4 className="text-zinc-500 uppercase tracking-tighter text-[10px] font-bold mb-1">Water Resistance</h4>
                    <p className="text-white text-xs">{selectedWatch.specs.waterResistance}</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  addToCart(selectedWatch);
                  setSelectedWatch(null);
                  setIsCartOpen(true);
                }}
                className="w-full py-4 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-500 transition-all mb-4"
              >
                Add to Shopping Bag
              </button>
              <button className="w-full py-4 border border-zinc-700 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all">
                Book Boutique Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Stylist Widget */}
      <AIStylist />

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-800 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-xl font-serif font-bold tracking-tighter text-amber-500">HOROLOGY<span className="text-white">ELITE</span></span>
            <p className="mt-4 text-zinc-500 text-sm">Crafting moments that last a lifetime since 1924. Excellence is not an option, but our standard.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm">Services</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-amber-500">Repairs & Maintenance</a></li>
              <li><a href="#" className="hover:text-amber-500">Boutique Appointments</a></li>
              <li><a href="#" className="hover:text-amber-500">Certificate of Authenticity</a></li>
              <li><a href="#" className="hover:text-amber-500">Extended Warranty</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm">Resources</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                GitHub Repository
              </a></li>
              <li><a href="#" className="hover:text-amber-500">Documentation</a></li>
              <li><a href="#" className="hover:text-amber-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-500">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm">Newsletter</h4>
            <p className="text-zinc-500 text-sm mb-4">Join our elite list for exclusive previews of upcoming releases.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-100 flex-1 focus:outline-none focus:border-amber-500" />
              <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs">© 2024 Horology Elite. Built for the precision-minded.</p>
          <div className="flex gap-6">
            <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a href="#" className="text-zinc-600 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
