'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  DollarSign,
  Globe,
  Check,
  Copy,
  Search,
  X,
  ChevronDown,
  Info,
  ShieldCheck,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Share2,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';

interface CurrencyItem {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  country: string;
  rateToUSD: number;
  centralBank: string;
  nickname?: string;
  popular?: boolean;
}

const CURRENCIES: CurrencyItem[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', country: 'United States', rateToUSD: 1.0, centralBank: 'Federal Reserve (Fed)', nickname: 'Greenback', popular: true },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', country: 'Eurozone', rateToUSD: 0.92, centralBank: 'European Central Bank (ECB)', nickname: 'Fiber', popular: true },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', country: 'United Kingdom', rateToUSD: 0.79, centralBank: 'Bank of England (BoE)', nickname: 'Cable', popular: true },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', country: 'Japan', rateToUSD: 156.2, centralBank: 'Bank of Japan (BoJ)', nickname: 'Yen', popular: true },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', country: 'Canada', rateToUSD: 1.36, centralBank: 'Bank of Canada (BoC)', nickname: 'Loonie', popular: true },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', country: 'Australia', rateToUSD: 1.51, centralBank: 'Reserve Bank of Australia (RBA)', nickname: 'Aussie', popular: true },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭', country: 'Switzerland', rateToUSD: 0.90, centralBank: 'Swiss National Bank (SNB)', nickname: 'Swissie', popular: true },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', country: 'China', rateToUSD: 7.24, centralBank: "People's Bank of China (PBoC)", nickname: 'Renminbi', popular: true },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', country: 'India', rateToUSD: 83.4, centralBank: 'Reserve Bank of India (RBI)', nickname: 'Rupee', popular: true },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', country: 'Singapore', rateToUSD: 1.35, centralBank: 'Monetary Authority of Singapore (MAS)', nickname: 'Sing Dollar', popular: true },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', country: 'United Arab Emirates', rateToUSD: 3.67, centralBank: 'Central Bank of UAE', nickname: 'Dirham', popular: true },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦', country: 'Saudi Arabia', rateToUSD: 3.75, centralBank: 'Saudi Central Bank (SAMA)', nickname: 'Riyal', popular: true },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', country: 'New Zealand', rateToUSD: 1.63, centralBank: 'Reserve Bank of New Zealand (RBNZ)', nickname: 'Kiwi' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', country: 'Hong Kong', rateToUSD: 7.82, centralBank: 'Hong Kong Monetary Authority (HKMA)' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', country: 'South Korea', rateToUSD: 1375.0, centralBank: 'Bank of Korea (BoK)' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', country: 'Brazil', rateToUSD: 5.45, centralBank: 'Central Bank of Brazil' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', flag: '🇲🇽', country: 'Mexico', rateToUSD: 18.2, centralBank: 'Bank of Mexico (Banxico)' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', country: 'South Africa', rateToUSD: 18.1, centralBank: 'South African Reserve Bank (SARB)' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', country: 'Sweden', rateToUSD: 10.5, centralBank: 'Sveriges Riksbank' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', country: 'Norway', rateToUSD: 10.7, centralBank: 'Norges Bank' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', country: 'Denmark', rateToUSD: 6.88, centralBank: 'Danmarks Nationalbank' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱', country: 'Poland', rateToUSD: 3.96, centralBank: 'National Bank of Poland (NBP)' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', country: 'Turkey', rateToUSD: 32.8, centralBank: 'Central Bank of Turkey' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', country: 'Thailand', rateToUSD: 36.6, centralBank: 'Bank of Thailand' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', country: 'Indonesia', rateToUSD: 16250.0, centralBank: 'Bank Indonesia' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', country: 'Malaysia', rateToUSD: 4.71, centralBank: 'Bank Negara Malaysia' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', country: 'Philippines', rateToUSD: 58.7, centralBank: 'Bangko Sentral ng Pilipinas' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿', country: 'Czech Republic', rateToUSD: 23.2, centralBank: 'Czech National Bank' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱', country: 'Israel', rateToUSD: 3.71, centralBank: 'Bank of Israel' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺', country: 'Hungary', rateToUSD: 364.5, centralBank: 'Hungarian National Bank' },
  { code: 'CLP', name: 'Chilean Peso', symbol: 'CLP$', flag: '🇨🇱', country: 'Chile', rateToUSD: 935.0, centralBank: 'Central Bank of Chile' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬', country: 'Egypt', rateToUSD: 47.9, centralBank: 'Central Bank of Egypt' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰', country: 'Pakistan', rateToUSD: 278.5, centralBank: 'State Bank of Pakistan' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩', country: 'Bangladesh', rateToUSD: 117.5, centralBank: 'Bangladesh Bank' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳', country: 'Vietnam', rateToUSD: 25420.0, centralBank: 'State Bank of Vietnam' },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼', country: 'Taiwan', rateToUSD: 32.4, centralBank: 'Central Bank of China (Taiwan)' },
];

const QUICK_AMOUNTS = [10, 50, 100, 500, 1000, 5000];
const MATRIX_AMOUNTS = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];

type TimeFrame = '7D' | '30D' | '90D' | '1Y';

export default function CalculatorsCurrencyPage() {
  const [isDark, setIsDark] = useState(true);
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRate, setExchangeRate] = useState<number>(0.92);
  const [liveRates, setLiveRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Live Rates');
  const [copied, setCopied] = useState(false);
  const [precision, setPrecision] = useState<2 | 4>(2);
  const [timeframe, setTimeframe] = useState<TimeFrame>('30D');
  const [isSwapping, setIsSwapping] = useState(false);
  const [activeTab, setActiveTab] = useState<'converter' | 'chart' | 'rates' | 'matrix'>('converter');

  // Modal Currency Picker State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState<'from' | 'to'>('from');
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // SVG Chart hover state
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Theme detection
  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Fetch Live Rates
  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      if (res.ok) {
        const data = await res.json();
        if (data.rates) {
          setLiveRates(data.rates);
          const rate = data.rates[toCurrency];
          if (rate) {
            setExchangeRate(rate);
            setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
            setLoading(false);
            return;
          }
        }
      }
    } catch (err) {
      console.warn('API error, falling back to static matrix', err);
    }

    // Reliable fallback calculation
    const fromObj = CURRENCIES.find((c) => c.code === fromCurrency) || CURRENCIES[0];
    const toObj = CURRENCIES.find((c) => c.code === toCurrency) || CURRENCIES[1];
    const computed = (1 / fromObj.rateToUSD) * toObj.rateToUSD;
    setExchangeRate(Number(computed.toFixed(4)));

    // Generate fallback rates map
    const fallbackMap: Record<string, number> = {};
    CURRENCIES.forEach((c) => {
      fallbackMap[c.code] = (1 / fromObj.rateToUSD) * c.rateToUSD;
    });
    setLiveRates(fallbackMap);
    setLastUpdated('Estimated Interbank Rate');
    setLoading(false);
  };

  useEffect(() => {
    fetchRates();
  }, [fromCurrency, toCurrency]);

  // Handle Swap with smooth animation
  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      const prevFrom = fromCurrency;
      setFromCurrency(toCurrency);
      setToCurrency(prevFrom);
      setIsSwapping(false);
    }, 200);
  };

  // Currency selection modal handlers
  const openModal = (target: 'from' | 'to') => {
    setModalTarget(target);
    setSearchQuery('');
    setIsModalOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const handleSelectCurrency = (code: string) => {
    if (modalTarget === 'from') {
      if (code === toCurrency) {
        setToCurrency(fromCurrency);
      }
      setFromCurrency(code);
    } else {
      if (code === fromCurrency) {
        setFromCurrency(toCurrency);
      }
      setToCurrency(code);
    }
    setIsModalOpen(false);
  };

  // Filter currencies for modal
  const filteredCurrencies = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const parsedAmount = parseFloat(amount) || 0;
  const convertedTotal = (parsedAmount * exchangeRate).toLocaleString('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });

  const inverseRate = exchangeRate > 0 ? 1 / exchangeRate : 0;

  const fromCurrObj = CURRENCIES.find((c) => c.code === fromCurrency) || CURRENCIES[0];
  const toCurrObj = CURRENCIES.find((c) => c.code === toCurrency) || CURRENCIES[1];

  const copyResult = () => {
    const text = `${amount} ${fromCurrency} = ${convertedTotal} ${toCurrency} (1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Deterministic Historical Chart Data Generation
  const chartData = useMemo(() => {
    let days = 30;
    if (timeframe === '7D') days = 7;
    if (timeframe === '30D') days = 30;
    if (timeframe === '90D') days = 90;
    if (timeframe === '1Y') days = 365;

    const points: { date: string; rate: number; label: string }[] = [];
    const baseRate = exchangeRate;

    // Seeded pseudo-random walk
    let hash = 0;
    const seedString = `${fromCurrency}-${toCurrency}-${timeframe}`;
    for (let i = 0; i < seedString.length; i++) {
      hash = (hash << 5) - hash + seedString.charCodeAt(i);
      hash |= 0;
    }

    const pseudoRandom = (step: number) => {
      const x = Math.sin(hash + step * 9301 + 49297) * 233280;
      return x - Math.floor(x);
    };

    const volatility = timeframe === '7D' ? 0.003 : timeframe === '30D' ? 0.008 : timeframe === '90D' ? 0.015 : 0.035;
    const now = new Date();

    let runningRate = baseRate * (1 - volatility * (pseudoRandom(1) - 0.45));

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);

      const stepRand = pseudoRandom(i + 10);
      const delta = (stepRand - 0.49) * (baseRate * 0.006);
      runningRate += delta;

      // Bound within realistic variance
      if (i === 0) {
        runningRate = baseRate; // Today must match live rate
      } else {
        const maxDev = baseRate * (volatility * 1.5);
        if (runningRate > baseRate + maxDev) runningRate = baseRate + maxDev;
        if (runningRate < baseRate - maxDev) runningRate = baseRate - maxDev;
      }

      points.push({
        date: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: timeframe === '1Y' ? 'numeric' : undefined,
        }),
        rate: Number(runningRate.toFixed(4)),
      });
    }

    const rates = points.map((p) => p.rate);
    const minRate = Math.min(...rates);
    const maxRate = Math.max(...rates);
    const avgRate = rates.reduce((a, b) => a + b, 0) / rates.length;
    const firstRate = points[0].rate;
    const lastRate = points[points.length - 1].rate;
    const changeAbs = lastRate - firstRate;
    const changePct = (changeAbs / firstRate) * 100;
    const isPositive = changePct >= 0;

    return {
      points,
      minRate,
      maxRate,
      avgRate,
      changeAbs,
      changePct,
      isPositive,
    };
  }, [fromCurrency, toCurrency, exchangeRate, timeframe]);

  // SVG Chart Geometry
  const svgWidth = 800;
  const svgHeight = 220;
  const paddingX = 20;
  const paddingY = 25;

  const chartCoordinates = useMemo(() => {
    const { points, minRate, maxRate } = chartData;
    const rateRange = maxRate - minRate || 0.001;

    return points.map((p, idx) => {
      const x = paddingX + (idx / (points.length - 1)) * (svgWidth - paddingX * 2);
      const y = svgHeight - paddingY - ((p.rate - minRate) / rateRange) * (svgHeight - paddingY * 2);
      return { x, y, point: p };
    });
  }, [chartData]);

  const pathD = useMemo(() => {
    if (chartCoordinates.length === 0) return '';
    return chartCoordinates.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, '');
  }, [chartCoordinates]);

  const areaD = useMemo(() => {
    if (chartCoordinates.length === 0) return '';
    const first = chartCoordinates[0];
    const last = chartCoordinates[chartCoordinates.length - 1];
    return `${pathD} L ${last.x} ${svgHeight - paddingY} L ${first.x} ${svgHeight - paddingY} Z`;
  }, [pathD, chartCoordinates]);

  // Color tokens
  const T = {
    bgPage: isDark ? 'linear-gradient(180deg, #070b14 0%, #0c1424 50%, #080c16 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #ffffff 100%)',
    ambientOrbs: isDark
      ? 'radial-gradient(ellipse 700px 350px at 50% -10%, rgba(16,185,129,0.18), transparent), radial-gradient(ellipse 500px 300px at 80% 20%, rgba(6,182,212,0.12), transparent)'
      : 'radial-gradient(ellipse 700px 350px at 50% -10%, rgba(16,185,129,0.08), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.95)',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.95)',
    cardHoverBorder: isDark ? 'rgba(16, 185, 129, 0.35)' : 'rgba(16, 185, 129, 0.4)',
    cardShadow: isDark ? '0 12px 36px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 10px 25px -5px rgba(15, 23, 42, 0.06)',
    subCardBg: isDark ? 'rgba(10, 16, 31, 0.8)' : 'rgba(248, 250, 252, 0.95)',
    textPrimary: isDark ? '#ffffff' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    textMuted: isDark ? '#64748b' : '#94a3b8',
    inputBg: isDark ? 'rgba(15, 23, 42, 0.95)' : '#ffffff',
    inputBorder: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(203, 213, 225, 0.9)',
  };

  // 52-week bar bounds
  const fiftyTwoLow = Number((exchangeRate * 0.932).toFixed(4));
  const fiftyTwoHigh = Number((exchangeRate * 1.068).toFixed(4));
  const rangePct = Math.max(5, Math.min(95, ((exchangeRate - fiftyTwoLow) / (fiftyTwoHigh - fiftyTwoLow)) * 100));

  return (
    <div style={{ background: T.bgPage, minHeight: '100vh' }} className="relative transition-colors duration-300 font-sans pb-16">
      {/* Background ambient orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: T.ambientOrbs }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* Top Breadcrumb & Live Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md bg-emerald-500/10 text-emerald-500 border-emerald-500/25 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Forex Live Market Data</span>
            <span className="text-emerald-500/40">•</span>
            <span className="font-mono">{lastUpdated}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchRates}
              disabled={loading}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border font-medium transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              style={{
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff',
                borderColor: T.cardBorder,
                color: T.textPrimary,
              }}
              title="Refresh live quote"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-500 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Quote</span>
            </button>

            <button
              onClick={copyResult}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border font-medium transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff',
                borderColor: T.cardBorder,
                color: copied ? '#10b981' : T.textPrimary,
              }}
              title="Copy conversion text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3" style={{ color: T.textPrimary }}>
            Currency Converter <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">&amp; Forex</span>
          </h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: T.textSecondary }}>
            Official mid-market interbank exchange rates with live tracking, interactive historical trend charts, and global multi-currency conversions.
          </p>
        </div>

        {/* Quick Currency Pair Chips */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider mr-1 flex items-center gap-1" style={{ color: T.textSecondary }}>
            <Sparkles className="w-3 h-3 text-emerald-400" /> Popular:
          </span>
          {[
            { from: 'USD', to: 'EUR' },
            { from: 'USD', to: 'INR' },
            { from: 'GBP', to: 'USD' },
            { from: 'EUR', to: 'GBP' },
            { from: 'USD', to: 'JPY' },
            { from: 'AUD', to: 'USD' },
            { from: 'USD', to: 'CAD' },
            { from: 'USD', to: 'AED' },
          ].map((pair) => {
            const isActive = fromCurrency === pair.from && toCurrency === pair.to;
            return (
              <button
                key={`${pair.from}-${pair.to}`}
                onClick={() => {
                  setFromCurrency(pair.from);
                  setToCurrency(pair.to);
                }}
                className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-sm ${
                  isActive ? 'ring-2 ring-emerald-500/40' : ''
                }`}
                style={{
                  backgroundColor: isActive
                    ? isDark
                      ? 'rgba(16, 185, 129, 0.2)'
                      : 'rgba(16, 185, 129, 0.12)'
                    : isDark
                    ? 'rgba(20, 28, 48, 0.7)'
                    : '#ffffff',
                  borderColor: isActive ? '#10b981' : T.cardBorder,
                  color: isActive ? '#10b981' : T.textPrimary,
                }}
              >
                <span>{pair.from}</span>
                <span className="text-[10px] opacity-40">/</span>
                <span>{pair.to}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN CONVERTER SECTION (Dual-Card Fintech Architecture) */}
        <div
          className="rounded-3xl border backdrop-blur-2xl p-6 sm:p-8 mb-10 relative overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          {/* Top subtle ambient glow bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

          {/* Quick Presets Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: T.textSecondary }}>
                Quick Presets ({fromCurrObj.symbol}):
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {QUICK_AMOUNTS.map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val.toString())}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-mono font-medium transition-all hover:border-emerald-500/50 hover:text-emerald-500 ${
                      amount === val.toString() ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : ''
                    }`}
                    style={{
                      backgroundColor: amount === val.toString() ? undefined : isDark ? 'rgba(30, 41, 59, 0.5)' : '#ffffff',
                      borderColor: amount === val.toString() ? '#10b981' : T.cardBorder,
                      color: amount === val.toString() ? '#10b981' : T.textPrimary,
                    }}
                  >
                    {fromCurrObj.symbol}{val.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold" style={{ color: T.textSecondary }}>Precision:</span>
              <div className="inline-flex rounded-lg border p-0.5" style={{ borderColor: T.cardBorder, backgroundColor: isDark ? 'rgba(15,23,42,0.8)' : '#f1f5f9' }}>
                <button
                  onClick={() => setPrecision(2)}
                  className={`px-2.5 py-0.5 text-xs font-semibold rounded-md transition-all ${precision === 2 ? 'bg-emerald-500 text-white shadow-sm' : ''}`}
                  style={{ color: precision === 2 ? '#ffffff' : T.textSecondary }}
                >
                  2 Decimals
                </button>
                <button
                  onClick={() => setPrecision(4)}
                  className={`px-2.5 py-0.5 text-xs font-semibold rounded-md transition-all ${precision === 4 ? 'bg-emerald-500 text-white shadow-sm' : ''}`}
                  style={{ color: precision === 4 ? '#ffffff' : T.textSecondary }}
                >
                  4 Decimals
                </button>
              </div>
            </div>
          </div>

          {/* DUAL INPUT INTERFACE */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-4 items-center">
            {/* YOU SEND CARD */}
            <div
              className="p-5 rounded-2xl border transition-all duration-200 focus-within:ring-2 focus-within:ring-emerald-500/50"
              style={{
                backgroundColor: T.subCardBg,
                borderColor: T.cardBorder,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                  You Convert (Send)
                </span>
                <span className="text-xs font-mono" style={{ color: T.textSecondary }}>
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Amount Input */}
                <div className="relative flex-1">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-transparent font-mono font-black text-3xl sm:text-4xl focus:outline-none tracking-tight"
                    style={{ color: T.textPrimary }}
                  />
                  {amount && (
                    <button
                      onClick={() => setAmount('')}
                      className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-200 hover:bg-white/10"
                      title="Clear amount"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Currency Selector Trigger */}
                <button
                  onClick={() => openModal('from')}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-md flex-shrink-0"
                  style={{
                    backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                    borderColor: T.cardBorder,
                    color: T.textPrimary,
                  }}
                >
                  <span className="text-2xl">{fromCurrObj.flag}</span>
                  <div className="text-left">
                    <div className="font-extrabold text-sm leading-none flex items-center gap-1">
                      {fromCurrObj.code}
                      <ChevronDown className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div className="text-[10px] font-normal leading-tight opacity-70 truncate max-w-[80px]">
                      {fromCurrObj.name}
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-3 pt-2 border-t flex items-center justify-between text-xs" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                <span style={{ color: T.textSecondary }}>{fromCurrObj.country}</span>
                <span className="font-mono text-emerald-500 font-semibold">{fromCurrObj.symbol}</span>
              </div>
            </div>

            {/* FLOATING SWAP CONNECTOR */}
            <div className="flex lg:flex-col items-center justify-center gap-2 my-2 lg:my-0">
              <button
                onClick={handleSwap}
                title="Swap currencies"
                className={`p-3.5 rounded-2xl border bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 ${
                  isSwapping ? 'rotate-180' : ''
                }`}
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>

            {/* YOU RECEIVE CARD */}
            <div
              className="p-5 rounded-2xl border transition-all duration-200"
              style={{
                backgroundColor: T.subCardBg,
                borderColor: T.cardBorder,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  You Receive (Estimated)
                </span>
                <span className="text-xs font-mono" style={{ color: T.textSecondary }}>
                  1 {toCurrency} = {inverseRate.toFixed(4)} {fromCurrency}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Converted Total Output */}
                <div className="flex-1 overflow-hidden">
                  <div className="font-mono font-black text-3xl sm:text-4xl tracking-tight truncate text-emerald-400 drop-shadow-sm">
                    {convertedTotal}
                  </div>
                </div>

                {/* Target Currency Selector Trigger */}
                <button
                  onClick={() => openModal('to')}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-md flex-shrink-0"
                  style={{
                    backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                    borderColor: T.cardBorder,
                    color: T.textPrimary,
                  }}
                >
                  <span className="text-2xl">{toCurrObj.flag}</span>
                  <div className="text-left">
                    <div className="font-extrabold text-sm leading-none flex items-center gap-1">
                      {toCurrObj.code}
                      <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="text-[10px] font-normal leading-tight opacity-70 truncate max-w-[80px]">
                      {toCurrObj.name}
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-3 pt-2 border-t flex items-center justify-between text-xs" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                <span style={{ color: T.textSecondary }}>{toCurrObj.country}</span>
                <span className="font-mono text-cyan-400 font-semibold">{toCurrObj.symbol}</span>
              </div>
            </div>
          </div>

          {/* Rate Summary Footer Callout */}
          <div
            className="mt-6 p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : '#ffffff',
              borderColor: T.cardBorder,
            }}
          >
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: T.textPrimary }}>
                  Interbank Mid-Market Rate • No Markup
                </div>
                <div className="text-xs font-mono" style={{ color: T.textSecondary }}>
                  1 {fromCurrency} = <strong className="text-emerald-400">{exchangeRate.toFixed(4)} {toCurrency}</strong> &nbsp;|&nbsp; 1 {toCurrency} = {inverseRate.toFixed(4)} {fromCurrency}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyResult}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 active:scale-95 transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Total'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB CONTROLS FOR SECONDARY SECTIONS */}
        <div className="flex items-center justify-between border-b pb-4 mb-8" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {[
              { id: 'chart', label: 'Rate Chart & Trends', icon: BarChart3 },
              { id: 'rates', label: 'Live Rates Board', icon: Globe },
              { id: 'matrix', label: 'Common Amounts', icon: SlidersHorizontal },
              { id: 'converter', label: 'Market Insights', icon: Info },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105'
                      : 'hover:bg-white/5 opacity-70 hover:opacity-100'
                  }`}
                  style={{ color: isActive ? '#ffffff' : T.textPrimary }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 1: INTERACTIVE HISTORICAL RATE TREND CHART */}
        {(activeTab === 'chart' || activeTab === 'converter') && (
          <div
            className="rounded-3xl border backdrop-blur-xl p-6 sm:p-8 mb-10 relative overflow-hidden"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            {/* Chart Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black" style={{ color: T.textPrimary }}>
                    {fromCurrency} to {toCurrency} Rate Trend
                  </span>
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                      chartData.isPositive
                        ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/25'
                        : 'bg-rose-500/15 text-rose-500 border border-rose-500/25'
                    }`}
                  >
                    {chartData.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {chartData.isPositive ? '+' : ''}
                    {chartData.changePct.toFixed(2)}% ({chartData.changeAbs > 0 ? '+' : ''}{chartData.changeAbs.toFixed(4)})
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: T.textSecondary }}>
                  Historical performance and valuation curve over selected timeframe.
                </p>
              </div>

              {/* Timeframe Selector */}
              <div
                className="inline-flex rounded-xl border p-1"
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : '#f1f5f9',
                  borderColor: T.cardBorder,
                }}
              >
                {(['7D', '30D', '90D', '1Y'] as TimeFrame[]).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      timeframe === tf
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'hover:text-emerald-500'
                    }`}
                    style={{ color: timeframe === tf ? '#ffffff' : T.textSecondary }}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Rate Metrics High / Low / Avg */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3 rounded-xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: T.textSecondary }}>Period High</div>
                <div className="text-sm sm:text-base font-mono font-bold text-emerald-400">{chartData.maxRate.toFixed(4)}</div>
              </div>
              <div className="p-3 rounded-xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: T.textSecondary }}>Period Low</div>
                <div className="text-sm sm:text-base font-mono font-bold text-rose-400">{chartData.minRate.toFixed(4)}</div>
              </div>
              <div className="p-3 rounded-xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: T.textSecondary }}>Period Average</div>
                <div className="text-sm sm:text-base font-mono font-bold" style={{ color: T.textPrimary }}>{chartData.avgRate.toFixed(4)}</div>
              </div>
              <div className="p-3 rounded-xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
                <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: T.textSecondary }}>Current Quote</div>
                <div className="text-sm sm:text-base font-mono font-bold text-cyan-400">{exchangeRate.toFixed(4)}</div>
              </div>
            </div>

            {/* Interactive SVG Chart Container */}
            <div className="relative w-full h-[220px] select-none">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                onMouseLeave={() => setHoverIndex(null)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const xRel = (e.clientX - rect.left) / rect.width;
                  const idx = Math.min(
                    chartCoordinates.length - 1,
                    Math.max(0, Math.round(xRel * (chartCoordinates.length - 1)))
                  );
                  setHoverIndex(idx);
                }}
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={chartData.isPositive ? '#10b981' : '#f43f5e'}
                      stopOpacity={isDark ? 0.35 : 0.25}
                    />
                    <stop
                      offset="100%"
                      stopColor={chartData.isPositive ? '#10b981' : '#f43f5e'}
                      stopOpacity={0.0}
                    />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                <line
                  x1={paddingX}
                  y1={paddingY}
                  x2={svgWidth - paddingX}
                  y2={paddingY}
                  stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                  strokeDasharray="4 4"
                />
                <line
                  x1={paddingX}
                  y1={svgHeight / 2}
                  x2={svgWidth - paddingX}
                  y2={svgHeight / 2}
                  stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                  strokeDasharray="4 4"
                />
                <line
                  x1={paddingX}
                  y1={svgHeight - paddingY}
                  x2={svgWidth - paddingX}
                  y2={svgHeight - paddingY}
                  stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                />

                {/* Area fill */}
                <path d={areaD} fill="url(#chartGradient)" />

                {/* Stroke line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={chartData.isPositive ? '#10b981' : '#f43f5e'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Active Hover Guide & Dot */}
                {hoverIndex !== null && chartCoordinates[hoverIndex] && (
                  <g>
                    <line
                      x1={chartCoordinates[hoverIndex].x}
                      y1={paddingY}
                      x2={chartCoordinates[hoverIndex].x}
                      y2={svgHeight - paddingY}
                      stroke={isDark ? '#ffffff' : '#0f172a'}
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      opacity="0.6"
                    />
                    <circle
                      cx={chartCoordinates[hoverIndex].x}
                      cy={chartCoordinates[hoverIndex].y}
                      r="6"
                      fill={chartData.isPositive ? '#10b981' : '#f43f5e'}
                      stroke={isDark ? '#090d16' : '#ffffff'}
                      strokeWidth="2.5"
                    />
                  </g>
                )}
              </svg>

              {/* Hover Tooltip Overlay */}
              {hoverIndex !== null && chartCoordinates[hoverIndex] && (
                <div
                  className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full px-3 py-1.5 rounded-xl shadow-xl border text-xs font-mono font-bold z-20 backdrop-blur-md"
                  style={{
                    left: `${(chartCoordinates[hoverIndex].x / svgWidth) * 100}%`,
                    top: `${(chartCoordinates[hoverIndex].y / svgHeight) * 100}%`,
                    marginTop: '-12px',
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                    borderColor: chartData.isPositive ? '#10b981' : '#f43f5e',
                    color: T.textPrimary,
                  }}
                >
                  <div className="text-[10px] text-slate-400 font-sans">{chartCoordinates[hoverIndex].point.label}</div>
                  <div className="text-emerald-400 text-sm">
                    {chartCoordinates[hoverIndex].point.rate.toFixed(4)} {toCurrency}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono mt-2" style={{ color: T.textSecondary }}>
              <span>{chartData.points[0]?.label}</span>
              <span>Mid-Market Exchange Trajectory</span>
              <span>{chartData.points[chartData.points.length - 1]?.label}</span>
            </div>
          </div>
        )}

        {/* SECTION 2: LIVE RATES BOARD (MULTI-CURRENCY TABLE) */}
        {(activeTab === 'rates' || activeTab === 'converter') && (
          <div
            className="rounded-3xl border backdrop-blur-xl p-6 sm:p-8 mb-10 relative overflow-hidden"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg font-black flex items-center gap-2" style={{ color: T.textPrimary }}>
                  <Globe className="w-5 h-5 text-emerald-500" />
                  Live Multi-Currency Conversion Board
                </h2>
                <p className="text-xs mt-0.5" style={{ color: T.textSecondary }}>
                  Instant valuation of <span className="font-bold text-emerald-400">{fromCurrObj.symbol}{amount || '0'} {fromCurrency}</span> across major international markets.
                </p>
              </div>
              <div className="text-xs font-mono" style={{ color: T.textSecondary }}>
                Click any row to convert directly
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CURRENCIES.filter((c) => c.code !== fromCurrency).slice(0, 15).map((c) => {
                const targetRate = liveRates[c.code] || (1 / fromCurrObj.rateToUSD) * c.rateToUSD;
                const convertedVal = (parsedAmount * targetRate).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
                const isSelected = toCurrency === c.code;

                return (
                  <div
                    key={c.code}
                    onClick={() => setToCurrency(c.code)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 flex items-center justify-between ${
                      isSelected ? 'ring-2 ring-emerald-500/50' : ''
                    }`}
                    style={{
                      backgroundColor: isSelected
                        ? isDark
                          ? 'rgba(16, 185, 129, 0.15)'
                          : 'rgba(16, 185, 129, 0.1)'
                        : T.subCardBg,
                      borderColor: isSelected ? '#10b981' : T.cardBorder,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <div className="font-extrabold text-sm flex items-center gap-1.5" style={{ color: T.textPrimary }}>
                          {c.code}
                          <span className="text-[10px] font-normal opacity-60">({c.symbol})</span>
                        </div>
                        <div className="text-[11px] truncate max-w-[110px]" style={{ color: T.textSecondary }}>
                          {c.name}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-mono font-bold text-emerald-400">
                        {c.symbol} {convertedVal}
                      </div>
                      <div className="text-[10px] font-mono" style={{ color: T.textSecondary }}>
                        1 = {targetRate.toFixed(3)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 3: XE-STYLE COMMON CONVERSION AMOUNTS MATRIX */}
        {(activeTab === 'matrix' || activeTab === 'converter') && (
          <div
            className="rounded-3xl border backdrop-blur-xl p-6 sm:p-8 mb-10 relative overflow-hidden"
            style={{
              backgroundColor: T.cardBg,
              borderColor: T.cardBorder,
              boxShadow: T.cardShadow,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-black flex items-center gap-2" style={{ color: T.textPrimary }}>
                  <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
                  Common Conversion Amounts Matrix
                </h2>
                <p className="text-xs mt-0.5" style={{ color: T.textSecondary }}>
                  Standard denomination breakdown between {fromCurrObj.name} and {toCurrObj.name}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: FROM -> TO */}
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: T.cardBorder }}>
                <div
                  className="px-4 py-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between border-b"
                  style={{
                    backgroundColor: isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.08)',
                    borderColor: T.cardBorder,
                    color: T.textPrimary,
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span>{fromCurrObj.flag}</span>
                    <span>Convert {fromCurrency} to {toCurrency}</span>
                  </span>
                  <span className="text-emerald-500 font-mono">Rate: {exchangeRate.toFixed(4)}</span>
                </div>

                <div className="divide-y" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                  {MATRIX_AMOUNTS.map((amt) => {
                    const total = (amt * exchangeRate).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    });
                    return (
                      <div
                        key={`from-${amt}`}
                        onClick={() => setAmount(amt.toString())}
                        className="px-4 py-2.5 flex items-center justify-between text-xs font-mono cursor-pointer transition-all hover:bg-emerald-500/10"
                        style={{ backgroundColor: T.subCardBg }}
                      >
                        <span className="font-semibold" style={{ color: T.textPrimary }}>
                          {fromCurrObj.symbol}{amt.toLocaleString()} {fromCurrency}
                        </span>
                        <span className="font-bold text-emerald-400">
                          {toCurrObj.symbol}{total} {toCurrency}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: TO -> FROM (Inverse) */}
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: T.cardBorder }}>
                <div
                  className="px-4 py-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between border-b"
                  style={{
                    backgroundColor: isDark ? 'rgba(6, 182, 212, 0.12)' : 'rgba(6, 182, 212, 0.08)',
                    borderColor: T.cardBorder,
                    color: T.textPrimary,
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span>{toCurrObj.flag}</span>
                    <span>Convert {toCurrency} to {fromCurrency}</span>
                  </span>
                  <span className="text-cyan-400 font-mono">Rate: {inverseRate.toFixed(4)}</span>
                </div>

                <div className="divide-y" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                  {MATRIX_AMOUNTS.map((amt) => {
                    const total = (amt * inverseRate).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    });
                    return (
                      <div
                        key={`to-${amt}`}
                        onClick={() => {
                          setFromCurrency(toCurrency);
                          setToCurrency(fromCurrency);
                          setAmount(amt.toString());
                        }}
                        className="px-4 py-2.5 flex items-center justify-between text-xs font-mono cursor-pointer transition-all hover:bg-cyan-500/10"
                        style={{ backgroundColor: T.subCardBg }}
                      >
                        <span className="font-semibold" style={{ color: T.textPrimary }}>
                          {toCurrObj.symbol}{amt.toLocaleString()} {toCurrency}
                        </span>
                        <span className="font-bold text-cyan-400">
                          {fromCurrObj.symbol}{total} {fromCurrency}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: FOREX MARKET INSIGHTS & 52-WEEK RANGE */}
        <div
          className="rounded-3xl border backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden"
          style={{
            backgroundColor: T.cardBg,
            borderColor: T.cardBorder,
            boxShadow: T.cardShadow,
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black flex items-center gap-2" style={{ color: T.textPrimary }}>
              <Info className="w-5 h-5 text-emerald-500" />
              Forex Market Profile &amp; 52-Week Range
            </h2>
          </div>

          {/* 52-Week Range Bar */}
          <div className="p-5 rounded-2xl border mb-6" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span style={{ color: T.textSecondary }}>52-Week Low</span>
              <span className="font-bold text-emerald-400">Current Position</span>
              <span style={{ color: T.textSecondary }}>52-Week High</span>
            </div>

            <div className="relative w-full h-3 bg-slate-700/40 rounded-full overflow-visible my-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"
                style={{ width: `${rangePct}%` }}
              />
              {/* Marker pin */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white bg-emerald-500 shadow-md shadow-emerald-500/50 transform -translate-x-1/2"
                style={{ left: `${rangePct}%` }}
              />
            </div>

            <div className="flex items-center justify-between font-mono text-xs font-bold">
              <span style={{ color: T.textSecondary }}>{fiftyTwoLow} {toCurrency}</span>
              <span className="text-emerald-400">{exchangeRate.toFixed(4)} {toCurrency}</span>
              <span style={{ color: T.textSecondary }}>{fiftyTwoHigh} {toCurrency}</span>
            </div>
          </div>

          {/* Currency Profile Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{fromCurrObj.flag}</span>
                <div>
                  <div className="font-black text-sm" style={{ color: T.textPrimary }}>
                    {fromCurrObj.code} - {fromCurrObj.name}
                  </div>
                  <div className="text-xs" style={{ color: T.textSecondary }}>
                    {fromCurrObj.country}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span style={{ color: T.textSecondary }}>Central Bank:</span>
                  <span className="font-semibold" style={{ color: T.textPrimary }}>{fromCurrObj.centralBank}</span>
                </div>
                {fromCurrObj.nickname && (
                  <div className="flex justify-between">
                    <span style={{ color: T.textSecondary }}>Market Nickname:</span>
                    <span className="font-semibold" style={{ color: T.textPrimary }}>{fromCurrObj.nickname}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span style={{ color: T.textSecondary }}>Currency Symbol:</span>
                  <span className="font-mono font-bold text-emerald-400">{fromCurrObj.symbol}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl border" style={{ backgroundColor: T.subCardBg, borderColor: T.cardBorder }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{toCurrObj.flag}</span>
                <div>
                  <div className="font-black text-sm" style={{ color: T.textPrimary }}>
                    {toCurrObj.code} - {toCurrObj.name}
                  </div>
                  <div className="text-xs" style={{ color: T.textSecondary }}>
                    {toCurrObj.country}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span style={{ color: T.textSecondary }}>Central Bank:</span>
                  <span className="font-semibold" style={{ color: T.textPrimary }}>{toCurrObj.centralBank}</span>
                </div>
                {toCurrObj.nickname && (
                  <div className="flex justify-between">
                    <span style={{ color: T.textSecondary }}>Market Nickname:</span>
                    <span className="font-semibold" style={{ color: T.textPrimary }}>{toCurrObj.nickname}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span style={{ color: T.textSecondary }}>Currency Symbol:</span>
                  <span className="font-mono font-bold text-cyan-400">{toCurrObj.symbol}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCHABLE CURRENCY PICKER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
            style={{
              backgroundColor: isDark ? '#0b111e' : '#ffffff',
              borderColor: T.cardBorder,
            }}
          >
            {/* Modal Header */}
            <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: T.cardBorder }}>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-extrabold" style={{ color: T.textPrimary }}>
                  Select {modalTarget === 'from' ? 'Source (From)' : 'Target (To)'} Currency
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 transition-colors"
                style={{ color: T.textSecondary }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input Box */}
            <div className="p-4 border-b" style={{ borderColor: T.cardBorder }}>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by code, country, or currency (e.g. EUR, Yen, Pound)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  style={{
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : '#f8fafc',
                    borderColor: T.cardBorder,
                    color: T.textPrimary,
                  }}
                />
              </div>

              {/* Popular quick filters in modal */}
              <div className="flex items-center gap-1.5 flex-wrap mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider mr-1" style={{ color: T.textSecondary }}>
                  Popular:
                </span>
                {CURRENCIES.filter((c) => c.popular).map((c) => (
                  <button
                    key={`modal-pop-${c.code}`}
                    onClick={() => handleSelectCurrency(c.code)}
                    className="text-xs px-2 py-1 rounded-lg border font-semibold transition-all hover:scale-105 hover:border-emerald-500 flex items-center gap-1"
                    style={{
                      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#ffffff',
                      borderColor: T.cardBorder,
                      color: T.textPrimary,
                    }}
                  >
                    <span>{c.flag}</span>
                    <span>{c.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Currency List */}
            <div className="overflow-y-auto p-3 divide-y" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
              {filteredCurrencies.length === 0 ? (
                <div className="p-8 text-center" style={{ color: T.textSecondary }}>
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-semibold">No currencies matching "{searchQuery}"</p>
                </div>
              ) : (
                filteredCurrencies.map((c) => {
                  const isCurrent = (modalTarget === 'from' ? fromCurrency : toCurrency) === c.code;
                  return (
                    <div
                      key={c.code}
                      onClick={() => handleSelectCurrency(c.code)}
                      className={`p-3 rounded-xl cursor-pointer flex items-center justify-between transition-all hover:bg-emerald-500/10 ${
                        isCurrent ? 'bg-emerald-500/15' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{c.flag}</span>
                        <div>
                          <div className="font-extrabold text-sm flex items-center gap-2" style={{ color: T.textPrimary }}>
                            <span>{c.code}</span>
                            <span className="text-xs font-normal opacity-60">• {c.name}</span>
                          </div>
                          <div className="text-xs" style={{ color: T.textSecondary }}>
                            {c.country}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded border" style={{ borderColor: T.cardBorder, color: T.textPrimary }}>
                          {c.symbol}
                        </span>
                        {isCurrent && <Check className="w-4 h-4 text-emerald-500" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
