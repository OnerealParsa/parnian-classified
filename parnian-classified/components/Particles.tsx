"use client";

import { useEffect, useMemo, useState } from 'react';

export default function Particles({ active = true }: { active?: boolean }) {
  const particles = useMemo(
    () => Array.from({ length: 24 }, (_, i) => ({ id: i, left: Math.random() * 100, top: Math.random() * 100, delay: Math.random() * 8 })),
    []
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!active || !mounted) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute h-1 w-1 rounded-full bg-white/40"
          style={{ left: `${p.left}%`, top: `${p.top}%`, animation: `float 10s ease-in-out ${p.delay}s infinite` }}
        />
      ))}
      <style jsx>{`@keyframes float {0%,100%{transform:translateY(0)}50%{transform:translateY(-24px)}}`}</style>
    </div>
  );
}
