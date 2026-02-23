'use client';

import { useState, useEffect } from 'react';

export default function TimersAlarmPage() {
  const [alarms, setAlarms] = useState<Array<{id: string, time: string, label: string, active: boolean}>>([]);
  const [newAlarmTime, setNewAlarmTime] = useState('');
  const [newAlarmLabel, setNewAlarmLabel] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Check for alarm triggers
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      alarms.forEach(alarm => {
        if (alarm.active && alarm.time === currentTimeStr) {
          // Trigger the alarm
          alert(`Alarm: ${alarm.label || 'Wake up!'} - ${alarm.time}`);
          
          // Optionally, remove the alarm after triggering
          setAlarms(prev => prev.map(a => 
            a.id === alarm.id ? {...a, active: false} : a
          ));
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [alarms]);

  const addAlarm = () => {
    if (!newAlarmTime) return;

    const newAlarm = {
      id: Date.now().toString(),
      time: newAlarmTime,
      label: newAlarmLabel || 'Alarm',
      active: true
    };

    setAlarms(prev => [...prev, newAlarm]);
    setNewAlarmTime('');
    setNewAlarmLabel('');
  };

  const toggleAlarm = (id: string) => {
    setAlarms(prev => 
      prev.map(alarm => 
        alarm.id === id ? {...alarm, active: !alarm.active} : alarm
      )
    );
  };

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(alarm => alarm.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">Alarm Clock</h1>
      </div>
      <p className="mb-6 text-center text-gray-300 text-lg">Set alarms to wake up or remind you of tasks.</p>
      
      <div className="max-w-md mx-auto bg-[#1a2942] border-2 border-blue-400 rounded-xl shadow-lg p-6">
        {/* Current Time Display */}
        <div className="text-center mb-8">
          <div className="text-5xl font-mono font-bold bg-[#0d1929] border-2 border-blue-400 text-blue-400 py-6 rounded-lg">
            {currentTime}
          </div>
          <p className="mt-3 text-gray-300 font-semibold">Current Time</p>
        </div>

        {/* Add New Alarm Form */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Add New Alarm</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-white mb-2">Time</label>
              <input
                type="time"
                value={newAlarmTime}
                onChange={(e) => setNewAlarmTime(e.target.value)}
                className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-white mb-2">Label (Optional)</label>
              <input
                type="text"
                value={newAlarmLabel}
                onChange={(e) => setNewAlarmLabel(e.target.value)}
                placeholder="e.g., Wake up, Meeting, etc."
                className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg bg-[#0d1929] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <button
              onClick={addAlarm}
              disabled={!newAlarmTime}
              className={`w-full py-3 px-4 rounded-lg font-semibold border-2 transition ${
                !newAlarmTime 
                  ? 'bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-400'
              }`}
            >
              Add Alarm
            </button>
          </div>
        </div>

        {/* Alarms List */}
        {alarms.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Active Alarms</h2>
            <div className="space-y-3">
              {alarms.map(alarm => (
                <div 
                  key={alarm.id} 
                  className="flex items-center justify-between p-4 border-2 border-blue-400 bg-[#0d1929] rounded-lg hover:bg-[#2a3f5f] transition"
                >
                  <div>
                    <div className="font-bold text-xl text-blue-400">{alarm.time}</div>
                    <div className="text-sm text-gray-300">{alarm.label}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleAlarm(alarm.id)}
                      className={`px-4 py-2 rounded-lg font-semibold border-2 transition ${
                        alarm.active 
                          ? 'bg-green-600 hover:bg-green-700 text-white border-green-500' 
                          : 'bg-gray-600 hover:bg-gray-700 text-gray-300 border-gray-500'
                      }`}
                    >
                      {alarm.active ? 'Active' : 'Inactive'}
                    </button>
                    <button
                      onClick={() => deleteAlarm(alarm.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white border-2 border-red-500 rounded-lg font-semibold transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}