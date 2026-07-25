'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp } from 'lucide-react';

export default function TokenPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="pointer-events-auto glass-panel px-3 py-1.5 flex items-center gap-2 text-[8px] font-mono tracking-widest hover:opacity-80 transition-opacity border-[#E0E0E0]/40 bg-[#E0E0E0]/10 ml-3 shadow-[0_0_10px_rgba(224,224,224,0.1)]"
      >
        <TrendingUp className="w-3 h-3 text-[#E0E0E0]" />
        <span className="text-[#E0E0E0] font-bold">$OPENSPY</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-auto px-4"
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div 
              className="relative w-full max-w-4xl glass-panel border border-white/10 shadow-2xl flex flex-col rounded-xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/20">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-[#E0E0E0]" />
                  <h2 className="text-xs font-mono font-bold text-white tracking-widest uppercase">$OPENSPY LIVE CHART</h2>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-[var(--text-muted)] hover:text-white" />
                </button>
              </div>

              {/* Chart Body */}
              <div className="p-1 relative w-full bg-black/20" style={{ height: '70vh', minHeight: '500px' }}>
                <iframe 
                  src="https://dexscreener.com/solana?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
                  className="absolute inset-0 w-full h-full border-0 rounded-lg"
                  allow="clipboard-write"
                  style={{ filter: 'brightness(0.95) contrast(1.05) hue-rotate(120deg) saturate(0.3)' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
