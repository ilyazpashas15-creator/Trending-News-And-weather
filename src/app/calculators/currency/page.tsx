'use client';

import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
  const [result, setResult] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Popular currencies
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  ];

  // Fetch exchange rate
  const fetchExchangeRate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Using exchangerate-api.com (free tier)
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }

      const data = await response.json();
      const rate = data.rates[toCurrency];
      
      if (!rate) {
        throw new Error('Exchange rate not available');
      }

      setExchangeRate(rate);
      const convertedAmount = parseFloat(amount) * rate;
      setResult(convertedAmount);
      setLastUpdated(new Date(data.time_last_updated * 1000).toLocaleString());
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again.');
      console.error('Error fetching exchange rate:', err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-convert when values change
  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  const handleConvert = () => {
    fetchExchangeRate();
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getCurrencySymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || code;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800 dark:text-white">
          Currency Converter
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Real-time exchange rates for global currencies
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 text-2xl border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </div>

          {/* From Currency */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name} ({currency.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleSwapCurrencies}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors shadow-lg"
              title="Swap currencies"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To Currency */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name} ({currency.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Convert Button */}
          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg"
          >
            {loading ? 'Converting...' : 'Convert'}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
              {error}
            </div>
          )}

          {/* Result */}
          {result !== null && !error && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
              <div className="text-center">
                <p className="text-sm opacity-90 mb-2">Converted Amount</p>
                <p className="text-4xl font-bold mb-4">
                  {getCurrencySymbol(toCurrency)} {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="text-sm opacity-90">
                  <p className="mb-1">
                    {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
                  </p>
                  {exchangeRate && (
                    <p>
                      1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Last Updated */}
          {lastUpdated && (
            <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* Quick Conversion Table */}
        {result !== null && exchangeRate && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Quick Reference
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 10, 100, 1000].map((multiplier) => (
                <div key={multiplier} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {multiplier} {fromCurrency}
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {(multiplier * exchangeRate).toFixed(2)} {toCurrency}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Exchange rates are updated regularly from reliable sources.</p>
          <p className="mt-1">Rates may vary slightly from actual bank rates.</p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
