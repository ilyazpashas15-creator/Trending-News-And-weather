import React from 'react';
import { useAuth } from '@/context/AuthContext';

const TemperatureUnitSelector: React.FC = () => {
  const { user, loading, error, login, register, logout, isAuthenticated } = useAuth();

  // Assuming we'll manage unit preference in the user object or local storage
  const unitPreference = user?.units || 'metric';

  const updateUnitPreference = (unit: 'metric' | 'imperial' | 'kelvin') => {
    // In a real app, this would update the user's preference in the backend
    // For now, we'll just log it
    console.log('Updating unit preference to:', unit);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as 'metric' | 'imperial' | 'kelvin';
    updateUnitPreference(newUnit);
  };

  return (
    <div className="temperature-unit-selector mb-4">
      <label htmlFor="unit-selector" className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
        Temperature Unit:
      </label>
      <select
        id="unit-selector"
        value={unitPreference}
        onChange={handleUnitChange}
        className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="metric">°C (Celsius)</option>
        <option value="imperial">°F (Fahrenheit)</option>
        <option value="kelvin">K (Kelvin)</option>
      </select>
    </div>
  );
};

export default TemperatureUnitSelector;