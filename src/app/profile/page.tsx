'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, logout, isAuthenticated, updateUser } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
    if (user) {
      setEditedName(user.name);
    }
  }, [isAuthenticated, router, user]);

  if (!user) {
    return null;
  }

  const handleSave = () => {
    // Update user using the context method
    const updatedUser = { ...user, name: editedName };
    updateUser(updatedUser);
    
    setSaveMessage('Name updated successfully!');
    setIsEditing(false);
    
    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleCancel = () => {
    setEditedName(user.name);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#1a2942] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <h1 className="text-3xl font-bold text-white text-center border-2 border-blue-300 p-4 rounded-lg">Profile</h1>
          </div>
          
          {saveMessage && (
            <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded mb-4">
              {saveMessage}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="border-b border-gray-600 pb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-400">Name</label>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-4 py-2 bg-[#1a2942] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xl text-white">{user.name}</p>
              )}
            </div>

            <div className="border-b border-gray-600 pb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <p className="text-xl text-white">{user.email}</p>
            </div>

            <div className="border-b border-gray-600 pb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">Member Since</label>
              <p className="text-xl text-white">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => router.push('/')}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
