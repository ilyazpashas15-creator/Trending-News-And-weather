import { User, LoginCredentials, RegisterCredentials } from '@/types/user.types';
import { getStoredUser, setStoredUser, removeStoredUser } from '@/utils/storage';

/**
 * Simulates user login
 * @param credentials - User login credentials
 * @returns Promise resolving to User object
 */
export const login = async (credentials: LoginCredentials): Promise<User> => {
  // In a real application, this would make an API call to your backend
  // For this example, we'll simulate authentication with localStorage
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate API call
      if (credentials.email && credentials.password) {
        // Extract name from email (before @ symbol)
        const emailUsername = credentials.email.split('@')[0];
        // Capitalize first letter and replace dots/underscores with spaces
        const displayName = emailUsername
          .replace(/[._]/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        const mockUser: User = {
          id: '1',
          email: credentials.email,
          name: displayName,
          favoriteLocations: ['London', 'New York'],
          units: 'metric',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        setStoredUser(mockUser);
        resolve(mockUser);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500); // Simulate network delay
  });
};

/**
 * Simulates user registration
 * @param credentials - User registration credentials
 * @returns Promise resolving to User object
 */
export const register = async (credentials: RegisterCredentials): Promise<User> => {
  // In a real application, this would make an API call to your backend
  // For this example, we'll simulate registration with localStorage
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate API call
      if (credentials.email && credentials.password && credentials.name) {
        const mockUser: User = {
          id: '2',
          email: credentials.email,
          name: credentials.name,
          favoriteLocations: [],
          units: 'metric',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        setStoredUser(mockUser);
        resolve(mockUser);
      } else {
        reject(new Error('Invalid registration data'));
      }
    }, 500); // Simulate network delay
  });
};

/**
 * Logs out the current user
 * @returns Promise resolving when logout is complete
 */
export const logout = async (): Promise<void> => {
  // In a real application, this would make an API call to invalidate the session
  // For this example, we'll remove the user from localStorage
  
  return new Promise((resolve) => {
    setTimeout(() => {
      removeStoredUser();
      resolve();
    }, 300); // Simulate network delay
  });
};

/**
 * Gets the currently authenticated user from storage
 * @returns User object if authenticated, null otherwise
 */
export const getCurrentUser = (): User | null => {
  return getStoredUser();
};