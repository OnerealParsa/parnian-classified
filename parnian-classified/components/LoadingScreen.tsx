"use client";

import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ open, label }: { open: boolean; label: string }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-[#f7f7f5]"
        >
          <div className="text-center">
            <div data-mono="true" className="text-xs tracking-[0.35em] text-white/55">P-01</div>
            <div className="mt-3 text-sm tracking-[0.3em] text-white/75" data-mono="true">LOADING / CLASSIFIED</div>
            <motion.div
              key={label}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-6 text-2xl md:text-4xl font-light tracking-[0.15em]"
            >
              {label}
            </motion.div>
            <div className="mt-6 h-px w-56 bg-white/15 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="h-full w-1/2 bg-white/70"
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
