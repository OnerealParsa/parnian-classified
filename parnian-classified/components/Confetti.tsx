"use client";

import { useEffect, useState } from 'react';

export default function Confetti({ active }: { active: boolean }) {
  const [show, setShow] = useState(active);
  useEffect(() => {
    setShow(active);
    if (!active) return;
    const t = setTimeout(() => setShow(false), 2800);
    return () => clearTimeout(t);
  }, [active]);
  if (!show) return null;
  const pieces = Array.from({ length: 36 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((i) => (
        <span
          key={i}
          className="absolute top-[-10px] h-2 w-1 rounded-sm bg-white/80"
          style={{
            left: `${(i * 7) % 100}%`,
            transform: `rotate(${(i * 19) % 180}deg)`,
            animation: `fall ${1.8 + (i % 5) * 0.35}s linear ${i * 0.03}s infinite`,
          }}
        />
      ))}
      <style jsx>{`@keyframes fall {0%{transform:translateY(0) rotate(0)}100%{transform:translateY(110vh) rotate(240deg)}}`}</style>
    </div>
  );
}
