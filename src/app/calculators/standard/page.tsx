'use client';

import { useState } from 'react';

export default function CalculatorsStandardPage() {
  const [display, setDisplay] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const [expression, setExpression] = useState<string>('');

  // Handle number input
  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  // Handle decimal point
  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  // Clear entry
  const clearEntry = () => {
    setDisplay('0');
  };

  // Clear all
  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setExpression('');
  };

  // Backspace
  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  // Toggle sign
  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  // Calculate percentage
  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  // Memory functions
  const memoryClear = () => setMemory(0);
  const memoryRecall = () => setDisplay(String(memory));
  const memoryAdd = () => setMemory(memory + parseFloat(display));
  const memorySubtract = () => setMemory(memory - parseFloat(display));
  const memoryStore = () => setMemory(parseFloat(display));

  // Perform operation
  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpression(`${inputValue} ${nextOperation}`);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      const historyEntry = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory([historyEntry, ...history].slice(0, 10));

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      setExpression(`${newValue} ${nextOperation}`);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  // Calculate result
  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  // Handle equals
  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const currentValue = previousValue;
      const newValue = calculate(currentValue, inputValue, operation);

      const historyEntry = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory([historyEntry, ...history].slice(0, 10));

      setDisplay(String(newValue));
      setExpression(`${currentValue} ${operation} ${inputValue} =`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  // Scientific operations
  const handleSquareRoot = () => {
    const value = parseFloat(display);
    const result = Math.sqrt(value);
    setHistory([`√(${value}) = ${result}`, ...history].slice(0, 10));
    setDisplay(String(result));
  };

  const handleSquare = () => {
    const value = parseFloat(display);
    const result = value * value;
    setHistory([`sqr(${value}) = ${result}`, ...history].slice(0, 10));
    setDisplay(String(result));
  };

  const handleReciprocal = () => {
    const value = parseFloat(display);
    if (value !== 0) {
      const result = 1 / value;
      setHistory([`1/(${value}) = ${result}`, ...history].slice(0, 10));
      setDisplay(String(result));
    }
  };

  // Button component
  const CalcButton = ({ 
    value, 
    onClick, 
    className = '', 
    span = 1 
  }: { 
    value: string | React.ReactNode; 
    onClick: () => void; 
    className?: string; 
    span?: number;
  }) => (
    <button
      onClick={onClick}
      className={`
        ${span === 2 ? 'col-span-2' : ''}
        h-14 text-lg font-medium rounded-md transition-all
        hover:brightness-110 active:scale-95
        ${className}
      `}
    >
      {value}
    </button>
  );

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">
          Standard Calculator
        </h1>
      </div>
      <p className="mb-8 text-center text-gray-300 text-lg">
        Perform basic and scientific mathematical calculations
      </p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl p-6 max-w-2xl mx-auto">
            {/* Display */}
            <div className="mb-6">
              <div className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4">
                {expression && (
                  <div className="text-sm text-gray-500 mb-2 h-6 text-right font-mono">
                    {expression}
                  </div>
                )}
                <div className="text-5xl font-light text-white text-right font-mono min-h-[60px] flex items-center justify-end break-all">
                  {display}
                </div>
              </div>
            </div>

            {/* Memory Buttons */}
            <div className="grid grid-cols-6 gap-2 mb-4">
              <CalcButton 
                value="MC" 
                onClick={memoryClear}
                className="bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a] text-sm"
              />
              <CalcButton 
                value="MR" 
                onClick={memoryRecall}
                className="bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a] text-sm"
              />
              <CalcButton 
                value="M+" 
                onClick={memoryAdd}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] text-sm"
              />
              <CalcButton 
                value="M-" 
                onClick={memorySubtract}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] text-sm"
              />
              <CalcButton 
                value="MS" 
                onClick={memoryStore}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] text-sm"
              />
              <CalcButton 
                value={<span className="text-gray-500">M▼</span>}
                onClick={() => {}}
                className="bg-[#2a2a2a] text-gray-500 hover:bg-[#3a3a3a] text-sm"
              />
            </div>

            {/* Main Buttons Grid */}
            <div className="grid grid-cols-4 gap-2">
              {/* Row 1 */}
              <CalcButton 
                value="%" 
                onClick={inputPercent}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
              />
              <CalcButton 
                value="CE" 
                onClick={clearEntry}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
              />
              <CalcButton 
                value="C" 
                onClick={clearAll}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
              />
              <CalcButton 
                value="⌫" 
                onClick={backspace}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
              />

              {/* Row 2 - Scientific */}
              <CalcButton 
                value="1/x" 
                onClick={handleReciprocal}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
              />
              <CalcButton 
                value="x²" 
                onClick={handleSquare}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
              />
              <CalcButton 
                value="²√x" 
                onClick={handleSquareRoot}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
              />
              <CalcButton 
                value="÷" 
                onClick={() => performOperation('÷')}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
              />

              {/* Row 3 */}
              <CalcButton 
                value="7" 
                onClick={() => inputDigit('7')}
                className="bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
              />
              <CalcButton 
                value="8" 
                onClick={() => inputDigit('8')}
                className="bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
              />
              <CalcButton 
                value="9" 
                onClick={() => inputDigit('9')}
                className="bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
              />
              <CalcButton 
                value="×" 
                onClick={() => performOperation('×')}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
              />

              {/* Row 4 */}
              <CalcButton 
                value="4" 
                onClick={() => inputDigit('4')}
                className="bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
              />
              <CalcButton 
                value="5" 
                onClick={() => inputDigit('5')}
                className="bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
              />
              <CalcButton 
                value="6" 
                onClick={() => inputDigit('6')}
                className="bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
              />
              <CalcButton 
                value="-" 
                onClick={() => performOperation('-')}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
              />

              {/* Row 5 */}
              <CalcButton 
                value="1" 
                onClick={() => inputDigit('1')}
                className="bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
              />
              <CalcButton 
                value="2" 
                onClick={() => inputDigit('2')}
                className="bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
              />
              <CalcButton 
                value="3" 
                onClick={() => inputDigit('3')}
                className="bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
              />
              <CalcButton 
                value="+" 
                onClick={() => performOperation('+')}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
              />

              {/* Row 6 */}
              <CalcButton 
                value="+/-" 
                onClick={toggleSign}
                className="bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
              />
              <CalcButton 
                value="0" 
                onClick={() => inputDigit('0')}
                className="bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
              />
              <CalcButton 
                value="." 
                onClick={inputDecimal}
                className="bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
              />
              <CalcButton 
                value="=" 
                onClick={handleEquals}
                className="bg-[#0078d4] text-white hover:bg-[#1084d8]"
              />
            </div>
          </div>
        </div>

        {/* History Panel */}
        <div className="lg:col-span-1">
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">History</h2>
              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
                  className="text-sm px-3 py-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-md transition"
                >
                  Clear
                </button>
              )}
            </div>
            
            {history.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">No calculations yet</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {history.map((entry, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-[#0a0a0a] border border-gray-700 rounded-lg hover:bg-[#2a2a2a] transition cursor-pointer"
                    onClick={() => {
                      const result = entry.split('=')[1]?.trim();
                      if (result) setDisplay(result);
                    }}
                  >
                    <div className="text-sm font-mono text-gray-300 break-all">
                      {entry}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Guide */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Guide</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-semibold">MC/MR/M+/M-/MS</span>
              <span>Memory Functions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-semibold">CE/C</span>
              <span>Clear Entry/All</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-semibold">⌫</span>
              <span>Backspace</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-semibold">%</span>
              <span>Percentage</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-semibold">1/x</span>
              <span>Reciprocal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-semibold">x²</span>
              <span>Square</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-semibold">²√x</span>
              <span>Square Root</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-semibold">+/-</span>
              <span>Toggle Sign</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3a3a3a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4a4a4a;
        }
      `}</style>
    </div>
  );
}
