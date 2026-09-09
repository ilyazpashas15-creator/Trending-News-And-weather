'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, TrendingUp, RefreshCw, DollarSign, Globe, Check, Copy } from 'lucide-react';

interface CurrencyItem {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateToUSD: number; // fallback reference rate
}

const CURRENCIES: CurrencyItem[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rateToUSD: 1.0 },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rateToUSD: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', rateToUSD: 0.79 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', rateToUSD: 83.4 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', rateToUSD: 156.2 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', rateToUSD: 7.24 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', rateToUSD: 1.51 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', rateToUSD: 1.36 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭', rateToUSD: 0.90 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', rateToUSD: 1.35 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', rateToUSD: 3.67 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦', rateToUSD: 3.75 },
];

export default function CalculatorsCurrencyPage() {
  const [isDark, setIsDark] = useState(true);
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRate, setExchangeRate] = useState<number>(0.92);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Live Rates');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      if (res.ok) {
        const data = await res.json();
        const rate = data.rates[toCurrency];
        if (rate) {
          setExchangeRate(rate);
          setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          setLoading(false);
          return;
        }
      }
    } catch {}
    
    // Reliable Fallback Matrix calculation
    const fromObj = CURRENCIES.find((c) => c.code === fromCurrency) || CURRENCIES[0];
    const toObj = CURRENCIES.find((c) => c.code === toCurrency) || CURRENCIES[1];
    const computed = (1 / fromObj.rateToUSD) * toObj.rateToUSD;
    setExchangeRate(Number(computed.toFixed(4)));
    setLastUpdated('Estimated Global Rate');
    setLoading(false);
  };

  useEffect(() => {
    fetchRates();
  }, [fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const parsedAmount = parseFloat(amount) || 0;
  const convertedTotal = (parsedAmount * exchangeRate).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const fromCurrObj = CURRENCIES.find((c) => c.code === fromCurrency) || CURRENCIES[0];
  const toCurrObj = CURRENCIES.find((c) => c.code === toCurrency) || CURRENCIES[1];

  const copyResult = () => {
    const text = `${amount} ${fromCurrency} = ${convertedTotal} ${toCurrency} (1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    ambientOrbs: isDark ? 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(16,185,129,0.18), transparent)' : 'radial-gradient(ellipse 600px 300px at 50% -10%, rgba(16,185,129,0.08), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15, 23, 42, 0.05)',
    textPrimary: isDark ? '#ffffff' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    inputBg: isDark ? 'rgba(15, 23, 42, 0.9)' : '#ffffff',
    inputBorder: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(203, 213, 225, 0.9)',
  };

  return (
    <div style={{ background: T.bgPage, minHeight: '100vh' }} className="relative transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: T.ambientOrbs }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            <DollarSign className="w-3.5 h-3.5" /> Real-Time Foreign Exchange
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: T.textPrimary }}>
            Currency Converter
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-lg mx-auto" style={{ color: T.textSecondary }}>
            Compare exchange rates between international currencies with live quotes and instant conversions.
          </p>
        </div>

        {/* Quick Chips */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider mr-1" style={{ color: T.textSecondary }}>
            Quick Pairs:
          </span>
          {[
            { from: 'USD', to: 'EUR' },
            { from: 'USD', to: 'INR' },
            { from: 'GBP', to: 'USD' },
            { from: 'EUR', to: 'GBP' },
            { from: 'USD', to: 'JPY' },
            { from: 'AUD', to: 'USD' },
          ].map((pair) => (
            <button
              key={`${pair.from}-${pair.to}`}
              onClick={() => {
                setFromCurrency(pair.from);
                setToCurrency(pair.to);
              }}
              className="text-xs px-3 py-1.5 rounded-lg border font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: fromCurrency === pair.from && toCurrency === pair.to ? (isDark ? 'rgba(16,185,129,0.2)' : 'rgba(16,185,129,0.15)') : (isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff'),
                borderColor: fromCurrency === pair.from && toCurrency === pair.to ? '#10b981' : T.cardBorder,
                color: fromCurrency === pair.from && toCurrency === pair.to ? '#10b981' : T.textPrimary,
              }}
            >
              {pair.from} / {pair.to}
            </button>
          ))}
        </div>

        {/* Main Converter Card */}
        <div
          className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl mb-8 relative overflow-hidden"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

          {/* Amount input */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: T.textSecondary }}>
              Enter Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold" style={{ color: T.textSecondary }}>
                {fromCurrObj.symbol}
              </span>
              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl border font-mono font-bold text-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              />
            </div>
          </div>

          {/* From & To Selectors */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-4 items-center mb-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: T.textSecondary }}>
                From Currency
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {c.name} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center pt-2 sm:pt-6">
              <button
                onClick={handleSwap}
                title="Swap currencies"
                className="p-3 rounded-xl border bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:scale-110 active:scale-95 transition-all"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: T.textSecondary }}>
                To Currency
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                style={{ backgroundColor: T.inputBg, borderColor: T.inputBorder, color: T.textPrimary }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {c.name} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Converted Output Display */}
          <div
            className="p-6 rounded-2xl border text-center relative overflow-hidden"
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
              borderColor: T.cardBorder,
            }}
          >
            <div className="text-xs uppercase font-bold text-emerald-500 tracking-wider mb-1">
              Converted Amount
            </div>
            <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight mb-2" style={{ color: T.textPrimary }}>
              {toCurrObj.symbol} {convertedTotal}
            </div>
            <div className="text-xs font-medium" style={{ color: T.textSecondary }}>
              1 {fromCurrency} = <strong>{exchangeRate.toFixed(4)} {toCurrency}</strong> • Updated: {lastUpdated}
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={copyResult}
                className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-lg border font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                  borderColor: T.cardBorder,
                  color: copied ? '#10b981' : T.textPrimary,
                }}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Total'}
              </button>
              <button
                onClick={fetchRates}
                disabled={loading}
                className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-lg border font-semibold transition-all hover:scale-105 disabled:opacity-50"
                style={{
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                  borderColor: T.cardBorder,
                  color: T.textPrimary,
                }}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Rate
              </button>
            </div>
          </div>
        </div>

        {/* Global Currency Rates Table */}
        <div
          className="rounded-2xl border p-6 backdrop-blur-xl"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: T.textPrimary }}>
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Popular Exchange Rates for 1 {fromCurrency}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {CURRENCIES.filter((c) => c.code !== fromCurrency).map((c) => {
              const fromObj = CURRENCIES.find((cu) => cu.code === fromCurrency) || CURRENCIES[0];
              const relativeRate = (1 / fromObj.rateToUSD) * c.rateToUSD;

              return (
                <div
                  key={c.code}
                  onClick={() => setToCurrency(c.code)}
                  className="p-3 rounded-xl border cursor-pointer transition-all hover:scale-105 hover:border-emerald-500/50 flex items-center justify-between"
                  style={{
                    backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#ffffff',
                    borderColor: T.cardBorder,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{c.flag}</span>
                    <span className="font-bold text-xs" style={{ color: T.textPrimary }}>{c.code}</span>
                  </div>
                  <div className="text-xs font-mono font-semibold" style={{ color: T.textSecondary }}>
                    {c.symbol} {relativeRate.toFixed(3)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
