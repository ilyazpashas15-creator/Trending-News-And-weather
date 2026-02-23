Project Overview
Build a modern, responsive weather application using React/Next.js and TypeScript that fetches real-time weather data from OpenWeatherMap API.
Technical Stack

Frontend Framework: Next.js 14+ (App Router) or React 18+ with Vite
Language: TypeScript
Styling: Tailwind CSS
State Management: React Context API or Zustand
HTTP Client: Axios or Fetch API
Testing: Jest + React Testing Library
Linting: ESLint + Prettier

Project Structure
myweatherapp/
├── src/
│   ├── app/                    # Next.js app directory (if using Next.js)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/             # React components
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── WeatherCard.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   ├── auth/              # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   └── weather/           # Weather-specific components
│   │       ├── CurrentWeather.tsx
│   │       ├── WeatherForecast.tsx
│   │       └── LocationSearch.tsx
│   ├── services/              # API services
│   │   ├── weatherService.ts
│   │   └── authService.ts
│   ├── types/                 # TypeScript interfaces & types
│   │   ├── weather.types.ts
│   │   └── user.types.ts
│   ├── hooks/                 # Custom React hooks
│   │   ├── useWeather.ts
│   │   └── useAuth.ts
│   ├── context/               # React Context
│   │   └── AuthContext.tsx
│   ├── utils/                 # Utility functions
│   │   ├── formatters.ts
│   │   └── validators.ts
│   └── lib/                   # Configuration & helpers
│       └── constants.ts
├── public/                    # Static assets
├── tests/                     # Test files
│   ├── components/
│   └── services/
├── .env                       # Environment variables (not committed)
├── .env.example              # Example env file
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js            # (if using Next.js)
├── tailwind.config.js
└── README.md
```

## Core Requirements

### 1. Environment Setup
- Create `.env` file with:
```
  NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
  NEXT_PUBLIC_API_BASE_URL=https://api.openweathermap.org/data/2.5

Configure dev server to run on port 3000
For Next.js: Already runs on 3000 by default
For Vite: Update vite.config.ts:

typescript  export default defineConfig({
    server: {
      port: 3000
    }
  })
2. TypeScript Interfaces
Define clear interfaces for:
typescript// weather.types.ts
interface WeatherData {
  id: number;
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  // Add more fields as needed
}

interface LocationSearchResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
}
3. Weather Service Implementation
typescript// weatherService.ts
- fetchWeatherByCity(cityName: string): Promise<WeatherData>
- fetchWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData>
- searchLocations(query: string): Promise<LocationSearchResult[]>
- Handle API errors with proper error messages
- Implement request timeout (5 seconds)
4. User Authentication

Implement basic authentication flow (localStorage or JWT)
Create login/register forms with validation
Protected routes for authenticated users
Store user preferences (favorite locations, units)

5. UI Components
SearchBar Component

Input field with autocomplete
Location suggestions dropdown
Current location button (using Geolocation API)

WeatherCard Component

Display current temperature prominently
Show weather condition icon from OpenWeatherMap
Display humidity, wind speed, pressure
"Feels like" temperature
Responsive design (mobile-first)

WeatherForecast Component

5-day forecast display
Horizontal scrollable cards on mobile
Grid layout on desktop

6. Error Handling

Network errors (show user-friendly message)
API rate limiting (429 status)
Invalid city names (404 status)
Loading states with spinners
Toast notifications for errors

7. Responsive Design

Mobile: Single column, stack elements
Tablet: 2-column grid
Desktop: 3-column grid with sidebar
Use Tailwind breakpoints: sm:, md:, lg:, xl:

8. Testing Requirements

Unit tests for utility functions
Component tests for UI elements
Integration tests for weather service
Mock API responses in tests
Aim for 70%+ code coverage

API Integration Details
OpenWeatherMap Endpoints to Use:

Current Weather: /weather?q={city}&appid={API_KEY}&units=metric
5-Day Forecast: /forecast?q={city}&appid={API_KEY}&units=metric
Geocoding: /geo/1.0/direct?q={city}&limit=5&appid={API_KEY}

Error Handling:

401: Invalid API key
404: City not found
429: API rate limit exceeded
Network errors: Timeout or offline

Development Workflow
Initial Setup
bashnpm install
npm run dev  # Should start on port 3000
Key Scripts

npm run dev: Start development server on port 3000
npm run build: Create production build
npm run test: Run test suite
npm run lint: Check code quality

Feature Implementation Order

Phase 1: Basic Setup

Initialize project with TypeScript
Set up Tailwind CSS
Create basic project structure
Configure environment variables


Phase 2: Core Weather Functionality

Implement weather service with API calls
Create weather display components
Add location search functionality
Implement error handling


Phase 3: User Authentication

Set up authentication flow
Create login/register pages
Implement protected routes


Phase 4: Polish & Testing

Make design fully responsive
Add loading states and animations
Write comprehensive tests
Optimize performance


Phase 5: Future Enhancements

Implement API response caching
Add multi-language support
Weather alerts/notifications
Save favorite locations



Quality Standards

All code must be TypeScript with proper typing (no any types)
Follow React best practices (hooks, functional components)
Use ESLint and Prettier for code formatting
Write meaningful commit messages
Document complex functions with JSDoc comments
Ensure all components are accessible (ARIA labels)

Success Criteria
✅ Weather data fetches correctly from OpenWeatherMap API
✅ UI is fully responsive on mobile, tablet, and desktop
✅ Search functionality works with autocomplete
✅ Error states are handled gracefully
✅ Authentication flow is secure and functional
✅ App runs on http://localhost:3000 with npm run dev
✅ Tests pass with good coverage
✅ README includes setup instructions
Notes for Developer

Keep components small and focused (Single Responsibility Principle)
Use custom hooks to share logic between components
Optimize re-renders with useMemo and useCallback where appropriate
Handle edge cases (empty states, slow network, API failures)
Add loading skeletons for better UX
Consider adding a service worker for offline functionality in the future