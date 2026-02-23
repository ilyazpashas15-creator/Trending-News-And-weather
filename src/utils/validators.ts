/**
 * Validates an email address
 * @param email - Email string to validate
 * @returns True if email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password
 * @param password - Password string to validate
 * @returns True if password meets requirements, false otherwise
 */
export const validatePassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validates a name
 * @param name - Name string to validate
 * @returns True if name is valid, false otherwise
 */
export const validateName = (name: string): boolean => {
  // At least 2 characters, only letters, spaces, hyphens and apostrophes
  const nameRegex = /^[a-zA-Z\s'-]{2,}$/;
  return nameRegex.test(name);
};

/**
 * Validates a location query
 * @param location - Location string to validate
 * @returns True if location is valid, false otherwise
 */
export const validateLocation = (location: string): boolean => {
  // At least 1 character, only alphanumeric, spaces, commas, and hyphens
  const locationRegex = /^[a-zA-Z0-9\s,'-]{1,}$/;
  return locationRegex.test(location) && location.trim().length > 0;
};

/**
 * Validates login credentials
 * @param email - Email string
 * @param password - Password string
 * @returns Object with validity and error message
 */
export const validateLoginCredentials = (
  email: string, 
  password: string
): { isValid: boolean; error?: string } => {
  if (!validateEmail(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  if (password.length < 1) {
    return { isValid: false, error: 'Password is required' };
  }

  return { isValid: true };
};

/**
 * Validates registration credentials
 * @param name - Name string
 * @param email - Email string
 * @param password - Password string
 * @returns Object with validity and error message
 */
export const validateRegistrationCredentials = (
  name: string,
  email: string,
  password: string
): { isValid: boolean; error?: string } => {
  if (!validateName(name)) {
    return { isValid: false, error: 'Please enter a valid name (at least 2 characters)' };
  }

  if (!validateEmail(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  if (!validatePassword(password)) {
    return {
      isValid: false,
      error: 'Password must be at least 8 characters with uppercase, lowercase, and number',
    };
  }

  return { isValid: true };
};