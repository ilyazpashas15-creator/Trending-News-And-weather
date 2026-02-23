'use client';


export default function SunMoonSpaceLunarEclipsePage() {
  // Upcoming lunar eclipses data (static for now)
  const upcomingEclipses = [
    {
      date: 'March 14, 2025',
      type: 'Total Lunar Eclipse',
      visibility: 'Americas, Europe, Africa',
      emoji: '🌕'
    },
    {
      date: 'September 7, 2025',
      type: 'Total Lunar Eclipse',
      visibility: 'Europe, Africa, Asia, Australia',
      emoji: '🌕'
    },
    {
      date: 'March 3, 2026',
      type: 'Total Lunar Eclipse',
      visibility: 'Americas, Europe, Africa, Asia',
      emoji: '🌕'
    },
    {
      date: 'August 28, 2026',
      type: 'Partial Lunar Eclipse',
      visibility: 'Americas, Europe, Africa',
      emoji: '🌗'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a2942]">
            <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-white">Lunar Eclipse</h1>
          <p className="mb-8 text-gray-300">View information about upcoming and past lunar eclipses.</p>
          
          <div className="space-y-6">
            {/* What is a Lunar Eclipse */}
            <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🌕</div>
                <h2 className="text-2xl font-bold text-white mb-4">What is a Lunar Eclipse?</h2>
                <p className="text-gray-300 text-left max-w-2xl mx-auto">
                  A lunar eclipse occurs when Earth passes between the Sun and the Moon, casting Earth's shadow on the Moon. 
                  During a total lunar eclipse, the Moon often appears reddish-orange, earning it the nickname "Blood Moon."
                </p>
              </div>
            </div>

            {/* Upcoming Lunar Eclipses */}
            <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Upcoming Lunar Eclipses</h3>
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
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Types of Lunar Eclipses</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1a2942] rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">🔴</div>
                  <h4 className="text-white font-bold mb-2">Total</h4>
                  <p className="text-gray-400 text-sm">Moon completely enters Earth's shadow (Blood Moon)</p>
                </div>
                <div className="bg-[#1a2942] rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">🌗</div>
                  <h4 className="text-white font-bold mb-2">Partial</h4>
                  <p className="text-gray-400 text-sm">Only part of the Moon enters Earth's shadow</p>
                </div>
                <div className="bg-[#1a2942] rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">🌑</div>
                  <h4 className="text-white font-bold mb-2">Penumbral</h4>
                  <p className="text-gray-400 text-sm">Moon passes through Earth's outer shadow</p>
                </div>
              </div>
            </div>

            {/* Why Blood Moon? */}
            <div className="bg-[#2a3f5f] rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Why Does the Moon Turn Red?</h3>
              <div className="bg-[#1a2942] rounded-xl p-6">
                <p className="text-gray-300 mb-4">
                  During a total lunar eclipse, the Moon doesn't disappear completely. Instead, it takes on a reddish-orange color, 
                  often called a "Blood Moon."
                </p>
                <p className="text-gray-300">
                  This happens because Earth's atmosphere bends (refracts) sunlight and filters out blue light, 
                  allowing red and orange light to pass through and illuminate the Moon. It's the same effect that makes 
                  sunrises and sunsets appear red!
                </p>
              </div>
            </div>

            {/* Safe to Watch */}
            <div className="bg-green-500/20 border-2 border-green-500 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">✅</div>
                <div>
                  <h4 className="text-green-200 font-bold text-lg mb-2">Safe to Watch!</h4>
                  <p className="text-green-200">
                    Unlike solar eclipses, lunar eclipses are completely safe to watch with the naked eye. 
                    No special equipment is needed, though binoculars or a telescope can enhance the view!
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
