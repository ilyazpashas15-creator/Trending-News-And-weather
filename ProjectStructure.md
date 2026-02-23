# MyWeatherApp - Project Structure

## Overview
MyWeatherApp is a modern weather application built with Next.js, TypeScript, and Tailwind CSS. The application fetches and displays current weather data and forecasts for various locations. It uses the Visual Crossing API for weather data and includes fallbacks to mock data for better reliability.

## Technologies Stack
- **Framework**: Next.js 16.0.1 (React-based)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Testing**: Jest with React Testing Library
- **Authentication**: Context-based authentication system

## Directory Structure
```
MyWeatherApp/
├── .next/                    # Next.js build output (generated)
├── images/                   # Static image assets
│   └── site.jpeg
├── node_modules/             # Dependencies (generated)
├── src/                      # Source code
│   ├── app/                  # Next.js App Router pages
│   │   ├── ClientWrapper.tsx # Client-side wrapper with providers
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout component
│   │   └── page.tsx          # Home page
│   ├── components/           # React components organized by domain
│   │   ├── auth/             # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── WeatherCard.tsx
│   │   │   └── WeatherCardSkeleton.tsx
│   │   └── weather/          # Weather-specific components
│   │       ├── WeatherForecast.tsx
│   │       └── WeatherPage.tsx
│   ├── context/              # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ToastContext.tsx
│   ├── hooks/                # Custom React hooks
│   │   └── useWeather.ts
│   ├── lib/                  # Library constants and utilities
│   │   └── constants.ts
│   ├── services/             # API service functions
│   │   ├── authService.ts
│   │   ├── mockWeatherService.ts
│   │   ├── visualCrossingService.ts
│   │   └── weatherService.ts
│   ├── types/                # TypeScript type definitions
│   │   ├── user.types.ts
│   │   └── weather.types.ts
│   └── utils/                # Utility functions
│       ├── formatters.ts
│       ├── storage.ts
│       ├── testUtils.ts
│       └── validators.ts
├── tests/                    # Test files (not yet populated)
├── .env                      # Environment variables (local)
├── .env.example              # Example environment variables
├── .gitignore                # Git ignore patterns
├── jest.config.js            # Jest configuration
├── next-env.d.ts             # Next.js type definitions
├── next.config.ts            # Next.js configuration
├── package-lock.json         # Lock file for dependencies
├── package.json              # Project metadata and dependencies
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Project documentation
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── ...
```

## Key Features

### 1. Weather Data Fetching
- Fetches current weather data and 5-day forecasts
- Uses Visual Crossing API as primary data source
- Includes fallback to mock data for reliability
- Supports both city name and coordinate-based lookups

### 2. Authentication System
- Context-based authentication management
- Login and registration forms
- Protection for weather data access

### 3. User Interface
- Responsive design with Tailwind CSS
- Modern UI with cards and skeleton loading states
- Toast notifications for user feedback
- Search functionality for location-based weather

### 4. Error Handling & Fallbacks
- Comprehensive error handling for network issues
- Fallback to mock data when API calls fail
- Graceful degradation when location not found

## Core Modules

### App Router (src/app/)
- **page.tsx**: Main home page that renders the weather application
- **layout.tsx**: Root layout with metadata and global styles
- **ClientWrapper.tsx**: Wraps the application with authentication and toast providers

### Components (src/components/)

#### Authentication Components (src/components/auth/)
- **LoginForm.tsx**: Handles user login functionality
- **RegisterForm.tsx**: Handles user registration functionality

#### UI Components (src/components/ui/)
- **WeatherCard.tsx**: Displays current weather information
- **WeatherCardSkeleton.tsx**: Loading skeleton for weather card
- **WeatherForecast.tsx**: Displays 5-day weather forecast
- **SearchBar.tsx**: Search input for location
- **Navbar.tsx**: Navigation header
- **ErrorMessage.tsx**: Displays error messages
- **LoadingSpinner.tsx**: Loading indicator
- **Toast.tsx**: Notification component

#### Weather Components (src/components/weather)
- **WeatherPage.tsx**: Main weather page with all components
- **WeatherForecast.tsx**: Forecast display component

### Services (src/services/)
- **visualCrossingService.ts**: Handles Visual Crossing API calls
- **weatherService.ts**: Handles OpenWeather API calls (fallback)
- **authService.ts**: Authentication-related API calls
- **mockWeatherService.ts**: Mock data for development

### Hooks (src/hooks/)
- **useWeather.ts**: Custom hook for weather data management

### Types (src/types/)
- **weather.types.ts**: TypeScript interfaces for weather data
- **user.types.ts**: TypeScript interfaces for user data

### Context (src/context/)
- **AuthContext.tsx**: Authentication state management
- **ToastContext.tsx**: Toast notification management

### Utils (src/utils/)
- **formatters.ts**: Data formatting utilities
- **storage.ts**: Local storage utilities
- **validators.ts**: Input validation utilities
- **testUtils.ts**: Testing utilities

### Lib (src/lib/)
- **constants.ts**: Application constants and API configuration

## Environment Variables
The application uses the following environment variables:
- `VISUAL_CROSSING_API_KEY`: API key for Visual Crossing weather service
- `NEXT_PUBLIC_API_BASE_URL`: Base URL for API calls (defaults to Visual Crossing)

## Scripts
- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run start`: Starts the production server
- `npm run lint`: Runs ESLint for code quality checks
- `npm test`: Runs Jest tests
- `npm run test:watch`: Runs tests in watch mode

## Configuration Files
- **next.config.ts**: Next.js framework configuration
- **tsconfig.json**: TypeScript compiler configuration
- **tailwind.config.ts**: Tailwind CSS framework configuration
- **postcss.config.js**: PostCSS configuration
- **jest.config.js**: Jest testing framework configuration