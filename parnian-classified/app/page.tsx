"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, Volume2, VolumeX, ArrowRight, Sparkles, Play } from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';
import PhotoCard from '@/components/PhotoCard';
import Particles from '@/components/Particles';
import Confetti from '@/components/Confetti';
import SecretChat from '@/components/SecretChat';

const keys = ['title', 'energy', 'photo', 'corner', 'final'] as const;
const sections = ['FILE 01', 'EVIDENCE', 'TEST', 'REVEAL', 'SECRET'] as const;
const questions = [
  ['Sobha ya shab?', ['Sobh', 'Shab', 'Har do', 'Hichkodom 😂']],
  ['Safar ya khone?', ['Safar', 'Khone', 'Har do', 'Randome']],
  ['Sweet ya salty?', ['Sweet', 'Salty', 'Mix', 'Harchi bashe']],
  ['Plan ya spontaneity?', ['Plan', 'Spontaneity', 'Sometimes both', 'Bebinim che mishe']],
];

export default function Page() {
  const reduceMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState('ACCESSING FILE...');
  const [stage, setStage] = useState(0);
  const [sound, setSound] = useState(false);
  const [eggs, setEggs] = useState<Record<string, boolean>>({});
  const [q, setQ] = useState(0);
  const [counting, setCounting] = useState(false);
  const [count, setCount] = useState(3);
  const [secretOpen, setSecretOpen] = useState(false);
  const [restartToken, setRestartToken] = useState(0);
  const [statusToast, setStatusToast] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  const secretCount = Object.values(eggs).filter(Boolean).length;
  const secretLevel = secretCount * 20;

  useEffect(() => {
    const saved = localStorage.getItem('parnian-eggs');
    if (saved) setEggs(JSON.parse(saved));
    const savedSound = localStorage.getItem('parnian-sound');
    if (savedSound) setSound(savedSound === '1');
  }, []);

  useEffect(() => localStorage.setItem('parnian-eggs', JSON.stringify(eggs)), [eggs]);
  useEffect(() => localStorage.setItem('parnian-sound', sound ? '1' : '0'), [sound]);

  useEffect(() => {
    if (!counting) return;
    setCount(3);
    const t = setInterval(() => setCount((c) => {
      if (c <= 1) {
        clearInterval(t);
        setTimeout(() => { setCounting(false); setStage(3); }, 700);
        return 1;
      }
      return c - 1;
    }), 650);
    return () => clearInterval(t);
  }, [counting]);

  useEffect(() => {
    if (stage === 2) {
      setTimeout(() => setCounting(true), 220);
    }
  }, [stage]);

  useEffect(() => {
    if (stage >= 1) setLoaded(true);
  }, [stage]);

  const markEgg = (key: keyof typeof eggs, msg?: string) => {
    if (eggs[key]) return;
    setEggs((p) => ({ ...p, [key]: true }));
    if (msg) setStatusToast(msg);
    window.setTimeout(() => setStatusToast(''), 1800);
  };

  const go = (next: number) => {
    setLoadingLabel(next === 1 ? 'DECRYPTING...' : 'ACCESS GRANTED');
    setStage(next);
  };

  const answer = () => {
    if (q < 3) setQ((v) => v + 1);
    else setStage(2);
  };

  const progress = Math.min(100, stage === 0 ? 0 : stage === 1 ? 20 : stage === 2 ? 40 : stage === 3 ? 60 : stage === 4 ? 80 : 100);
  const revealDone = stage >= 4;
  const showSecret = stage >= 5;

  const navItems = useMemo(() => sections, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f7f7f5] text-[#111111]">
      <div className="noise" />
      <LoadingScreen open={!loaded && stage === 0} label={loadingLabel} />
      <AnimatePresence>
        {stage === 0 ? (
          <motion.section ref={introRef} key="intro" className="relative flex min-h-screen items-center justify-center px-6 py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.02 }}>
            <div className="scanlines absolute inset-0" />
            <button onClick={() => markEgg('title', 'Secret found. Nice.')} className="absolute left-4 top-4 text-xs tracking-[0.35em] opacity-0 focus:opacity-100 focus-ring" aria-label="Hidden title trigger">.</button>
            <div className="relative z-10 text-center">
              <div data-mono="true" className="text-sm tracking-[0.4em] text-black/60">P-01</div>
              <div data-mono="true" className="mt-3 text-xs tracking-[0.4em] text-black/45">PERSONAL FILE / 01</div>
              <h1 className="mt-6 text-6xl font-light tracking-[0.18em] md:text-8xl">PARNIAN</h1>
              <div data-mono="true" className="mt-3 text-lg tracking-[0.35em] text-black/70">// CLASSIFIED</div>
              <p className="mx-auto mt-8 max-w-md text-sm leading-7 text-black/70">Ye chize koochik ke shayad gharar nabood peydash koni.</p>
              <button onClick={() => go(1)} className="focus-ring mt-10 inline-flex items-center gap-2 border border-black px-5 py-3 text-sm tracking-[0.22em] transition hover:bg-black hover:text-[#f7f7f5]" aria-label="Enter file">ENTER <ArrowRight size={16} /></button>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      {stage >= 1 ? (
        <>
          <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f7f7f5]/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
              <div className="text-xs tracking-[0.35em]" data-mono="true">P-01 / CLASSIFIED</div>
              <div className="hidden gap-5 text-xs tracking-[0.25em] md:flex" data-mono="true">
                {navItems.map((n) => <a key={n} href={`#${n.toLowerCase()}`} className="opacity-70 hover:opacity-100">{n}</a>)}
              </div>
              <div className="flex items-center gap-2">
                <button aria-label="Toggle sound" onClick={() => setSound((s) => !s)} className="focus-ring border border-black/15 p-2">
                  {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button aria-label="Menu" onClick={() => setMenuOpen((v) => !v)} className="focus-ring border border-black/15 p-2 md:hidden"><Menu size={16} /></button>
              </div>
            </div>
            <div className="h-[2px] bg-black/8"><div className="h-full bg-black transition-all duration-500" style={{ width: `${progress}%` }} /></div>
            {menuOpen ? <div className="border-t border-black/10 px-4 py-3 text-xs tracking-[0.25em] md:hidden" data-mono="true">{navItems.join('  •  ')}</div> : null}
          </header>

          <div className="fixed right-4 top-24 z-30 hidden h-3 w-3 rounded-full bg-black md:block" style={{ opacity: 0.4 }} />

          <section id="file 01" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <div className="max-w-3xl">
              <div data-mono="true" className="text-xs tracking-[0.35em] text-black/55">PARNIAN // FILE 01</div>
              <h2 className="mt-4 text-4xl font-light tracking-tight md:text-7xl">Probably cute.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-black/70">Talaash kardim andazegirish konim... Nashod.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                ['STATUS', 'Probably cute.'], ['ENERGY', '∞'], ['CHAOS LEVEL', '87%'], ['BIRTHDAY STATUS', 'ACTIVE 🎂'], ['CLASSIFICATION', 'Highly unpredictable'], ['THREAT LEVEL', 'Cute but suspicious'], ['AGE', '19'], ['DATE', '15 MORDAD'],
              ].map(([k, v]) => (
                <motion.button key={k} onClick={() => k === 'ENERGY' && markEgg('energy', 'Energy unlocked.')} whileHover={{ y: -4 }} className="glass focus-ring text-left p-5" aria-label={k}>
                  <div data-mono="true" className="text-[11px] tracking-[0.28em] text-black/45">{k}</div>
                  <div className="mt-3 text-lg leading-7">{v}</div>
                  {k === 'CHAOS LEVEL' ? <div className="mt-4 h-1.5 w-full bg-black/10"><div className="h-full w-[87%] bg-black" /></div> : null}
                </motion.button>
              ))}
            </div>
          </section>

          <section id="evidence" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24" onDoubleClick={() => markEgg('photo', 'Secret found. Nice.')}>
            <div className="max-w-3xl">
              <div data-mono="true" className="text-xs tracking-[0.35em] text-black/55">FILE 02 / VISUAL EVIDENCE</div>
              <h2 className="mt-4 text-4xl font-light md:text-7xl">Evidence.</h2>
              <p className="mt-5 text-sm leading-7 text-black/70">Chand ta dalil peyda kardim...</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <PhotoCard src="/images/photo1.jpg" alt="Parnian evidence photo 1" label="EVIDENCE 01" caption="In tasvir hich chizi ro sabet nemikone... vali mashkooke." />
              <PhotoCard src="/images/photo2.jpg" alt="Parnian evidence photo 2" label="EVIDENCE 02" caption="Situation getting a little weird..." />
              <PhotoCard src="/images/photo3.jpg" alt="Parnian evidence photo 3" label="EVIDENCE 03" caption="Ok. We have a problem." />
            </div>
            <button className="mt-4 text-xs tracking-[0.28em] text-black/50" data-mono="true" onClick={() => setStatusToast('Secret found. Nice.')}>DOUBLE CLICK DETECTED AREA</button>
          </section>

          <section id="test" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <div className="max-w-3xl">
              <div data-mono="true" className="text-xs tracking-[0.35em] text-black/55">PARNIAN TEST / 03</div>
              <h2 className="mt-4 text-4xl font-light md:text-7xl">Bebinim khodeto cheghadr mishenasi...</h2>
            </div>
            <div className="mt-8 max-w-3xl border border-black/10 bg-white/55 p-5 md:p-8">
              <div data-mono="true" className="text-xs tracking-[0.3em] text-black/50">QUESTION {String(q + 1).padStart(2, '0')}/04</div>
              <motion.div key={q} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-2xl md:text-4xl">
                {questions[q][0]}
              </motion.div>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {questions[q][1].map((a) => <button key={a} onClick={answer} className="focus-ring border border-black/10 bg-[#f7f7f5] px-4 py-3 text-left text-sm transition hover:bg-black hover:text-[#f7f7f5]">{a}</button>)}
              </div>
            </div>
          </section>

          {counting ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-[#f7f7f5] text-7xl md:text-[10rem] font-light">{count}</div> : null}

          <AnimatePresence>
            {stage >= 3 ? (
              <motion.section id="reveal" key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative bg-[#080808] px-4 py-20 text-white md:px-6 md:py-28">
                <Particles active={!reduceMotion} />
                <Confetti active={stage >= 4} />
                <div className="mx-auto max-w-7xl">
                  <div data-mono="true" className="text-xs tracking-[0.35em] text-white/55">BIRTHDAY STATUS / ACTIVATED</div>
                  <div className="mt-4 text-4xl font-light md:text-8xl">HAPPY <br /> 19TH <br /> BIRTHDAY <br /> PARNIAN</div>
                  <div className="mt-6 text-sm tracking-[0.25em] text-white/70" data-mono="true">15 MORDAD / AGE 19</div>
                  <p className="mt-6 max-w-2xl text-sm leading-7 text-white/80">Tavalodet mobarak Parnian 🎂🤍 Omidvaram sale jadidet por bashe az chizayi ke vaghti yadeshon miofti labkhand bezani. Happy Birthday, Parnian 🤍</p>
                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="dark-panel p-4">FILE STATUS: ACTIVE</motion.div>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.08 } }} className="dark-panel p-4">SUBJECT: PARNIAN</motion.div>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.16 } }} className="dark-panel p-4">DATE: 15 MORDAD</motion.div>
                  </div>
                  <div className="mt-10 grid gap-4 md:grid-cols-3">
                    <motion.div initial={{ opacity: 0, y: 24, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -2 }} className="dark-panel overflow-hidden"><img src="/images/photo1.jpg" alt="Parnian floating photo 1" className="h-56 w-full object-cover opacity-90" /><div className="p-4 text-sm text-white/70">Floating evidence 01</div></motion.div>
                    <motion.div initial={{ opacity: 0, y: 24, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 1 }} transition={{ delay: 0.08 }} className="dark-panel overflow-hidden"><img src="/images/photo2.jpg" alt="Parnian floating photo 2" className="h-56 w-full object-cover opacity-90" /><div className="p-4 text-sm text-white/70">Floating evidence 02</div></motion.div>
                    <motion.div initial={{ opacity: 0, y: 24, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 2 }} transition={{ delay: 0.16 }} className="dark-panel overflow-hidden"><img src="/images/photo3.jpg" alt="Parnian floating photo 3" className="h-56 w-full object-cover opacity-90" /><div className="p-4 text-sm text-white/70">Floating evidence 03</div></motion.div>
                  </div>
                  <div className="mt-12 border-t border-white/10 pt-8">
                    <div className="text-xs tracking-[0.35em] text-white/55" data-mono="true">ONE LAST THING</div>
                    <div className="mt-3 text-2xl text-white/90">Khab...</div>
                    <div className="mt-2 text-xl text-white/70">gharar nabood inja beresi 😂</div>
                    <div className="mt-6 text-sm tracking-[0.25em] text-white/55" data-mono="true">SECRET LEVEL: {secretLevel}%</div>
                    <div className="mt-3 h-1 w-full bg-white/10"><div className="h-full bg-white transition-all" style={{ width: `${secretLevel}%` }} /></div>
                    <div className="mt-5 flex flex-wrap gap-2 text-xs tracking-[0.25em] text-white/60" data-mono="true">{keys.map((k) => <span key={k}>{eggs[k] ? `✓ ${k.toUpperCase()}` : `□ ${k.toUpperCase()}`}</span>)}</div>
                    {secretLevel < 100 ? <button onClick={() => markEgg('final', 'Final clue found.')} className="focus-ring mt-8 inline-flex items-center gap-2 border border-white/20 px-4 py-3 text-sm tracking-[0.22em] text-white hover:bg-white hover:text-black">KEEP LOOKING <ArrowRight size={16} /></button> : <button onClick={() => setSecretOpen(true)} className="focus-ring mt-8 inline-flex items-center gap-2 border border-white/20 px-4 py-3 text-sm tracking-[0.22em] text-white hover:bg-white hover:text-black">KEEP LOOKING <ArrowRight size={16} /></button>}
                  </div>
                </div>
              </motion.section>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {secretOpen ? (
              <motion.section key={`secret-${restartToken}`} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#f7f7f5] px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-3xl">
                  <SecretChat open={secretOpen} />
                  <div className="mt-6 text-center text-sm text-black/70">END OF FILE</div>
                  <div className="mt-3 text-center text-4xl font-light">OKAY.</div>
                  <p className="mt-2 text-center text-sm text-black/70">That's it. No more secrets. Probably.</p>
                  <p className="mt-2 text-center text-sm text-black/70">Happy Birthday, Parnian 🎂</p>
                  <div className="mt-6 flex justify-center"><button onClick={() => { setStage(0); setQ(0); setCounting(false); setSecretOpen(false); setRestartToken((t) => t + 1); setMenuOpen(false); }} className="focus-ring border border-black px-4 py-3 text-sm tracking-[0.22em] hover:bg-black hover:text-white">↻ START AGAIN</button></div>
                </div>
              </motion.section>
            ) : null}
          </AnimatePresence>
        </>
      ) : null}

      {statusToast ? <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 border border-black/10 bg-white/90 px-4 py-2 text-sm shadow">{statusToast}</div> : null}
    </main>
  );
}
