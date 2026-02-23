import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1a2942] dark:bg-[#0d1929] text-white">
      {/* Top Feedback Bar */}
      <div className="bg-[#0077be] py-3 border-b border-[#005a94]">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">How was your experience?</span>
            <div className="flex gap-2">
              <button 
                className="bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded transition-colors flex items-center gap-1.5"
                aria-label="Good experience"
              >
                <span className="text-lg">👍</span>
              </button>
              <button 
                className="bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded transition-colors flex items-center gap-1.5"
                aria-label="Bad experience"
              >
                <span className="text-lg">👎</span>
              </button>
            </div>
          </div>
          <a 
            href="/contact" 
            className="text-sm font-medium hover:underline flex items-center gap-2"
          >
            <span>Contact Us</span>
            <span className="text-lg">📧</span>
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Column 1: Supporter Section */}
          <div>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer">
                <span className="text-4xl">❤️</span>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2 text-white text-center">Love Our Site?</h3>
            <p className="text-base text-gray-300 mb-5 text-center">Become a Supporter</p>
            
            <ul className="space-y-3 text-base text-gray-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1 flex-shrink-0">•</span>
                <span>Browse our site <strong className="text-white font-semibold">advert free</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1 flex-shrink-0">•</span>
                <span>Sun & Moon times <strong className="text-white font-semibold">precise to the second</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1 flex-shrink-0">•</span>
                <span><strong className="text-white font-semibold">Exclusive calendar templates</strong> for PDF Calendar.</span>
              </li>
            </ul>
          </div>
          
          {/* Columns 2-5: Shifted to the right */}
          <div className="lg:col-span-4 pl-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              
              {/* Column 2: Company */}
              <div>
                <h3 className="text-lg font-bold mb-5 text-white">Company</h3>
                <ul className="space-y-3 text-base">
                  <li><a href="/about" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">About us</a></li>
                  <li><a href="/contact" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Careers/Jobs</a></li>
                  <li><a href="/contact" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Contact Us</a></li>
                  <li><a href="/contact" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Contact Details</a></li>
                  <li><a href="/about" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Sitemap</a></li>
                  <li><a href="/news/world" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Newsletter</a></li>
                </ul>
                
                <h3 className="text-lg font-bold mt-8 mb-5 text-white">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-[#3b5998] hover:bg-[#2d4373] rounded-md flex items-center justify-center transition-all hover:scale-110 shadow-md">
                    <span className="text-white text-base font-bold">f</span>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 bg-[#1da1f2] hover:bg-[#0c85d0] rounded-md flex items-center justify-center transition-all hover:scale-110 shadow-md">
                    <span className="text-white text-base font-bold">𝕏</span>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 bg-[#0077b5] hover:bg-[#005885] rounded-md flex items-center justify-center transition-all hover:scale-110 shadow-md">
                    <span className="text-white text-sm font-bold">in</span>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-md flex items-center justify-center transition-all hover:scale-110 shadow-md">
                    <span className="text-white text-lg">📷</span>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 bg-[#ff0000] hover:bg-[#cc0000] rounded-md flex items-center justify-center transition-all hover:scale-110 shadow-md">
                    <span className="text-white text-sm">▶</span>
                  </a>
                </div>
              </div>
              
              {/* Column 3: Legal */}
              <div>
                <h3 className="text-lg font-bold mb-5 text-white">Legal</h3>
                <ul className="space-y-3 text-base">
                  <li><a href="/privacy" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Link policy</a></li>
                  <li><a href="/contact" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Advertising</a></li>
                  <li><a href="/privacy" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Disclaimer</a></li>
                  <li><a href="/privacy" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Terms & Conditions</a></li>
                  <li><a href="/privacy" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Privacy Policy</a></li>
                  <li><a href="/privacy" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Privacy Settings</a></li>
                </ul>
                
                <h3 className="text-lg font-bold mt-8 mb-5 text-white">Sites</h3>
                <ul className="space-y-3 text-base">
                  <li><a href="/" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">weatherapp.com</a></li>
                  <li><a href="/" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">weatherapp.in</a></li>
                </ul>
              </div>
              
              {/* Column 4: Services */}
              <div>
                <h3 className="text-lg font-bold mb-5 text-white">Services</h3>
                <ul className="space-y-3 text-base">
                  <li><a href="/world-clock" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">World Clock</a></li>
                  <li><a href="/time-zones/all" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Time Zones</a></li>
                  <li><a href="/calendar/monthly" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Calendar</a></li>
                  <li><a href="/" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Weather</a></li>
                  <li><a href="/sun-moon-space/sunrise-sunset" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Sun & Moon</a></li>
                  <li><a href="/timers/clock" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Timers</a></li>
                  <li><a href="/calculators/date" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Calculators</a></li>
                  <li><a href="/news/world" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">News</a></li>
                  <li><a href="/contact" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">API</a></li>
                  <li><a href="/contact" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">RSS Feeds</a></li>
                </ul>
              </div>

              {/* Column 5: Free Tools */}
              <div>
                <h3 className="text-lg font-bold mb-5 text-white">Free Tools</h3>
                <ul className="space-y-3 text-base">
                  <li><a href="/world-clock" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Free Clock Widget</a></li>
                  <li><a href="/timers/alarm" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Alarm Clock</a></li>
                  <li><a href="/timers/clock" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Digital Clock</a></li>
                  <li><a href="/calculators/time" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Time Calculator</a></li>
                  <li><a href="/calculators/date" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Date Calculator</a></li>
                  <li><a href="/time-zones/converter" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">Time Zone Converter</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#0d1929] border-t border-gray-700">
        <div className="container mx-auto px-6 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⛅</span>
              <span className="font-bold text-white text-xl tracking-wide">My Weather And News</span>
            </div>
            <p className="text-sm text-gray-400">
              © My Weather And News {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
