
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Mic, MapPin, Briefcase } from 'lucide-react';

export const Hero = () => {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      alert('Voice search is not supported in your browser');
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Your Dream Job is Just
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> One Click </span>
            Away
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Designed specifically for freshers, graduates, and career changers. 
            Find entry-level positions with smart matching and guided application process.
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Badge variant="secondary" className="text-sm">🎓 For Fresh Graduates</Badge>
            <Badge variant="secondary" className="text-sm">💼 Entry-Level Focus</Badge>
            <Badge variant="secondary" className="text-sm">🚀 One-Click Apply</Badge>
            <Badge variant="secondary" className="text-sm">🎤 Voice Search</Badge>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Try: 'Software Engineer jobs in Bangalore' or use voice search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-20 py-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                />
                <Button
                  onClick={handleVoiceSearch}
                  variant="ghost"
                  size="sm"
                  className={`absolute right-12 p-2 rounded-lg transition-all ${
                    isListening 
                      ? 'bg-red-100 text-red-600 animate-pulse' 
                      : 'hover:bg-slate-100'
                  }`}
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  className="absolute right-1 top-1 bottom-1 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                >
                  Search
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <Button variant="outline" size="sm" className="rounded-full">
                <MapPin className="h-4 w-4 mr-1" />
                Remote Jobs
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Briefcase className="h-4 w-4 mr-1" />
                Internships
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                IT & Software
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Marketing
              </Button>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">10K+</div>
              <div className="text-sm text-slate-600">Fresh Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5K+</div>
              <div className="text-sm text-slate-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">95%</div>
              <div className="text-sm text-slate-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">24h</div>
              <div className="text-sm text-slate-600">Avg Response</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
