"use client";

import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useMemo } from 'react';

export default function PhotoCard({ src, label, caption, alt }: { src: string; label: string; caption: string; alt: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const style = useMemo(() => ({ perspective: 1200 }), []);
  return (
    <motion.div
      style={style}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden border border-black/10 bg-white/70 shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        x.set(px);
        y.set(py);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div style={{ rotateX, rotateY }} className="relative aspect-[4/5]">
        <Image src={src} alt={alt} fill className="object-cover transition duration-500 group-hover:scale-105" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </motion.div>
      <div className="border-t border-black/10 p-4">
        <div data-mono="true" className="text-xs tracking-[0.28em] text-black/55">{label}</div>
        <div className="mt-2 text-sm leading-6 text-black/80">{caption}</div>
      </div>
    </motion.div>
  );
}
