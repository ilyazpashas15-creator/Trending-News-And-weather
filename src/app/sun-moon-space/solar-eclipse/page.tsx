'use client';


export default function SunMoonSpaceSolarEclipsePage() {
  // Upcoming solar eclipses data (static for now)
  const upcomingEclipses = [
    {
      date: 'April 8, 2024',
      type: 'Total Solar Eclipse',
      visibility: 'North America',
      emoji: '🌑'
    },
    {
      date: 'October 2, 2024',
      type: 'Annular Solar Eclipse',
      visibility: 'South America, Pacific',
      emoji: '💍'
    },
    {
      date: 'February 17, 2026',
      type: 'Annular Solar Eclipse',
      visibility: 'Antarctica, Africa',
      emoji: '💍'
    },
    {
      date: 'August 12, 2026',
      type: 'Total Solar Eclipse',
      visibility: 'Arctic, Europe, North Africa',
      emoji: '🌑'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a2942]">
            <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-white">Solar Eclipse</h1>
          <p className="mb-8 text-gray-300">View information about upcoming and past solar eclipses.</p>
          
          <div className="space-y-6">
            {/* What is a Solar Eclipse */}
            <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🌑</div>
                <h2 className="text-2xl font-bold text-white mb-4">What is a Solar Eclipse?</h2>
                <p className="text-gray-300 text-left max-w-2xl mx-auto">
                  A solar eclipse occurs when the Moon passes between the Sun and Earth, casting a shadow on Earth. 
                  During a total solar eclipse, the Moon completely blocks the Sun's light, revealing the Sun's corona.
                </p>
              </div>
            </div>

            {/* Upcoming Solar Eclipses */}
            <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Upcoming Solar Eclipses</h3>
              <div className="space-y-4">
                {upcomingEclipses.map((eclipse, index) => (
                  <div key={index} className="bg-[#1a2942] rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{eclipse.emoji}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2">{eclipse.type}</h4>
                        <p className="text-gray-400 mb-1">📅 {eclipse.date}</p>
                        <p className="text-gray-400">🌍 Visible from: {eclipse.visibility}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eclipse Types */}
            <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Types of Solar Eclipses</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1a2942] rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">🌑</div>
                  <h4 className="text-white font-bold mb-2">Total</h4>
                  <p className="text-gray-400 text-sm">Moon completely covers the Sun</p>
                </div>
                <div className="bg-[#1a2942] rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">💍</div>
                  <h4 className="text-white font-bold mb-2">Annular</h4>
                  <p className="text-gray-400 text-sm">Moon appears smaller, creating a ring of fire</p>
                </div>
                <div className="bg-[#1a2942] rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">🌗</div>
                  <h4 className="text-white font-bold mb-2">Partial</h4>
                  <p className="text-gray-400 text-sm">Moon partially covers the Sun</p>
                </div>
              </div>
            </div>

            {/* Safety Warning */}
            <div className="bg-red-500/20 border-2 border-red-500 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">⚠️</div>
                <div>
                  <h4 className="text-red-200 font-bold text-lg mb-2">Safety Warning</h4>
                  <p className="text-red-200">
                    Never look directly at the Sun during a solar eclipse without proper eye protection. 
                    Use certified eclipse glasses or indirect viewing methods to safely observe the eclipse.
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
