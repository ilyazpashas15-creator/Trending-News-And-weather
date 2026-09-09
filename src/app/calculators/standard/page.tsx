'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

type HistoryEntry = { expr: string; result: string };

export default function CalculatorsStandardPage() {
  const [isDark, setIsDark] = useState(false);
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [memory, setMemory] = useState(0);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [displayAnim, setDisplayAnim] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  // Detect dark mode from <html class="dark">
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const flashDisplay = () => {
    setDisplayAnim(true);
    setTimeout(() => setDisplayAnim(false), 300);
  };

  const triggerKeyPress = (key: string) => {
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 150);
  };

  const addToHistory = useCallback((entry: HistoryEntry) => {
    setHistory(prev => [entry, ...prev].slice(0, 20));
  }, []);

  const inputDigit = useCallback((digit: string) => {
    triggerKeyPress(digit);
    setWaitingForOperand(prev => {
      if (prev) { setDisplay(digit); return false; }
      setDisplay(d => d === '0' ? digit : d + digit);
      return false;
    });
  }, []);

  const inputDecimal = useCallback(() => {
    triggerKeyPress('.');
    if (waitingForOperand) { setDisplay('0.'); setWaitingForOperand(false); return; }
    setDisplay(prev => prev.includes('.') ? prev : prev + '.');
  }, [waitingForOperand]);

  const clearAll = useCallback(() => {
    triggerKeyPress('C');
    setDisplay('0'); setPreviousValue(null); setOperation(null);
    setWaitingForOperand(false); setExpression('');
  }, []);

  const backspace = useCallback(() => {
    triggerKeyPress('\u232B');
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  }, []);

  const toggleSign = useCallback(() => {
    triggerKeyPress('\u00B1');
    setDisplay(prev => String(parseFloat(prev) * -1));
  }, []);

  const inputPercent = useCallback(() => {
    triggerKeyPress('%');
    setDisplay(prev => String(parseFloat(prev) / 100));
  }, []);

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '\u2212': return a - b;
      case '\u00D7': return a * b;
      case '\u00F7': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const formatDisplay = (val: string): string => {
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) return num.toExponential(4);
    return val;
  };

  const performOperation = useCallback((op: string) => {
    triggerKeyPress(op);
    const inputValue = parseFloat(display);
    if (previousValue !== null && operation && !waitingForOperand) {
      const result = calculate(previousValue, inputValue, operation);
      addToHistory({ expr: `${previousValue} ${operation} ${inputValue}`, result: String(result) });
      setDisplay(String(result));
      setPreviousValue(result);
      setExpression(`${result} ${op}`);
      flashDisplay();
    } else {
      setPreviousValue(inputValue);
      setExpression(`${inputValue} ${op}`);
    }
    setWaitingForOperand(true);
    setOperation(op);
  }, [display, previousValue, operation, waitingForOperand, addToHistory]);

  const handleEquals = useCallback(() => {
    triggerKeyPress('=');
    const inputValue = parseFloat(display);
    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      addToHistory({ expr: `${expression} ${inputValue}`, result: String(result) });
      setDisplay(String(result));
      setPreviousValue(null); setOperation(null); setExpression('');
      setWaitingForOperand(true);
      flashDisplay();
    }
  }, [display, previousValue, operation, expression, addToHistory]);

  const handleSquareRoot = useCallback(() => {
    triggerKeyPress('\u221A');
    const val = parseFloat(display);
    if (val < 0) return;
    const res = Math.sqrt(val);
    addToHistory({ expr: `\u221A(${val})`, result: String(res) });
    setDisplay(String(res)); setWaitingForOperand(true); flashDisplay();
  }, [display, addToHistory]);

  const handleSquare = useCallback(() => {
    triggerKeyPress('x\u00B2');
    const val = parseFloat(display);
    const res = val * val;
    addToHistory({ expr: `(${val})\u00B2`, result: String(res) });
    setDisplay(String(res)); setWaitingForOperand(true); flashDisplay();
  }, [display, addToHistory]);

  const handleReciprocal = useCallback(() => {
    triggerKeyPress('1/x');
    const val = parseFloat(display);
    if (val === 0) return;
    const res = 1 / val;
    addToHistory({ expr: `1/(${val})`, result: String(res) });
    setDisplay(String(res)); setWaitingForOperand(true); flashDisplay();
  }, [display, addToHistory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') { e.preventDefault(); inputDigit(e.key); }
      else if (e.key === '.') { e.preventDefault(); inputDecimal(); }
      else if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); handleEquals(); }
      else if (e.key === 'Backspace') { e.preventDefault(); backspace(); }
      else if (e.key === 'Escape') { e.preventDefault(); clearAll(); }
      else if (e.key === '+') { e.preventDefault(); performOperation('+'); }
      else if (e.key === '-') { e.preventDefault(); performOperation('\u2212'); }
      else if (e.key === '*') { e.preventDefault(); performOperation('\u00D7'); }
      else if (e.key === '/') { e.preventDefault(); performOperation('\u00F7'); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDecimal, handleEquals, backspace, clearAll, performOperation]);

  const displayValue = formatDisplay(display);
  const fontSize = displayValue.length > 12 ? '1.5rem' : displayValue.length > 9 ? '2rem' : displayValue.length > 6 ? '2.5rem' : '3rem';

  // ── Theme tokens ──
  const D = isDark;
  const t = {
    // Page
    pageBg: D
      ? 'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(99,102,241,0.22) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 80% 100%, rgba(6,182,212,0.10) 0%, transparent 50%), #030712'
      : 'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 80% 100%, rgba(6,182,212,0.05) 0%, transparent 50%), #f1f5f9',
    // Badge
    badgeBg: D ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.10)',
    badgeBorder: D ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.30)',
    badgeColor: D ? '#a5b4fc' : '#6366f1',
    // Title gradient
    titleGrad: D
      ? 'linear-gradient(135deg,#ffffff 0%,#c7d2fe 50%,#818cf8 100%)'
      : 'linear-gradient(135deg,#1e293b 0%,#4338ca 50%,#6366f1 100%)',
    // Subtitle
    subtitle: D ? '#64748b' : '#64748b',
    // Card
    cardBg: D ? 'rgba(15,23,42,0.80)' : 'rgba(255,255,255,0.90)',
    cardBorder: D ? 'rgba(255,255,255,0.08)' : 'rgba(148,163,184,0.35)',
    cardShadow: D
      ? '0 0 0 1px rgba(255,255,255,0.03) inset, 0 32px 64px rgba(0,0,0,0.6), 0 0 80px rgba(99,102,241,0.06)'
      : '0 0 0 1px rgba(255,255,255,0.8) inset, 0 16px 48px rgba(100,116,139,0.18), 0 4px 12px rgba(99,102,241,0.08)',
    cardTopLine: D
      ? 'linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)'
      : 'linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)',
    // Display
    displayBg: D ? 'rgba(2,6,23,0.85)' : 'rgba(248,250,252,0.95)',
    displayBorder: D ? 'rgba(255,255,255,0.06)' : 'rgba(148,163,184,0.3)',
    displayTopLine: D
      ? 'linear-gradient(90deg,transparent,rgba(99,102,241,0.35),transparent)'
      : 'linear-gradient(90deg,transparent,rgba(99,102,241,0.25),transparent)',
    exprColor: D ? '#475569' : '#94a3b8',
    mainColor: D ? '#ffffff' : '#0f172a',
    flashColor: D ? '#a5b4fc' : '#6366f1',
    // Memory
    memBg: D ? 'rgba(30,41,59,0.4)' : 'rgba(241,245,249,0.8)',
    memBorder: D ? 'rgba(255,255,255,0.06)' : 'rgba(148,163,184,0.3)',
    memColor: D ? '#64748b' : '#64748b',
    memHoverBg: D ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.10)',
    memHoverBorder: D ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.3)',
    memHoverColor: D ? '#a5b4fc' : '#6366f1',
    memActivColor: D ? '#818cf8' : '#6366f1',
    // Number buttons
    numBg: D ? 'rgba(30,41,59,0.65)' : 'rgba(255,255,255,0.85)',
    numBorder: D ? 'rgba(255,255,255,0.07)' : 'rgba(203,213,225,0.8)',
    numColor: D ? '#e2e8f0' : '#1e293b',
    numShadow: D
      ? '0 2px 8px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05) inset'
      : '0 2px 6px rgba(100,116,139,0.12), 0 1px 0 rgba(255,255,255,0.9) inset',
    numHoverBg: D ? 'rgba(51,65,85,0.75)' : 'rgba(255,255,255,1)',
    numHoverBorder: D ? 'rgba(255,255,255,0.12)' : 'rgba(148,163,184,0.9)',
    numHoverShadow: D
      ? '0 4px 16px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset'
      : '0 4px 12px rgba(100,116,139,0.18), 0 1px 0 rgba(255,255,255,1) inset',
    // Op buttons
    opBg: D ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
    opBorder: D ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.25)',
    opColor: D ? '#a5b4fc' : '#6366f1',
    opShadow: D ? '0 2px 8px rgba(99,102,241,0.15)' : '0 2px 6px rgba(99,102,241,0.10)',
    opHoverBg: D ? 'rgba(99,102,241,0.26)' : 'rgba(99,102,241,0.16)',
    opHoverBorder: D ? 'rgba(99,102,241,0.45)' : 'rgba(99,102,241,0.45)',
    opHoverColor: D ? '#c7d2fe' : '#4338ca',
    opHoverShadow: D ? '0 4px 20px rgba(99,102,241,0.25)' : '0 4px 16px rgba(99,102,241,0.18)',
    // Fn buttons
    fnBg: D ? 'rgba(6,182,212,0.10)' : 'rgba(6,182,212,0.07)',
    fnBorder: D ? 'rgba(6,182,212,0.20)' : 'rgba(6,182,212,0.25)',
    fnColor: D ? '#67e8f9' : '#0891b2',
    fnHoverBg: D ? 'rgba(6,182,212,0.20)' : 'rgba(6,182,212,0.15)',
    fnHoverBorder: D ? 'rgba(6,182,212,0.40)' : 'rgba(6,182,212,0.45)',
    fnHoverColor: D ? '#a5f3fc' : '#0e7490',
    // Clear
    clrBg: D ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.08)',
    clrBorder: D ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.25)',
    clrColor: D ? '#fca5a5' : '#dc2626',
    clrHoverBg: D ? 'rgba(239,68,68,0.22)' : 'rgba(239,68,68,0.16)',
    // Equals
    eqGrad: 'linear-gradient(135deg,#6366f1 0%,#818cf8 50%,#a5b4fc 100%)',
    eqShadow: D ? '0 8px 24px rgba(99,102,241,0.40), 0 0 0 1px rgba(255,255,255,0.12) inset' : '0 8px 24px rgba(99,102,241,0.30), 0 0 0 1px rgba(255,255,255,0.5) inset',
    eqHoverGrad: 'linear-gradient(135deg,#818cf8 0%,#a5b4fc 60%,#c7d2fe 100%)',
    eqHoverShadow: D ? '0 12px 32px rgba(99,102,241,0.55), 0 0 40px rgba(99,102,241,0.18)' : '0 12px 32px rgba(99,102,241,0.40), 0 0 40px rgba(99,102,241,0.12)',
    // History panel
    histBg: D ? 'rgba(15,23,42,0.70)' : 'rgba(255,255,255,0.88)',
    histBorder: D ? 'rgba(255,255,255,0.07)' : 'rgba(148,163,184,0.35)',
    histShadow: D ? '0 32px 64px rgba(0,0,0,0.5)' : '0 16px 48px rgba(100,116,139,0.18)',
    histHeaderBorder: D ? 'rgba(255,255,255,0.06)' : 'rgba(148,163,184,0.25)',
    histTitleColor: D ? '#94a3b8' : '#475569',
    histDot: '#6366f1',
    histEntryBg: 'transparent',
    histEntryHoverBg: D ? 'rgba(99,102,241,0.10)' : 'rgba(99,102,241,0.07)',
    histEntryBorder: D ? 'rgba(255,255,255,0.04)' : 'rgba(203,213,225,0.4)',
    hexprColor: D ? '#475569' : '#94a3b8',
    hresColor: D ? '#e2e8f0' : '#0f172a',
    hemptyColor: D ? '#334155' : '#cbd5e1',
    // Footer
    hfooterBorder: D ? 'rgba(255,255,255,0.05)' : 'rgba(148,163,184,0.25)',
    kbdBg: D ? 'rgba(30,41,59,0.8)' : 'rgba(241,245,249,0.9)',
    kbdBorder: D ? 'rgba(255,255,255,0.10)' : 'rgba(148,163,184,0.5)',
    kbdColor: D ? '#64748b' : '#94a3b8',
    hintText: D ? '#334155' : '#94a3b8',
    // Mobile btn
    mobBg: D ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
    mobBorder: D ? 'rgba(99,102,241,0.30)' : 'rgba(99,102,241,0.25)',
    mobColor: D ? '#a5b4fc' : '#6366f1',
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    .calc-root {
      min-height: 100vh;
      background: ${t.pageBg};
      font-family: 'Inter', sans-serif;
      display: flex; flex-direction: column; align-items: center;
      padding: 2rem 1rem 4rem; position: relative;
      transition: background 0.3s ease;
    }
    .ambient-ring {
      position: fixed; bottom: -200px; left: 50%; transform: translateX(-50%);
      width: 700px; height: 700px; border-radius: 50%;
      background: radial-gradient(circle, ${D ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)'} 0%, transparent 70%);
      pointer-events: none; z-index: 0;
    }
    .calc-header { text-align: center; margin-bottom: 2.5rem; position: relative; z-index: 1; }
    .calc-badge {
      display: inline-flex; align-items: center; gap: 6px;
      background: ${t.badgeBg}; border: 1px solid ${t.badgeBorder}; color: ${t.badgeColor};
      padding: 4px 14px; border-radius: 999px;
      font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1rem;
      transition: all 0.3s;
    }
    .calc-title {
      font-size: clamp(2rem,5vw,2.8rem); font-weight: 900; margin: 0 0 0.5rem; line-height: 1.1;
      background: ${t.titleGrad}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text; transition: all 0.3s;
    }
    .calc-subtitle { color: ${t.subtitle}; font-size: 0.88rem; max-width: 380px; margin: 0 auto; }
    .calc-layout {
      display: grid; grid-template-columns: 340px 270px; gap: 1.25rem;
      max-width: 650px; width: 100%; position: relative; z-index: 1;
    }
    @media (max-width: 680px) {
      .calc-layout { grid-template-columns: 1fr; max-width: 360px; }
      .history-panel { display: none; }
      .history-panel.open { display: flex; }
    }
    .calc-card {
      background: ${t.cardBg}; border: 1px solid ${t.cardBorder}; border-radius: 28px;
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      box-shadow: ${t.cardShadow}; padding: 18px; position: relative; overflow: hidden;
      transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
    }
    .calc-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: ${t.cardTopLine}; pointer-events: none;
    }
    .calc-display {
      background: ${t.displayBg}; border: 1px solid ${t.displayBorder}; border-radius: 16px;
      padding: 14px 18px 10px; margin-bottom: 12px; min-height: 90px;
      display: flex; flex-direction: column; justify-content: flex-end;
      position: relative; overflow: hidden; transition: background 0.3s, border-color 0.3s;
    }
    .calc-display::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: ${t.displayTopLine};
    }
    .display-expr {
      color: ${t.exprColor}; font-size: 0.7rem; text-align: right; font-family: 'Inter', monospace;
      min-height: 16px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 4px;
      transition: color 0.3s;
    }
    .display-main {
      text-align: right; font-family: 'Inter', sans-serif; font-weight: 300;
      color: ${t.mainColor}; line-height: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      transition: color .15s, transform .1s;
    }
    .display-main.flash { color: ${t.flashColor}; transform: scale(1.02); }
    .memory-bar { display: grid; grid-template-columns: repeat(5,1fr); gap: 5px; margin-bottom: 10px; }
    .mem-btn {
      background: ${t.memBg}; border: 1px solid ${t.memBorder}; border-radius: 8px;
      color: ${t.memColor}; font-size: 0.63rem; font-weight: 700; letter-spacing: 0.04em;
      padding: 5px 0; cursor: pointer; text-transform: uppercase;
      transition: background .15s, border-color .15s, color .15s;
    }
    .mem-btn:hover { background: ${t.memHoverBg}; border-color: ${t.memHoverBorder}; color: ${t.memHoverColor}; }
    .mem-btn.hi { color: ${t.memActivColor}; }
    .keypad { display: grid; grid-template-columns: repeat(4,1fr); gap: 6px; }
    .btn {
      border: none; border-radius: 13px; cursor: pointer; font-family: 'Inter', sans-serif;
      font-size: 1.05rem; font-weight: 500; height: 56px;
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden; user-select: none; -webkit-tap-highlight-color: transparent;
      transition: transform .12s cubic-bezier(.34,1.56,.64,1), box-shadow .15s, filter .15s, background .15s, color .15s;
    }
    .btn:hover { transform: translateY(-1px); }
    .btn:active, .btn.pressed { transform: scale(0.89) !important; filter: brightness(1.2); }

    /* Number */
    .btn-num {
      background: ${t.numBg}; border: 1px solid ${t.numBorder}; color: ${t.numColor};
      box-shadow: ${t.numShadow};
    }
    .btn-num:hover { background: ${t.numHoverBg}; border-color: ${t.numHoverBorder}; box-shadow: ${t.numHoverShadow}; }

    /* Operator */
    .btn-op {
      background: ${t.opBg}; border: 1px solid ${t.opBorder}; color: ${t.opColor};
      box-shadow: ${t.opShadow};
    }
    .btn-op:hover { background: ${t.opHoverBg}; border-color: ${t.opHoverBorder}; color: ${t.opHoverColor}; box-shadow: ${t.opHoverShadow}; }

    /* Function */
    .btn-fn {
      background: ${t.fnBg}; border: 1px solid ${t.fnBorder}; color: ${t.fnColor};
      font-size: 0.8rem; font-weight: 700; box-shadow: 0 2px 6px rgba(6,182,212,0.08);
    }
    .btn-fn:hover { background: ${t.fnHoverBg}; border-color: ${t.fnHoverBorder}; color: ${t.fnHoverColor}; }

    /* Clear */
    .btn-clear {
      background: ${t.clrBg}; border: 1px solid ${t.clrBorder}; color: ${t.clrColor};
      font-weight: 800; box-shadow: 0 2px 6px rgba(239,68,68,0.08);
    }
    .btn-clear:hover { background: ${t.clrHoverBg}; border-color: rgba(239,68,68,0.45); }

    /* Equals */
    .btn-equals {
      background: ${t.eqGrad}; border: none; color: #fff;
      font-size: 1.6rem; font-weight: 300;
      grid-row: span 2; height: auto; min-height: 118px;
      box-shadow: ${t.eqShadow}; letter-spacing: -0.02em;
    }
    .btn-equals:hover {
      background: ${t.eqHoverGrad}; box-shadow: ${t.eqHoverShadow}; transform: translateY(-2px) !important;
    }

    /* History */
    .history-panel {
      background: ${t.histBg}; border: 1px solid ${t.histBorder}; border-radius: 24px;
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      box-shadow: ${t.histShadow}; display: flex; flex-direction: column; overflow: hidden;
      transition: background 0.3s, border-color 0.3s;
    }
    .history-header {
      padding: 14px 16px 10px; border-bottom: 1px solid ${t.histHeaderBorder};
      display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
    }
    .history-title {
      display: flex; align-items: center; gap: 8px; color: ${t.histTitleColor};
      font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
    }
    .hdot {
      width: 6px; height: 6px; border-radius: 50%; background: #6366f1;
      box-shadow: 0 0 6px rgba(99,102,241,0.8); animation: pdot 2s ease-in-out infinite;
    }
    @keyframes pdot { 0%,100% { opacity:1;transform:scale(1); } 50% { opacity:.5;transform:scale(.8); } }
    .history-clear {
      background: none; border: none; color: #ef4444; font-size: 0.7rem; cursor: pointer;
      opacity: 0.7; transition: opacity .15s; padding: 4px 8px; border-radius: 6px;
    }
    .history-clear:hover { opacity: 1; background: rgba(239,68,68,.1); }
    .history-entries {
      flex: 1; overflow-y: auto; padding: 6px;
      scrollbar-width: thin; scrollbar-color: rgba(99,102,241,.3) transparent;
    }
    .history-entries::-webkit-scrollbar { width: 4px; }
    .history-entries::-webkit-scrollbar-thumb { background: rgba(99,102,241,.3); border-radius: 4px; }
    .hentry {
      padding: 10px 12px; border-radius: 10px; cursor: pointer;
      transition: background .15s; border-bottom: 1px solid ${t.histEntryBorder}; margin-bottom: 2px;
    }
    .hentry:hover { background: ${t.histEntryHoverBg}; }
    .hexpr { color: ${t.hexprColor}; font-size: 0.66rem; font-family: 'Inter',monospace; text-align: right; margin-bottom: 2px; }
    .hresult { color: ${t.hresColor}; font-size: 0.88rem; font-weight: 600; text-align: right; font-family: 'Inter',monospace; }
    .hempty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; gap: 10px; color: ${t.hemptyColor}; }
    .hfooter { padding: 12px 14px; border-top: 1px solid ${t.hfooterBorder}; flex-shrink: 0; }
    .kbd-row { display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; }
    .kbd {
      background: ${t.kbdBg}; border: 1px solid ${t.kbdBorder}; border-radius: 5px;
      color: ${t.kbdColor}; font-size: 0.6rem; padding: 2px 5px;
      font-family: 'Inter',monospace; font-weight: 600;
    }
    .mob-hist-btn {
      display: none; align-items: center; gap: 6px;
      background: ${t.mobBg}; border: 1px solid ${t.mobBorder}; border-radius: 10px;
      color: ${t.mobColor}; font-size: .78rem; font-weight: 700; cursor: pointer;
      padding: 6px 14px; margin-bottom: 12px; width: 100%; justify-content: center;
    }
    @media (max-width: 680px) { .mob-hist-btn { display: flex; } }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="calc-root">
        <div className="ambient-ring" />

        {/* Header */}
        <div className="calc-header">
          <div className="calc-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h10V4H7zm2 3h6v2H9V7zm0 4h2v2H9v-2zm4 0h2v2h-2v-2zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>
            High Precision Engine
          </div>
          <h1 className="calc-title">Standard Calculator</h1>
          <p className="calc-subtitle">Scientific functions · Memory registers · Full history · Keyboard ready</p>
        </div>

        <button className="mob-hist-btn" onClick={() => setShowHistory(v => !v)}>
          &#128336; {showHistory ? 'Hide History' : 'Show History'}
        </button>

        <div className="calc-layout">
          {/* ── Calculator Card ── */}
          <div className="calc-card">
            <div className="calc-display">
              <div className="display-expr">{expression || '\u00A0'}</div>
              <div className={`display-main${displayAnim ? ' flash' : ''}`} style={{ fontSize }}>
                {displayValue}
              </div>
            </div>

            {/* Memory */}
            <div className="memory-bar">
              {[
                { label: 'MC', action: () => setMemory(0) },
                { label: 'MR', action: () => { setDisplay(String(memory)); setWaitingForOperand(false); } },
                { label: 'M+', action: () => setMemory(m => m + parseFloat(display)) },
                { label: 'M\u2212', action: () => setMemory(m => m - parseFloat(display)) },
                { label: 'MS', action: () => setMemory(parseFloat(display)) },
              ].map(m => (
                <button key={m.label} className={`mem-btn${m.label === 'MR' && memory !== 0 ? ' hi' : ''}`} onClick={m.action}>
                  {m.label}
                </button>
              ))}
            </div>

            {/* Keypad */}
            <div className="keypad">
              {/* Row 1: %, C, ⌫, ÷ */}
              <button className={`btn btn-fn${pressedKey === '%' ? ' pressed' : ''}`} onClick={inputPercent}>%</button>
              <button className={`btn btn-clear${pressedKey === 'C' ? ' pressed' : ''}`} onClick={clearAll}>C</button>
              <button className={`btn btn-fn${pressedKey === '\u232B' ? ' pressed' : ''}`} onClick={backspace}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                  <line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/>
                </svg>
              </button>
              <button className={`btn btn-op${pressedKey === '\u00F7' ? ' pressed' : ''}`} onClick={() => performOperation('\u00F7')} style={{ fontSize: '1.35rem' }}>&divide;</button>

              {/* Row 2: 1/x, x², √x, × */}
              <button className={`btn btn-fn${pressedKey === '1/x' ? ' pressed' : ''}`} onClick={handleReciprocal} style={{ fontSize: '0.72rem', fontWeight: 800 }}>1/x</button>
              <button className={`btn btn-fn${pressedKey === 'x\u00B2' ? ' pressed' : ''}`} onClick={handleSquare} style={{ fontSize: '0.8rem', fontWeight: 800 }}>x&sup2;</button>
              <button className={`btn btn-fn${pressedKey === '\u221A' ? ' pressed' : ''}`} onClick={handleSquareRoot} style={{ fontSize: '0.85rem', fontWeight: 800 }}>&radic;x</button>
              <button className={`btn btn-op${pressedKey === '\u00D7' ? ' pressed' : ''}`} onClick={() => performOperation('\u00D7')} style={{ fontSize: '1.35rem' }}>&times;</button>

              {/* Row 3: 7, 8, 9, − */}
              {['7','8','9'].map(d => (
                <button key={d} className={`btn btn-num${pressedKey === d ? ' pressed' : ''}`} onClick={() => inputDigit(d)}>{d}</button>
              ))}
              <button className={`btn btn-op${pressedKey === '\u2212' ? ' pressed' : ''}`} onClick={() => performOperation('\u2212')} style={{ fontSize: '1.35rem' }}>&minus;</button>

              {/* Row 4: 4, 5, 6, + */}
              {['4','5','6'].map(d => (
                <button key={d} className={`btn btn-num${pressedKey === d ? ' pressed' : ''}`} onClick={() => inputDigit(d)}>{d}</button>
              ))}
              <button className={`btn btn-op${pressedKey === '+' ? ' pressed' : ''}`} onClick={() => performOperation('+')} style={{ fontSize: '1.35rem' }}>+</button>

              {/* Row 5: 1, 2, 3, = (spans 2) */}
              {['1','2','3'].map(d => (
                <button key={d} className={`btn btn-num${pressedKey === d ? ' pressed' : ''}`} onClick={() => inputDigit(d)}>{d}</button>
              ))}
              <button className={`btn btn-equals${pressedKey === '=' ? ' pressed' : ''}`} onClick={handleEquals}>=</button>

              {/* Row 6: ±, 0, . */}
              <button className={`btn btn-num${pressedKey === '\u00B1' ? ' pressed' : ''}`} onClick={toggleSign} style={{ fontSize: '0.95rem' }}>&plusmn;</button>
              <button className={`btn btn-num${pressedKey === '0' ? ' pressed' : ''}`} onClick={() => inputDigit('0')} style={{ fontSize: '1.15rem' }}>0</button>
              <button className={`btn btn-num${pressedKey === '.' ? ' pressed' : ''}`} onClick={inputDecimal} style={{ fontSize: '1.4rem', fontWeight: 800 }}>.</button>
            </div>
          </div>

          {/* ── History Panel ── */}
          <div className={`history-panel${showHistory ? ' open' : ''}`}>
            <div className="history-header">
              <div className="history-title"><div className="hdot" />Session Log</div>
              {history.length > 0 && <button className="history-clear" onClick={() => setHistory([])}>&#10005; Clear</button>}
            </div>
            <div className="history-entries" ref={historyRef}>
              {history.length === 0 ? (
                <div className="hempty">
                  <div style={{ fontSize: '2.4rem', opacity: 0.35 }}>&#129518;</div>
                  <div style={{ fontSize: '0.76rem', textAlign: 'center', lineHeight: 1.5 }}>
                    No calculations yet.<br />
                    <span style={{ opacity: 0.6 }}>Results appear here.</span>
                  </div>
                </div>
              ) : history.map((item, i) => (
                <div
                  key={i}
                  className="hentry"
                  onClick={() => { setDisplay(item.result); setWaitingForOperand(true); }}
                  title="Click to load result"
                >
                  <div className="hexpr">{item.expr} =</div>
                  <div className="hresult">{item.result}</div>
                </div>
              ))}
            </div>
            <div className="hfooter">
              <div className="kbd-row">
                {['+', '\u2212', '\u00D7', '\u00F7', 'Enter', 'Esc', '\u232B'].map(k => (
                  <span key={k} className="kbd">{k}</span>
                ))}
              </div>
              <p style={{ color: t.hintText, fontSize: '0.63rem', textAlign: 'center', marginTop: 8 }}>
                Full keyboard support enabled
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
