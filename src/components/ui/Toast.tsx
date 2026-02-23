'use client';

import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

const Toast = ({ message, type = 'info', duration = 5000, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      const removeTimer = setTimeout(() => {
        setShouldRender(false);
        if (onClose) onClose();
      }, duration + 300); // Match transition duration

      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, [visible, duration, onClose]);

  if (!shouldRender) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-blue-500',
    info: 'bg-blue-500',
  }[type];

  return (
    <div 
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg text-white shadow-lg transform transition-all duration-300 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${bgColor}`}
    >
      <div className="flex items-center">
        <span>{message}</span>
        <button 
          onClick={() => {
            setVisible(false);
            setTimeout(() => {
              setShouldRender(false);
              if (onClose) onClose();
            }, 300);
          }}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
