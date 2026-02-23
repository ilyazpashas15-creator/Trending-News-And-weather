export interface User {
  id: string;
  email: string;
  name: string;
  favoriteLocations?: string[];
  units?: 'metric' | 'imperial' | 'kelvin';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}