import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'clear-sky': 'linear-gradient(135deg, #fde16d 0%, #7fb0d8 100%)', /* Sunny Day: Soft gradient from light yellow to sky blue */
        'cloudy': 'linear-gradient(135deg, #d3d3d3 0%, #c5cbe5 100%)', /* Cloudy Day: Soft gradient from light gray to pale lavender/blue */
        'rainy': 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)', /* Rainy Day: Gradient from deep blue to purple/dark gray */
        'clear-night': 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', /* Clear Night: Dark gradient from navy blue to deep indigo */
        'snowy': 'linear-gradient(135deg, #E0F2F7 0%, #B3E5FC 100%)',
        'thunderstorm': 'linear-gradient(135deg, #4A4A6A 0%, #5C5C7C 100%)',
        'foggy': 'linear-gradient(135deg, #E8E8E8 0%, #D0D0D0 100%)',
        'hot': 'linear-gradient(135deg, #FFE5B4 0%, #FFD700 100%)',
        'cold': 'linear-gradient(135deg, #B0E0E6 0%, #ADD8E6 100%)',
      }
    },
  },
  plugins: [],
} satisfies Config;