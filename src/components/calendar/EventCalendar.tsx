'use client';

import { useState } from 'react';
import { CalendarEvent } from '@/types/calendar.types';

export default function EventCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 1, title: 'Team Meeting', date: '2025-11-05', time: '10:00 AM', description: 'Weekly team sync' },
    { id: 2, title: 'Project Deadline', date: '2025-11-15', time: '5:00 PM', description: 'Submit final report' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<CalendarEvent, 'id'>>({
    title: '',
    date: '',
    time: '',
    description: ''
  });

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event: CalendarEvent = { ...newEvent, id: Date.now() };
      setEvents([...events, event]);
      setNewEvent({ title: '', date: '', time: '', description: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 dark:text-white">Event Calendar</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your upcoming events and appointments</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          {showAddForm ? 'Cancel' : '+ Add Event'}
        </button>
      </div>

      {/* Add Event Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 dark:text-white">Add New Event</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              className="border border-gray-300 rounded px-4 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              className="border border-gray-300 rounded px-4 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
              className="border border-gray-300 rounded px-4 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="text"
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              className="border border-gray-300 rounded px-4 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <button
            onClick={handleAddEvent}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Save Event
          </button>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {sortedEvents.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No events scheduled. Add your first event!</p>
          </div>
        ) : (
          sortedEvents.map((event) => (
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-600 mb-2 dark:text-blue-400">{event.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-2 dark:text-gray-300">
                    <span className="flex items-center gap-2">
                      📅 {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    {event.time && <span>🕐 {event.time}</span>}
                  </div>
                  {event.description && (
                    <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition self-start"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}