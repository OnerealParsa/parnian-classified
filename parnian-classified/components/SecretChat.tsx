"use client";

import { useEffect, useState } from 'react';

const message = `پرنیان 😄

تولدت مبارککک 🎂🤍

۱۹ سالگیت مبارک!

میخواستی یه روز زودتر فالوت کنم که کادوت یه روز دیر نشه 😂

امیدوارم سال جدید زندگیت پر باشه از اتفاقای خوب، خنده‌های زیاد و کلی خاطره قشنگ.

Happy Birthday Parnian 🤍
— Parsa`;

export default function SecretChat({ open }: { open: boolean }) {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!open) return;
    setText('');
    setDone(false);
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setText(message.slice(0, i));
      if (i >= message.length) {
        window.clearInterval(timer);
        setDone(true);
      }
    }, 38);
    return () => window.clearInterval(timer);
  }, [open]);
  if (!open) return null;
  return (
    <div className="dark-panel relative overflow-hidden px-5 py-6 text-white md:px-8 md:py-8">
      <div className="text-xs tracking-[0.35em] text-white/55" data-mono="true">PRIVATE MESSAGE</div>
      <div className="mt-2 text-sm text-white/75" data-mono="true">FROM: PARSA</div>
      <div className="mt-1 text-sm text-white/75" data-mono="true">STATUS: DELIVERED</div>
      <div className="mt-6 whitespace-pre-wrap text-[15px] leading-7 md:text-base">
        {text}
        {!done ? <span className="ml-1 inline-block h-4 w-[1px] translate-y-0.5 bg-white animate-pulse" /> : null}
      </div>
      {done ? <div className="mt-5 text-sm text-white/55" data-mono="true">— Parsa</div> : null}
    </div>
  );
}
