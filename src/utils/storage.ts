import { User } from '@/types/user.types';

const USER_STORAGE_KEY = 'weather_app_user';

/**
 * Gets the stored user from localStorage
 * @returns User object if found, null otherwise
 */
export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') {
    // Server-side, no localStorage available
    return null;
  }

  try {
    const userStr = localStorage.getItem(USER_STORAGE_KEY);
    if (!userStr) {
      return null;
    }
    
    const user = JSON.parse(userStr);
    // You might want to validate the user object structure here
    return user;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

/**
 * Sets the user in localStorage
 * @param user - User object to store
 */
export const setStoredUser = (user: User): void => {
  if (typeof window === 'undefined') {
    // Server-side, no localStorage available
    return;
  }

  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user in localStorage:', error);
  }
};

/**
 * Removes the user from localStorage
 */
export const removeStoredUser = (): void => {
  if (typeof window === 'undefined') {
    // Server-side, no localStorage available
    return;
  }

  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error('Error removing user from localStorage:', error);
  }
};

/**
 * Updates specific user preferences in storage
 * @param updates - Partial user object with updates
 */
export const updateStoredUserPreferences = (updates: Partial<User>): void => {
  const currentUser = getStoredUser();
  if (currentUser) {
    const updatedUser = { ...currentUser, ...updates };
    setStoredUser(updatedUser);
  }
};