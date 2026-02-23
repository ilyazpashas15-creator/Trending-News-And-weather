'use client';


export default function SunMoonSpacePlanetsPage() {
  const planets = [
    {
      name: 'Mercury',
      emoji: '☿️',
      distance: '57.9 million km',
      diameter: '4,879 km',
      moons: '0',
      color: 'text-gray-400'
    },
    {
      name: 'Venus',
      emoji: '♀️',
      distance: '108.2 million km',
      diameter: '12,104 km',
      moons: '0',
      color: 'text-blue-400'
    },
    {
      name: 'Earth',
      emoji: '🌍',
      distance: '149.6 million km',
      diameter: '12,742 km',
      moons: '1',
      color: 'text-blue-400'
    },
    {
      name: 'Mars',
      emoji: '♂️',
      distance: '227.9 million km',
      diameter: '6,779 km',
      moons: '2',
      color: 'text-red-400'
    },
    {
      name: 'Jupiter',
      emoji: '♃',
      distance: '778.5 million km',
      diameter: '139,820 km',
      moons: '95',
      color: 'text-orange-400'
    },
    {
      name: 'Saturn',
      emoji: '♄',
      distance: '1.43 billion km',
      diameter: '116,460 km',
      moons: '146',
      color: 'text-yellow-300'
    },
    {
      name: 'Uranus',
      emoji: '♅',
      distance: '2.87 billion km',
      diameter: '50,724 km',
      moons: '27',
      color: 'text-cyan-400'
    },
    {
      name: 'Neptune',
      emoji: '♆',
      distance: '4.50 billion km',
      diameter: '49,244 km',
      moons: '14',
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a2942]">
            <div className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-6 text-white">Planet Positions</h1>
          <p className="mb-8 text-gray-300">Explore the planets of our solar system.</p>
          
          <div className="space-y-6">
            {/* Solar System Overview */}
            <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🪐</div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Solar System</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  The Solar System consists of the Sun and everything that orbits it, including 8 planets, 
                  their moons, asteroids, comets, and other celestial objects.
                </p>
              </div>
            </div>

            {/* The Sun */}
            <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-6">
                <div className="text-7xl">☀️</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">The Sun</h3>
                  <p className="text-gray-300 mb-4">
                    The Sun is a yellow dwarf star at the center of our Solar System. It contains 99.86% of the system's mass 
                    and provides the energy that sustains life on Earth.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#1a2942] rounded-lg p-3">
                      <p className="text-gray-400 text-xs">Diameter</p>
                      <p className="text-white font-bold">1.39 million km</p>
                    </div>
                    <div className="bg-[#1a2942] rounded-lg p-3">
                      <p className="text-gray-400 text-xs">Age</p>
                      <p className="text-white font-bold">4.6 billion years</p>
                    </div>
                    <div className="bg-[#1a2942] rounded-lg p-3">
                      <p className="text-gray-400 text-xs">Temperature</p>
                      <p className="text-white font-bold">5,500°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Planets Grid */}
            <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">The Eight Planets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {planets.map((planet) => (
                  <div key={planet.name} className="bg-[#1a2942] rounded-xl p-6 hover:bg-[#243550] transition-colors">
                    <div className="text-center">
                      <div className="text-5xl mb-3">{planet.emoji}</div>
                      <h4 className={`text-xl font-bold mb-3 ${planet.color}`}>{planet.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-400">Distance from Sun</p>
                          <p className="text-white font-semibold">{planet.distance}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Diameter</p>
                          <p className="text-white font-semibold">{planet.diameter}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Moons</p>
                          <p className="text-white font-semibold">{planet.moons}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Planet Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#2a3f5f] rounded-2xl p-6 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-4 text-center">Terrestrial Planets</h4>
                <p className="text-gray-300 text-sm mb-4 text-center">Rocky planets with solid surfaces</p>
                <div className="flex justify-center gap-4 text-4xl">
                  <span>☿️</span>
                  <span>♀️</span>
                  <span>🌍</span>
                  <span>♂️</span>
                </div>
                <p className="text-gray-400 text-xs text-center mt-4">Mercury, Venus, Earth, Mars</p>
              </div>

              <div className="bg-[#2a3f5f] rounded-2xl p-6 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-4 text-center">Gas Giants</h4>
                <p className="text-gray-300 text-sm mb-4 text-center">Large planets made mostly of gas</p>
                <div className="flex justify-center gap-4 text-4xl">
                  <span>♃</span>
                  <span>♄</span>
                  <span>♅</span>
                  <span>♆</span>
                </div>
                <p className="text-gray-400 text-xs text-center mt-4">Jupiter, Saturn, Uranus, Neptune</p>
              </div>
            </div>

            {/* Fun Fact */}
            <div className="bg-blue-500/20 border-2 border-blue-500 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💡</div>
                <div>
                  <h4 className="text-blue-200 font-bold text-lg mb-2">Did You Know?</h4>
                  <p className="text-blue-200">
                    If you could drive a car at 100 km/h non-stop, it would take you about 177 years to reach the Sun, 
                    and over 6,000 years to reach Neptune!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

